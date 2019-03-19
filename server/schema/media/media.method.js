const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const sortBy = require('lodash/sortBy');
const glob = require('glob');
const ffmpeg = require('ffmpeg-static');
const genThumbnail = require('simple-thumbnail');
const getUuid = require('uuid-by-string');
const mime = require('mime');

let dirTree;

const generateThumbnail = async () => {
  const tree1 = await glob.sync('**/*', { cwd: 'static/media/' });
  const tr = await glob.sync('**/*', { cwd: 'static/thumbnails/' });
  const tree2 = await Promise.all(
    _.reduce(
      tr,
      (r, v) => {
        const { dir, name } = path.parse(v);
        if (dir !== '') {
          r.push(`${dir}/${name}`);
        } else {
          r.push(name);
        }
        return r;
      },
      [],
    ),
  );
  const diff = _.difference(tree1, tree2);

  await Promise.all(
    _.map(diff, async (v) => {
      if (fs.statSync(`static/media/${v}`).isDirectory()) {
        await fs.ensureDir(`static/thumbnails/${v}`);
      }
      const { ext } = path.parse(v);
      if (ext !== '') {
        await genThumbnail(
          `static/media/${v}`,
          `static/thumbnails/${v}.png`,
          '?x70',
          {
            path: ffmpeg.path,
            seek: ext === '.mp4' ? '00:00:05.000' : false,
          },
        );
      }
    }),
  );

  return {
    result: true,
  };
};

const fileType = (b, p) => {
  const type = fs.statSync(p).isDirectory() ? 'dir' : 'file';
  const { birthtime, size } = fs.statSync(p);
  const { dir, name, ext } = path.parse(p);
  const route = `${dir}/${name}`.split(`${b}/`)[1];
  const base = type === 'file' ? `${dir}/${name}${ext}`.split('static/')[1] : '';
  const mimeType = type === 'file' ? mime.getType(p) : '';

  if (type === 'dir') {
    fs.ensureDirSync(`static/thumbnails/${route}`);
  } else if (
    type === 'file' && !fs.pathExistsSync(`static/thumbnails/${route}.png`)
  ) {
    genThumbnail(p, `static/thumbnails/${route}.png`, '?x70', {
      path: ffmpeg.path,
      seek: mimeType.split('/')[0] === 'video' ? '00:00:05.000' : false,
    });
  }
  const thumbnail = type === 'file' ? `thumbnails/${route}.png` : '';

  return {
    route,
    base,
    thumbnail,
    name,
    type,
    birthtime,
    size,
    ext,
    mimeType,
  };
};

const generateTree = async (cwd = 'static/media') => {
  const readDir = await glob.sync('**/*', { cwd });

  let parentId;
  let id;
  const p = {
    p1id: '',
    p2id: '',
    p3id: '',
    p4id: '',
    p5id: '',
  };

  const tree = await Promise.all(
    readDir.reduce((r, v) => {
      const breadcrumb = [];
      const {
        route,
        base,
        thumbnail,
        name,
        type,
        birthtime,
        size,
        ext,
        mimeType,
      } = fileType(cwd, `${cwd}/${v}`);
      const l = route.split('/').length;

      const genBread = (x) => {
        x.split('/').map((vv, i) => {
          if (i === l - 1) {
            breadcrumb.push({ label: vv });
          } else {
            breadcrumb.push({ label: vv, to: p[`p${i + 1}id`] });
          }
          return true;
        });
      };

      if (l === 1) {
        parentId = '';
        id = getUuid(route);
        p.p1id = id;
        genBread(route);
      } else if (l === 2) {
        parentId = p.p1id;
        id = getUuid(route);
        p.p2id = id;
        genBread(route);
      } else if (l === 3) {
        parentId = p.p2id;
        id = getUuid(route);
        p.p3id = id;
        genBread(route);
      } else if (l === 4) {
        parentId = p.p3id;
        id = getUuid(route);
        p.p4id = id;
        genBread(route);
      } else if (l === 5) {
        parentId = p.p4id;
        id = getUuid(route);
        p.p5id = id;
        genBread(route);
      }

      r.push({
        route,
        base,
        thumbnail,
        name,
        type,
        birthtime,
        size,
        ext,
        id,
        parentId,
        mimeType,
        breadcrumb,
      });

      return r;
    }, []),
  );
  await fs.writeJson('./tools/dirTree.json', tree);
  dirTree = await fs.readJson('./tools/dirTree.json');

  return { result: true };
};

const tree = async (args) => {
  const limit = 10;
  if (args.id === '' && args.sig === 0) {
    return dirTree.filter(v => v.parentId === args.id);
  } if (args.id && args.sig === 0) {
    return dirTree.filter(v => v.id === args.id);
  }
  let start;
  let end;
  let c;
  const f = dirTree.find(v => v.id === args.id);
  const sortTree = sortBy(
    dirTree.filter(v => v.parentId === f.parentId && v.type === 'file'),
    'name',
  );
  const index = sortTree.findIndex(v => v.id === args.id);
  const pt = Math.floor(index / limit) * limit;
  if (!args.infinite && !args.direction) {
    start = pt;
    end = pt + limit;
  } else if (args.infinite && args.direction === 0) {
    if (index > 9) {
      start = pt - limit;
      end = pt;
    } else {
      c = 1;
    }
  } else {
    start = pt + limit;
    end = start + limit;
  }
  return c === 1 ? [] : sortTree.slice(start, end);
};

const total = async (args) => {
  const f = dirTree.find(v => v.id === args.id);
  const d = sortBy(
    dirTree.filter(v => v.parentId === f.parentId && v.type === 'file'),
    'name',
  );
  return { total: d.length };
};

const gTree = async () => {
  return dirTree;
}

module.exports = {
  generateThumbnail,
  generateTree,
  tree,
  total,
  gTree,
};
