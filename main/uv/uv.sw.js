importScripts('/uv/uv.bundle.js');

class UVServiceWorker extends EventEmitter {
  constructor(config: object = __uv$config) {
    super();
    if (!config.bare) config.bare = '/bare/';
    this.addresses = typeof config.bare === 'string' ? [new URL(config.bare, location)] : (config.bare as string[]).map(str => new URL(str, location));
    this.headers = {
      csp: [
        'cross-origin-embedder-policy',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy',
        'content-security-policy',
        'content-security-policy-report-only',
        'expect-ct',
        'feature-policy',
        'origin-isolation',
        'strict-transport-security',
        'upgrade-insecure-requests',
        'x-content-type-options',
        'x-download-options',
        'x-frame-options',
        'x-permitted-cross-domain-policies',
        'x-powered-by',
        'x-xss-protection',
      ],
      forward: [
        'accept-encoding',
        'connection',
        'content-length',
      ],
    };
    this.method = {
      empty: [
        'GET',
        'HEAD'
      ]
    };
    this.statusCode = {
      empty: [
        204,
        304,
      ],
    };
    this.config = config;
    this.browser = Ultraviolet.Bowser.getParser(self.navigator.userAgent).getBrowserName();

    if (this.browser === 'Firefox') {
      this.headers.forward.push('user-agent');
      this.headers.forward.push('content-type');
    };
  }

  async fetch({ request }: { request: Request }): Promise<Response> {
    if (!request.url.startsWith(location.origin + (this.config.prefix || '/service/'))) {
      return fetch(request);
    };
    try {

      const ultraviolet = new Ultraviolet(this.config);

      if (typeof this.config.construct === 'function') {
        this.config.construct(ultraviolet, 'service');
      };

      const db = await ultraviolet.cookie.db();

      ultraviolet.meta.origin = location.origin;
      ultraviolet.meta.base = ultraviolet.meta.url = new URL(ultraviolet.sourceUrl(request.url));

      const requestCtx = new RequestContext(
        request,
        this,
        ultraviolet,
        !this.method.empty.includes(request.method.toUpperCase()) ? await request.blob() : null
      );

      if (ultraviolet.meta.url.protocol === 'blob:') {
        requestCtx.blob = true;
        requestCtx.base = requestCtx.url = new URL(requestCtx.url.pathname);
      };

      if (request.referrer && request.referrer.startsWith(location.origin)) {
        const referer = new URL(ultraviolet
