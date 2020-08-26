import Koa from "koa";
import Router from "koa-router";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { helloRoutes } from "./routes/hello";
import { SwaggerRouter } from "koa-swagger-decorator";


const app = new Koa();
const router = new SwaggerRouter();

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
/**
 * Equivalent zu app.use("/", (ctx: BaseContext) => {ctx.body = "Hello World"})
 */
app.use(helloRoutes(router).routes()).use(router.allowedMethods())
router.swagger({
    title: "node-typescript-koa-rest",
    description: "API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.",
    version: "1.5.0"
});
// This checks all the decorators and creates the swagger config
router.mapDir(__dirname);

app.listen(3000, () => {
  console.log("Koa started");
});