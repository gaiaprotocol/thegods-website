import { ElementType, GenderType, GodMetadata } from "@gaiaprotocol/thegods";
import { OpenSeaMetadataAttribute } from "../opensea/OpenSeaMetadata.js";

class GodMetadataUtils {
  public convertMetadataToAttributes(
    metadata: GodMetadata,
  ): OpenSeaMetadataAttribute[] {
    return [
      {
        trait_type: "Type",
        value: metadata.type,
      },
      {
        trait_type: "Gender",
        value: metadata.gender,
      },
      ...Object.entries(metadata.parts).map(([key, value]) => ({
        trait_type: key,
        value,
      })),
    ];
  }

  public convertAttributesToMetadata(
    attributes: OpenSeaMetadataAttribute[],
  ): GodMetadata {
    const metadata: GodMetadata = {
      type: attributes.find((a) => a.trait_type === "Type")!
        .value as ElementType,
      gender: attributes.find((a) => a.trait_type === "Gender")!
        .value as GenderType,
      parts: Object.fromEntries(
        attributes
          .filter((a) => a.trait_type !== "Type" && a.trait_type !== "Gender")
          .map((a) => [a.trait_type, a.value]),
      ),
    };
    return metadata;
  }
}

export default new GodMetadataUtils();
