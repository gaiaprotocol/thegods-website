import { DomNode } from "@commonmodule/app";
import { Accordion, AccordionItem } from "@commonmodule/app-components";
import { Debouncer } from "@commonmodule/ts";
import {
  ElementType,
  GenderType,
  GodMetadata,
  PartSelector,
} from "@gaiaprotocol/thegods";
import { OpenSeaMetadataAttribute } from "../../opensea/OpenSeaMetadata.js";
import GodMetadataUtils from "../../utils/GodMetadataUtils.js";
import PartList from "./PartList.js";

export default class GodAttributeEditor extends DomNode<HTMLDivElement, {
  metadataChanged: (metadata: GodMetadata) => void;
}> {
  private _attributes: OpenSeaMetadataAttribute[] = [];

  public metadata!: GodMetadata;

  private accordion!: Accordion;
  private typeAccordionItem!: AccordionItem;
  private typeSelector!: PartList<ElementType>;
  private genderAccordionItem?: AccordionItem;

  private readonly metadataChangeDebouncer = new Debouncer(100, () => {
    this.emit("metadataChanged", this.metadata);
  });

  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".god-attribute-editor");
    this.attributes = attributes;
  }

  public set attributes(attributes: OpenSeaMetadataAttribute[]) {
    this._attributes = attributes;
    this.metadata = GodMetadataUtils.convertAttributesToMetadata(attributes);

    this.typeSelector = this.createTypeSelector();
    this.typeAccordionItem = new AccordionItem(
      { label: "Element Type", open: true },
      this.typeSelector,
    );

    this.accordion = new Accordion(this.typeAccordionItem);
    this.clear().append(this.accordion);

    this.typeSelector.on("select", (selectedType) => {
      this.metadata.type = selectedType;
      this.metadataChangeDebouncer.execute();
      this.createGenderSelector();
    });

    this.typeSelector.select(this.metadata.type);
  }

  public get attributes() {
    return this._attributes;
  }

  private createTypeSelector(): PartList<ElementType> {
    const types: ElementType[] = ["Stone", "Fire", "Water"];
    const options = types.map((type) => ({
      value: type,
      type,
      gender: "Man" as GenderType,
      parts: PartSelector.getDefaultParts(type, "Man"),
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

  private createGenderPartList(): PartList<GenderType> {
    const genders: GenderType[] = ["Man", "Woman"];
    const options = genders.map((gender) => ({
      value: gender,
      type: this.metadata.type,
      gender,
      parts: PartSelector.getDefaultParts(this.metadata.type, gender),
    }));
    return new PartList(options);
  }

  private isUpdatingPartSelectors = false;

  private createPartSelectors() {
    if (this.isUpdatingPartSelectors) return;
    this.isUpdatingPartSelectors = true;

    this.accordion.clear(this.typeAccordionItem, this.genderAccordionItem);

    const traits = PartSelector.getTraits(
      this.metadata.type,
      this.metadata.gender,
    );

    traits.forEach((trait) => {
      const availableParts = PartSelector.getAvailablePartsForTrait(
        trait,
        this.metadata,
      );

      if (availableParts.length === 0) {
        delete this.metadata.parts[trait.name];
        return;
      }

      // Ensure the selected part is available; otherwise, select the default
      if (
        !this.metadata.parts[trait.name] ||
        !availableParts.some((p) => p.name === this.metadata.parts[trait.name])
      ) {
        this.metadata.parts[trait.name] = availableParts[0].name;
      }

      const partSelector = new PartList(
        availableParts.map((p) => ({
          value: p.name,
          type: this.metadata.type,
          gender: this.metadata.gender,
          parts: {
            ...this.metadata.parts,
            [trait.name]: p.name,
          },
        })),
      );

      const partAccordionItem = new AccordionItem({
        label: trait.name,
        open: true,
      }, partSelector);
      this.accordion.append(partAccordionItem);

      partSelector.on("select", (selectedPartName) => {
        this.metadata.parts[trait.name] = selectedPartName;
        this.metadataChangeDebouncer.execute();
        this.createPartSelectors();
      });

      partSelector.select(this.metadata.parts[trait.name]);
    });

    this.isUpdatingPartSelectors = false;
  }
}
