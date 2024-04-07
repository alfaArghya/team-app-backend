import zod from "zod";

export const signupInput = zod.object({
  first_name: zod.string(),
  last_name: zod.string(),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(8, { message: "password must be at least 8 characters long" }),
  gender: zod.string(),
  domain: zod.string(),
});
