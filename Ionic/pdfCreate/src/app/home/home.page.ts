import { Component } from '@angular/core';
import { Capacitor, Plugins } from '@capacitor/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@capacitor-community/file-opener';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pdfObj: any;

  constructor() { }

  docDef = {
    content: [
      {
        table: {
          body: [
            ['demo pdf column']
          ]
        }
      }
    ]
  };

  pdfDoc = pdfMake.createPdf(this.docDef);
  isNative: boolean = Capacitor.isNativePlatform();

  private getBase64Async(pdfDoc: any): Promise<string> {
    return new Promise((resolve, reject) => {
      pdfDoc.getBase64((base64String: string) => {
        resolve(base64String);
      });
    });
  }
  async convertToBase64(): Promise<string> {
    try {
      const base64String = await this.getBase64Async(this.pdfDoc);
      return base64String;
    } catch (error) {
      console.error('Error converting PDF to base64:', error);
      throw error;
    }
  }
  async openpdf(fileUri: string) {
    FileOpener.open({
      filePath: fileUri,
      contentType: 'application/pdf',
    }).then(() => {
      console.log('File opened successfully');
    }).catch(error => {
      console.error('Error opening file:', error);
    });
  }
  async requestperm(): Promise<boolean> {
    const perm = await Filesystem.checkPermissions();
    if (perm.publicStorage == 'granted') {
      return true;
    } else {
      const req = await Filesystem.requestPermissions();
      if (req.publicStorage == 'granted') {
        return true;
      }
      else {
        return false;
      }
    }
  }
  async savePdf() {
    const permission = await this.requestperm()

    if (permission) {
      const data = await this.convertToBase64();
      try {



        const result = await Filesystem.writeFile({
          path: 'example.pdf',
          data: data,
          directory: Directory.Documents,

        });
        console.log(result)

        console.log('File saved successfully:', result.uri);

        this.openpdf(result.uri);
      } catch (error) {
        console.error('Error saving file:', error);
      }
    } else {
      this.requestperm();
    }
  }


}
