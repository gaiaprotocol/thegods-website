import { GodMetadata, PartSelector } from "@gaiaprotocol/thegods";

class GodImageConstructor {
  public async constructImage(metadata: GodMetadata): Promise<Blob> {
    const selectedParts = PartSelector.getSelectedParts(metadata);

    let images: any[] = [];

    for (const selectedPart of selectedParts) {
      const imagesToAdd = selectedPart.part.images || [];
      images = images.concat(imagesToAdd);
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
