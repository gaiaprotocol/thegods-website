import { DomNode, el } from "@common-module/app";
import { OpenSeaMetadataAttribute } from "../opensea/OpenSeaMetadata.js";
import { Accordion, AccordionItem } from "@common-module/app-components";
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
import keyToSpritesheet from "./spritesheet/key-to-spritesheet.json" with {
  type: "json",
};
import spritesheet from "./spritesheet/spritesheet.json" with {
  type: "json",
};

export default class NFTAttributeForm extends DomNode {
  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".nft-attribute-form");
    this.append(
      new Accordion(
        new AccordionItem(
          { label: "Type" },
          el(".test", "test", {
            style: { backgroundColor: "red" },
          }),
          el(".test", "test", {
            style: { backgroundColor: "red" },
          }),
          el(".test", "test", {
            style: { backgroundColor: "red" },
          }),
        ),
        new AccordionItem({ label: "Gender" }),
      ),
    );
  }
}
