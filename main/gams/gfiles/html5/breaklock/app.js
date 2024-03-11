// Function to create a new HTML element with the given tag, props, and children
// This function creates a new element using the provided tag and sets any attributes
// (props) and appends any child elements (children)
const create = (tag, props, children) => {
  // Create a new element using the provided tag and namespace (SVG_NAMESPACE)
  const element = document.createElementNS(SVG_NAMESPACE, tag);
  
  // If props are provided, iterate over each key-value pair and set the attribute
  // on the element using the key as the attribute name and the value as the attribute value
  if (props) {
    for (const key in props) {
      element.setAttribute(key, props[key]);
    }
  }
  
  // If children are provided, iterate over each child and append it to the element
  if (children) {
    children.forEach(child => {
      element.appendChild(child);
    });
  }
  
  // Return the newly created element
  return element;
};

// Function to create an SVG icon with the given name
// This function creates a "use" element with the given name and an SVG element with a class of "icon"
const icon = (name) => {
  const useElement = create("use");
  
  // Set the href attribute of the useElement to the given name prefixed with "#icon-"
  useElement.setAttributeNS(XLINK_NAMESPACE, "href", `#icon-${name}`);
  
  // Create a new SVG element with a class of "icon" and append the useElement to it
  return create("svg", { class: "icon" }, [useElement]);
};

// Function to remove all child nodes from the given parent node
const clear = (parent) => {
  // Iterate backwards over the childNodes of the parent node
  for (let i = parent.childNodes.length - 1; i >= 0; i--) {
    // Remove the current child node
    parent.childNodes[i].remove();
  }
};

// Constants for the SVG namespace, XLink
