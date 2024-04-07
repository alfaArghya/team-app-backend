import zod from "zod";

export const signinInput = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(8, { message: "password must be at least 8 characters long" }),
});
