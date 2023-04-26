import dayjs from 'dayjs';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from './font';

pdfMake.vfs = pdfFonts;

export function generatePDF(restaurantName, itemList, table, id, totalAmount) {
    const docDefinition = {
        pageSize: { width: 500, height: 600 },
        content: [
            { text: restaurantName, style: 'header' },
            {
                text: dayjs().format('D-MM-YYYY  hh:mm A'),
            },
            { text: '\n' },
            { text: `Order ID: ${id}, Table: ${table}` },
            { text: '\n' },
            { text: 'Items:' },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*'],
                    body: [
                        ['Item', 'Quantity', 'Price', 'Subtotal'],
                        ...itemList.map(item => [
                            item.name,
                            item.quantity,
                            item.price,
                            item.quantity * item.price,
                        ]),
                    ],
                },
            },
            { text: `Total Amount:  ${totalAmount} Rs.`, style: 'subheader' },
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20],
            },
            subheader: {
                fontSize: 18,
                bold: true,
                margin: [0, 15, 0, 5],
            },
        },
    };
    // @ts-ignore
    pdfMake.createPdf(docDefinition).open();
}
