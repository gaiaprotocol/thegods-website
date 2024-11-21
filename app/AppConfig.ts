import { Router } from "@common-module/app";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { SocialCompConfig } from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import { WalletLoginConfig } from "@common-module/wallet-login";
import { AddressUtils } from "@common-module/wallet-utils";
import { NFTIcon } from "@gaiaprotocol/svg-icons";
import { GaiaUIPreset } from "@gaiaprotocol/ui-preset";
import { mainnet } from "@wagmi/core/chains";
import { GaiaProtocolConfig } from "gaiaprotocol";
import GaiaNameRepository from "./repositories/GaiaNameRepository.js";

export interface IAppConfig {
  isDevMode: boolean;

  supabaseUrl: string;
  supabaseKey: string;

  walletConnectProjectId: string;
}

class AppConfig {
  public isDevMode!: boolean;

  public supabaseUrl!: string;
  public supabaseKey!: string;

  public supabaseConnector!: SupabaseConnector;

  public init(config: IAppConfig) {
    Object.assign(this, config);
    GaiaUIPreset.init();

    const authTokenManager = new AuthTokenManager("gaia-names-auth-token");

    this.supabaseConnector = new SupabaseConnector(
      config.supabaseUrl,
      config.supabaseKey,
      authTokenManager,
    );

    WalletLoginConfig.init({
      chains: [mainnet] as any,
      walletConnectProjectId: config.walletConnectProjectId,
      supabaseConnector: this.supabaseConnector,
    });

    GaiaNameRepository.supabaseConnector = this.supabaseConnector;

    GaiaProtocolConfig.init(
      config.isDevMode,
      config.isDevMode,
      this.supabaseConnector,
      authTokenManager,
    );

    SocialCompConfig.fetchUser = async (walletAddress: string) => {
      const name = await GaiaNameRepository.fetchName(walletAddress);
      return {
        id: walletAddress,
        name: name
          ? `${name}.gaia`
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
