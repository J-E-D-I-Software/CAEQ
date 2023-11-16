const pug = require('pug');
const dotenv = require('dotenv');
const { htmlToText } = require('html-to-text');
const sgMail = require('@sendgrid/mail');
const AppError = require('./appError');

// Read env variables and save them
dotenv.config({ path: '../.env' });

if (process.env.NODE_ENV !== 'test') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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
    constructor(
        user = null,
        url = '',
        subject = '',
        message = '',
        imageUrl = '',
        course = null,
        gathering = null,
    ) {
        if (course != null) {
            this.courseName = course.courseName;
            this.courseModality = course.modality;
            this.courseDescription = course.description;
            this.courseImageUrl = course.imageUrl;
            this.courseStartDate = course.startDate.toISOString().split('T')[0];
            this.courseEndDate = course.endDate.toISOString().split('T')[0];
        }

        if (gathering != null) {
            this.gatheringTitle = gathering.title;
            this.gatheringLink = gathering.meetingLink;
            this.gatheringTime = gathering.meetingTime;
            this.gatheringMoreInfo = gathering.moreInfo;
            this.gatheringDay = gathering.day;
            this.gatheringMonth = gathering.month;
            this.gatheringYear = gathering.year;
        }

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
        // if (process.env.NODE_ENV === 'test') {
        //      return;
        // }

        if (!template || !subject) {
            return new AppError(
                `El template o el subject no pueden ser: ${template} o ${subject}. Ingresa un template y subject válidos.`,
                404
            );
        }

        let html;
        try {
            html = pug.renderFile(
                `${__dirname}/../views/emails/${template}.pug`,
                // The second argument will be an object of data that will populate the template
                {
                    firstName: this.firstName,
                    url: this.url,
                    subject,
                    message: this.message,
                    imageUrl: this.imageUrl,
                    courseName: this.courseName,
                    courseModality: this.courseModality,
                    courseDescription: this.courseDescription,
                    courseImageUrl: this.courseImageUrl,
                    courseStartDate: this.courseStartDate,
                    courseEndDate: this.courseEndDate,
                    gatheringTitle: this.gatheringTitle,
                    gatheringLink: this.gatheringLink,
                    gatheringTime: this.gatheringTime,
                    gatheringMoreInfo: this.gatheringMoreInfo,
                    gatheringDay: this.gatheringDay,
                    gatheingMonth: this.gatheringMonth,
                    gatheringYear: this.gatheringYear,
                }
            );
        } catch (error) {
            console.log(error);
        }

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

    /**
     * Sends an email alert to a user when their payment has been accepted for a course.
     * @param {Object} user - The user object to send the email to.
     * @param {Object} course - The course object for which the payment was accepted.
     * @returns {Promise} A promise that resolves when the email has been sent.
     */
    static async sendPaymentAcceptedAlert(user, course) {
        const email = new Email(user, '', '', '', '', course);
        return email.send(
            'acceptPaymentAndInscription',
            '¡Su inscripción ha sido confirmada!'
        );
    }

    /**
     * Sends a payment rejected alert email to the user.
     * @param {Object} user - The user object.
     * @param {Object} course - The course object.
     * @param {string} declinedReason - The reason for the payment rejection.
     * @returns {Promise} A promise that resolves when the email is sent.
     */
    static async sendPaymentRejectedAlert(user, course, declinedReason) {
        const email = new Email(user, '', '', declinedReason, '', course);
        return email.send('rejectPayment', 'Su pago ha sido rechazado');
    }


    /**
     * Sends an email to the user notifying them that a new course has been created.
     * @param {Object} user - The user object to send the email to.
     * @param {Object} course - The course object that was created.
     * @returns {Promise} A promise that resolves when the email has been sent.
     */
    static async sendNewCourseCreatedEmail(users, course) {
        const promises = users.map(async (user) => {
            const email = new Email(user, '', '', '', '', course);
            return email.send('newCourseCreated', '¡Tenemos un nuevo curso para ti!');
        });
        await Promise.all(promises);
    }


    /**
     * Sends an email to all users in the provided array, notifying them of a new course.
     * @param {Array} users - An array of user objects to send the email to.
     * @param {Object} course - The course object to include in the email.
     * @returns {Promise} - A Promise that resolves when all emails have been sent.
     */
    static async sendNewGatheringCreatedEmail(users, gathering) {
        const promises = users.map(async (user) => {
            const email = new Email(user, '', '', '', '', null, gathering);
            return email.send('newGatheringCreated', 'ASAMBLEA COLEGIO DE ARQUITECTOS DEL ESTADO DE QUERÉTARO');
        });
        await Promise.all(promises);
    }
};
