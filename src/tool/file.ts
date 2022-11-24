import { saveAs } from 'file-saver'


export function FileSave(blob:Blob,fileName:string){
    saveAs(blob,fileName)
}