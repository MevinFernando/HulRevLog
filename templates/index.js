module.exports = data => {
  const today = new Date();
  return `
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>Return PDF</title>
        <style>
           .invoice-box {
           max-width: 800px;
           margin: auto;
           padding: 30px;
           border: 1px solid #eee;
           box-shadow: 0 0 10px rgba(0, 0, 0, .15);
           font-size: 16px;
           line-height: 24px;
           font-family: 'Helvetica Neue', 'Helvetica',
           color: #555;
           }
           .margin-top {
           margin-top: 50px;
           }
           .justify-center {
           text-align: center;
           }
           .invoice-box table {
           width: 100%;
           line-height: inherit;
           text-align: left;
           }
           .invoice-box table td {
           padding: 5px;
           vertical-align: top;
           }
         //   .invoice-box table tr td:nth-child(2) {
         //   text-align: right;
         //   }
           .invoice-box table tr.top table td {
           padding-bottom: 20px;
           }
         //   .invoice-box table tr.top table td.title {
         //   font-size: 45px;
         //   line-height: 45px;
         //   color: #333;
         //   }
           .invoice-box table tr.information table td {
           padding-bottom: 40px;
           }
           .invoice-box table tr.heading td {
           background: #eee;
           border-bottom: 1px solid #ddd;
           font-weight: bold;
           }
           .invoice-box table tr.details td {
           padding-bottom: 20px;
           }
           .invoice-box table tr.item td {
           border-bottom: 1px solid #eee;
           }
           .invoice-box table tr.item.last td {
           border-bottom: none;
           }
           .invoice-box table tr.total td:nth-child(2) {
           border-top: 2px solid #eee;
           font-weight: bold;
           }
           @media only screen and (max-width: 600px) {
           .invoice-box table tr.top table td {
           width: 100%;
           display: block;
           text-align: center;
           }
           .invoice-box table tr.information table td {
           width: 100%;
           display: block;
           text-align: center;
           }
           }
        </style>
     </head>
     <body>
        <div class="invoice-box">
           <table cellpadding="0" cellspacing="0">
              <tr class="top">
                 <td colspan="2">
                    <table>
                       <tr>
                          <td class="title"><img  src="https://seeklogo.com/images/U/Unilever-logo-C7995A25D2-seeklogo.com.png"
                             style="width:100%; max-width:156px;"></td>
                          
                       </tr>
                    </table>
                 </td>
              </tr>
              <tr class="information">
                 <td colspan="2">
                    <table>
                       <tr>
                          
                            <td><b>RS Id:</b> ${data.rsId}</td> 
                            <td><b> RS Name:</b>${data.name}</td> 
                            <td><b> RS PAN:</b> ${data.pan}</td> 
                            <td><b> Suplier Id:</b>${data.supplierId}</td> 
                            <td>
                            Date: ${`${today.getDate()}. ${today.getMonth() +
                              1}. ${today.getFullYear()}.`}
                          </td>
                       </tr>
                    </table>
                 </td>
              </tr>
            <h4>Return Items</h4>
              <tr class="heading">
                  <td>Id</td>
                  <td>Name</td>
                  <td>PKD</td>
                  <td>QTY</td>
                  <td>Weight(g)</td>
                  <td>MRP</td>
                  <td>TUR</td>
                  <td>Reason</td>
                  <td>Taxbl. Amt</td>
                  <td>CGST(9%)</td>
                  <td>SGST(9%)</td>
                  <td>Tot.Amt</td>
              </tr>
                      ${data.items.map(
                        item =>
                          `<tr class="details">
                          <td>${item.id}</td>
                          <td>${item.name}</td>
                          <td>
                            ${item.pkd}
                          </td>
                          <td>${item.qty}</td>
                          <td>${item.weight}</td>
                          <td>${item.mrp}</td>
                          <td>${item.tur}</td>
                          <td>${item.reason}</td>
                          <td>${item.tot_tax_amt}</td>
                          <td>${item.cgst}</td>
                          <td>${item.sgst}</td>
                          <td>${item.tot_amt}</td>
                        </tr>`
                      )}
           </table>
           <br />
           <h4 class="justify-center">Net Quantity:${data.qty}</h4>
           <h4 class="justify-center">Net Weight:${data.weight}</h4>
           <h4 class="justify-center">Net Value: ${data.value}</h4>
        </div>
     </body>
  </html>
  `;
};
