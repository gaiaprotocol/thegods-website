import { DomNode } from "@common-module/app";
import { Accordion, AccordionItem } from "@common-module/app-components";
import GodMetadata from "../../entities/GodMetadata.js";
import { OpenSeaMetadataAttribute } from "../../opensea/OpenSeaMetadata.js";
import GodMetadataUtils from "../../utils/GodMetadataUtils.js";
import PartList from "./PartList.js";
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

const PARTS: any = {
  Stone: {
    Man: stoneManParts,
    Woman: stoneWomanParts,
  },
  Fire: {
    Man: fireManParts,
    Woman: fireWomanParts,
  },
  Water: {
    Man: waterManParts,
    Woman: waterWomanParts,
  },
};

export default class NFTAttributeForm extends DomNode {
  private metadata: GodMetadata;

  private accordion: Accordion;
  private typeAccordionItem: AccordionItem;
  private typePartList: PartList;
  private genderAccordionItem: AccordionItem | undefined;

  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".nft-attribute-form");

    this.append(
      this.accordion = new Accordion(
        this.typeAccordionItem = new AccordionItem(
          { label: "Type", open: true },
          this.typePartList = new PartList([
            {
              name: "Stone",
              type: "Stone",
              gender: "Man",
              parts: {
                Background: PARTS.Stone.Man.find((part: any) =>
                  part.name === "Background"
                ).parts[0].name,
              },
            },
            {
              name: "Fire",
              type: "Fire",
              gender: "Man",
              parts: {
                Background: PARTS.Fire.Man.find((part: any) =>
                  part.name === "Background"
                ).parts[0].name,
              },
            },
            {
              name: "Water",
              type: "Water",
              gender: "Man",
              parts: {
                Background: PARTS.Water.Man.find((part: any) =>
                  part.name === "Background"
                ).parts[0].name,
              },
            },
          ]),
        ),
      ),
    );

    this.typePartList.on("select", (type) => {
      this.metadata.type = type;
      this.createGenderAccordionItem();
    });

    this.metadata = GodMetadataUtils.convertAttributesToMetadata(attributes);
    this.typePartList.select(this.metadata.type);
  }

  private createGenderAccordionItem() {
    const genderPartList = new PartList([
      {
        name: "Man",
        type: this.metadata.type,
        gender: "Man",
        parts: PARTS[this.metadata.type].Man.map((part: any) => ({
          [part.name]: part.parts[0].name,
        })).reduce((prev: any, curr: any) => ({ ...prev, ...curr }), {}),
      },
      {
        name: "Woman",
        type: this.metadata.type,
        gender: "Woman",
        parts: PARTS[this.metadata.type].Woman.map((part: any) => ({
          [part.name]: part.parts[0].name,
        })).reduce((prev: any, curr: any) => ({ ...prev, ...curr }), {}),
      },
    ]);

    this.accordion.clear(this.typeAccordionItem).append(
      this.genderAccordionItem = new AccordionItem(
        { label: "Gender", open: true },
        genderPartList,
      ),
    );

    genderPartList.on("select", (gender) => {
      this.metadata.gender = gender;
      this.createPartsAccordionItem();
    });

    genderPartList.select(this.metadata.gender);
  }

  private createPartsAccordionItem() {
    this.accordion.clear(this.typeAccordionItem, this.genderAccordionItem)
      .append();
  }
}
