import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tags: z.string().min(3, "Tags must be at least 3 characters"),
  description: z.string().min(6, "Description must be at least 6 characters"),
  imageUrl: z.string(),
});
