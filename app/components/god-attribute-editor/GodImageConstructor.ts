import GodMetadata from "../../entities/GodMetadata.js";
import fireManParts from "../parts-jsons/fire-man-parts.json" with {
  type: "json",
};
import fireWomanParts from "../parts-jsons/fire-woman-parts.json" with {
  type: "json",
};
import stoneManParts from "../parts-jsons/stone-man-parts.json" with {
  type: "json",
};
import stoneWomanParts from "../parts-jsons/stone-woman-parts.json" with {
  type: "json",
};
import waterManParts from "../parts-jsons/water-man-parts.json" with {
  type: "json",
};
import waterWomanParts from "../parts-jsons/water-woman-parts.json" with {
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

class GodImageConstructor {
  public async constructImage(metadata: GodMetadata): Promise<Blob> {
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

    let images: any[] = [];
    for (const imagePart of imageParts) {
      images = images.concat(
        parts[imagePart.traitId].parts[imagePart.partId].images,
      );
    }
    images.sort((a, b) => a.order - b.order);

    const BASE_URL = "https://storage.googleapis.com/gaiaprotocol/god_parts";

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d")!;

    for (const image of images) {
      if (image !== undefined) {
        const imageUrl =
          `${BASE_URL}/${metadata.type.toLowerCase()}/${image.path}?alt=media`;
        const img = await new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.src = imageUrl;
        });
        ctx.drawImage(img, 0, 0, 1024, 1024);
      }
    }

    return await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!));
    });
  }
}

export default new GodImageConstructor();
