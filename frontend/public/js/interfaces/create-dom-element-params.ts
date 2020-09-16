interface AttributeList {
  [key: string]: string | boolean | number;
}

interface CreateDOMElementParams {
  type: string;
  classList: Array<string>;
  attributeList: AttributeList;
  textContent: string;
}

export default CreateDOMElementParams;
