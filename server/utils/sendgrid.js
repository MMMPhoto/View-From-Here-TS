const sendgrid = require('@sendgrid/mail');
require('dotenv').config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
  newUserEmail: async function (email) {
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Email Verification",
      text: 'Thanks for signing up with an account on View From Here! No need to do anything. This email is just to confirm that your account has been created.',
      // html: '<strong>Testing email sent with Sendgrid and NodeJs</strong>',
    };
    sendgrid
      .send(msg)
      .then((resp) => {
        console.log('Email sent\n', resp)
      })
      .catch((error) => {
        console.error(error)
    });
  },

  passwordResetEmail: async function (email, resetCode) {
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Reset Password Request",
      // text: 'Add simple text',
      html: `<h4>You have requested to reset your password on the View From Here site.</h4><p>Click <a href="https://localhost:3000/password-reset/${resetCode}">here</a> to reset your password.</p><p>If you did not request a password reset, please change your password!</p>`,
    };
    sendgrid
      .send(msg)
      .then((resp) => {
        console.log('Email sent\n', resp)
      })
      .catch((error) => {
        console.error(error)
    });
  },
};

// const msg = {
//   to: 'testh@gmail.com',
//   from: process.env.FROM_EMAIL,
//   subject: 'Test Email',
//   // text: 'Add simple text',
//   html: '<strong>Testing email sent with Sendgrid and NodeJs</strong>',
// }
// sendgrid
//   .send(msg)
//   .then((resp) => {
//     console.log('Email sent\n', resp)
//   })
//   .catch((error) => {
//     console.error(error)
// })
