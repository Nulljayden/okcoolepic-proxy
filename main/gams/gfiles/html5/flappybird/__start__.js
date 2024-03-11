(function () {
    // Configuration constants
    const CANVAS_ID = 'application-canvas';
    const INPUT_SETTINGS = {
        useKeyboard: true,
        useMouse: true,
        useTouch: true,
        useGamepads: true
    };
    const CONTEXT_OPTIONS = {};
    const ASSET_PREFIX = '';
    const SCRIPT_PREFIX = '';
    const SCRIPTS = [];
    const CONFIG_FILENAME = 'config.json';
    const PRELOAD_MODULES = [];
    const SCENE_PATH = 'scene.json';

    let canvas, devices, app;

    const createCanvas = () => {
        canvas = document.createElement('canvas');
        canvas.id = CANVAS_ID;
        canvas.tabIndex = 0;
        canvas.onselectstart = e => e.preventDefault();
        document.body.appendChild(canvas);
        return canvas;
    };

    const createInputDevices = canvas => ({
        elementInput: new pc.ElementInput(canvas, {
            useMouse: INPUT_SETTINGS.useMouse,
            useTouch: INPUT_SETTINGS.useTouch
        }),
        keyboard: INPUT_SETTINGS.useKeyboard ? new pc.Keyboard(window) : null,
        mouse: INPUT_SETTINGS.useMouse ? new pc.Mouse(canvas) : null,
        gamepads: INPUT_SETTINGS.useGamepads ? new pc.GamePads() : null,
        touch: INPUT_SETTINGS.useTouch && pc.platform.touch ? new pc.TouchDevice(canvas) : null
    });

    const configureCss = (fillMode, width, height) => {
        if (canvas.classList) {
            canvas.classList.add(`fill-mode-${fillMode}`);
        }

        const css = `
            @media screen and (min-aspect-ratio: ${width}/${height}) {
                #${CANVAS_ID}.fill-mode-KEEP_ASPECT {
                    width: auto;
                    height: 100%;
                    margin: 0 auto;
                }
            }
        `;

        if (document.head.querySelector) {
            document.head.querySelector('style').innerHTML += css;
        }
    };

    const reflow = () => {
        app.resizeCanvas(canvas.width, canvas.height);
        canvas.style.width = '';
        canvas.style.height = '';

        switch (app._fillMode) {
            case pc.FILLMODE_NONE:
            case pc.FILLMODE_KEEP_ASPECT:
                if (
                    (app._fillMode == pc.FILLMODE_NONE && canvas.clientHeight < window.innerHeight) ||
                    (canvas.clientWidth / canvas.clientHeight >= window.innerWidth / window.innerHeight)
                ) {
                    canvas.style.marginTop = `${Math.floor((window.innerHeight - canvas.clientHeight) / 2)}px`;
                } else {
                    canvas.style.marginTop = '';
                }
                break;
            case pc.FILLMODE_STRETCH:
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.margin = 0;
                break;
        }
    };

    const displayError = html => {
        const div = document.createElement('div');

        div.innerHTML = `
            <table style="background-color: #8CE; width: 100%; height: 100%;">
                <tr>
                    <td align="center">
                        <div style="display: table-cell; vertical-align: middle;">
                            <div style="">${html}</div>
                        </div>
                    </td>
                </tr>
            </table>
        `;

        document.body.appendChild(div);
    };

    canvas = createCanvas();
    devices = createInputDevices(canvas);

    try {
        app = new pc.Application(canvas, {
            elementInput: devices.elementInput,
            keyboard: devices.keyboard,
            mouse: devices.mouse,
            gamepads: devices.gamepads,
            touch: devices.touch,
            graphicsDeviceOptions: CONTEXT_OPTIONS,
            assetPrefix: ASSET_PREFIX,
            scriptPrefix: SCRIPT_PREFIX,
            scriptsOrder: SCRIPTS
        });
    } catch (e) {
        if (e instanceof pc.UnsupportedBrowserError) {
            displayError('This page requires a browser that supports WebGL.<br/>' +
                    '<a href="http://get.webgl.org">Click here to find out more.</a>');
        } else if (e instanceof pc.ContextCreationError) {
            displayError("It doesn't appear your computer can support WebGL.<br/>" +
                    '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>');
        } else {
            displayError('Could not initialize application. Error: ' + e);
        }

        return;
    }

    const configure = () => {
        app.configure(CONFIG_FILENAME, err => {
            if (err) {
                console.error(err);
            }

            configureCss(app._fillMode, app._width, app._height);

            // do the first reflow after a timeout because of
            // iOS showing a squished if
