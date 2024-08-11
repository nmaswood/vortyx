import { z } from "zod";

const ZTestSettings = z.object({});

export const TEST_SETTINGS = ZTestSettings.parse({});
