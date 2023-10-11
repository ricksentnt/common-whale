import dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import fastifyCors from "@fastify/cors"

import { marketWorker } from "./workers/marketWorker.js";

import { marketRoutes } from "./routes/data/marketRoutes.js";

const fastify = Fastify({
  logger: false,
});


fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.get('/check', async (request, reply) => {
  return { message: "Hello World, this is common-whale" };
})

// WORKERS
fastify.register(marketWorker);

// ROUTES
fastify.register(marketRoutes, {
  prefix: '/api/data'
})

const start = async () => {
  try {
    const port = process.env.APP_PORT || 3000;
    await fastify.listen({
      port: port,
      host: '0.0.0.0'
    })

    console.log(`Server is listening on port http://localhost:${fastify.server.address().port}`);
  } catch (error) {
    console.log('Error starting server: ', error);
    process.exit(1);
  }
};

start();