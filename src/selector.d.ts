declare type option = {
    id: string;
    name: string;
    iconSrc?: string;
    iconSize?: string;
};
declare type constructorParameters = {
    title?: string;
    options: option[];
    recentSelects?: option[];
    currentOptionId?: string;
    isSearchable?: boolean;
    searchPlaceholder?: string;
    maxColumns?: number;
    maxRows?: number;
    theme?: string;
    style?: object;
    onSelect: (id: string, name: string) => void;
};
export default class Selector {
    static readonly ROW_HEIGHT: number;
    static readonly COLUMN_WIDTH: number;
    protected viewID: number;
    protected view: HTMLElement;
    protected title: string;
    protected allOptions: option[];
    protected optionsToShow: option[];
    protected recentSelects: option[] | undefined;
    protected currentOptionId: string | undefined;
    protected isSearchable: boolean;
    protected searchPlaceholder: string;
    protected maxColumns: number;
    protected maxRows: number;
    protected rowsNumber: number;
    protected columnsNumber: number;
    protected theme: string | undefined;
    protected style: object | undefined;
    protected onSelect: (id: string, name: string) => void;
    constructor(parameters: constructorParameters);
    protected static appendCSS(): void;
    protected static generateViewID(): number;
    protected static getHtml(viewID: number): ChildNode;
    protected static getOptionButtonHtml(className: string, id: string, name: string, iconSrc: string, iconSize: string, number: string, isSelected: boolean): ChildNode;
    protected static getColumnHtml(index: number): ChildNode;
    protected static getChildNode(html: string): ChildNode;
    setTitle(title: string): void;
    protected setSearchPlaceholder(sph: string): void;
    protected setupHeader(): void;
    protected showRecentSelects(): void;
    protected showAllOptions(neSizeCalc: boolean): void;
    protected fixTheWindow(): void;
    protected releaseTheWindow(): void;
    protected removeAllOptions(): void;
    protected calcRowsNumber(): number;
    protected calcMaxRows(): number;
    protected calcMaxColumns(): number;
    protected printColumns(): void;
    setTheme(theme?: string): void;
    setStyle(style?: object): void;
    protected show(): void;
    protected addWindowSizeEvent(): void;
    protected addEventToSearch(): void;
    protected addEventToOptions(): void;
    protected addNavigationEvents(): void;
    protected getOptionButton(column: number, row: number): HTMLElement;
    protected addEventToClose(): void;
    hide(): void;
}
export {};
