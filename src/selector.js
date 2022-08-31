"use strict";
module.exports = (parameters) => { return new Selector(parameters); };
class Selector {
    //constructor:
    constructor(parameters) {
        //append CSS styles to DOM:
        // Selector.appendCSS();//comment at dev mode
        var _a;
        //the view:
        this.viewID = Selector.generateViewID();
        let view = Selector.getHtml(this.viewID);
        document.body.appendChild(view);
        this.view = document.getElementById(this.viewID.toString()) || document.createElement('div');
        //set properties:
        this.setTitle(this.title = parameters.title || '');
        this.allOptions = parameters.options;
        this.optionsToShow = parameters.options;
        this.recentSelects = parameters.recentSelects;
        this.currentOptionId = parameters.currentOptionId;
        this.isSearchable = (_a = parameters.isSearchable) !== null && _a !== void 0 ? _a : true;
        this.setSearchPlaceholder(this.searchPlaceholder = parameters.searchPlaceholder || '');
        this.maxColumns = parameters.maxColumns || 7;
        this.maxRows = parameters.maxRows || 16;
        this.rowsNumber = 1;
        this.columnsNumber = 1;
        this.onSelect = parameters.onSelect;
        this.afterHide = parameters.afterHide;
        //show recent selects:
        this.showRecentSelects();
        //show all options:
        this.showAllOptions(true);
        //set theme;
        this.setTheme(parameters.theme);
        //set style:
        this.setStyle(parameters.style);
        //add event to window:
        let thisView = this;
        window.addEventListener('resize', () => {
            thisView.showAllOptions(true);
        });
        //add event to search input:
        this.addEventToSearch();
        //add event to close button:
        this.addEventToClose();
        //finally show:
        this.show();
    }
    //appendCSS:
    static appendCSS() {
        if (document.getElementById('selector-style') === null) {
            let head = document.head || document.getElementsByTagName('head')[0];
            let style = document.createElement('style');
            style.id = 'selector-style';
            head.appendChild(style);
            style.appendChild(document.createTextNode(Style));
        }
    }
    //generateViewID:
    static generateViewID() {
        let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if (element === null)
            return id;
        return Selector.generateViewID();
    }
    //getHtml:
    static getHtml(viewID) {
        const html = `
            <div class="selector" id="${viewID}">
                <div class="shadow"></div>
                <div class="container">
                    <div class="window">
                        <div class="toolbar">
                            <a class="title"></a>
                            <input type="text" dir="auto" autocomplete="off" class="searchInput" placeholder="">
                            <div class="recentSelectsWrapper">
                                <!-- //this is the structure of the recently selected options that will generate dynamically with js:
                                <input type="button" class="optionButton" id="en" value="English"/>-->
                            </div>
                            <input type="button" class="closeButton"/>
                        </div>
                        <div class="optionsColumnsWrapper">
                            <!-- //this is the button structure of a column that will generate dynamically with js:
                            <div class="optionsColumn">
                                <input type="button" class="optionButton" id="en" value="English"/>
                                <input type="button" class="optionButton" id="sp" value="Spanish"/>
                                <input type="button" class="optionButton" id="fr" value="French"/>
                            </div/>-->
                        </div>
                    </div>
                </div>
            </div>
        `;
        return Selector.getChildNode(html);
    }
    //getOptionButtonHtml:
    static getOptionButtonHtml(id, name, iconSrc, iconSize, number, isSelected) {
        const html = `
            <input
                type="button"
                class="optionButton${iconSrc !== '' ? ' withIcon' : ''}${isSelected ? ' selected' : ''}"
                id="${id}"
                value="${name}"
                number="${number}"
                title="${name}"
                style="${iconSrc !== '' ? ('background-image:' + "url('" + iconSrc + "');") : ''} ${iconSize !== '' ? ('background-size:' + iconSize + ';') : ''}"
            />`;
        return Selector.getChildNode(html);
    }
    //getColumnHtml:
    static getColumnHtml(index) {
        const html = `<div class="optionsColumn column_${index}">`;
        return Selector.getChildNode(html);
    }
    //getChildNode:
    static getChildNode(html) {
        let div = document.createElement('div');
        div.innerHTML = html.trim();
        return div.firstChild || div;
    }
    //setTitle:
    setTitle(title) {
        this.title = title;
        let titleEl = this.view.getElementsByClassName('title')[0];
        titleEl.innerHTML = this.title;
        this.setupHeader();
    }
    //setSearchPlaceholder:
    setSearchPlaceholder(sph) {
        this.searchPlaceholder = sph;
        let searchEl = this.view.getElementsByClassName('searchInput')[0];
        searchEl.placeholder = this.searchPlaceholder;
        this.setupHeader();
    }
    //setupHeader:
    setupHeader() {
        let titleEl = this.view.getElementsByClassName('title')[0];
        let searchEl = this.view.getElementsByClassName('searchInput')[0];
        if (this.isSearchable) {
            titleEl.style.display = 'none';
            searchEl.style.display = 'block';
        }
        else {
            titleEl.style.display = 'block';
            searchEl.style.display = 'none';
        }
    }
    //showRecentSelects:
    showRecentSelects() {
        var _a;
        let recentWrapper = this.view.getElementsByClassName('recentSelectsWrapper')[0];
        let columnNumber = 0;
        (_a = this.recentSelects) === null || _a === void 0 ? void 0 : _a.forEach((option) => {
            let id = option.id;
            let name = option.name;
            let buttonHtml = Selector.getOptionButtonHtml(id, name, '', '', (columnNumber + "_0"), false);
            recentWrapper.appendChild(buttonHtml);
            columnNumber++;
        });
    }
    //showAllOptions:
    showAllOptions(neSizeCalc) {
        if (!neSizeCalc)
            this.fixTheWindow();
        this.rowsNumber = this.calcRowsNumber();
        this.removeAllOptions();
        this.printColumns();
        this.addEventToOptions();
        if (neSizeCalc)
            this.releaseTheWindow();
    }
    //fixTheWindow:
    fixTheWindow() {
        const window = this.view.getElementsByClassName('window')[0];
        const windowWidth = window.offsetWidth;
        const windowHeight = window.offsetHeight;
        window.style.width = windowWidth + 'px';
        window.style.height = windowHeight + 'px';
    }
    //releaseTheWindow:
    releaseTheWindow() {
        const window = this.view.getElementsByClassName('window')[0];
        window.style.width = 'auto';
        window.style.height = 'auto';
    }
    //removeAllOptions:
    removeAllOptions() {
        let columnsWrapper = this.view.getElementsByClassName('optionsColumnsWrapper')[0];
        columnsWrapper.innerHTML = '';
    }
    //calcRowsNumber:
    calcRowsNumber() {
        let maxRows = this.calcMaxRows();
        let maxColumns = this.calcMaxColumns();
        let rowsNumber = maxRows;
        let totalVisibleOptions = maxColumns * maxRows;
        let optionsLength = this.optionsToShow.length;
        if (optionsLength < totalVisibleOptions) {
            if (optionsLength < maxRows)
                rowsNumber = optionsLength;
            else {
                let x = (optionsLength / 10);
                rowsNumber = Math.ceil(Math.sqrt(x) * 5);
            }
        }
        else
            rowsNumber = Math.ceil(optionsLength / maxColumns);
        return rowsNumber;
    }
    //calcMaxRows:
    calcMaxRows() {
        let columnsWrapperHeight = window.innerHeight - 270;
        let maxRows = Math.floor(columnsWrapperHeight / Selector.ROW_HEIGHT);
        if (maxRows > this.maxRows)
            maxRows = this.maxRows;
        return maxRows;
    }
    //calcMaxColumns:
    calcMaxColumns() {
        let columnsWrapperWidth = window.innerWidth - 250;
        let maxColumns = Math.floor(columnsWrapperWidth / Selector.COLUMN_WIDTH);
        if (maxColumns > this.maxColumns)
            maxColumns = this.maxColumns;
        return maxColumns;
    }
    //printColumns:
    printColumns() {
        var _a, _b;
        if (this.optionsToShow.length === 0)
            return;
        let columnsWrapper = this.view.getElementsByClassName('optionsColumnsWrapper')[0];
        let buttonCounter = 0;
        this.columnsNumber = 0;
        while (1) {
            let columnHtml = Selector.getColumnHtml(this.columnsNumber);
            columnsWrapper.appendChild(columnHtml);
            let column = this.view.getElementsByClassName('column_' + this.columnsNumber)[0];
            for (let j = 1; j <= this.rowsNumber; j++) {
                let isSelected = false;
                let option = this.optionsToShow[buttonCounter];
                let number = this.columnsNumber + '_' + j;
                if (option.id === this.currentOptionId)
                    isSelected = true;
                let buttonHtml = Selector.getOptionButtonHtml(option.id, option.name, (_a = option.iconSrc) !== null && _a !== void 0 ? _a : '', (_b = option.iconSize) !== null && _b !== void 0 ? _b : '', number, isSelected);
                column.appendChild(buttonHtml);
                buttonCounter++;
                if (buttonCounter >= this.optionsToShow.length)
                    return;
            }
            this.columnsNumber++;
        }
    }
    //setTheme:
    setTheme(theme) {
        if (theme === undefined)
            return;
        this.theme == theme;
        this.view.classList.remove('light');
        this.view.classList.remove('dark');
        this.view.classList.add(theme);
    }
    //setStyle:
    setStyle(style) {
        if (style === undefined)
            return;
        this.style = style;
        for (const [className, style] of Object.entries(this.style)) {
            let root = document.getElementById(this.viewID.toString());
            let element = root.getElementsByClassName(className)[0];
            if (element !== undefined)
                for (const property of style)
                    element.style.setProperty(property[0], property[1]);
        }
    }
    //show:
    show() {
        const thisView = this;
        setTimeout(() => {
            thisView.view.classList.add('visible');
            setTimeout(() => {
                const searchInput = this.view.getElementsByClassName('searchInput')[0];
                searchInput.focus();
            }, 100);
        }, 50); //slight delay between adding to DOM and running css animation
    }
    //addEventToOptions:
    addEventToOptions() {
        const buttons = this.view.querySelectorAll('.optionButton');
        buttons.forEach(button => {
            button.addEventListener('click', e => {
                let element = e === null || e === void 0 ? void 0 : e.target;
                if (this.onSelect !== undefined)
                    this.onSelect(element.id, element.value);
                this.hide();
            });
        });
        this.addNavigationEvents();
    }
    //addEventToSearch:
    addEventToSearch() {
        const thisView = this;
        const searchInput = this.view.getElementsByClassName('searchInput')[0];
        searchInput.addEventListener('input', e => {
            const target = e.target;
            const searchPhrase = target.value;
            thisView.optionsToShow = thisView.allOptions.filter(option => option.name.toLowerCase().search(searchPhrase.toLowerCase()) >= 0) || [];
            thisView.showAllOptions(searchPhrase === '');
        });
        searchInput.addEventListener('keyup', e => {
            const event = e;
            if (event.key === 'ArrowDown') {
                const columnsWrapper = this.view.getElementsByClassName('optionsColumnsWrapper')[0];
                const firstOption = columnsWrapper.getElementsByClassName('optionButton')[0];
                firstOption.focus();
            }
        });
    }
    //addNavigationEvents:
    addNavigationEvents() {
        let thisView = this;
        const buttons = this.view.querySelectorAll('.optionButton');
        buttons.forEach(button => {
            button.addEventListener('keydown', e => {
                var _a, _b, _c, _d, _e;
                e.preventDefault();
                const event = e;
                const target = e.target;
                let number = (_a = target.getAttribute('number')) !== null && _a !== void 0 ? _a : '0_0';
                let rowCol = number.split('_');
                let column = parseInt(rowCol[0]);
                let row = parseInt(rowCol[1]);
                switch (event.key) {
                    case 'ArrowUp':
                        (_b = thisView.getOptionButton(column, row - 1)) === null || _b === void 0 ? void 0 : _b.focus();
                        if (row == 1)
                            thisView.view.getElementsByClassName('searchInput')[0].focus();
                        break;
                    case 'ArrowDown':
                        (_c = thisView.getOptionButton(column, row + 1)) === null || _c === void 0 ? void 0 : _c.focus();
                        break;
                    case 'ArrowLeft':
                        (_d = thisView.getOptionButton(column - 1, row)) === null || _d === void 0 ? void 0 : _d.focus();
                        break;
                    case 'ArrowRight':
                        (_e = thisView.getOptionButton(column + 1, row)) === null || _e === void 0 ? void 0 : _e.focus();
                        break;
                }
            });
        });
    }
    //getOptionButton:
    getOptionButton(column, row) {
        return this.view.querySelector('[number="' + column + '_' + row + '"]');
    }
    //addEventToClose:
    addEventToClose() {
        const thisView = this;
        const closeButton = this.view.getElementsByClassName('closeButton')[0];
        closeButton.addEventListener('click', e => {
            thisView.hide();
        });
        const window = this.view.getElementsByClassName('window')[0];
        window.addEventListener('click', e => {
            e.stopPropagation();
        });
        const container = this.view.getElementsByClassName('container')[0];
        container.addEventListener('click', e => {
            thisView.hide();
        });
        const shadow = this.view.getElementsByClassName('shadow')[0];
        shadow.addEventListener('click', e => {
            thisView.hide();
        });
    }
    //hide:
    hide() {
        this.view.classList.remove('visible');
        const thisView = this;
        setTimeout(() => {
            thisView.view.remove();
        }, 500); //long enough to make sure that it is hidden
    }
}
//default values:
Selector.ROW_HEIGHT = 40;
Selector.COLUMN_WIDTH = 187;
const Style = `

`;
