import fs from "fs";
import path from "path";

fs.rmSync(path.resolve(__dirname, "..", "..", "node_modules", ".cache"), { recursive: true, force: true });
