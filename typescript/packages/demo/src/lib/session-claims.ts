import { z } from "zod";

export const ZSessionClaims = z.object({
  email: z.string(),
});
