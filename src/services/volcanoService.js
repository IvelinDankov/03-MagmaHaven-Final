import Volcano from "../models/Volcano.js"


const create = (data, userId) => {
    return Volcano.create({ ...data, owner: userId });
}

export default {
    create
}