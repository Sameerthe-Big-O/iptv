import joi from 'joi'

export default {
    id:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
    },

    create: {
        body: joi.object().keys({
          series_id: joi.string().required(),
          name: joi.string().required(),
          description: joi.string().required(),
        }),
      },

    update:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
        body: joi.object().keys({
          series_id: joi.string(),
          name: joi.string(),
          description: joi.string(),
        }),
    },
}