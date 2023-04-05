import joi from 'joi'

export default {
    id:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
    },

    create: {
        body: joi.object().keys({
          genre_id: joi.string().required(),
          name: joi.string().required(),
          description: joi.string().required(),
          trailer: joi.string().required(),
          release_date: joi.string(),
          rating: joi.number().required(),
          image_url: joi.string().required(),
        }),
      },

    update:{
        params: joi.object().keys({
            id: joi.string().required(),
        }),
        body: joi.object().keys({
          genre_id: joi.string(),
          name: joi.string(),
          description: joi.string(),
          trailer: joi.string(),
          release_date: joi.string(),
          rating: joi.number(),
          image_url: joi.string(),
        }),
    },
}