import joi from "joi";

export default {
  id: {
    params: joi.object().keys({
      id: joi.string().required(),
    }),
  },

  create: {
    body: joi.object().keys({
      episode_id: joi.string().required(),
      user_id: joi.string().required(),
      time: joi.string().required(),
    }),
  },

  update: {
    params: joi.object().keys({
      id: joi.string().required(),
    }),
    body: joi.object().keys({
      episode_id: joi.string().required(),
      user_id: joi.string().required(),
      time: joi.string().required(),
    }),
  },
};
