import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { makeControllerSignin } from "@/factories/controllers/makeControllerSignin";
import { controllerAdapter, responseAdapter } from "@/adapters";

export async function handler(event: APIGatewayProxyEventV2) {
  const response = await controllerAdapter(makeControllerSignin(), event);

  return responseAdapter(response);
}
