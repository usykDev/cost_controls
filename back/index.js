import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import passport from "passport";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";

import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";

// import pool from "./db/connectPostgreSQL.js";
// import { PrismaClient } from "@prisma/client";
// import connectPgSimple from "connect-pg-simple";

import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();
const port = 4000;

const httpServer = http.createServer(app);

// const PgSession = connectPgSimple(session);
// const store = new PgSession({
//   pool: pool, // PostgreSQL connection pool
//   tableName: "Session", // The name of the table where session data will be stored
//   ttl: 1000 * 60 * 60 * 24 * 7, // 7 days
// });

const MongoDBStore = ConnectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
      httpOnly: true, // prevents the Cross-Site Scriptiong (XSS) attacks
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      return buildContext({ req, res });
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port }, resolve));
await connectDB();

console.log(`Server ready at http://localhost:${port}/graphql`);
