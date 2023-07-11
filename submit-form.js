const http = require('http')
const qs = require('querystring')
const nodemailer = require('nodemailer')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const formData = qs.parse(body)
      const name = formData.name
      const email = formData.email
      const message = formData.message

      // Set up nodemailer for sending emails
      const transporter = nodemailer.createTransport({
        // Configure the email transport settings (e.g., SMTP)
        // For example, using Gmail SMTP:
        service: 'Gmail',
        auth: {
          user: 'hunterprogrammer111@gmail.com',
          pass: 'kawiecifbrsogdut',
        },
      })

      // Compose the email
      const mailOptions = {
        from: email,
        to: 'hunterprogrammer111@gmail.com',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }

      // Set CORS headers to allow cross-origin POST requests
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
          res.statusCode = 500
          res.end('Oops! Something went wrong and we couldn\'t send your message.')
        } else {
          console.log('Email sent: ' + info.response)
          res.end('Thank you! Your message has been sent.')
        }
      })
    })
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')
})
