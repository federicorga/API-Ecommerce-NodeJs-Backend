//import local from 'passport-local';
import userModel from '../dao/dbManagers/models/users.model.js';
import { PRIVATE_KEY_GITHUB } from '../utils.js'
import GitHubStrategy from 'passport-github2';





passport.use('github', new GitHubStrategy({
    clientID: "Iv1.022083e07abd1583",
    clientSecret: PRIVATE_KEY_GITHUB,
    callbackURL: "http://localhost:8080/api/sessions/github-callback",
    scope: ['user:email'] 
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const email = profile.emails[0].value; 
        const name= profile.displayName; 
        const user = await userModel.findOne({ email })
        if (!user) {
            const newUser = {
                first_name: name,
                last_name: 'GitHub User',
                age: 1111,
                email,
                cart,

            }
            const result = await userModel.create(newUser);
            done(null, result);
        } else {
            done(null, user);
        }
    } catch (error) {
        return done(error);
    }
}));

