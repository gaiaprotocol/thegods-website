import { Router } from "@common-module/app";
import NFTViewerView from "./views/NFTViewerView.js";

Router.add("/nft-viewer/:tokenId", NFTViewerView);
