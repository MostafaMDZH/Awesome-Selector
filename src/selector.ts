//custom types:
type option = {//todo: check the types
    id: string;
    name: string;
    iconSrc: string;
    iconSize: string;
}
type constructorParameters = {
    title?:             string;
    options:            option[];
    recentSelects?:     option[];
    currentOptionId?:   string;
    isSearchable?:      boolean;
    searchPlaceholder?: string;
    maxColumns?:        number;
    maxRows?:           number;
    theme?:             string;
    style?:             object;
    onSelect:   (id:string, name:string) => void;
}

export default class Selector{
    
    //default values:
    public static readonly ROW_HEIGHT: number = 40;
    public static readonly COLUMN_WIDTH: number = 187;

    //object properties:
    protected viewID:            number;
    protected view:              HTMLElement;
    protected title:             string;
    protected allOptions:        option[];
    protected optionsToShow:     option[];
    protected recentSelects:     option[] | undefined;
    protected currentOptionId:   string   | undefined;
    protected isSearchable:      boolean;
    protected searchPlaceholder: string;
    protected maxColumns:        number;
    protected maxRows:           number;
    protected rowsNumber:        number;
    protected columnsNumber:     number;
    protected theme:             string   | undefined;
    protected style:             object   | undefined;
    protected onSelect:    (id:string, name:string) => void;

    //constructor:
    constructor(parameters:constructorParameters){

        //append CSS styles to DOM:
        // Selector.appendCSS();//comment at dev mode

        //the view:
        this.viewID = Selector.generateViewID();
        let view    = Selector.getHtml(this.viewID);
        document.body.appendChild(view);
        this.view   = document.getElementById(this.viewID.toString()) || document.createElement('div');

        //set properties:
        this.setTitle(this.title = parameters.title || '');
        this.allOptions        = parameters.options;
        this.optionsToShow     = parameters.options;
        this.recentSelects     = parameters.recentSelects;
        this.currentOptionId   = parameters.currentOptionId;
        this.isSearchable      = parameters.isSearchable ?? false;
        this.setSearchPlaceholder(this.searchPlaceholder = parameters.searchPlaceholder || '');
        this.maxColumns        = parameters.maxColumns || 7;
        this.maxRows           = parameters.maxRows || 16;
        this.rowsNumber        = 1;
        this.columnsNumber     = 1;
        this.onSelect          = parameters.onSelect;

        //show recent selects:
        this.showRecentSelects();

        //show all options:
        this.showAllOptions(true);

        //set theme;
        this.setTheme(parameters.theme);

        //add event to window:
        this.addWindowSizeEvent();
        
        //add event to search input:
        this.addEventToSearch();

        //add event to close button:
        this.addEventToClose();
        
        //set style:
        this.setStyle(parameters.style);

        //finally show:
        this.show();

	}

    //appendCSS:
    protected static appendCSS():void{
        if(document.getElementById('selector-style') === null){
            let head  = document.head || document.getElementsByTagName('head')[0];
            let style = document.createElement('style');
            style.id  = 'selector-style';
            head.appendChild(style);
            style.appendChild(document.createTextNode(Style));
        }
    }

    //generateViewID:
    protected static generateViewID():number{
		let id = Math.floor(Math.random() * 1000000000) + 100000000;
        let element = document.getElementById(id.toString());
        if(element === null)
            return id;
        return Selector.generateViewID();
	}

