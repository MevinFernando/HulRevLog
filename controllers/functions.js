const nodemailer = require("nodemailer");
const emailTemplate = require("../templates/mail");

exports.mailer = () => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mfmevins@gmail.com",
      pass: "nbaqjhbtyxxsdrjv"
    }
  });

  var mailOptions = {
    from: "mfmevins@gmail.com",
    to: "mfmevins@gmail.com",
    subject: "Distributor Claim Details",
    text: "Verify PDF and Approve or Reject Claim",
    html: emailTemplate(123456),
    attachments: [
      {
        filename: "claim-details.pdf",
        path: "public/documents/claim-details.pdf",
        contentType: "application/pdf"
      }
    ]
  };

  return transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
};
