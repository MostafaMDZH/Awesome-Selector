import Head from 'next/head'
import Cookies from 'universal-cookie';
import Link from 'next/link'
import Selector from 'awesome-selector-component';

let isWelcomeTstShow = false;
let Tst = null;

export default function Main(){

    //copyTextToClipboard:
	const copyTextToClipboard = (text) => {
		if(!navigator.clipboard){
			fallbackCopyTextToClipboard(text);
		}else{
			navigator.clipboard.writeText(text).then(function(){
                Selector('Copied to clipboard 👍');
			},function(err){
                Selector('cannot copy 👎');
			});
		}
	}

	//fallbackCopyTextToClipboard:
	const fallbackCopyTextToClipboard = (text) => {
		let textArea = document.createElement("textarea");
		textArea.value			= text;
		textArea.style.top		= "0";//avoid scrolling to bottom:
		textArea.style.left		= "0";
		textArea.style.position	= "fixed";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try{
			document.execCommand('copy');
            Selector('Copied to clipboard 👍');
		}catch(err){
            Selector('cannot copy 👎');
		}
		document.body.removeChild(textArea);
	}

    //welcome selector:
    const cookies = new Cookies();
    setTimeout(() => {
        if(isWelcomeTstShow) return;
        if(cookies.get('WelcomeTst') !== undefined) return;
        isWelcomeTstShow = true;
        Selector('Welcome to Awesome Selector! 👋', {
            position: 'top',
            timeout: 3000,
            theme: 'light',
            afterHide: () => {
                Selector('Click on code sections to run the demo', {
                    position: 'top',
                    theme: 'light',
                    waitForEvent: true,
                    afterHide: () => cookies.set('WelcomeTst', 'yes', { path: '/', maxAge: 1000*24*60*60 })
                });
            }
        });
    }, 2000);

    //render:
    return (
        <div id='window' style={{scrollBehavior:'smooth'}}>

            <Head>
                <title>Awesome Selector | React, Javascript, and Typescript compatible selector</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            {/* header */}
            <header id='header'>
                <Link href='https://awesome-components.demos.mostafa-mdzh.ir/'><a className='headerLink'>Awesome Components</a></Link>
                <Link href='https://www.buymeacoffee.com/mostafamdzh'><a className='headerLink' id='coffee'>buy me a coffee! :)</a></Link>
            </header>

            <div id='container'>

                <div id='main'>

                    {/* navigation */}
                    <div id='navigation'>
                        <div id='navigationWrapper'>
                            <a className='navLink' href='#installation'  >installation  </a>
                            <a className='navLink' href='#position'      >position      </a>
                            <a className='navLink' href='#theme'         >theme         </a>
                            <a className='navLink' href='#custom-style'  >custom style  </a>
                            <a className='navLink' href='#timing'        >timing        </a>
                            <a className='navLink' href='#wait-for-event'>wait for event</a>
                            <a className='navLink' href='#update-on-fly' >update on fly </a>
                            <a className='navLink' href='#after-hide'    >after hide    </a>
                        </div>
                    </div>

                    {/* content */}
                    <div id='content'>

                        <a href='https://github.com/MostafaMDZH/Awesome-Selector' id='github'>Github</a>

                        {/* intro */}
                        <h3 id='awesome'><Link href='/'>Awesome</Link></h3>
                        <div id='name-versionWrapper'>
                            <h1 id='appName'><Link href='/'>Selector</Link></h1>
                            <a id='version'>V1.0.0</a>
                        </div>
                        <p className='sectionDescription'>React, Javascript, and Typescript compatible selector</p>

                        {/* installation */}
                        <h3 className='sectionName' id='installation'><a href='#installation'># Installation</a></h3>
                        <p className='step'><a className='bold'>{'>'} step 1 : </a>you can use either npm or yarn, or import the main file with the script tag.</p>
                        <div className='codeWrapper'>
                            <p className='comment'># npm</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('npm i awesome-selector-component')}>
                                <p>npm i <span>awesome-selector-component</span></p>
                            </button>
                            <p className='comment'># yarn</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('yarn add awesome-selector-component')}>
                                <p>yarn add <span>awesome-selector-component</span></p>
                            </button>
                            <p className='comment'>
                                # html (download the selector.js file from the&nbsp;
                                <a href='https://github.com/MostafaMDZH/Awesome-Selector/tree/main/src'>src</a>
                                &nbsp;directory)
                            </p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('<script src="selector.js"></script>')}>
                                <p>{"<script src=\""}<span>selector.js</span>{"\"></script>"}</p>
                            </button>
                        </div>
                        <p className='step'><a className='bold'>{'>'} step 2 : </a>include the package in your code:</p>
                        <div className='codeWrapper'>
                            <p className='comment'># npm and yarn</p>
                            <button className='codeSection copyable' onClick={()=>copyTextToClipboard('import Selector from \'awesome-selector-component\'')}>
                                <p>import <span>Selector</span> from <span>&apos;awesome-selector-component&apos;</span></p>
                            </button>
                        </div>
                        <p className='step'><a className='bold'>{'>'} step 3 : </a>start making selectors!</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable' onClick={()=>Selector('Hello World! 👋')}>
                                <p><span>Selector</span>(&apos;Hello world! 👋&apos;);</p>
                            </button>
                        </div>

                        {/* position */}
                        <h3 className='sectionName' id='position'><a href='#position'># Position</a></h3>
                        <p className='sectionDescription'>You can position the selector by setting the position parameter:</p>
                        <div className='codeWrapper'>
                            <p className='comment'># bottom(default)</p>
                            <button className='codeSection executable'
                                onClick={() => Selector(`I'm at the bottom`, { position: 'bottom' })}>
                                <p>
                                    {"Selector(`I'm at the bottom`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'bottom'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># top</p>
                            <button className='codeSection executable'
                                onClick={() => Selector(`I'm at the top`, { position: 'top' })}>
                                <p>
                                    {"Selector(`I'm at the top`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"position: 'top'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* theme */}
                        <h3 className='sectionName' id='theme'><a href='#theme'># Theme</a></h3>
                        <p className='sectionDescription'>The default theme is dark, but you can enable the light theme with the theme parameter:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => Selector(`Today is sunday!`, { theme: 'light'})}>
                                <p>
                                    {"Selector(`Today is sunday!`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"theme: 'light'"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* custom style */}
                        <h3 className='sectionName' id='custom-style'><a href='#custom-style'># Custom Style</a></h3>
                        <p className='sectionDescription'>The Awesome Selector&apos;s html markup is equivalent to below:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection'>
                                <p>
                                    {"<div class='"}<span>{"container'"}</span>{">"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"<p class='"}<span>{"message'"}</span>{"></p>"}<br></br>
                                    {"</div>"}
                                </p>
                            </button>
                        </div>
                        <p className='sectionDescription'>So you can apply your custom style in a form of an array of classes:</p>
                        <div className='codeWrapper'>
                            <p className='comment'># you can even add your custom markup (like the &apos;bold&apos; class below)</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Selector(`Your account has been <a class='bold'>removed!</a>`,{
                                        style: {
                                            container: [
                                                ['background-color', 'red']
                                            ],
                                            message: [
                                                ['color', '#eee']
                                            ],
                                            bold: [
                                                ['font-weight', 'bold']
                                            ]
                                        }
                                    });
                                }}>
                                <p>
                                    {"Selector(`Your account has been "}<span>{"<a class='bold'>"}</span>{"removed!"}<span>{"</a>"}</span>{"`, { "}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"style: {"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"container: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['background-color', 'red']"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"message: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['color', '#eee'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"bold: ["}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"['font-weight', 'bold'],"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{"]"}</span><br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"}"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* timing */}
                        <h3 className='sectionName' id='timing'><a href='#timing'># Timing</a></h3>
                        <p className='sectionDescription'>The default timeout for hiding is 4 seconds but you can customize it with the timeout parameter:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => Selector(`Give me a second please...`, { timeout: 1000 })}>
                                <p>
                                    {"Selector(`Give me a second please...`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 1000"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># Notice: when the waitForEvent is set to true, if an event happens after the timeout value after creating the Snackbar, the timeout value divides by two.</p>
                            <p className='comment'># For example, if the timeout value is 4 seconds and an event happens 3 seconds after the Snackbar is created, 4 seconds later the hide animation starts, but if that event happens 5 seconds after the Snackbar is created, the hide animation starts in 2 seconds.</p>
                        </div>

                        <p className='sectionDescription'>Or you can set the timeout to zero so the auto-hide would be disabled (hiding would be available with the hide() function)</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    if(Tst === null)
                                        Tst = Selector(`I'm not going anywhere!`, { timeout: 0 });
                                }}>
                                <p>
                                    {"let tst = Selector(`I'm not going anywhere!`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"timeout: 0"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                            <p className='comment'># click to hide</p>
                            <button className='codeSection executable'
                                onClick={() => {Tst?.hide(); Tst = null;}}>
                                <p><span>{"tst.hide();"}</span></p><br></br>
                            </button>
                        </div>

                        {/* wait-for-event */}
                        <h3 className='sectionName' id='wait-for-event'><a href='#wait-for-event'># Wait For Event</a></h3>
                        <p className='sectionDescription'>By default, a selector doesn&apos;t wait for any events to hide, but if you want to ensure that the user has seen your message, you can enable this feature with the waitForEvent parameter, so until the user does not interact with the page, the selector doesn&apos;t hide:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    setTimeout(() => {
                                        Selector(`I'm not going to hide until an event happens`, { waitForEvent: true });
                                    }, 100);
                                }}>
                                <p>
                                    {"Selector(`I'm not going to hide until an event happens`), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"waitForEvent: true"}</span><br></br>
                                    {" });"}
                                </p>
                            </button>
                        </div>

                        {/* update on fly */}
                        <h3 className='sectionName' id='update-on-fly'><a href='#update-on-fly'># Update On Fly</a></h3>
                        <p className='sectionDescription'>If you store the returned object from the Selector() function, you can set some of its attributes after its created:</p>
                        <div className='codeWrapper'>
                            
                            <p className='comment'># create a simple selector</p>
                            <button className='codeSection executable'
                                onClick={() => {if(Tst === null) Tst = Selector(`I'm a simple selector`, { timeout: 0 });}}>
                                <p>{"let "}<span>tst</span>{" = Selector(`I'm a simple selector`), { timeout: 0 });"}</p>
                            </button>

                            <p className='comment'># update the text</p>
                            <button className='codeSection executable'
                                onClick={() => Tst?.setMessage('I can change my massage')}>
                                <p>{"tst."}<span>{"setMessage"}</span>{"('I can change my massage');"}</p><br></br>
                            </button>

                            <p className='comment'># change the position</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Tst?.setMessage('Or change my position!');
                                    Tst?.setPosition('top');
                                }}>
                                <p>{"tst."}<span>{"setPosition"}</span>{"('top');"}</p><br></br>
                            </button>

                            <p className='comment'># change the theme</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Tst?.setMessage('Or change my theme');
                                    Tst?.setTheme('light');
                                }}>
                                <p>{"tst."}<span>{"setTheme"}</span>{"('light');"}</p><br></br>
                            </button>

                            <p className='comment'># change the style</p>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Tst?.setMessage('Even the style!');
                                    Tst?.setStyle({
                                        container: [['background-color', '#072']],
                                        message: [['color', '#fd0']]
                                    });
                                }}>
                                <p>
                                    {"tst."}<span>{"setStyle"}</span>{"({"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"container: [['background-color', '#072']],"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{"message: [['color', '#fd0']],"}<br></br>
                                    {"});"}
                                </p>
                            </button>

                            <p className='comment'># and hide</p>
                            <button className='codeSection executable'
                                onClick={() => {Tst?.hide(); Tst = null;}}>
                                <p>tst.<span>hide();</span></p>
                            </button>

                        </div>

                        {/* after hide */}
                        <h3 className='sectionName' id='after-hide'><a href='#after-hide'># After Hide</a></h3>
                        <p className='sectionDescription'>When the waitForEvent is set to true, the hide function is waiting for an event to start hiding timeout, so it may not occur exactly after the specified timeout after selector creation, so if you want to run a function after your selector hides, you can use the afterHide parameter for it:</p>
                        <div className='codeWrapper'>
                            <button className='codeSection executable'
                                onClick={() => {
                                    Selector('Marco...', {
                                        afterHide: () => Selector('Polo!')
                                    });
                                }}>
                                <p>
                                    {"Selector('Marco...'), {"}<br></br>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{"afterHide"}</span>{": () => Selector('Polo!')"}<br></br>
                                    {"});"}
                                </p>
                            </button>
                        </div>

                    </div>

                </div>

            </div>

            {/* footer */}
            <footer id='footer'>
                <p>Made by <a href='https://github.com/MostafaMDZH'>Mostafa Mohammadzadeh</a></p>
                <p id='dash'>-</p>
                <p id='githubLink'>Source on <a href='https://github.com/MostafaMDZH/Awesome-Selector'>Github</a></p>
                <p id='awesomeComponents'>From <Link href='https://awesome-components.demos.mostafa-mdzh.ir/'><a>Awesome Components</a></Link></p>
            </footer>

        </div>
    )
}