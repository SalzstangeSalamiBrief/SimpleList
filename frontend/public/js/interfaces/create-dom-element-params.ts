interface AttributeList {
  [key: string]: string | boolean;
}

export default interface CreateDOMElementParams {
  type: string;
  classList: Array<string>;
  attributeList: AttributeList;
  textContent: string;
}
