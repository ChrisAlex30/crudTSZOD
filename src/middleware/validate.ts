import { z } from "zod";


export const userSchema = z.object({
    name: z.string().min(5),
    email: z.string(),
    gender: z.string().optional(),
  });