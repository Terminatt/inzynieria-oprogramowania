const nodemailer = require('nodemailer');
const config = require("../../../config/config");
const _ = require("lodash");
const registrationMailTemplate = require("./templates/registrationMail.template");
const mailTemplate = require('./templates/mail.template');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport(config.mail);
        this.mainTemplateGenerator = _.template(mailTemplate);
        this.mailSubject = ' | Ebooks';
        this.mailOptions = {
            from: 'ebooks@overcloud.usermd.net',
            attachDataUrls: true
        }
    }

    serializeData(data) {
        try {
            if (_.isObject(data)) {
                let serialized = {};
                _.each(data, (value, key) => {
                    if (_.isString(value)) {
                        value = _.escape(value);
                    }
                    if (_.isString(key)) {
                        key = _.escape(key);
                    }
                    serialized[key] = value;
                });
                return serialized;
            } else {
                throw new AppError("Brak danych", 422);
            }
        } catch (err) {
            throw new AppError(err.message);
        }
    }

    async sendRegisterMail(data, token) {
        try {
            let mailTo = data.email;
            let name = data.name;
            let registerTemplateGenerator = _.template(registrationMailTemplate);
            token = `${process.env.API_HOST}/activateAccount/${token}`;
            let registerContent = registerTemplateGenerator({
                name: name,
                token: token
            });
            let mainContent = this.mainTemplateGenerator({ content: registerContent, mailTitle: name + ', dokończ rejestrację.' + this.mailSubject });
            await this.transporter.sendMail(Object.assign({}, this.mailOptions, {
                to: mailTo,
                subject: name + ', dokończ rejestrację.' + this.mailSubject,
                html: mainContent,
                priority: 'high'
            }));
            return true;
        } catch (err) {
            throw new AppError(err.message);
        }
    }

}

module.exports = new MailService();