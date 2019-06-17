module.exports = rsId => {
  const today = new Date();
  return `
  <html style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;"></html>
<!DOCTYPE html>
<html lang="en" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  
  <body style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
    <div class="wrapper" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
    <div class="container " style="font-family: Verdana, Geneva, Tahoma, sans-serif; max-width: 900px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: justify; border: 1px solid red; margin: 10px auto 0 auto;">
      <div class="row" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; max-width: 50%; display: inline-block; padding: 10px;">
        <div class="col  " style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
          <h3 style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; padding: 10px;">Return Request</h3>
          <p style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
            Hi, this is to notify about the return request raised by distributor:<b>${rsId}</b>
            dated <b>${`${today.getDate()}. ${today.getMonth() +
              1}. ${today.getFullYear()}.`}</b> The return details can be viewed in the attached
            pdf.Please confirm or reject the return using the buttons given
            below.
          </p>
        </div>
      </div>
      <div class="row" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; max-width: 50%; display: inline-block; padding: 10px;">
        <div class="col" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
          
        <button  class="btn-primary" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; padding: 10px; border-radius: 5px; background: #2233ff;">
            <a class="linkstyle" href="http://localhost:5000/api/claims/123456/status/70" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; text-decoration: none; color: #fff;">Accept</a>
          </button>
        
          <button  class="btn-danger" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; padding: 10px; border-radius: 5px; background: #ff3322;">
            <a class="linkstyle" href="http://localhost:5000/api/claims/123456/status/71" style="border: 0px; margin: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif; text-decoration: none; color: #fff;">Reject</a>
          </button>
          </div>
        </div>
      </div>
    </div>
  
  </body>
</html>

  
    `;
};
