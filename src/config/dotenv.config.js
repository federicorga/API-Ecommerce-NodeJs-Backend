import dotenv from 'dotenv';


dotenv.config();

export default {
    port: process.env.PORT,
    persistence: process.env.PERSISTENCE, 
    envrioment: process.env.NODE_ENV,
    mongoUrl: process.env.MONGO_URL,
    secretSession: process.env.SECRET_SESSION,
    privateKey: process.env.PRIVATE_KEY,
    privateKeyGithub: process.env.PRIVATE_KEY_GITHUB,
    userNodemailer:process.env.USER_NODEMAILER,
    passNodemailer:process.env.PASS_NODEMAILER


}

