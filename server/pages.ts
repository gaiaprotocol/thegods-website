import {
  createPage,
  el,
} from "https://raw.githubusercontent.com/yjgaia/deno-module/main/page.ts";
import { introView } from "./pages/introView.ts";
import { layout } from "./pages/layout.ts";
import { myNFTsView } from "./pages/myNFTsView.ts";
import test from "../pages/test.ts";

export function pages(path: string, isDevMode = false): string | undefined {
  if (path === "/") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "The Gods NFT",
        jsFiles: [isDevMode ? "bundle-dev.js" : "/bundle.js"],
        cssFiles: [isDevMode ? "bundle-dev.css" : "/bundle.css"],
        gtagId: "G-5V6VEQVW28",
      },
      layout(introView()),
    );
  } else if (path === "/my-nfts") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "Profile | The Gods NFT",
        jsFiles: [isDevMode ? "bundle-dev.js" : "/bundle.js"],
        cssFiles: [isDevMode ? "bundle-dev.css" : "/bundle.css"],
        gtagId: "G-5V6VEQVW28",
      },
      layout(myNFTsView()),
    );
  } else if (path === "/test") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "Test | The Gods NFT",
        jsFiles: [isDevMode ? "bundle-dev.js" : "/bundle.js"],
        cssFiles: [isDevMode ? "bundle-dev.css" : "/bundle.css"],
        gtagId: "G-5V6VEQVW28",
      },
      layout(test(el)),
    );
  }
}
