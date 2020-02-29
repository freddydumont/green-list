import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {};
  },
});

const handler = apolloServer.createHandler({ path: '/api/graphql' });

// this is required for graphql to work properly
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
