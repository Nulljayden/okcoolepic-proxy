let node;
let current = null;

export function add(str) {
  if (typeof str !== 'string') {
    throw new Error('The input argument must be a string');
  }

  str = str.replace(/{(.*?)}(.*?){}/g, (match, color, str) => {
    return `<span style="color:${color}">${str}</span>`;
  });

  str = str.replace(/\n/g, "<br/>");

  let item = document.createElement("span");
  item.innerHTML = `${str} `;
  if (current) {
    current.appendChild(item);
  } else {
    throw new Error('No node has been initialized');
  }
}

export function pause() {
  if (!current || current.childNodes.length > 0) { return; }
  current = document.createElement("p");
  if (node) {
    node.appendChild(current);
  } else {
    throw new Error('No node has been initialized');
  }

  while (node.childNodes.length > 50) {
    node.removeChild(node.firstChild);
  }
}

export function init(n) {
  if (n.constructor.name !== 'HTMLDivElement') {
    throw new Error('The input argument must be an HTMLDivElement');
  }

  node = n;
  node.classList.remove("hidden");

  pause();

  setInterval(() => {
    node.scrollTop += 3;
  }, 20);
}
