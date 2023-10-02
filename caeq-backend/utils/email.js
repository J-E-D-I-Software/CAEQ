const pug = require('pug');
const dotenv = require('dotenv');
const { htmlToText } = require('html-to-text');
const sgMail = require('@sendgrid/mail');

// Read env variables and save them
dotenv.config({ path: '../.env' });

if (process.env.NODE_ENV !== 'test') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/* Create a class called Email.*/
module.exports = class Email {
    /**
     * Create an Email instance.
     * @param {object} user - The user object that contains the email and name of the user.
     * @param {string} [url=''] - The URL that the user will be sent to in order to reset their password.
     */
    constructor(user, url = '') {
        this.to = user.email;
        this.firstName = user.fullName.split(' ')[0];
        this.url = url;
        this.from = { email: process.env.MAIL_USERNAME };
    }

    /**
     * Send an email using a template and subject.
     * @param {string} template - The name of the template file that we want to use.
     * @param {string} subject - The subject of the email.
     * @returns {Promise} A promise that resolves when the email is sent.
     */
    async send(template, subject) {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            // The second argument will be an object of data that will populate the template
            {
                firstName: this.firstName,
                url: this.url,
                subject,
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
        await this.send(
            'adminAccepted',
            'Hemos verificado tu perfil! Bienvenido a la familia CAEQ!'
        );
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
        await this.send('passwordReset','Recuperar contraseña (válido por sólo 10 minutos)');
    }

};
