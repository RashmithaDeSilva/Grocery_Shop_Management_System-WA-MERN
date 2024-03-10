import bcrypt from 'bcrypt';
import fs from 'fs';


const jsonData = fs.readFileSync('env-veb.json', 'utf-8');
const ENV_VEB = JSON.parse(jsonData);
const saltRounds = ENV_VEB.SALT_ROUNDS;


export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
