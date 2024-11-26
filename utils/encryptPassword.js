import bcrypt from 'bcryptjs'

// const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashedPassword = async (req, res) =>{
    const { password } = req.body;

    const processed = await bcrypt.hash(password,saltRounds);

    return res.json(processed);
};
