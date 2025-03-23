import { el as UniversalEl, html } from "@common-module/universal-page";
import { godDetailView } from "../../pages/godDetailView.js";
import { godViewerView } from "../../pages/godViewerView.js";
import { introView } from "../../pages/introView.js";
import { myGodsView } from "../../pages/myGodsView.js";
import createPage from "./createPage.js";
import el from "./el.js";
import { layout } from "./layout.js";

UniversalEl.impl = el;
html.impl = (htmlContent) => htmlContent;

const GTAG_ID = "G-ZT30R32YZV";

export function pages(
  path: string,
  isDevMode = false,
): string | undefined {
  if (path === "/") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "The Gods NFT",
        jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
        cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
        gtagId: GTAG_ID,
      },
      layout(introView()),
    );
  } else if (path === "/my-gods") {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "Profile - The Gods NFT",
        jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
        cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
        gtagId: GTAG_ID,
      },
      layout(myGodsView()),
    );
  } else if (path.startsWith("/god-viewer/")) {
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + "God Viewer - The Gods NFT",
        jsFiles: [isDevMode ? "/god-viewer-dev.js" : "/god-viewer.js"],
        cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
        gtagId: GTAG_ID,
      },
      godViewerView(),
    );
  } else if (path.startsWith("/god/")) {
    const tokenId = path.replace("/god/", "");
    return createPage(
      {
        title: (isDevMode ? "(Dev) " : "") + `God #${tokenId} - The Gods NFT`,
        jsFiles: [isDevMode ? "/bundle-dev.js" : "/bundle.js"],
        cssFiles: [isDevMode ? "/bundle-dev.css" : "/bundle.css"],
        gtagId: GTAG_ID,
      },
      layout(godDetailView(parseInt(tokenId))),
    );
  }
}
