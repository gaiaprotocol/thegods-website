import { Router } from "@common-module/app";
import {
  AppCompConfig,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@common-module/app-components";
import { SocialCompConfig } from "@common-module/social-components";
import { AuthTokenManager, SupabaseConnector } from "@common-module/supabase";
import { AddressUtils } from "@common-module/wallet";
import { GaiaProtocolConfig } from "gaiaprotocol";
import AccordionCloseIcon from "./icons/AccordionCloseIcon.js";
import AccordionOpenIcon from "./icons/AccordionOpenIcon.js";
import NFTIcon from "./icons/NFTIcon.js";
import GaiaNameRepository from "./repositories/GaiaNameRepository.js";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import ErrorIcon from "./icons/ErrorIcon.js";

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

    AppCompConfig.LoadingSpinner = MaterialLoadingSpinner;
    AppCompConfig.ErrorAlertIcon = ErrorIcon;
    AppCompConfig.AccordionOpenIcon = AccordionOpenIcon;
    AppCompConfig.AccordionCloseIcon = AccordionCloseIcon;

    const authTokenManager = new AuthTokenManager("gaia-names-auth-token");

    this.supabaseConnector = new SupabaseConnector(
      config.supabaseUrl,
      config.supabaseKey,
      authTokenManager,
    );

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
        isFallback: true,
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
