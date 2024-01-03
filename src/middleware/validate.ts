import { z } from "zod";


export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    gender: z.string().optional(),
  });