import { z } from "zod";

const ZServerSettings = z.object({});

export const SERVER_SETTINGS = ZServerSettings.parse({});
