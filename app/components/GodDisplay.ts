import { DomNode } from "@common-module/app";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { GameScreen, LetterboxedScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import { OpenSeaMetadataAttribute } from "../opensea/OpenSeaMetadata.js";
import fireManParts from "./parts-jsons/fire-man-parts.json" with {
  type: "json",
};
import fireWomanParts from "./parts-jsons/fire-woman-parts.json" with {
  type: "json",
};
import stoneManParts from "./parts-jsons/stone-man-parts.json" with {
  type: "json",
};
import stoneWomanParts from "./parts-jsons/stone-woman-parts.json" with {
  type: "json",
};
import waterManParts from "./parts-jsons/water-man-parts.json" with {
  type: "json",
};
import waterWomanParts from "./parts-jsons/water-woman-parts.json" with {
  type: "json",
};

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
    this.screen.root.clear();

    const type = this.attributes.find((a) => a.trait_type === "Type")!.value;
    const gender =
      this.attributes.find((a) => a.trait_type === "Gender")!.value;
    const genderLowerCase = gender.toLowerCase();

    let parts: any;
    if (type === GodType.STONE && gender === GodGender.MAN) {
      parts = stoneManParts;
    } else if (type === GodType.STONE && gender === GodGender.WOMAN) {
      parts = stoneWomanParts;
    } else if (type === GodType.FIRE && gender === GodGender.MAN) {
      parts = fireManParts;
    } else if (type === GodType.FIRE && gender === GodGender.WOMAN) {
      parts = fireWomanParts;
    } else if (type === GodType.WATER && gender === GodGender.MAN) {
      parts = waterManParts;
    } else if (type === GodType.WATER && gender === GodGender.WOMAN) {
      parts = waterWomanParts;
    }

    const metadataParts: Record<string, string> = {};
    for (const attribute of this.attributes) {
      if (
        attribute.trait_type !== "Gender" && attribute.trait_type !== "Type"
      ) {
        metadataParts[attribute.trait_type] = attribute.value;
      }
    }

    const skins: string[] = [];

    for (const trait of parts) {
      if (
        !trait.condition ||
        trait.condition.values.includes(metadataParts[trait.condition.trait])
      ) {
        for (const part of trait.parts) {
          if (
            !part.condition ||
            part.condition.values.includes(
              metadataParts[part.condition.trait],
            )
          ) {
            if (metadataParts[trait.name] === part.name) {
              skins.push(`${trait.name}/${part.name}`);
              break;
            }
          }
        }
      }
    }

    const path = `/spine-files/god-${type.toLowerCase()}-${genderLowerCase}`;

    const loading = new MaterialLoadingSpinner().appendTo(this);

    this.spineObject = new Spine(0, 0, {
      json: `${path}.json`,
      atlas: `${path}.atlas`,
      png: type === "Water"
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
