import { DomNode, QueriedDomNode, Router } from "@common-module/app";
import { LoggedInUserAvatarButton } from "@common-module/social-components";
import { WalletLoginManager } from "@common-module/wallet-login";

class Layout {
  private contentContainer = new QueriedDomNode(".layout main");

  public set content(content: DomNode) {
    this.contentContainer.clear();
    this.contentContainer.htmlElement.innerHTML = "";
    this.contentContainer.append(content);
  }

  public init() {
    new QueriedDomNode(".layout header .buttons").append(
      new LoggedInUserAvatarButton(WalletLoginManager, true),
    );

    new QueriedDomNode(".layout header a.gaia-protocol-logo").onDom(
      "click",
      (event) => {
        event.preventDefault();
        Router.go("/");
      },
    );
  }
}

export default new Layout();
