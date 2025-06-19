import bcrypt from "bcryptjs";

export const hashPassword = async (password) => await bcrypt.hash(password, Number(process.env.SALT_ROUND));

export const comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);