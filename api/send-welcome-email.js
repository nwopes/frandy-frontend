const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Frandy Team" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Welcome to the Frandy Family! 🍓',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e11d48;">Welcome to Frandy! 🎉</h1>
          <p>Hi there,</p>
          <p>Thank you so much for pre-ordering <strong>Frandy Berry Blast Gummies</strong>! We're thrilled to have you on this journey with us.</p>
          <p>You've secured your spot to be among the first to experience our delicious, plant-based multivitamin gummies.</p>
          <p>We'll keep you posted on our launch date and exclusive early-bird offers.</p>
          <br/>
          <p>Stay healthy,</p>
          <p><strong>The Frandy Team</strong></p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};
