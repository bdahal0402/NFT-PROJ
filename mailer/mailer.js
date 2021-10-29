require('dotenv').config();
var SibApiV3Sdk = require('sib-api-v3-sdk');

module.exports = {
    sendEmail(subject, to, html) {
        let from = process.env.APPLICATION_NAME
        return new Promise((resolve, reject) => {
            var defaultClient = SibApiV3Sdk.ApiClient.instance;
            var apiKey = defaultClient.authentications['api-key'];
            apiKey.apiKey = process.env.SIB_EMAIL_API_KEY;

            let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

            let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

            sendSmtpEmail.subject = subject;
            sendSmtpEmail.htmlContent = html;
            sendSmtpEmail.sender = { "name": from, "email": from + "@kf-nft.com" };
            sendSmtpEmail.to = [{ "email": to }];

            apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    }
}