import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';

import { resolvers, typeDefs } from './schemas/index.js';
import db from './config/connection.js';


const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    resolvers,
    typeDefs

})

// Express Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

// Create new Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on ${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

// Start Server
startApolloServer(typeDefs, resolvers);