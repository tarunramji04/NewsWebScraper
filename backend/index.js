import { scrapeCNN, scrapeFox } from "./helpers.js";

await Promise.all([scrapeFox(), scrapeCNN()]);
