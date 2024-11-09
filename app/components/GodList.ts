import { DomNode } from "@common-module/app";
import { OpenSeaNFTData } from "gaiaprotocol";
import GodListItem from "./GodListItem.js";

export default class GodList extends DomNode {
  constructor(data: { nfts: OpenSeaNFTData[] }) {
    super("ul.god-list");

    for (const nft of data.nfts) {
      this.append(new GodListItem(nft));
    }
  }
}
