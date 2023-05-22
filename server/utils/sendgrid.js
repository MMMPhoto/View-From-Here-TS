const sendgrid = require('@sendgrid/mail');
require('dotenv').config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'testh@gmail.com',
  from: process.env.FROM_EMAIL,
  subject: 'Test Email',
  // text: 'Add simple text',
  html: '<strong>Testing email sent with Sendgrid and NodeJs</strong>',
}
sendgrid
  .send(msg)
  .then((resp) => {
    console.log('Email sent\n', resp)
  })
  .catch((error) => {
    console.error(error)
})
