import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { comparePassword } from "../utils/security/hash.mjs";


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser( async (id, done) => {
    try{
        const findUser = await User.findById(id).select("-password");
        if(!findUser) throw new Error('User Not Found !');
        if(findUser.banded) throw new Error("Banded User !");
        done(null, findUser);

    } catch(e) {
        done(e, null);
    }
});

export default passport.use( 
    new Strategy(async (username, password, done) => {
        try{
            const findUser = await User.findOne({ username });
            if(!findUser) throw new Error("User Not Found !");
            if(findUser.banded) throw new Error("Banded User !");
            if(!comparePassword(password, findUser.password)) throw new Error("Invalid Credentials !");
            done(null, findUser);

        } catch(e) {
            done(e, null);
        }
    })
);