import { el, View } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
} from "@common-module/app-components";
import { ObjectUtils } from "@common-module/ts";
import { godDetailView } from "../../pages/godDetailView.js";
import NFTAttributeForm from "../components/nft-attribute-form/NFTAttributeForm.js";
import NFTDisplay from "../components/NFTDisplay.js";
import OpenSeaMetadata, {
  OpenSeaMetadataAttribute,
} from "../opensea/OpenSeaMetadata.js";
import GodMetadataUtils from "../utils/GodMetadataUtils.js";
import Layout from "./Layout.js";

type Data = {
  tokenId: string;
  attributes?: OpenSeaMetadataAttribute[];
};

export default class GodDetailView extends View<Data> {
  private nftDisplay: NFTDisplay | undefined;
  private nftAttributeForm: NFTAttributeForm | undefined;

  constructor() {
    super();
    Layout.content = this.container = el(".god-detail-view");
  }

  public async changeData(data: Data) {
    this.container.clear().append(godDetailView(data.tokenId));

    const loading = new AppCompConfig.LoadingSpinner().appendTo(this.container);

    let attributes: OpenSeaMetadataAttribute[] | undefined = data.attributes;

    if (!attributes) {
      const response = await fetch(
        `https://dhzxulywizygtdficytt.supabase.co/functions/v1/god-metadata/${data.tokenId}`,
      );
      const data2: OpenSeaMetadata | undefined = await response.json();
      attributes = data2?.attributes;
    }

    if (attributes) {
      this.container.append(
        el(
          ".form-container",
          el(
            "main",
            this.nftDisplay = new NFTDisplay(attributes),
            this.nftAttributeForm = new NFTAttributeForm(attributes),
          ),
          el(
            ".buttons",
            new Button({
              title: "Reset",
            }),
            new Button({
              type: ButtonType.Contained,
              title: "Save Changes",
            }),
          ),
        ),
      );

      this.nftAttributeForm.on("metadataChanged", (metadata) => {
        if (this.nftDisplay) {
          const attributes = GodMetadataUtils.convertMetadataToAttributes(
            metadata,
          );
          if (!ObjectUtils.isEqual(this.nftDisplay.attributes, attributes)) {
            this.nftDisplay.attributes = attributes;
          }
        }
      });
    } else {
      this.nftDisplay = undefined;
      this.nftAttributeForm = undefined;
    }

    loading.remove();
  }
}
