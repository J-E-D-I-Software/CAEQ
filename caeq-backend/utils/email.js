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
     * The constructor function is a special method for creating and initializing an object created
     * within a class.
     * @param user - The user object that contains the email and name of the user.
     * @param url - The URL that the user will be sent to in order to reset their password.
     */
    /*The constructor is taking in two parameters, user and url.
    The constructor is also setting the to, firstName, url, and from properties*/
    constructor(user, url = '') {
        this.to = user.email;
        this.firstName = user.fullName.split(' ')[0];
        this.url = url;
        this.from = { email: process.env.MAIL_USERNAME };
    }

    /**
     * The function takes in a template and a subject, renders the template using the data from the
     * object, defines the email options, creates a new transport and sends the email.
     * @param template - The name of the template file that we want to use.
     * @param subject - The subject of the email
     */

    /* The send method is rendering the html based on the template and subject. 
    The send method is also defining the mail options and sending the email. */
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
     * The function sendWelcome() is an asynchronous function that sends a welcome message to the user.
     * Example
     * 
        const user = {
            email: 'pablocesarjimenezvilleda@gmail.com',
            fullName: 'Pablo Jimenez',
        };

        const email = new Email(user, 'www.google.com')
            .sendWelcome()
            .then(() => {
                console.log('email sent');
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response.body);
            });
     */
    /* The sendWelcome method is calling the send method and passing in the welcome template and subject.*/
    async sendWelcomeUser() {
        // esto va a ser una pug template
        await this.send('welcomeUser', 'Bienvenido a la familia CAEQ!');
    }
    /* The sendWelcome method is calling the send method and passing in the welcome template and subject.*/
    async sendWelcomeAdmin() {
        // esto va a ser una pug template
        await this.send(
            'welcomeAdmin',
            'Bienvenido a la familia CAEQ! Un administrador revisará tu perfil.'
        );
    }
    /* The sendWelcome method is calling the send method and passing in the welcome template and subject.*/
    async sendAdminAccepted() {
        // esto va a ser una pug template
        await this.send(
            'adminAccepted',
            'Hemos verificado tu perfil! Bienvenido a la familia CAEQ!'
        );
    }
    /* The sendWelcome method is calling the send method and passing in the welcome template and subject.*/
    async sendAdminRejected() {
        // esto va a ser una pug template
        await this.send('adminRejected', 'Hemos rechazado tu perfil de acceso.');
    }

    /**
     * It sends a password reset email to the user.
     */

    /* The sendPasswordReset method is calling the send method and passing in the passwordReset template */
    /*async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Recuperar contraseña (válido por sólo 10 minutos)'
        );
    }*/
};
