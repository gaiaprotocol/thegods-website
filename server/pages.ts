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

const GTAG_ID = "G-ZT30R32YZV";

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
          gtagId: GTAG_ID,
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
          gtagId: GTAG_ID,
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
          jsFiles: [isDevMode ? "/nft-viewer-dev.js" : "/nft-viewer.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
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
