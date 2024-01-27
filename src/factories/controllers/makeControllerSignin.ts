import { SigninController } from "@/modules/auth/controllers";
import { makeServiceSignIn } from "../services/makeServiceSignin";

export function makeControllerSignin() {
  return new SigninController(makeServiceSignIn());
}
