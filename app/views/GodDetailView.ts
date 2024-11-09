import { el, View } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  Confirm,
} from "@common-module/app-components";
import { ObjectUtils } from "@common-module/ts";
import { godDetailView } from "../../pages/godDetailView.js";
import AppConfig from "../AppConfig.js";
import GodAttributeEditor from "../components/god-attribute-editor/GodAttributeEditor.js";
import GodImageConstructor from "../components/god-attribute-editor/GodImageConstructor.js";
import GodDisplay from "../components/GodDisplay.js";
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
  private tokenId!: number;
  private originalAttributes: OpenSeaMetadataAttribute[] = [];

  private nftDisplay: GodDisplay | undefined;
  private nftAttributeForm: GodAttributeEditor | undefined;
  private resetButton: Button | undefined;
  private saveButton: Button | undefined;

  constructor() {
    super();
    Layout.content = this.container = el(".god-detail-view");
  }

  public async changeData(data: Data) {
    this.tokenId = parseInt(data.tokenId);
    this.container.clear().append(godDetailView(this.tokenId));

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
      this.originalAttributes = attributes;

      this.container.append(
        el(
          ".form-container",
          el(
            "main",
            this.nftDisplay = new GodDisplay(attributes),
            this.nftAttributeForm = new GodAttributeEditor(attributes),
          ),
          el(
            ".buttons",
            this.resetButton = new Button({
              title: "Reset",
              disabled: true,
              onClick: () => {
                new Confirm({
                  title: "Reset Attributes",
                  message: "Are you sure you want to reset the attributes?",
                  onConfirm: () => {
                    if (this.nftDisplay) {
                      this.nftDisplay.attributes = this.originalAttributes;
                    }
                    if (this.nftAttributeForm) {
                      this.nftAttributeForm.attributes =
                        this.originalAttributes;
                    }
                  },
                });
              },
            }),
            this.saveButton = new Button({
              type: ButtonType.Contained,
              title: "Save Changes",
              disabled: true,
              onClick: async () => {
                await new Confirm({
                  title: "Save Changes",
                  message: "Are you sure you want to save the changes?",
                  onConfirm: () => this.saveChanges(),
                }).waitForConfirmation();
              },
            }),
          ),
        ),
      );

      this.nftAttributeForm.on("metadataChanged", () => {
        if (this.nftDisplay && this.nftAttributeForm) {
          const attributes = GodMetadataUtils.convertMetadataToAttributes(
            this.nftAttributeForm.metadata,
          );

          if (!ObjectUtils.isEqual(this.originalAttributes, attributes)) {
            this.resetButton?.enable();
            this.saveButton?.enable();
          } else {
            this.resetButton?.disable();
            this.saveButton?.disable();
          }

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

  public async saveChanges() {
    if (this.nftAttributeForm) {
      const blob = await GodImageConstructor.constructImage(
        this.nftAttributeForm.metadata,
      );

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("tokenId", this.tokenId.toString());
      formData.append(
        "metadata",
        JSON.stringify(this.nftAttributeForm.metadata),
      );

      await AppConfig.supabaseConnector.callEdgeFunction(
        "set-god-metadata",
        formData,
      );

      this.originalAttributes = GodMetadataUtils.convertMetadataToAttributes(
        this.nftAttributeForm.metadata,
      );

      if (this.nftDisplay) {
        this.nftDisplay.attributes = this.originalAttributes;
      }
      this.nftAttributeForm.attributes = this.originalAttributes;
    }
  }
}
