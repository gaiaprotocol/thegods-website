import { DomNode } from "@common-module/app";
import { OpenSeaMetadataAttribute } from "../opensea/OpenSeaMetadata.js";
import { Accordion, AccordionItem } from "@common-module/app-components";

export default class NFTAttributeForm extends DomNode {
  constructor(attributes: OpenSeaMetadataAttribute[]) {
    super(".nft-attribute-form");
    this.append(
      new Accordion(
        new AccordionItem({ label: "Type" }),
        new AccordionItem({ label: "Gender" }),
      ),
    );
  }
}
