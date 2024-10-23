import Volcano from "../models/Volcano.js";

const getAll = () => {
  return Volcano.find();
};

const create = (data, userId) => {
  return Volcano.create({ ...data, owner: userId });
};

const getOne = (id) => {
  return Volcano.findById(id);
};

export default {
  getAll,
  create,
  getOne,
};
