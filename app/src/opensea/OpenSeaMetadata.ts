export interface OpenSeaMetadataAttribute {
  trait_type: string;
  value: string;
}

export default interface OpenSeaMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  animation_url?: string;
  attributes: OpenSeaMetadataAttribute[];
}
