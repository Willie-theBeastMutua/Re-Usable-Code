import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
const styles = {
  header: {
    fontSize: 18,
    bold: true
  },
  subheader: {
    fontSize: 16,
    bold: true
  }
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pdfObj: void | undefined;
  margins: [number, number, number, number] = [10, 20, 30, 40];
  pdfdownload() {
    const docDef = {
      styles: styles,
      pageMargins: this.margins,
      content: [
        {
          text: 'This is a header',
          style: 'header'
        },
        {
          text :"\n"
        },
        { text: 'Tables', style: 'header' },
        { text: 'A simple table', style: 'subheader' },
        'This is a simple table for test',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        },

      ],
    };

    this.pdfObj = pdfMake.createPdf(docDef).download();
  }

  constructor() { }
}
