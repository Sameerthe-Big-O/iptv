import express from "express";
import Episode from "../Models/episode.js";
import Series from "../Models/series.js";
import authenticate from "../Middlewares/authenticate.js";
import seriesValidation from '../Validations/series.validation.js'
import validate from "../Middlewares/validate.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", authenticate, validate(seriesValidation.create), async (req, res) => {
  try {
    const result = await Series.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/allSeries", authenticate, async (req, res) => {
  try {
    const result = await Series.find();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticate, validate(seriesValidation.id), async (req, res) => {
  try {
    const result = await Series.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", authenticate, validate(seriesValidation.update), async (req, res) => {
  try {
    const result = await Series.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", authenticate, validate(seriesValidation.id), async (req, res) => {
  try {
    const result = await Series.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/seasons", authenticate, async (req, res) => {
  try {
    // const seriesId = req.params.id;
    const result = await Series.aggregate([
      {
        $lookup: {
          from: "seasons",
          localField: "_id",
          foreignField: "series_id",
          as: "Seasons",
        },
      },
      // {
      //   $match: {
      //     series_id: new mongoose.Types.ObjectId(seriesId),
      //   },
      // },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/seasons/episodes", authenticate, async (req, res) => {
  try {
    // const seriesId = req.params.id;
    const result = await Episode.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        },
      },
      {
        $lookup: {
          from: "seasons",
          localField: "season_id",
          foreignField: "_id",
          as: "Season",
        },
      },
      {
        $unwind: "$Season",
      },
      {
        $lookup: {
          from: "series",
          localField: "Season.series_id",
          foreignField: "_id",
          as: "Series",
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
