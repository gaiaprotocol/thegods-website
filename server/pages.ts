import { el as UniversalEl, html } from "@common-module/universal-page";
import {
  createPage,
  el,
} from "https://raw.githubusercontent.com/yjgaia/deno-module/main/page.ts";
import { introView } from "../pages/introView.ts";
import { myNFTsView } from "../pages/myNFTsView.ts";
import { nftViewerView } from "../pages/nftViewerView.ts";
import { layout } from "./pages/layout.ts";
import { corsHeaders } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";

UniversalEl.impl = el;
html.impl = (htmlContent) => htmlContent;

export function pages(
  path: string,
  isDevMode = false,
): Response | undefined {
  if (path === "/") {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: "G-5V6VEQVW28",
        },
        layout(introView()),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } else if (path === "/my-nfts") {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "Profile | The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: "G-5V6VEQVW28",
        },
        layout(myNFTsView()),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } else if (path.startsWith("/nft-viewer/")) {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "NFT Viewer | The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: "G-5V6VEQVW28",
        },
        nftViewerView(),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      },
    );
  }
}
