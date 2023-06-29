const nodemailer = require('nodemailer');

const sendPasswordResetEmail = async ( resetToken) => {
  try {
 

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.USER_MAIL, // Votre adresse e-mail Outlook/Office 365
        pass: process.env.PASS_MAIL, 
      },
    });
    
   
    const message = {
      from: process.env.USER_MAIL, 
      to: process.env.USER_MAIL, 
      subject: 'Password Reset', 
      text: `To reset your password, click on the following link: http://localhost:3000/api/reset-password/${resetToken}`, 
      html: `<p>To reset your password, click <a href="http://localhost:3000/api/reset-password/${resetToken}">here</a>.</p>`, 
    };

    // Send the email
    await transporter.sendMail(message);

    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = { sendPasswordResetEmail };
