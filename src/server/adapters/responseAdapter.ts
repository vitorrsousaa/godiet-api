import { IResponse } from "@/interfaces/controller";
import { IResponseLambda } from "../interfaces/handlers";

export function responseAdapter(response: IResponse): IResponseLambda {
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body),
  };
}
