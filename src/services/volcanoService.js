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

const vote = (volcanoId, userId) => {
  return Volcano.findByIdAndUpdate( volcanoId, {$push: { voteList: userId } });
};

const remove = (volcanoId) => {
  return Volcano.findByIdAndDelete(volcanoId);
}

const edit = (volcanoId, data) => {
  return Volcano.findByIdAndUpdate(volcanoId, data, {runValidators: true});
}

export default {
  getAll,
  create,
  getOne,
  vote,
  remove,
  edit
};
