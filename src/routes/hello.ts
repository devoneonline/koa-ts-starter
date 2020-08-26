import { SwaggerRouter } from "koa-swagger-decorator";
import HelloController from "../controller/hello"
export function helloRoutes(router: SwaggerRouter) {
    router.get("/", HelloController.helloWorld)
    router.post("/", HelloController.sayHi)
    return router
}
