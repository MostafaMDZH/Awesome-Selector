import Head from 'next/head'
import Cookies from 'universal-cookie';
import Link from 'next/link'
import Snackbar from 'awesome-snackbar';
import Selector from 'awesome-selector';

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

    setTimeout(() => {
        Selector({
			// title: 'Select a language:',
			// isSearchable: false,
            searchPlaceholder: 'Search me...',
			options: [
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'en',
					name: 'English'
				},
				{
					id: 'fr',
					name: 'French'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
				{
					id: 'es',
					name: 'Spanish'
				},
			],
			onSelect: (id, name) => {
				console.log(id, name);
			}
        });
    }, 1000);

    //render:
    return (
        <div id='window' style={{scrollBehavior:'smooth'}}>

            

        </div>
    )
}