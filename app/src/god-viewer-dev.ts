import { Router } from "@commonmodule/app";
import NFTViewerView from "./views/NFTViewerView.js";

Router.add("/god-viewer/:tokenId", NFTViewerView);
