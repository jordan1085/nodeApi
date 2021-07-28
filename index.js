const { ApolloServer } = require('apollo-server');
const { dbConnection } = require('./config/database');

const { typeDefs } = require('./database/schema');
const { resolvers } = require('./database/resolvers');

// Conectar a la base de datos
dbConnection();

// Server 
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Start server
server.listen({port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server on: ${url}`);
})