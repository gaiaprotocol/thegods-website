import { el as UniversalEl, html } from "@common-module/universal-page";
import { corsHeaders } from "https://raw.githubusercontent.com/yjgaia/deno-module/main/api.ts";
import {
  createPage,
  el,
} from "https://raw.githubusercontent.com/yjgaia/deno-module/main/page.ts";
import { godDetailView } from "../pages/godDetailView.ts";
import { godViewerView } from "../pages/godViewerView.ts";
import { introView } from "../pages/introView.ts";
import { myGodsView } from "../pages/myGodsView.ts";
import { layout } from "./pages/layout.ts";

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
  } else if (path === "/my-gods") {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "Profile | The Gods NFT",
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
        },
        layout(myGodsView()),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } else if (path.startsWith("/god-viewer/")) {
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + "God Viewer | The Gods NFT",
          jsFiles: [isDevMode ? "/god-viewer-dev.js" : "/god-viewer.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
        },
        godViewerView(),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      },
    );
  } else if (path.startsWith("/god/")) {
    const tokenId = path.replace("/god/", "");
    return new Response(
      createPage(
        {
          title: (isDevMode ? "(Dev) " : "") + `God #${tokenId} | The Gods NFT`,
          jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
          cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
          gtagId: GTAG_ID,
        },
        layout(godDetailView(tokenId)),
      ),
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
