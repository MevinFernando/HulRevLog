module.exports = () => {
  const today = new Date();
  return `
    <html>
   
    </html>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      
      <a href="http://localhost:5000/api/distributors/return/123456/status/60">Accept</a>
      <a href="http://localhost:5000/api/distributors/return/123456/status/61">Reject</a>
    </body>
    </html>
    `;
};
