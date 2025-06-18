import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL, // your Gmail address
              pass: process.env.GMAIL_APP_PASSWORD, // app password, not your main Gmail password
            },
        });
    }

    async sendContactEmail(
        name: string, 
        email: string, 
        phone: string,
        subject: string,
        message: string,
    ): Promise<void> {
        const mailOptions = {
          from: `"${name}" <${email}>`,
          to: process.env.GMAIL, // your Gmail inbox
          subject: `New Contact Inquiry from ${name} | ${subject}`,
          text: `
            Name: ${name}
            Phone: ${phone}
            Email: ${email}
            Message:
            ${message}
          `,
        };
    
        try {
          await this.transporter.sendMail(mailOptions);
          console.log(`Contact email from ${email} sent successfully.`);
        } catch (error) {
          console.error('Error sending contact email:', error);
          throw error;
        }
      }
}