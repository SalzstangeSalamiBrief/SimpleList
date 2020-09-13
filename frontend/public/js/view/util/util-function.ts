import CreateDOMElementParams from '../../interfaces/create-dom-element-params';

/**
 * Create and return an HTMLElement
 *
 * @param param  CreateDOMElementParams
 */
export function createHTMLElement({
  type = '',
  classList = [],
  attributeList = {},
  textContent = '',
}: CreateDOMElementParams): HTMLElement | void {
  // check if a type is specified
  if (type === '') return;
  const elementToCreate = document.createElement(type);
  // add classes
  if (Array.isArray(classList)) {
    elementToCreate.classList.add(...classList);
  }
  // add attributes
  if (typeof attributeList === 'object') {
    const keys: Array<string> = Object.keys(attributeList);
    let i = 0;
    while (i < keys.length) {
      elementToCreate.setAttribute(keys[i], attributeList[keys[i]]);
      i += 1;
    }
  }
  // add textContent
  if (textContent !== '') {
    elementToCreate.textContent = textContent;
  }

  return elementToCreate;
}

/**
 * clear the innerHTML of the passed HTMLElement by removing each child of the element
 * @param htmlElement HTMLElement
 */
export function clearInnerHTML(htmlElement: HTMLElement) {
  while (htmlElement.firstChild) {
    htmlElement.removeChild(htmlElement.firstChild);
  }
}
