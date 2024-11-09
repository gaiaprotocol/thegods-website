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

const PARTS_DATA: Record<string, Record<string, any>> = {
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

export default class NFTAttributeEditor extends DomNode<HTMLDivElement, {
  metadataChanged: (metadata: GodMetadata) => void;
}> {
  private metadata: GodMetadata;
  private accordion: Accordion;
  private typeAccordionItem: AccordionItem;
  private typeSelector: PartList;
  private genderAccordionItem?: AccordionItem;
  private metadataChangeDebouncer: Debouncer;

  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".nft-attribute-editor");

    this.metadata = GodMetadataUtils.convertAttributesToMetadata(attributes);

    this.metadataChangeDebouncer = new Debouncer(100, () => {
      this.emit("metadataChanged", this.metadata);
    });

    this.typeSelector = this.createTypeSelector();
    this.typeAccordionItem = new AccordionItem(
      { label: "Type", open: true },
      this.typeSelector,
    );

    this.accordion = new Accordion(this.typeAccordionItem);
    this.append(this.accordion);

    this.typeSelector.on("select", (selectedType) => {
      this.metadata.type = selectedType;
      this.metadataChangeDebouncer.execute();
      this.createGenderSelector();
    });

    this.typeSelector.select(this.metadata.type);
  }

  private createTypeSelector(): PartList {
    const types = Object.keys(PARTS_DATA);
    const options = types.map((type) => ({
      name: type,
      type,
      gender: "Man",
      parts: {
        Background:
          PARTS_DATA[type].Man.find((part: any) => part.name === "Background")
            ?.parts[0]?.name || "",
      },
    }));
    return new PartList(options);
  }

  private createGenderSelector() {
    this.accordion.clear(this.typeAccordionItem);

    const genderSelector = this.createGenderPartList();
    this.genderAccordionItem = new AccordionItem({
      label: "Gender",
      open: true,
    }, genderSelector);
    this.accordion.append(this.genderAccordionItem);

    genderSelector.on("select", (selectedGender) => {
      this.metadata.gender = selectedGender;
      this.metadataChangeDebouncer.execute();
      this.createPartSelectors();
    });

    genderSelector.select(this.metadata.gender);
  }

  private createGenderPartList(): PartList {
    const genders = ["Man", "Woman"];
    const options = genders.map((gender) => {
      const partsData = PARTS_DATA[this.metadata.type][gender];
      const defaultParts = partsData.reduce((acc: any, part: any) => {
        acc[part.name] = part.parts[0].name;
        return acc;
      }, {});
      return {
        name: gender,
        type: this.metadata.type,
        gender,
        parts: defaultParts,
      };
    });
    return new PartList(options);
  }

  private createPartSelectors() {
    this.accordion.clear(this.typeAccordionItem, this.genderAccordionItem);

    const partsData = PARTS_DATA[this.metadata.type][this.metadata.gender];

    this.metadata.parts = this.metadata.parts || {};
    partsData.forEach((part: any) => {
      if (
        !this.metadata.parts[part.name] ||
        !part.parts.some((p: any) => p.name === this.metadata.parts[part.name])
      ) {
        this.metadata.parts[part.name] = part.parts[0].name;
      }
    });

    partsData.forEach((part: any) => {
      const partSelector = new PartList(part.parts.map((p: any) => ({
        name: p.name,
        type: this.metadata.type,
        gender: this.metadata.gender,
        parts: {
          ...this.metadata.parts,
          [part.name]: p.name,
        },
      })));

      const partAccordionItem = new AccordionItem({
        label: part.name,
        open: true,
      }, partSelector);
      this.accordion.append(partAccordionItem);

      partSelector.on("select", (selectedPartName) => {
        this.metadata.parts[part.name] = selectedPartName;
        this.metadataChangeDebouncer.execute();
      });

      partSelector.select(this.metadata.parts[part.name]);
    });
  }
}
