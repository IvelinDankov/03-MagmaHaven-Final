import User from "../models/User.js";

const register = (username, email, password) => {
    return User.create({ username, email, password });
}

export default {
    register
}