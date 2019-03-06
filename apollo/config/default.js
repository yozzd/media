import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default (ctx) => {
  const uri = process.browser
    ? '/graphql'
    // : 'http://190.1.1.1/graphql';
    : `${ctx.req.protocol}://${ctx.req.get('Host')}/graphql`;

  const link = createHttpLink({ uri });

  return {
    link,
    cache: new InMemoryCache(),
    defaultHttpLink: false,
  };
};
