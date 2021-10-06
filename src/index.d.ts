export interface HTMLCreatorConfig {
  excludeHTMLtag?: boolean;
  htmlTagAttributes?: HTMLCreatorElement["attributes"];
}

export interface HTMLCreatorElement {
  type?: string;
  attributes?: { [key: string]: string };
  content?: string | HTMLCreatorElement[];
}
