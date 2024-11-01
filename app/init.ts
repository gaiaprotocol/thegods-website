import { DomNode, SPAInitializer } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { UniversalWalletConnector } from "@common-module/wallet";
import { WalletLoginManager } from "@common-module/wallet-login";
import AppConfig, { IAppConfig } from "./AppConfig.js";

export default async function init(config: IAppConfig) {
  AppConfig.init(config);
  AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
  SPAInitializer.init();

  UniversalWalletConnector.init({
    name: "Gaia Names",
    icon: "https://names.gaia.cc/images/icon-192x192.png",
    description: "Web3 name service by Gaia Protocol",
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

  new DomNode(document.querySelector(".layout header .buttons") as HTMLElement)
    .append(
      new LoggedInUserAvatarButton(WalletLoginManager, true),
    );
}
