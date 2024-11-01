import { DomNode, View } from "@common-module/app";
import { LetterboxedScreen } from "@gaiaengine/2d";

export default class NFTViewer extends View {
  private tokenId = new URLSearchParams(location.search).get("tokenId") ?? "";

  constructor() {
    super();
    console.log(this.tokenId);
    this.container = new DomNode(
      document.querySelector(".nft-viewer") as HTMLElement,
    ).append(new LetterboxedScreen(1024, 1024));
  }
}
