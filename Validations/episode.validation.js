import joi from 'joi'

export default {
    id:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
    },

    create: {
        body: joi.object().keys({
          season_id: joi.string().required(),
          name: joi.string().required(),
          description: joi.string().required(),
          image: joi.string().required(),
        }),
      },

    update:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
        body: joi.object().keys({
            season_id: joi.string(),
            name: joi.string(),
            description: joi.string(),
            image: joi.string(),
        }),
    },
}