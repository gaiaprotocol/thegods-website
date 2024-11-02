import { GameObject, TextureLoader } from "@gaiaengine/2d";
import {
  AtlasAttachmentLoader,
  SkeletonJson,
  Skin as SpineSkin,
  Spine as PixiSpine,
  SpineTexture,
  TextureAtlas,
} from "@pixi/spine-pixi";
import { Texture } from "pixi.js";

export default class SpineNode extends GameObject {
  private pixiSpine: PixiSpine | undefined;
  private _animation: string | undefined;
  private _skins: string[] | undefined;

  constructor(
    x: number,
    y: number,
    private options: {
      json: string;
      atlas: string;
      png: string | { [key: string]: string };
      skins?: string[];
      animation?: string;
      loop?: boolean;
    },
  ) {
    super(x, y);
    this.load();
    if (options.animation !== undefined) {
      this.animation = options.animation;
    }
  }

  private async load() {
    const rawSkeletonData = await (await fetch(this.options.json)).text();
    const rawAtlasData = await (await fetch(this.options.atlas)).text();

    let spineAtlas;

    if (typeof this.options.png === "string") {
      const texture = await TextureLoader.load(this.options.png);
      spineAtlas = new TextureAtlas(
        rawAtlasData,
        //(path, callback) => callback(texture.baseTexture as any),
      );
      spineAtlas.pages.forEach((page) => {
        page.setTexture(SpineTexture.from(texture!.source));
      });
    } else {
      const textures: { [key: string]: Texture } = {};
      for (const [key, path] of Object.entries(this.options.png)) {
        textures[key] = (await TextureLoader.load(path))!;
      }
      spineAtlas = new TextureAtlas(
        rawAtlasData,
        //(path, callback) => callback(textures[path].baseTexture as any),
      );
      spineAtlas.pages.forEach((page) => {
        page.setTexture(SpineTexture.from(textures[page.name].source));
      });
    }

    const spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas);
    const spineJsonParser = new SkeletonJson(spineAtlasLoader);

    this.pixiSpine = new PixiSpine(
      spineJsonParser.readSkeletonData(rawSkeletonData) as any,
    );
    if (this.animation !== undefined) {
      this.pixiSpine.state.setAnimation(
        0,
        this.animation,
        this.options.loop !== false,
      );
    }
    if (this.options.skins !== undefined) {
      this.changeSkins(this.options.skins);
    }

    this.container.addChild(this.pixiSpine);
  }

  public set animation(animation: string | undefined) {
    if (animation !== undefined && this.pixiSpine !== undefined) {
      this.pixiSpine.state.setAnimation(
        0,
        animation,
        this.options.loop !== false,
      );
      this.pixiSpine.state.apply(this.pixiSpine.skeleton);
    }
    this._animation = animation;
  }

  public get animation(): string | undefined {
    return this._animation;
  }

  private changeSkins(skins: string[]) {
    if (this.pixiSpine !== undefined) {
      const newSkin = new SpineSkin("combined-skin");
      for (const skinName of skins) {
        const skin = this.pixiSpine.skeleton.data.findSkin(skinName);
        if (skin !== null) {
          newSkin.addSkin(skin as any);
        }
      }
      this.pixiSpine.skeleton.skin = newSkin;
      this.pixiSpine.skeleton.setSlotsToSetupPose();
    }
  }

  public set skins(skins: string[] | undefined) {
    if (skins !== undefined) {
      this.changeSkins(skins);
    }
    this._skins = skins;
  }

  public get skins(): string[] | undefined {
    return this._skins;
  }
}
