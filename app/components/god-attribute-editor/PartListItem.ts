import { DomNode, el } from "@common-module/app";
import { GameScreen, Sprite } from "@gaiaengine/dom";
import CheckIcon from "../../icons/CheckIcon.js";
import fireManParts from "../parts-jsons/fire-man-parts.json" with {
  type: "json"
};
import fireWomanParts from "../parts-jsons/fire-woman-parts.json" with {
  type: "json"
};
import stoneManParts from "../parts-jsons/stone-man-parts.json" with {
  type: "json"
};
import stoneWomanParts from "../parts-jsons/stone-woman-parts.json" with {
  type: "json"
};
import waterManParts from "../parts-jsons/water-man-parts.json" with {
  type: "json"
};
import waterWomanParts from "../parts-jsons/water-woman-parts.json" with {
  type: "json"
};
import keyToSpritesheet from "./spritesheet/key-to-spritesheet.json" with {
  type: "json"
};
import spritesheet from "./spritesheet/spritesheet.json" with {
  type: "json"
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

export default class PartListItem<T> extends DomNode {
  private gameScreen: GameScreen;
  private checkIconContainer: DomNode;

  constructor(public value: T, metadata: {
    type: string;
    gender: string;
    parts: Record<string, string>;
  }) {
    super("a.part-list-item");

    this.append(
      el(".value", value as string),
      this.checkIconContainer = el(".check-icon-container"),
    );

    let parts: any;
    if (metadata.type === GodType.STONE && metadata.gender === GodGender.MAN) {
      parts = stoneManParts;
    } else if (
      metadata.type === GodType.STONE && metadata.gender === GodGender.WOMAN
    ) {
      parts = stoneWomanParts;
    } else if (
      metadata.type === GodType.FIRE && metadata.gender === GodGender.MAN
    ) {
      parts = fireManParts;
    } else if (
      metadata.type === GodType.FIRE && metadata.gender === GodGender.WOMAN
    ) {
      parts = fireWomanParts;
    } else if (
      metadata.type === GodType.WATER && metadata.gender === GodGender.MAN
    ) {
      parts = waterManParts;
    } else if (
      metadata.type === GodType.WATER && metadata.gender === GodGender.WOMAN
    ) {
      parts = waterWomanParts;
    }

    const imageParts: any[] = [];

    for (const [traitId, trait] of parts.entries()) {
      if (
        trait.condition === undefined ||
        trait.condition.values.includes(
          (metadata.parts as any)[trait.condition.trait],
        )
      ) {
        for (const [partId, part] of trait.parts.entries()) {
          if (
            (part as any).condition === undefined ||
            part.condition.values.includes(
              (metadata.parts as any)[part.condition.trait],
            )
          ) {
            if ((metadata.parts as any)[trait.name] === part.name) {
              imageParts.push({ traitId, partId });
              break;
            }
          }
        }
      }
    }

    this.gameScreen = new GameScreen(128, 128).appendTo(this);

    for (const imagePart of imageParts) {
      const images = parts[imagePart.traitId].parts[imagePart.partId].images;
      if (images) {
        for (const image of images) {
          const data =
            (keyToSpritesheet as any)[metadata.type.toLocaleLowerCase()][
              image.path
            ];

          const sprite = new Sprite(
            0,
            0,
            "/images/spritesheet.png",
            spritesheet,
            data.frame,
          ).appendTo(this.gameScreen.root);

          sprite.zIndex = data.zIndex;
        }
      }
    }

    this.on("visible", () => this.updateGameScreenSize());
    this.onWindow("resize", () => this.updateGameScreenSize());
  }

  private updateGameScreenSize() {
    const rect = this.calculateRect();

    const widthRatio = rect.width / 128;
    const heightRatio = rect.width / 128;
    const ratio = Math.min(widthRatio, heightRatio);

    this.gameScreen.resize(128, 128, ratio);
  }

  public select() {
    this.addClass("selected");
    this.checkIconContainer.append(new CheckIcon());
  }

  public deselect() {
    this.removeClass("selected");
    this.checkIconContainer.clear();
  }
}
