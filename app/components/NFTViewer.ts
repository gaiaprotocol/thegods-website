import { DomNode } from "@common-module/app";
import { AppCompConfig } from "@common-module/app-components";
import { GameScreen, LetterboxedScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import AppConfig from "../AppConfig.js";
import TheGodMetadata from "../entities/TheGodMetadata.js";

export default class NFTViewer extends DomNode {
  private screen: GameScreen | LetterboxedScreen;
  private _tokenId!: number;

  constructor(tokenId: number, fullscreen = false) {
    super(".nft-viewer");

    if (fullscreen) {
      this.screen = new LetterboxedScreen(1024, 1024);
      this.style({
        position: "fixed",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
      });
    } else {
      this.screen = new GameScreen(1024, 1024).appendTo(this);
      this.on("visible", () => this.updateLayout());
      this.onWindow("resize", () => this.updateLayout());
    }

    this.tokenId = tokenId;
  }

  private updateLayout() {
    const rect = this.calculateRect();

    const widthRatio = rect.width / 1024;
    const heightRatio = rect.width / 1024;
    const ratio = Math.min(widthRatio, heightRatio);

    this.screen.resize(1024, 1024, ratio);

    this.style({
      height: `${rect.width}px`,
    });
  }

  public set tokenId(tokenId: number) {
    this._tokenId = tokenId;
    this.loadMetadata();
  }

  public get tokenId() {
    return this._tokenId;
  }

  private async loadMetadata() {
    this.screen.root.empty();

    const loading = new AppCompConfig.LoadingSpinner().appendTo(this);

    const data: TheGodMetadata | undefined = await AppConfig.supabaseConnector
      .safeFetchSingle(
        "the_god_metadatas",
        (b) => b.select("*").eq("token_id", this._tokenId),
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

    loading.remove();
  }
}
