import { DomNode, View } from "@common-module/app";
import { LetterboxedScreen } from "@gaiaengine/2d";
import AppConfig from "../AppConfig.js";
import TheGodMetadata from "../entities/TheGodMetadata.js";
import SpineNode from "./SpineNode.js";

export default class NFTViewer extends View {
  private tokenId = new URLSearchParams(location.search).get("tokenId") ?? "";
  private screen: LetterboxedScreen;

  constructor() {
    super();

    this.container = new DomNode(
      document.querySelector(".nft-viewer") as HTMLElement,
    ).append(this.screen = new LetterboxedScreen(1024, 1024));

    this.load();
  }

  private async load() {
    const data: TheGodMetadata | undefined = await AppConfig.supabaseConnector
      .safeFetchSingle(
        "the_gods_metadatas",
        (b) => b.select("*").eq("token_id", this.tokenId),
      );

    if (data) {
      const gender = data.gender.toLowerCase();
      const skins: string[] = [];
      for (const [partName, part] of Object.entries(data.parts)) {
        skins.push(`${partName}/${part}`);
      }

      const path = `/spine-files/god-${data.type.toLowerCase()}-${gender}`;

      new SpineNode(0, 0, {
        json: `${path}.json`,
        atlas: `${path}.atlas`,
        png: data.type === "Water"
          ? {
            [`water-${gender}.png`]: `${path}.png`,
            [`water-${gender}_2.png`]: `${path}-2.png`,
            [`water-${gender}_3.png`]: `${path}-3.png`,
          }
          : `${path}.png`,
        skins,
        animation: "animation",
      }).appendTo(this.screen.root);
    }
  }
}
