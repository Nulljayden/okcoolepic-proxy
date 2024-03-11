const create = (tag, props, children) => {
  const element = document.createElementNS(SVG_NAMESPACE, tag);
  if (props) {
    for (const key in props) {
      element.setAttribute(key, props[key]);
    }
  }
  if (children) {
    children.forEach(child => {
      element.appendChild(child);
    });
  }
  return element;
};

const icon = (name) => {
  const useElement = create("use");
  useElement.setAttributeNS(XLINK_NAMESPACE, "href", `#icon-${name}`);
  return create("svg", { class: "icon" }, [useElement]);
};

const clear = (parent) => {
  for (let i = parent.childNodes.length - 1; i >= 0; i--) {
    parent.childNodes[i].remove();
  }
};

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
const SVG_ELEMENTS = ["svg", "g", "circle", "line", "path", "use", "rect"];

// usage
const circle = create("circle", { r: 10, cx: 50, cy: 50 });
const svg = create("svg", { width: 100, height: 100 }, [circle]);
document.body.appendChild(svg);

const iconEl = icon("github");
document.body.appendChild(iconEl);

clear(document.body);
