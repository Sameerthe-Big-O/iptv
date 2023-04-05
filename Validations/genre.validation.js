import joi from 'joi'

export default {
    id:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
    },

    create: {
        body: joi.object().keys({
          name: joi.string().required(),
        }),
      },

    update:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
        body: joi.object().keys({
            name: joi.string().required(),
        }),
    },
}