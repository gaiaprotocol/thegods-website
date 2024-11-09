import { DomNode } from "@common-module/app";
import { Accordion, AccordionItem } from "@common-module/app-components";
import { Debouncer } from "@common-module/ts";
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

export default class NFTAttributeForm extends DomNode<HTMLDivElement, {
  metadataChanged: (metadata: GodMetadata) => void;
}> {
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
      this.metadataChangedEventDebouncer.execute();
      this.createGenderAccordionItem();
    });

    this.metadata = GodMetadataUtils.convertAttributesToMetadata(attributes);
    this.typePartList.select(this.metadata.type);
  }

  private metadataChangedEventDebouncer = new Debouncer(100, () => {
    this.emit("metadataChanged", this.metadata);
  });

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
      this.metadataChangedEventDebouncer.execute();
      this.createPartsAccordionItem();
    });

    genderPartList.select(this.metadata.gender);
  }

  private createPartsAccordionItem() {
    this.accordion.clear(this.typeAccordionItem, this.genderAccordionItem);

    for (const part of PARTS[this.metadata.type][this.metadata.gender]) {
      if (this.metadata.parts[part.name] === undefined) {
        this.metadata.parts[part.name] = part.parts[0].name;
      } else if (
        !part.parts.find((p: any) => p.name === this.metadata.parts[part.name])
      ) {
        this.metadata.parts[part.name] = part.parts[0].name;
      }
    }

    for (const part of PARTS[this.metadata.type][this.metadata.gender]) {
      const partList = new PartList(part.parts.map((p: any) => ({
        name: p.name,
        type: this.metadata.type,
        gender: this.metadata.gender,
        parts: {
          ...this.metadata.parts,
          [part.name]: p.name,
        },
      })));

      this.accordion.append(
        new AccordionItem(
          { label: part.name, open: true },
          partList,
        ),
      );

      partList.on("select", (partName) => {
        this.metadata.parts[part.name] = partName;
        this.metadataChangedEventDebouncer.execute();
      });

      partList.select(this.metadata.parts[part.name]);
    }
  }
}
