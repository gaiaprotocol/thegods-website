import { DomNode } from "@common-module/app";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { GameScreen, LetterboxedScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import { PartSelector } from "@gaiaprotocol/thegods";
import { OpenSeaMetadataAttribute } from "../opensea/OpenSeaMetadata.js";
import GodMetadataUtils from "../utils/GodMetadataUtils.js";

enum GodGender {
  MAN = "Man",
  WOMAN = "Woman",
}

enum GodType {
  STONE = "Stone",
  FIRE = "Fire",
  WATER = "Water",
}

export default class GodDisplay extends DomNode {
  private screen: GameScreen | LetterboxedScreen;
  private spineObject: Spine | undefined;

  private _attributes: OpenSeaMetadataAttribute[] = [];

  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".god-display");

    this.screen = new GameScreen({ width: 1024, height: 1024 }).appendTo(this);
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
    this.screen.root.clear();

    const metadata = GodMetadataUtils.convertAttributesToMetadata(
      this.attributes,
    );
    const selectedParts = PartSelector.getSelectedParts(metadata);

    const skins: string[] = [];

    for (const [traitName, part] of Object.entries(selectedParts)) {
      skins.push(`${traitName}/${part.name}`);
    }

    const typeLowerCase = metadata.type.toLowerCase();
    const genderLowerCase = metadata.gender.toLowerCase();

    const path = `/spine-files/god-${typeLowerCase}-${genderLowerCase}`;

    const loading = new MaterialLoadingSpinner().appendTo(this);

    this.spineObject = new Spine(0, 0, {
      json: `${path}.json`,
      atlas: `${path}.atlas`,
      texture: metadata.type === "Water"
        ? {
          [`water-${genderLowerCase}.png`]: `${path}.png`,
          [`water-${genderLowerCase}_2.png`]: `${path}-2.png`,
          [`water-${genderLowerCase}_3.png`]: `${path}-3.png`,
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
