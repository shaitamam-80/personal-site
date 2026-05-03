import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "nameRequired" }),
  email: z.string().trim().email({ message: "emailInvalid" }),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, { message: "messageTooShort" }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
