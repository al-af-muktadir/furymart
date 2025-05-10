import { z } from "zod";

export const LoginValidationSchmea = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .email("Please Provide Valid Email"),
  password: z.string({ required_error: "Please Enter Your Password" }),
});
