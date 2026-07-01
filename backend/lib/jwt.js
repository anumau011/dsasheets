import jwt from "jsonwebtoken";

export function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}