import { DomNode, QueriedDomNode, Router } from "@commonmodule/app";
import { LoggedInUserAvatarButton } from "@commonmodule/social-components";
import { WalletLoginManager } from "@commonmodule/wallet-login";

class Layout {
  private contentContainer = new QueriedDomNode(".layout main");

  public set content(content: DomNode) {
    this.contentContainer.clear();
    this.contentContainer.htmlElement.innerHTML = "";
    this.contentContainer.append(content);
  }

  public init() {
    new QueriedDomNode(".layout header .button-container").append(
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
