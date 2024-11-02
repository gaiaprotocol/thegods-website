import { DomNode } from "@common-module/app";
import { GameScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import AppConfig from "../AppConfig.js";
import TheGodMetadata from "../entities/TheGodMetadata.js";

export default class NFTViewer extends DomNode {
  private screen: GameScreen;

  constructor(private tokenId: number) {
    super(".nft-viewer");

    this.screen = new GameScreen(1024, 1024).appendTo(this);
    this.loadMetadata();

    this.on("visible", () => {
      const rect = this.calculateRect();
      console.log(rect);
    });
  }

  private async loadMetadata() {
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

      const spineObject = new Spine(0, 0, {
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
        onAnimationEnd: () => spineObject.animation = "animation",
      }).appendTo(this.screen.root);

      this.screen.style({ cursor: "pointer" });
      this.screen.onDom("click", () => spineObject.animation = "touched");
    }
  }
}
