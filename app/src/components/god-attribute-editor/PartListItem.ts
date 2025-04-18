import { DomNode, el } from "@commonmodule/app";
import { GameScreen, Sprite } from "@gaiaengine/dom";
import { CheckIcon } from "@gaiaprotocol/svg-icons";
import { GodMetadata, PartSelector } from "@gaiaprotocol/thegods";
import keyToSpritesheet from "./spritesheet/key-to-spritesheet.json" with {
  type: "json",
};
import spritesheet from "./spritesheet/spritesheet.json" with {
  type: "json",
};

export default class PartListItem<T> extends DomNode {
  private gameScreen: GameScreen;
  private checkIconContainer: DomNode;

  constructor(public value: T, metadata: GodMetadata) {
    super("a.part-list-item");

    this.append(
      el(".value", value as string),
      this.checkIconContainer = el(".check-icon-container"),
    );

    this.gameScreen = new GameScreen(128, 128).appendTo(this);

    const selectedParts = PartSelector.getSelectedParts(metadata);
    for (const part of Object.values(selectedParts)) {
      const images = part.images;
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
    if (!this.hasClass("selected")) {
      this.addClass("selected");
      this.checkIconContainer.append(new CheckIcon());
    }
  }

  public deselect() {
    this.removeClass("selected");
    this.checkIconContainer.clear();
  }
}
