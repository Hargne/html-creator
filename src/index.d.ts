export interface HTMLCreatorConfig {
  excludeHTMLtag?: boolean;
  htmlTagAttributes?: HTMLCreatorElement["attributes"];
  disablePrettier?: boolean;
}

export interface HTMLCreatorElement {
  type?: string;
  attributes?: { [key: string]: string };
  content?: string | HTMLCreatorElement[];
}
