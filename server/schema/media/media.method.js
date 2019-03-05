const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const ffmpeg = require('ffmpeg-static');
const genThumbnail = require('simple-thumbnail');

const generateThumbnail = async () => {
  const tree1 = await glob.sync('**/*', { cwd: 'static/media/' });
  const tr = await glob.sync('**/*', { cwd: 'static/thumbnails/' });
  const tree2 = await Promise.all(_.reduce(tr, (r, v) => {
    const { dir, name } = path.parse(v);
    if (dir !== '') {
      r.push(`${dir}/${name}`);
    } else {
      r.push(name);
    }
    return r;
  }, []));
  const diff = _.difference(tree1, tree2);

  await Promise.all(
    _.map(diff, async (v) => {
      if (fs.statSync(`static/media/${v}`).isDirectory()) {
        await fs.ensureDir(`static/thumbnails/${v}`);
      }
      const { ext } = path.parse(v);
      if (ext !== '') {
        await genThumbnail(`static/media/${v}`, `static/thumbnails/${v}.png`, '?x50', {
          path: ffmpeg.path,
          seek: ext === '.mp4' ? '00:00:05.000' : false,
        });
      }
    }),
  );

  return {
    result: true,
  };
};

module.exports = {
  generateThumbnail,
};
