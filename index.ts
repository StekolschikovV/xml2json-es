export default function xml2jsonES(element: Element | string | Object, json?: boolean): string {
  let treeObject: any = {};

  // If string convert to document Node
  if (typeof element === "string") {
    if (window.DOMParser) {
      const parser = new DOMParser();
      const docNode = parser.parseFromString(element, "text/xml");
      // @ts-ignore
      element = docNode.firstChild!;
    } else { // Microsoft strikes again
      // @ts-ignore
      const docNode = new ActiveXObject("Microsoft.XMLDOM");
      docNode.async = false;
      docNode.loadXML(element);
      element = docNode.firstChild!;
    }
  }

  // Recursively loop through DOM elements and assign properties to object
  function treeHTML(element: Element, object: any) {
    object["type"] = element.nodeName;
    const nodeList = element.childNodes;
    if (nodeList != null) {
      if (nodeList.length) {
        object["content"] = [];
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].nodeType == 3) {
            object["content"].push(nodeList[i].nodeValue!.replace("<![CDATA[", "").replace("]]>", ""));
          } else {
            object["content"].push({});
            treeHTML(nodeList[i] as Element, object["content"][object["content"].length - 1]);
          }
        }
      }
    }
    if (element.attributes != null) {
      if (element.attributes.length) {
        object["attributes"] = {};
        for (let i = 0; i < element.attributes.length; i++) {
          object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue!;
        }
      }
    }
  }
  treeHTML(element as Element, treeObject);
  return json ? JSON.stringify(treeObject) : treeObject;
}
