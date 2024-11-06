import { DomNode } from "@common-module/app";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { GameScreen, LetterboxedScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";

interface Attribute {
  trait_type: string;
  value: string;
}

interface OpenSeaMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  animation_url?: string;
  attributes: Attribute[];
}

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

    const loading = new MaterialLoadingSpinner().appendTo(this);

    const response = await fetch(
      `https://dhzxulywizygtdficytt.supabase.co/functions/v1/god-metadata/${this.tokenId}`,
    );
    const data: OpenSeaMetadata | undefined = await response.json();

    if (data) {
      const type = data.attributes.find((a) => a.trait_type === "Type")!.value;
      const gender = data.attributes.find((a) => a.trait_type === "Gender")!
        .value.toLowerCase();

      const skins: string[] = [];
      for (const attribute of data.attributes) {
        if (
          attribute.trait_type !== "Gender" && attribute.trait_type !== "Type"
        ) {
          skins.push(`${attribute.trait_type}/${attribute.value}`);
        }
      }

      const path = `/spine-files/god-${type.toLowerCase()}-${gender}`;

      const spineObject = new Spine(0, 0, {
        json: `${path}.json`,
        atlas: `${path}.atlas`,
        png: type === "Water"
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
