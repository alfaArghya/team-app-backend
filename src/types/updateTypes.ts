import zod from "zod";

export const updateInput = zod.object({
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
  gender: zod.string().optional(),
  domain: zod.string().optional(),
  available: zod.boolean().optional(),
});