    //getHtml:
    protected static getHtml(viewID:number):ChildNode{
        const html = `
            <div class="selector" id="${viewID}">
                <div class="shadow"></div>
                <div class="container">
                    <div class="window">
                        <div class="toolbar">
                            <a class="title"></a>
                            <input type="text" dir="auto" autocomplete="off" class="searchInput" placeholder=""/>
                            <div class="recentSelectsWrapper">
                                <!-- //this is the structure of the recently selected options that will generate dynamically with js:
                                <input type="button" class="recentButton" id="en" value="English"/>-->
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
    protected static getOptionButtonHtml(className:string, id:string, name:string, iconSrc:string, iconSize:string, number:string, isSelected:boolean):ChildNode{
        const html = `
            <input
                type="button"
                class="navButton ${className}${iconSrc !== '' ? ' withIcon' : ''}${isSelected ? ' selected' : ' unselected'}"
                id="${id}"
                value="${name}"
                number="${number}"
                title="${name}"
                style="${iconSrc !== '' ? ('background-image:' + "url('" + iconSrc + "');") : ''} ${iconSize !== '' ? ('background-size:' + iconSize + ';') : ''}"
            />`;
        return Selector.getChildNode(html);
    }

    //getColumnHtml:
    protected static getColumnHtml(index:number):ChildNode{
        const html = `<div class="optionsColumn column_${index}">`;
        return Selector.getChildNode(html);
    }

    //getChildNode:
    protected static getChildNode(html:string):ChildNode{
        let div = document.createElement('div');
        div.innerHTML = html.trim();
        return div.firstChild || div;
    }

    //setTitle:
    public setTitle(title:string):void{
        this.title = title;
        let titleEl = <HTMLElement> this.view.getElementsByClassName('title')[0];
        titleEl.innerHTML = this.title;
        this.setupHeader();
    }

    //setSearchPlaceholder:
    protected setSearchPlaceholder(sph:string):void{
        this.searchPlaceholder = sph;
        let searchEl = <HTMLInputElement> this.view.getElementsByClassName('searchInput')[0];
        searchEl.placeholder = this.searchPlaceholder;
        this.setupHeader();
    }

    //setupHeader:
    protected setupHeader():void{
        let titleEl  = <HTMLElement> this.view.getElementsByClassName('title')[0];
        let searchEl = <HTMLElement> this.view.getElementsByClassName('searchInput')[0];
        if(this.isSearchable){
            titleEl.style.display  = 'none';
            searchEl.style.display = 'block';
        }else{
            titleEl.style.display  = 'block';
            searchEl.style.display = 'none';
        }
    }

    //showRecentSelects:
    protected showRecentSelects():void{
        let recentWrapper = <HTMLElement> this.view.getElementsByClassName('recentSelectsWrapper')[0];
        let columnNumber = 1;
        this.recentSelects?.forEach((option) => {
            let id = option.id;
            let name = option.name;
            let buttonHtml = Selector.getOptionButtonHtml('recentButton', id, name, '', '', (columnNumber + "_0"), false);
            recentWrapper.appendChild(buttonHtml);
            columnNumber++;
        });
    }

    //showAllOptions:
    protected showAllOptions(neSizeCalc:boolean):void{
        if(!neSizeCalc) this.fixTheWindow();
        this.rowsNumber = this.calcRowsNumber();
        this.removeAllOptions();
        this.printColumns();
        if(this.columnsNumber === 1){
            const optionsColumn = <HTMLElement> this.view.getElementsByClassName('optionsColumn')[0];
            optionsColumn.classList.add('singleColumn');
        }
        this.addEventToOptions();
        if(neSizeCalc) this.releaseTheWindow();
    }

    //fixTheWindow:
    protected fixTheWindow():void{
        const window = <HTMLElement> this.view.getElementsByClassName('window')[0];
        const windowWidth = window.offsetWidth;
        const windowHeight = window.offsetHeight;
        window.style.width = windowWidth + 'px';
        window.style.height = windowHeight + 'px';
    }

    //releaseTheWindow:
    protected releaseTheWindow():void{
        const window = <HTMLElement> this.view.getElementsByClassName('window')[0];
        window.style.width = 'auto';
        window.style.height = 'auto';
    }

    //removeAllOptions:
    protected removeAllOptions():void{
        let columnsWrapper = <HTMLElement> this.view.getElementsByClassName('optionsColumnsWrapper')[0];
        columnsWrapper.innerHTML = '';
    }

    //calcRowsNumber:
    protected calcRowsNumber():number{
        let maxRows = this.calcMaxRows();
        let maxColumns = this.calcMaxColumns();
        let rowsNumber = maxRows;
        let totalVisibleOptions = maxColumns * maxRows;
        let optionsLength = this.optionsToShow.length;
        if(optionsLength < totalVisibleOptions){
            if(optionsLength < maxRows)
                rowsNumber = optionsLength;
            else{
                let x = (optionsLength / 10);
                rowsNumber = Math.ceil(Math.sqrt(x) * 5);
            }
        }else
            rowsNumber = Math.ceil(optionsLength / maxColumns);
        return rowsNumber;
    }

    //calcMaxRows:
    protected calcMaxRows():number{
        let columnsWrapperHeight = window.innerHeight - 270;
        let maxRows = Math.floor(columnsWrapperHeight / Selector.ROW_HEIGHT);
        if(maxRows > this.maxRows)
            maxRows = this.maxRows;
        return maxRows;
    }

    //calcMaxColumns:
    protected calcMaxColumns():number{
        let columnsWrapperWidth = window.innerWidth - 250;
        let maxColumns = Math.floor(columnsWrapperWidth / Selector.COLUMN_WIDTH);
        if(maxColumns > this.maxColumns)
            maxColumns = this.maxColumns;
        return maxColumns;
    }

    //printColumns:
    protected printColumns():void{
        if(this.optionsToShow.length === 0) return;
        let columnsWrapper = <HTMLElement> this.view.getElementsByClassName('optionsColumnsWrapper')[0];
        let buttonCounter = 0;
        this.columnsNumber = 1;
        while(1){
            let columnHtml = Selector.getColumnHtml(this.columnsNumber);
            columnsWrapper.appendChild(columnHtml);
            let column = <HTMLElement> this.view.getElementsByClassName('column_' + this.columnsNumber)[0];
            for(let j = 1; j <= this.rowsNumber; j++){
                let isSelected = false;
                let option = this.optionsToShow[buttonCounter];
                let number = this.columnsNumber + '_' + j;
                if(option.id === this.currentOptionId) isSelected = true;
                let buttonHtml = Selector.getOptionButtonHtml('optionButton', option.id, option.name, option.iconSrc ?? '', option.iconSize ?? '', number, isSelected);
                column.appendChild(buttonHtml);
                buttonCounter++;
                if(buttonCounter >= this.optionsToShow.length) return;
            }
            this.columnsNumber++;
        }
    }

    //setTheme:
    public setTheme(theme?:string):void{
        if(theme === undefined) return;
        this.theme == theme;
        this.view.classList.remove('light');
        this.view.classList.remove('dark');
        this.view.classList.add(theme);
    }

    //setStyle:
    public setStyle(style?:object):void{
        if(style === undefined) return;
        this.style = style;
        for(const [className, style] of Object.entries(this.style)){
            const elements = this.view.querySelectorAll('.' + className);
            elements.forEach(element => {
                for(const property of style)
                    (<HTMLElement> element).style.setProperty(property[0], property[1]);
            });
        }
    }

    //show:
    protected show():void{
        const thisView = this;
        setTimeout(() => {
            thisView.view.classList.add('visible');
            setTimeout(() => {
                const searchInput = <HTMLInputElement> this.view.getElementsByClassName('searchInput')[0];
                searchInput.focus();
            }, 100);
        }, 50);//slight delay between adding to DOM and running css animation
    }

    //addWindowSizeEvent:
    protected addWindowSizeEvent(){
        window.addEventListener('resize', () => {
            if(this.columnsNumber !== this.calcMaxColumns())
                this.showAllOptions(true);
        });
    }

    //addEventToSearch:
    protected addEventToSearch(){
        const thisView = this;
        const searchInput = this.view.getElementsByClassName('searchInput')[0];
        searchInput.addEventListener('input', e => {
            const target = <HTMLInputElement> e.target;
            const searchPhrase = target.value;
            thisView.optionsToShow = thisView.allOptions.filter(option => option.name.toLowerCase().search(searchPhrase.toLowerCase()) >= 0) || [];
            thisView.showAllOptions(searchPhrase === '');
        });
        searchInput.addEventListener('keyup', e => {
            const event = <KeyboardEvent> e;
            if(event.key === 'ArrowDown'){
                const columnsWrapper = <HTMLElement> this.view.getElementsByClassName('optionsColumnsWrapper')[0];
                const firstOption = <HTMLElement> columnsWrapper.getElementsByClassName('optionButton')[0];
                firstOption.focus();
            }
        });
    }

    //addEventToOptions:
    protected addEventToOptions(){
        const recentButtons = Array.from(this.view.querySelectorAll('.recentButton'));
        const optionButtons = Array.from(this.view.querySelectorAll('.optionButton'));
        const allButtons = recentButtons.concat(optionButtons);
        allButtons.forEach(button => {
            button.addEventListener('click', e => {
                let element = <HTMLInputElement> e?.target;
                if(this.onSelect !== undefined)
                    this.onSelect(element.id, element.value);
                this.hide();
            });
        });
        this.addNavigationEvents();
    }

    //addNavigationEvents:
    protected addNavigationEvents(){
        let thisView = this;
        const buttons = this.view.querySelectorAll('.navButton');
        buttons.forEach(button => {
            button.addEventListener('keydown', e => {
                e.preventDefault();
                const event  = <KeyboardEvent> e;
                const target = <HTMLElement> e.target;
                let number = target.getAttribute('number') ?? '0_0';
                let rowCol = number.split('_');
                let column = parseInt(rowCol[0]);
                let row    = parseInt(rowCol[1]);
                switch(event.key){
                    case 'ArrowUp':
                        thisView.getOptionButton(column, row - 1)?.focus();
                        if(row == 1) (<HTMLInputElement> thisView.view.getElementsByClassName('searchInput')[0]).focus();
                        break;
                    case 'ArrowDown':
                        while(1){
                            let optionButton = thisView.getOptionButton(column, row + 1);
                            if(optionButton !== null){
                                optionButton.focus();
                                return;
                            }
                            if(column-- < 0) return;
                        }

                        break;
                    case 'ArrowLeft':
                        thisView.getOptionButton(column - 1, row)?.focus();
                        break;
                    case 'ArrowRight':
                        thisView.getOptionButton(column + 1, row)?.focus();
                        break;
                }
            });
        });
    }

    //getOptionButton:
    protected getOptionButton(column:number, row:number):HTMLElement{
        return <HTMLElement> this.view.querySelector('[number="' + column + '_' + row + '"]');
    }

    //addEventToClose:
    protected addEventToClose(){
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
    protected hide():void{
        this.view.classList.remove('visible');
        const thisView = this;
        setTimeout(() => {
            thisView.view.remove();
        }, 500);//long enough to make sure that it is hidden
    }

}

const Style = `

`;