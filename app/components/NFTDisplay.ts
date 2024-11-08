import { DomNode } from "@common-module/app";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { GameScreen, LetterboxedScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import { OpenSeaMetadataAttribute } from "../opensea/OpenSeaMetadata.js";

export default class NFTDisplay extends DomNode {
  private screen: GameScreen | LetterboxedScreen;
  private spineObject: Spine | undefined;

  private _attributes: OpenSeaMetadataAttribute[] = [];

  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".nft-display");

    this.screen = new GameScreen(1024, 1024).appendTo(this);
    this.on("visible", () => this.updateLayout());
    this.onWindow("resize", () => this.updateLayout());

    this.attributes = attributes;
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

  public set attributes(attributes: OpenSeaMetadataAttribute[]) {
    this._attributes = attributes;
    this.render();
  }

  public get attributes() {
    return this._attributes;
  }

  public render() {
    this.screen.root.empty();

    const type = this.attributes.find((a) => a.trait_type === "Type")!.value;
    const gender = this.attributes.find((a) => a.trait_type === "Gender")!
      .value.toLowerCase();

    const skins: string[] = [];
    for (const attribute of this.attributes) {
      if (
        attribute.trait_type !== "Gender" && attribute.trait_type !== "Type"
      ) {
        skins.push(`${attribute.trait_type}/${attribute.value}`);
      }
    }

    const path = `/spine-files/god-${type.toLowerCase()}-${gender}`;

    const loading = new MaterialLoadingSpinner().appendTo(this);

    this.spineObject = new Spine(0, 0, {
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
      onLoad: () => {
        loading.remove();
      },
      onAnimationEnd: () => {
        if (this.spineObject) {
          this.spineObject.animation = "animation";
        }
      },
    }).appendTo(this.screen.root);

    this.screen.style({ cursor: "pointer" });
    this.screen.onDom("click", () => this.touch());
  }

  public touch() {
    if (this.spineObject) {
      this.spineObject.animation = "touched";
    }
  }
}
