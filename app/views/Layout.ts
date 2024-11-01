import { DomNode, Router } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";

class Layout {
  private contentContainer = new DomNode(
    document.querySelector(".layout main") as HTMLElement,
  );

  public set content(content: DomNode) {
    this.contentContainer.empty();
    this.contentContainer.htmlElement.innerHTML = "";
    this.contentContainer.append(content);
  }

  public init() {
    new DomNode(
      document.querySelector(".layout header .buttons") as HTMLElement,
    ).append(
      new LoggedInUserAvatarButton(WalletLoginManager, true),
    );

    new DomNode<HTMLAnchorElement>(
      document.querySelector(
        ".layout header a.gaia-protocol-logo",
      ) as HTMLAnchorElement,
    ).onDom("click", (event) => {
      event.preventDefault();
      Router.go("/");
    });
  }
}

export default new Layout();
