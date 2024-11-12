import { DomNode } from "@common-module/app";
import { MaterialLoadingSpinner } from "@common-module/material-loading-spinner";
import { GameScreen, LetterboxedScreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import { PartSelector } from "@gaiaprotocol/thegods";
import OpenSeaMetadata from "../opensea/OpenSeaMetadata.js";
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

export default class GodViewer extends DomNode<HTMLDivElement, {
  loaded: (data: OpenSeaMetadata) => void;
}> {
  private screen: GameScreen | LetterboxedScreen;
  private _tokenId!: number;
  private spineObject: Spine | undefined;

  public loading = false;

  constructor(tokenId: number, fullscreen = false) {
    super(".god-viewer");

    if (fullscreen) {
      this.screen = new LetterboxedScreen(1024, 1024);
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
    this.screen.root.clear();

    const loading = new MaterialLoadingSpinner().appendTo(this);
    this.loading = true;

    const response = await fetch(
      `https://dhzxulywizygtdficytt.supabase.co/functions/v1/god-metadata/${this.tokenId}`,
    );

    const data: OpenSeaMetadata | undefined = await response.json();

    if (data) {
      const metadata = GodMetadataUtils.convertAttributesToMetadata(
        data.attributes,
      );
      const selectedParts = PartSelector.getSelectedParts(metadata);

      const skins: string[] = [];

      for (const [traitName, part] of Object.entries(selectedParts)) {
        skins.push(`${traitName}/${part.name}`);
      }

      const typeLowerCase = metadata.type.toLowerCase();
      const genderLowerCase = metadata.gender.toLowerCase();

      const path = `/spine-files/god-${typeLowerCase}-${genderLowerCase}`;

      this.spineObject = new Spine(0, 0, {
        json: `${path}.json`,
        atlas: `${path}.atlas`,
        png: metadata.type === "Water"
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
          this.loading = false;
          this.emit("loaded", data);
        },
        onAnimationEnd: () => {
          if (this.spineObject) {
            this.spineObject.animation = "animation";
          }
        },
      }).appendTo(this.screen.root);

      this.screen.style({ cursor: "pointer" });
      this.screen.onDom("click", () => this.touch());
    } else {
      loading.remove();
      this.loading = false;
    }
  }

  public touch() {
    if (this.spineObject) {
      this.spineObject.animation = "touched";
    }
  }
}
