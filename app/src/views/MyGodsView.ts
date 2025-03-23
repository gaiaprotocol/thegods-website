import { DomNode, el, QueriedDomNode, Router, View } from "@common-module/app";
import { html } from "@common-module/universal-page";
import { WalletLoginManager } from "@common-module/wallet-login";
import { GodMode, NFTList, OpenSeaNFTData } from "gaiaprotocol";
import { myGodsView } from "../../../pages/myGodsView.js";
import Layout from "./Layout.js";
let cachedData: { nfts: OpenSeaNFTData[]; balance: number } | undefined;

export default class MyGodsView extends View {
  private header: DomNode;

  constructor() {
    super();
    Layout.content = this.container = myGodsView();

    this.header = new QueriedDomNode(".my-gods-view header");

    if (WalletLoginManager.isLoggedIn()) {
      this.loadGods();
    } else {
      Router.goWithoutHistory("/");
    }

    this.container.subscribe(WalletLoginManager, "loginStatusChanged", () => {
      if (WalletLoginManager.isLoggedIn()) {
        this.loadGods();
      } else {
        Router.goWithoutHistory("/");
      }
    });
  }

  private async loadGods() {
    const skeleton = el(
      ".god-list.skeleton",
      el(".god-list-item.skeleton-item"),
      el(".god-list-item.skeleton-item"),
      el(".god-list-item.skeleton-item"),
      el(".god-list-item.skeleton-item"),
    ).appendTo(this.container);

    const data: { nfts: OpenSeaNFTData[]; balance: number } = cachedData
      ? cachedData
      : await GodMode.supabaseConnector.callEdgeFunction("get-user-gods", {});

    skeleton.remove();

    if (data.nfts.length === 0) {
      this.showEmpty();
    } else {
      this.header.append(
        el(
          "p",
          "You own ",
          el("b", String(data.balance)),
          ` NFT${
            data.balance !== 1 ? "s" : ""
          }. Click on an NFT to view detailed information and customize it.`,
        ),
        el(
          "a.button.contained",
          "Trade on OpenSea",
          html(
            '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
          ),
          {
            href: "https://opensea.io/collection/gaia-protocol-gods",
            target: "_blank",
          },
        ),
      );

      this.container.append(
        new NFTList({
          data,
          onClick: (nft) => Router.go(`/god/${nft.identifier}`, nft),
        }),
      );

      cachedData = data;
    }
  }

  private showEmpty() {
    this.header.append(
      el(
        ".empty",
        el(
          "p",
          "You don't have any NFTs. Would you like to purchase on OpenSea?",
        ),
        el(
          "a.button.contained",
          "Purchase on OpenSea",
          html(
            '<svg width="0.625rem" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9L9 1M9 1H2.5M9 1V7.22222" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
          ),
          {
            href: "https://opensea.io/collection/gaia-protocol-gods",
            target: "_blank",
          },
        ),
      ),
    );
  }
}
