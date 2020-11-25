export { assertEquals } from "https://deno.land/std@0.56.0/testing/asserts.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";
const env = config();

export { ENV: env }