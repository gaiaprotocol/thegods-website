import { DomNode, el, Router } from "@common-module/app";
import { OpenSeaNFTData } from "gaiaprotocol";

export default class GodListItem extends DomNode {
  constructor(
    nft: OpenSeaNFTData & {
      attributes?: { trait_type: string; value: string }[];
    },
  ) {
    super("li.god-list-item");
    this.style({
      backgroundImage: `url(${nft.display_image_url})`,
    });
    this.append(el(
      "a",
      el("h3.name", nft.name),
      el(
        "p.description",
        nft.attributes?.filter((attr) =>
          attr.trait_type !== "Background" && attr.value !== "None"
        ).map((attr) => attr.value).join(", "),
      ),
      { onclick: () => Router.go(`/god/${nft.identifier}`, nft) },
    ));
  }
}
