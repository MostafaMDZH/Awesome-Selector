import Head from 'next/head'
import Cookies from 'universal-cookie';
import Link from 'next/link'
import Snackbar from 'awesome-snackbar';

export default function Main(){

    //copyTextToClipboard:
	const copyTextToClipboard = (text) => {
		if(!navigator.clipboard){
			fallbackCopyTextToClipboard(text);
		}else{
			navigator.clipboard.writeText(text).then(function(){
                Snackbar('Copied to clipboard 👍');
			},function(err){
                Snackbar('cannot copy 👎');
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
            Snackbar('Copied to clipboard 👍');
		}catch(err){
            Snackbar('cannot copy 👎');
		}
		document.body.removeChild(textArea);
	}

    //render:
    return (
        <div id='window' style={{scrollBehavior:'smooth'}}>

            

        </div>
    )
}