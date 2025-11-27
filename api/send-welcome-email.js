const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Admin Client (Service Role)
const supabaseAdmin = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    const { email, recordId } = req.body;

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
            from: `"Team Frandy" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Welcome to the Frandy Family! 🍓',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #e11d48;">Welcome to Frandy! 🎉</h1>
          <p>Hi there!</p>
          <p>Thank you so much for pre-ordering <strong>Frandy Berry Blast Gummies</strong>! We’re thrilled to have you with us on this journey toward a healthier (and tastier) daily routine.</p>
          <p>You’re officially on our VIP list, which means you’ll be among the first to try our plant-based multivitamin gummies before they hit the shelves. Healthy but delicious? Yep — that’s exactly our vibe. 🍓✨</p>
          <p>We’ll keep you posted on the launch date, shipping updates, and some exclusive early-bird perks headed your way.</p>
          <br/>
          <p>Stay vibrant, stay healthy</p>
          <p><strong>The Frandy Team</strong></p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        // Update Supabase record if recordId is provided
        if (recordId) {
            const { error: updateError } = await supabaseAdmin
                .from('emails')
                .update({ email_sent: true })
                .eq('id', recordId);

            if (updateError) {
                console.error('Failed to update Supabase record:', updateError);
            }
        }

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};
