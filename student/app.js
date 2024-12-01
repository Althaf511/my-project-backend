const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');  // Import ApolloServer
const { typeDefs, resolvers } = require('./graphql');  // Import GraphQL schema and resolvers

const app = express();

// Use CORS to allow the Angular frontend to make requests
app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests from Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// MongoDB connection URL
const url = 'mongodb://localhost/MyDB';  
mongoose.connect(url);  // Connect to MongoDB
const con = mongoose.connection;

con.on('open', () => {
  console.log('Connection Success!..');
});

con.on('error', (err) => {
  console.error('Connection error:', err);
});

app.use(express.json());  // Middleware to parse JSON data

// Set up Apollo Server with schema and resolvers
const server = new ApolloServer({
  typeDefs,  // Pass GraphQL schema
  resolvers, // Pass resolvers for queries and mutations
});

// Apply Apollo Server middleware to Express
server.applyMiddleware({ app });

// Handle student routes (no GraphQL here)
const studentRouter = require('./routes/students');
app.use('/students', studentRouter);

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`GraphQL server ready at http://localhost:${port}${server.graphqlPath}`);
});
