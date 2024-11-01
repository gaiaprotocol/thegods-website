import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { SocialCompConfig } from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import { AddressUtils } from "@common-module/wallet";
import { GaiaProtocolConfig } from "gaiaprotocol";
import NFTIcon from "./icons/NFTIcon.js";
import GaiaNameRepository from "./repositories/GaiaNameRepository.js";

export interface IAppConfig {
  isDevMode: boolean;

  supabaseUrl: string;
  supabaseKey: string;
}

class AppConfig implements IAppConfig {
  public isDevMode!: boolean;

  public supabaseUrl!: string;
  public supabaseKey!: string;

  public supabaseConnector!: SupabaseConnector;

  public init(config: IAppConfig) {
    Object.assign(this, config);

    const authTokenManager = new AuthTokenManager("gaia-names-auth-token");

    this.supabaseConnector = new SupabaseConnector(
      config.supabaseUrl,
      config.supabaseKey,
      authTokenManager,
    );

    GaiaNameRepository.supabaseConnector = this.supabaseConnector;

    GaiaProtocolConfig.init(config.isDevMode, config.isDevMode);

    SocialCompConfig.fetchUser = async (walletAddress: string) => {
      const name = await GaiaNameRepository.fetchName(walletAddress);
      return {
        id: walletAddress,
        name: name ? name : AddressUtils.shortenAddress(walletAddress),
        isFallback: true,
      };
    };

    SocialCompConfig.getLoggedInUserMenu = async (menu, user) =>
      new DropdownMenuGroup(
        new DropdownMenuItem({
          icon: new NFTIcon(),
          label: "My NFTs",
          onClick: () => {
            location.href = "/my-nfts";
            menu.remove();
          },
        }),
      );
  }
}

export default new AppConfig();
