declare class Selector {
    static readonly DEFAULT_HIDING_TIMEOUT: number;
    static readonly DEFAULT_POSITION: string;
    protected viewID: number;
    protected view: HTMLElement;
    protected title: string;
    protected position: string;
    protected theme: string | undefined;
    protected style: object | undefined;
    protected bornTime: number;
    protected waitForEvent: boolean;
    protected hideEventHandler: EventListenerOrEventListenerObject;
    protected timeout: number;
    protected isWaitingForHide: boolean;
    protected afterHide: (() => void) | undefined;
    constructor(parameters: {
        title: string;
        position?: string;
        theme?: string;
        style?: object;
        waitForEvent?: boolean;
        timeout?: number;
        afterHide?: () => void;
    });
    protected static appendCSS(): void;
    protected static generateViewID(): number;
    protected static getDOM(viewId: number): ChildNode;
    setTitle(title: string): void;
    setPosition(position: string): void;
    setTheme(theme?: string): void;
    setStyle(style?: object): void;
    protected show(): void;
    protected addHideEventListener(): void;
    protected removeHideEventListener(): void;
    protected handleHideEvent(): void;
    protected startHidingTimer(timeout: number): void;
    protected hide(): void;
}
declare const Style = "\n.selector {\n    position: fixed;\n    left: 50%;\n    transform: translate(-50%, 0);\n    opacity: 0;\n    transition: top 400ms ease-in-out 0s, bottom 400ms ease-in-out 0s, opacity 500ms ease-in-out 0ms;\n  }\n  .selector > .container {\n    box-sizing: border-box;\n    max-width: 350px;\n    border-radius: 23px;\n    background-color: rgb(58, 58, 58);\n    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);\n    overflow: hidden;\n  }\n  .selector > .container > .title {\n    box-sizing: border-box;\n    padding: 10px 20px;\n    text-align: center;\n    font-size: 0.9375rem;\n    color: rgb(240, 240, 240);\n    margin: 0;\n  }\n  \n  .selector.visible {\n    opacity: 1;\n  }\n  \n  .selector.bottom {\n    bottom: 25px;\n  }\n  \n  .selector.top {\n    top: 25px;\n  }\n  \n  .selector.light > .container {\n    background-color: #fbfbfb;\n  }\n  .selector.light > .container > .title {\n    color: #555;\n  }\n  \n  @media only screen and (max-width: 500px) {\n    .selector {\n      width: calc(100% - 24px);\n      max-width: unset;\n      left: 12px;\n      transform: translate(0, 0);\n      display: flex;\n      justify-content: center;\n    }\n  }/*# sourceMappingURL=selector.css.map */\n";