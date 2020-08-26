import { Context } from "koa";
import { description, request, summary, tagsAll, body, swaggerProperty, swaggerClass } from "koa-swagger-decorator";

@swaggerClass()
export class HelloSwaggerClass implements HelloSchema {
    @swaggerProperty({ type: "string", required: true, example: "Patrick" }) name: string;
}
export interface HelloSchema {
    name: string
}

@tagsAll(["General"])
export default class HelloController {
  @request("get", "/")
  @summary("Get a greeting back")
  @description(
    "A simple welcome message to verify the service is up and running."
  )
  public static async helloWorld(ctx: Context): Promise<void> {
    ctx.body = "Hello World!";
  }

  @request("post", "/")
  @summary("Test Post request")
  @description("Greets you by name")
  @body((HelloSwaggerClass as any).swaggerDocument)
  public static async sayHi(ctx: Context): Promise<void> {
      const { name } = ctx.request.body as HelloSchema
      ctx.body = `Hi ${name}`
  }
}
