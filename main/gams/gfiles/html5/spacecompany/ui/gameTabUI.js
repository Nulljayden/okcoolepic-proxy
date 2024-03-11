(function () {

    // Tab template
    const tabTemplate = Handlebars.compile(`
        <li role="presentation" id="{{htmlId}}">
            <a href="#{{htmlId}}_pane" id="{{htmlId}}_link" class="{{hidden}}" aria-controls="{{id}}" role="tab" data-toggle="tab">
                <div id="{{id}}TabGlyph" class="glyphicon glyphicon-exclamation-sign hidden"></div>
                {{title}}</a></li>
    `);

    // Content template
    const contentTemplate = Handlebars.compile(`
        <div role="tabpanel" class="tab-pane fade" id="{{htmlId}}_pane">
            <div class="container" style="width:250px; padding:0; float:left;">
                <table class="table table-hover text-primary no-select pointer" ><tbody id="{{htmlId}}_nav"></tbody></table>
            </div>
            <div class="tab-content" id="{{htmlId}}_content"></div>
        </div>
    `);

    // Category template
    const categoryTemplate = Handlebars.compile(`
        <tr id="{{htmlId}}_{{id}}_collapse" style="border:none;">
            <td colspan="4">
                <span>{{title}}</span> <span class="caret"></span>
            </td>
        </tr>
    `);

    // Nav entry template
    const navEntryTemplate = Handlebars.compile(`
        <tr id="{{htmlId}}_{{id}}_ne" href="#{{htmlId}}_{{id}}_nec" class="collapse_{{htmlId}}_{{category}}" aria-controls="{{htmlId}}_{{id}}_nec" role="tab" data-toggle="tab" style="height:60px;" aria-expanded="true">
        </tr>
    `);

    // Nav entry content template
    const navEntryContentTemplate = Handlebars.compile(`
        <div id="{{htmlId}}_{{id}}_nec" class="tab-pane fade in" style="margin-left:10px; width:100px; float:left;">
            <div class="container" style="max-width:800px;">
                <table class="table"><tbody id="{{htmlId}}_{{id}}_netc"></tbody></table>
            </div>
        </div>
    `);

    // Tab root element
    const tabRoot = $('#tabList');

    // Tab content root element
    const tabContentRoot = $('#tabContent');

    // Tab register object
    const tabRegister = {};

    /**
     * GameTab class
     */
    class GameTab {
        constructor(data) {
            if (tabRegister[data.id]) {
                console.error("Duplicate Tab Registered: " + data.id);
            }

            this.categories = {};
            this.categoryEntries = {};

            this.onActivate = null;
            this.onNavActivate = null;

            this.data = data;
            this.data.htmlId = data.id + "Tab";

            tabRegister[data.id] = this;
        }

        // ---------------------------------------------------------------------------
        // basic functions
        // ---------------------------------------------------------------------------

        /**
         * Initialise the tab
         */
        initialise() {
            const html = tabTemplate(this.data);
            if(this.data.prepend == true){
                tabRoot.prepend($(html));
            } else{
                tabRoot.append($(html));
            }

            const contentHtml = contentTemplate(this.data);
            tabContentRoot.append($(contentHtml));

            const link = $('#' + this.data.htmlId + '_link');
            link.on('click', {id: this.data.id}, (args) => { this.activate(); });
        }

        /**
         * Show the tab
         */
        show() {
            $('#' + this.data.htmlId).show();
        }

        /**
         * Hide the tab
         */
        hide() {
            $('#'
