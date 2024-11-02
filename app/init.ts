import { Router, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { UniversalWalletConnector } from "@common-module/wallet";
import AppConfig, { IAppConfig } from "./AppConfig.js";
import IntroView from "./views/IntroView.js";
import Layout from "./views/Layout.js";
import MyNFTsView from "./views/MyNFTsView.js";
import NFTViewerView from "./views/NFTViewerView.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
  SPAInitializer.init();

  UniversalWalletConnector.init({
    name: "The Gods NFT",
    icon: "https://names.gaia.cc/images/icon-192x192.png",
    description: "Gaia Protocol's Membership NFT",
    walletConnectProjectId: "7538ca3cec20504b06a3338d0e53b028",
    chains: {
      "base-sepolia": {
        id: 84532,
        name: "Base Sepolia Testnet",
        symbol: "ETH",
        rpc: "https://sepolia.base.org",
        explorerUrl: "https://sepolia.basescan.org",
      },
    },
  });

  Router
    .add("/", IntroView)
    .add("/my-nfts", MyNFTsView)
    .add("/nft-viewer", NFTViewerView);

  Layout.init();
}
