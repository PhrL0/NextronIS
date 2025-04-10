import { z } from "zod";

// MASTER USER SCHEMA
export const userDecodedSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  iat: z.number(),
  exp: z.number(),
});

// TYPES
export type TUserDecoded = z.infer<typeof userDecodedSchema>;
