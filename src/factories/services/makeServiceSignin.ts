import { SigninService } from "@/modules/auth/services";
import { makeProviderCrypt } from "../providers/makeProviderCrypt";
import { makeProviderToken } from "../providers/makeProviderToken";

export function makeServiceSignIn() {
  return new SigninService(makeProviderCrypt(), makeProviderToken());
}
