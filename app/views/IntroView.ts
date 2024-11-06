import { el, QueriedDomNode, View } from "@common-module/app";
import { Button, ButtonType } from "@common-module/app-components";
import { IntegerUtils } from "@common-module/ts";
import { introView } from "../../pages/introView.js";
import AppConfig from "../AppConfig.js";
import NFTViewer from "../components/NFTViewer.js";
import OpenInNewIcon from "../icons/OpenInNewIcon.js";
import RefreshIcon from "../icons/RefreshIcon.js";
import Layout from "./Layout.js";

export default class IntroView extends View {
  constructor() {
    super();
    Layout.content = this.container = introView();

    let nftViewer: NFTViewer;
    new QueriedDomNode(".nft-preview").append(
      el(
        ".nft-viewer-container",
        nftViewer = new NFTViewer(IntegerUtils.random(0, 3332)),
      ),
      el(
        ".buttons",
        new Button({
          type: ButtonType.Contained,
          icon: new RefreshIcon(),
          iconPosition: "right",
          title: "View another NFT",
          onClick: () => {
            if (!nftViewer.loading) {
              new QueriedDomNode(".nft-preview .nft-viewer-container .data")
                .remove();
              nftViewer.tokenId = IntegerUtils.random(0, 3332);
            }
          },
        }),
        new Button({
          icon: new OpenInNewIcon(),
          iconPosition: "right",
          title: "View on OpenSea",
          onClick: () => {
            open(
              `https://opensea.io/assets/ethereum/0x134590acb661da2b318bcde6b39ef5cf8208e372/${nftViewer.tokenId}`,
            );
          },
        }),
      ),
    );

    nftViewer.on("loaded", (data) => {
      new QueriedDomNode(".nft-preview .nft-viewer-container .data").remove();
      new QueriedDomNode(".nft-preview .nft-viewer-container").append(
        el(
          ".data",
          el("h2", `#${nftViewer.tokenId}`),
          el(
            "p",
            data.attributes.filter((attr) =>
              attr.trait_type !== "Background" && attr.value !== "None"
            ).map((attr) => attr.value).join(", "),
          ),
        ),
      );
    });

    this.test();
  }

  private async test() {
    console.log(
      await AppConfig.supabaseConnector.callEdgeFunction(
        "set-god-metadata",
        {
          tokenId: 2987,
        },
      ),
    );
  }
}
