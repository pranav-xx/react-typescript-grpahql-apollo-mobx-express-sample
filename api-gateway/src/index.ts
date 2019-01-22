import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

const server = new ApolloServer({
    typeDefs: gql`${typeDefs}`,
    resolvers
});

server.listen({ port: 3002}).then(({ url }) => {
    console.log(`server ready at ${url}`);
});
