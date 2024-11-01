import { DomNode, View } from "@common-module/app";
import { LetterboxedScreen } from "@gaiaengine/2d";
import AppConfig from "../AppConfig.js";

export default class NFTViewer extends View {
  private tokenId = new URLSearchParams(location.search).get("tokenId") ?? "";

  constructor() {
    super();
    console.log(this.tokenId);
    this.container = new DomNode(
      document.querySelector(".nft-viewer") as HTMLElement,
    ).append(new LetterboxedScreen(1024, 1024));

    this.load();
  }

  private async load() {
    const data = await AppConfig.supabaseConnector.safeFetchSingle(
      "the_gods_metadatas",
      (b) => b.select("*").eq("token_id", this.tokenId),
    );
    console.log(data);
  }
}
