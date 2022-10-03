import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Raw from '@editorjs/raw';
import Underline from '@editorjs/underline';
import edjsParser from  'editorjs-html';
import ClipboardJS from 'clipboard';
import './simple-grid.min.css';

const preview = document.getElementById('content');
const copyButton = document.getElementById('save');
const parser = edjsParser({paragraph: text, raw: raw});
const clipboard = new ClipboardJS('#copy');

let refresh: any = undefined;

const editor = new EditorJS({
    holder: 'markup',
    autofocus: true,
    tools: {
        header: {
            class: Header,
            inlineToolbar: true,
        },
        list: {
            class: List,
            inlineToolbar: true,
        },
        raw: {
            class: Raw,
            inlineToolbar: true,
        },
        underline: {
            class: Underline,
            inlineToolbar: true,
        },
    },
    onChange: (api, event) => {
        if (refresh !== undefined) {
            clearTimeout(refresh);
        }
        refresh = setTimeout(update, 500);
      }
});

function update() {
    editor.save().then((outputData) => {
        let html: string = parser.parse(outputData).join('');
        if (html.slice(-4) === "<br>") html = html.slice(0, html.length - 4)
        if (preview !== undefined) preview.innerText = html;
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
}

function text(block: any) {
    console.log(block)
    return `${block.data.text}<br>`;
}

function raw(block:any) {
    return block.data.text;
}