import express from "express";
import Genre from "../Models/genre.js";
import Series from "../Models/series.js";
import mongoose from "mongoose";
import authenticate from "../Middlewares/authenticate.js";
import validate from './../Middlewares/validate.js';
import genreValidation from '../Validations/genre.validation.js'

const router = express.Router();

router.post("/", authenticate, validate(genreValidation.create), async (req, res) => {
  try {
    const result = await Genre.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/allGenre", authenticate, async (req, res) => {
  try {
    const result = await Genre.find();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticate, validate(genreValidation.id), async (req, res) => {
  try {
    const result = await Genre.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", authenticate, validate(genreValidation.update), async (req, res) => {
  try {
    const result = await Genre.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", authenticate, validate(genreValidation.id), async (req, res) => {
  try {
    const result = await Genre.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/series", authenticate, async (req, res) => {
  try {
    const genreId = req.params.id;

    const result = await Series.aggregate([
      {
        $match: {
          genre_id: new mongoose.Types.ObjectId(genreId),
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genre_id",
          foreignField: "_id",
          as: "Genres",
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/series/seasons", authenticate, async (req, res) => {
  try {
    const genreId = req.params.id;
    const result = await Series.aggregate([
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "series_id",
          as: "Seasons",
        },
      },
      {
        $match: {
          genre_id: new mongoose.Types.ObjectId(genreId),
        },
      },
      
    ]);

    res.status(200).send(result);

  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
