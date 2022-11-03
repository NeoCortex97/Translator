import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import Raw from '@editorjs/raw';
import Underline from '@editorjs/underline';
import edjsParser from  'editorjs-html';
import ClipboardJS from 'clipboard';
import './simple-grid.min.css';

const preview = document.getElementById('content');
const copyButton = document.getElementById('copy');
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');
const loadDialog = document.getElementById('loadDialog');
const loadSelect = document.getElementById('loadSelect');
const loadOk = document.getElementById('ok');
const parser = edjsParser({paragraph: text, raw: raw});
const clipboard = new ClipboardJS('#copy');

let refresh: any = undefined;

window.addEventListener('load', (evt) => {
    saveButton?.addEventListener('click', (ev) => {
        ev.preventDefault();
        const name = prompt("Unter welcher Bezeichnung soll dieses Dokument gespeichert werden?", "temp");
        editor.save().then((data) => {
            console.log(`Saved to ${name}`);
            if (name !== null)
                window.localStorage.setItem(name, JSON.stringify(data.blocks));
        }).catch((reason) => console.error(reason));
    });

    loadButton?.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (editor.blocks.getBlocksCount() !== 1 || !editor.blocks.getBlockByIndex(0).isEmpty) {
            const toSave = confirm("Möchten die das aktuelle Dokument speichern?");
            if (toSave) {
                const saveName = prompt("Unter welcher Bezeichnung soll dieses Dokument gespeichert werden?", "temp");
                editor.save().then((data) => {
                    console.log(`Saved to ${saveName}`);
                    if (saveName !== null)
                        window.localStorage.setItem(saveName, JSON.stringify(data.blocks));
                }).catch((reason) => console.error(reason));
            }
        }
        let saves: Array<any> = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            const element = window.localStorage.key(i);
            saves.push(element)
        }
        console.log(saves);
        if (loadSelect !== null)
            loadSelect.innerHTML = "";
        for (const item of saves) {
            const option = document.createElement('option');
            option.textContent = item
            option.value = item;
            loadSelect?.appendChild(option); 
        }
        
        loadDialog?.showModal();
    });

    loadSelect?.addEventListener('change', (ev) => {
        loadOk.value = loadSelect.value;
    });

    loadDialog?.addEventListener('close', (ev) => {
        const doc = JSON.parse(window.localStorage.getItem(loadDialog.returnValue));
        editor.blocks.clear()
        console.log(doc)
        for (const i of doc) {
            editor.blocks.insert(i['type'], i['data'])
        }
        editor.blocks.delete(0);
    });
});

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