import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const output = {
  sha: process.env.VERCEL_GIT_COMMIT_SHA || "local",
  branch: process.env.VERCEL_GIT_COMMIT_REF || "local",
  date: new Date().toISOString(),
  environment: process.env.VERCEL_ENV || "development",
};

writeFileSync(resolve(process.cwd(), "public/build-info.json"), JSON.stringify(output, null, 2) + "\n");
