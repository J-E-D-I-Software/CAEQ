const pug = require('pug');
const dotenv = require('dotenv');
const { htmlToText } = require('html-to-text');
const sgMail = require('@sendgrid/mail');

// Read env variables and save them
dotenv.config({ path: '../.env' });

//if (process.env.NODE_ENV !== 'test') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//}

/* Create a class called Email.*/
module.exports = class Email {
    /**
     * Represents an email object.
     * @constructor
     * @param {Object} user - The user object.
     * @param {string} [url=''] - The URL to include in the email.
     * @param {string} [subject=''] - The subject of the email.
     * @param {string} [message=''] - The message body of the email.
     * @param {string} [imageUrl=''] - The URL of an image to include in the email.
     */
    constructor(user, url = '', subject = '', message = '', imageUrl = '') {
        this.to = user.email;
        this.firstName = user.fullName.split(' ')[0];
        this.url = url;
        this.subject = subject;
        this.message = message;
        this.imageUrl = imageUrl;
        this.from = { email: process.env.MAIL_USERNAME };
    }

    /**
     * Send an email using a template and subject.
     * @param {string} template - The name of the template file that we want to use.
     * @param {string} subject - The subject of the email.
     * @returns {Promise} A promise that resolves when the email is sent.
     */
    async send(template, subject) {
        // if (process.env.NODE_ENV !== 'test') {
        //     return;
        // }

        console.log('subject', subject);
        console.log('URL de la imagen:', this.imageUrl);
        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            // The second argument will be an object of data that will populate the template
            {
                firstName: this.firstName,
                url: this.url,
                subject,
                message: this.message,
                imageUrl: this.imageUrl,
            }
        );

        // define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            // npm i html-to-text
            text: htmlToText(html, { wordwrap: 130 }),
        };

        return sgMail.send(mailOptions);
    }

    /**
     * Send a welcome email to the user.
     * @example
     * const user = {
     *     email: 'pablocesarjimenezvilleda@gmail.com',
     *     fullName: 'Pablo Jimenez',
     * };
     * const email = new Email(user, 'www.google.com')
     *     .sendWelcomeUser()
     *     .then(() => {
     *         console.log('Email sent');
     *     })
     *     .catch((err) => {
     *         console.log(err);
     *         console.log(err.response.body);
     *     });
     */
    async sendWelcomeUser() {
        // esto va a ser una pug template
        await this.send('welcomeUser', 'Bienvenido a la familia CAEQ!');
    }

    /**
     * Send a welcome email to an administrator.
     */
    async sendWelcomeAdmin() {
        // esto va a ser una pug template
        await this.send(
            'welcomeAdmin',
            'Bienvenido a la familia CAEQ! Un administrador revisará tu perfil.'
        );
    }

    /**
     * Send an email to notify that an administrator's request is accepted.
     */
    async sendAdminAccepted() {
        // esto va a ser una pug template
        const response = await this.send(
            'adminAccepted',
            'Hemos verificado tu perfil! Bienvenido a la familia CAEQ!'
        );
        console.log('response email.js', response);
    }

    /**
     * Send an email to notify that an administrator's request is rejected.
     */
    async sendAdminRejected() {
        // esto va a ser una pug template
        await this.send('adminRejected', 'Hemos rechazado tu perfil de acceso.');
    }

    /*
     * Send a password reset email to the user.
     * Note: This method is commented out in the original code.
     */

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Recuperar contraseña (válido por sólo 10 minutos)'
        );
    }

    /**
     * Sends an announcement email to all users in the provided array.
     * @async
     * @static
     * @param {Array} users - An array of user objects to send the email to.
     * @param {string} subject - The subject of the email.
     * @param {string} message - The message body of the email.
     * @param {string} imageUrl - The URL of the image to include in the email.
     * @returns {Promise} A promise that resolves when all emails have been sent.
     */
    static async sendAnouncementToEveryone(users, subject, message, imageUrl) {
        const promises = users.map(async (user) => {
            const email = new Email(user, '', subject, message, imageUrl, imageUrl);
            return email.send('sendToEveryone', subject);
        });
        await Promise.all(promises);
    }

    static async send(){
        
    }
};
