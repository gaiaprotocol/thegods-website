import { Router } from "@common-module/app";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { SocialCompConfig } from "@common-module/social-components";
import { WalletLoginConfig } from "@common-module/wallet-login";
import { AddressUtils } from "@common-module/wallet-utils";
import { NFTIcon } from "@gaiaprotocol/svg-icons";
import { GaiaUIPreset } from "@gaiaprotocol/ui-preset";
import { mainnet } from "@wagmi/core/chains";
import { GaiaNameRepository, GaiaProtocolConfig, GodMode } from "gaiaprotocol";

export interface IAppConfig {
  isDevMode: boolean;
  walletConnectProjectId: string;
}

class AppConfig {
  public isDevMode!: boolean;

  public init(config: IAppConfig) {
    Object.assign(this, config);
    GaiaUIPreset.init();

    WalletLoginConfig.init({
      chains: [mainnet] as any,
      walletConnectProjectId: config.walletConnectProjectId,
      supabaseConnector: GodMode.supabaseConnector,
    });

    GaiaProtocolConfig.initForGodMode(config.isDevMode, config.isDevMode);

    SocialCompConfig.fetchUser = async (walletAddress: string) => {
      const data = await GaiaNameRepository.fetchByWallet(walletAddress);
      return {
        id: walletAddress,
        name: data
          ? `${data.name}.gaia`
          : AddressUtils.shortenAddress(walletAddress),
      };
    };

    SocialCompConfig.goLoggedInUserProfile = () => Router.go("/my-gods");

    SocialCompConfig.getLoggedInUserMenu = async (menu, user) =>
      new DropdownMenuGroup(
        new DropdownMenuItem({
          icon: new NFTIcon(),
          label: "My Gods",
          onClick: () => {
            Router.go("/my-gods");
            menu.remove();
          },
        }),
      );
  }
}

export default new AppConfig();
