import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/hash.mjs";


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try{
        const findUser = User.findById(id);
        if(!findUser) throw new Error('User Not Found !');
        done(null, findUser);

    } catch(e) {
        done(e, null);
    }
});

export default passport.use(
    new Strategy(async (username, password, done) => {
        try{
            const findUser = await User.findOne({ username });
            if(!findUser) throw new Error('User Not Found !');
            
            // findUser.password !== password
            if(!comparePassword(password, findUser.password)) throw new Error('Invalid Credentials !');
            done(null, findUser);

        } catch(e) {
            done(e, null);
        }
    })
);