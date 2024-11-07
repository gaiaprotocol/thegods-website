import { DomNode } from "@common-module/app";
import { OpenSeaNFTData } from "gaiaprotocol";
import NFTListItem from "./NFTListItem.js";

export default class NFTList extends DomNode {
  constructor(data: { nfts: OpenSeaNFTData[] }) {
    super("ul.nft-list");

    for (const nft of data.nfts) {
      this.append(new NFTListItem(nft));
    }
  }
}
