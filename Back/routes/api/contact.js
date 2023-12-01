const router = require("express").Router();
const nodemailer = require("nodemailer");


router.post('/send', (req, res) => {
    const { name, firstname, email, subject, message } = req.body;
    console.log(req.body);
    // Configurer le transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "becque.anthony@gmail.com",
            pass: "bogl evbq rqgu rdvx",
        },
    });

    // Options du message
    const mailOptions = {
        from: email,
        to: 'becque.anthony@gmail.com', // Adresse e-mail de destination
        subject: subject,
        text: `Nom: ${name}\nPrénom: ${firstname}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Erreur lors de l\'envoi de l\'email.');
        } else {
            res.status(200).json('Ok');
        }
    });
});
module.exports = router;
