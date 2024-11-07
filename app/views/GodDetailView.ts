import { el, View } from "@common-module/app";
import Layout from "./Layout.js";
import { OpenSeaNFTData } from "gaiaprotocol";

type Data =
  | (OpenSeaNFTData & {
    tokenId: string;
    attributes?: { trait_type: string; value: string }[];
  })
  | { tokenId: string };

export default class GodDetailView extends View<Data> {
  constructor() {
    super();
    Layout.content = this.container = el(".god-detail-view");
  }

  public changeData(data: Data): void {
    console.log(data);
  }
}
