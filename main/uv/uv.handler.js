if (!self.__uv) {
  __uvHook(self, self.__uv$config, self.__uv$config.bare);
}

async function __uvHook(window, config = {}, bare = '/bare/') {
  if ('__uv' in window && window.__uv instanceof Ultraviolet) return false;

  const documentExists = window.document && !!window.window;
  const worker = !window.window;
  const master = '__uv';
  const methodPrefix = '__uv$';
  const uv = new Ultraviolet({ ...config, window });

  if (typeof config.construct === 'function') {
    config.construct(uv, worker ? 'worker' : 'window');
  }

  const {
    HTMLMediaElement,
    HTMLScriptElement,
    HTMLAudioElement,
    HTMLVideoElement,
    HTMLInputElement,
    HTMLEmbedElement,
    HTMLTrackElement,
    HTMLAnchorElement,
    HTMLIFrameElement,
    HTMLAreaElement,
    HTMLLinkElement,
    HTMLBaseElement,
    HTMLFormElement,
    HTMLImageElement,
    HTMLSourceElement,
  } = window;

  Object.defineProperty(window, master, {
    value: uv,
    enumerable: false,
  });

  uv.meta.origin = location.origin;
  uv.location = createLocationEmulator(
    (href) => {
      if (href === 'about:srcdoc') return new URL(href);
      if (href.startsWith('blob:')) href = href.slice('blob:'.length);
      return new URL(uv.sourceUrl(href));
    },
    (href) => {
      return uv.rewriteUrl(href);
    }
  );

  uv.cookieStr = window.__uv$cookies || '';
  uv.meta.url = uv.location;
  uv.domain = uv.meta.url.host;
  uv.blobUrls = new Map();
  uv.referrer = '';
  uv.cookies = [];
  uv.localStorageObj = {};
  uv.sessionStorageObj = {};

  try {
    uv.bare = new URL(bare, window.location.href);
  } catch (e) {
    uv.bare = window.parent.__uv.bare;
  }

  if (uv.location.href === 'about:srcdoc') {
    uv.meta = window.parent.__uv.meta;
  }

  if (window.EventTarget) {
    uv.addEventListener = EventTarget.prototype.addEventListener;
    uv.removeListener = EventTarget.prototype.removeListener;
    uv.dispatchEvent = EventTarget.prototype.dispatchEvent;
  }

  // Storage wrappers
  Object.defineProperty(client.storage.storeProto, '__uv$storageObj', {
    get() {
      if (this === client.storage.sessionStorage) return uv.sessionStorageObj;
      if (this === client.storage.localStorage) return uv.localStorageObj;
    },
    enumerable: false,
  });

  if (window.localStorage) {
    for (const key in window.localStorage) {
      if (key.startsWith(methodPrefix + uv.location.origin + '@')) {
        uv.localStorageObj[key.slice((methodPrefix + uv.location.origin + '@').length)] = window.localStorage.getItem(key);
      }
    }

    uv.lsWrap = client.storage.emulate(client.storage.localStorage, uv.localStorageObj);
  }

  if (window.sessionStorage) {
    for (const key in window.sessionStorage) {
      if (key.startsWith(methodPrefix + uv.location.origin + '@')) {
        uv.sessionStorageObj[key.slice((methodPrefix + uv.location.origin + '@').length)] = window.sessionStorage.getItem(key);
      }
    }

    uv.ssWrap = client.storage.emulate(client.storage.sessionStorage, uv.sessionStorageObj);
  }

  let rawBase = documentExists ? client.node.baseURI.get.call(document) : window.location.href;
  let base = uv.sourceUrl(rawBase);

  Object.defineProperty(uv.meta, 'base', {
    get() {
      if (!document) return uv.meta.url.href;

      if (client.node.baseURI.get.call(document) !== rawBase) {
        rawBase = client.node.baseURI.get.call(document);
        base = uv.sourceUrl(rawBase);
      }

      return base;
    },
  });

  uv.methods = {
    setSource: methodPrefix + 'setSource',
    source: methodPrefix + 'source',
    location: methodPrefix + 'location',
    function: methodPrefix + 'function',
    string: methodPrefix + 'string',
    eval: methodPrefix + 'eval',
    parent: methodPrefix + 'parent',
    top: methodPrefix + 'top',
  };

  uv.filterKeys = [
    master,
    uv.methods.setSource,
    uv.methods.source,
    uv.methods.location,
    uv.methods.function,
    uv.methods.string,
    uv.methods.eval,
    uv.methods.parent,
    uv.methods.top,
    methodPrefix + 'protocol',
    methodPrefix + 'storageObj',
    methodPrefix + 'url',
    methodPrefix + 'modifiedStyle',
    methodPrefix + 'config',
    methodPrefix + 'dispatched',
    'Ultraviolet',
    '__uvHook',
  ];

  client.on('wrap', (target, wrapped) => {
    Object.defineProperty(wrapped, 'name', {
      enumerable: false,
      value: Object.getOwnPropertyDescriptor(target, 'name').value,
    });
    Object.defineProperty(wrapped
