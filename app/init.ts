import { Router, SPAInitializer } from "@common-module/app";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import GodDetailView from "./views/GodDetailView.js";
import IntroView from "./views/IntroView.js";
import Layout from "./views/Layout.js";
import MyGodsView from "./views/MyGodsView.js";
import NFTViewerView from "./views/NFTViewerView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  SPAInitializer.init();
  WalletLoginManager.init();

  Router
    .add("/", IntroView)
    .add("/my-gods", MyGodsView)
    .add("/god/:tokenId", GodDetailView)
    .add("/god-viewer/:tokenId", NFTViewerView);

  Layout.init();
}
