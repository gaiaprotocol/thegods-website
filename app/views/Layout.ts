import { DomNode } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";

class Layout {
  private contentContainer = new DomNode(
    document.querySelector(".layout main") as HTMLElement,
  );

  public set content(content: DomNode) {
    this.contentContainer.empty().append(content);
  }

  constructor() {
    new DomNode(
      document.querySelector(".layout header .buttons") as HTMLElement,
    ).append(
      new LoggedInUserAvatarButton(WalletLoginManager, true),
    );
  }
}

export default new Layout();
