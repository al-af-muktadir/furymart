import { z } from "zod";
export const RegisterValidationSchema = z.object({
  name: z.string({ required_error: "Name is Required" }),
  email: z
    .string({ required_error: "Email is Required" })
    .email("Invalid Email Format"),
  password: z
    .string({ required_error: "Password is Required" })
    .min(8, "Password must be consist 8 Charecter"),
});
