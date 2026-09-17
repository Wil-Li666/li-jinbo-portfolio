const { readdir, rm } = require("node:fs/promises");
const path = require("node:path");

// Next.js runtime copies local dotenv files into its handler. Production
// secrets must instead come from Netlify's server-side environment settings.
exports.onBuild = async ({ constants }) => {
  const root = constants.INTERNAL_FUNCTIONS_SRC;
  if (!root) throw new Error("Missing internal functions directory");
  async function clean(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await clean(file);
      else if (entry.name === ".env" || entry.name.startsWith(".env.")) {
        await rm(file);
      }
    }
  }
  await clean(root);
};
