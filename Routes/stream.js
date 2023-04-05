import express from "express";
import Stream from "../Models/stream.js";
import validate from "../Middlewares/validate.js";
import streamValidation from "../Validations/stream.validation.js";
import Episode from "../Models/episode.js";
import User from "../Models/user.js";
import Season from "../Models/season.js";
import authenticate from "../Middlewares/authenticate.js";
import mongoose  from 'mongoose';

const router = express.Router();

// router.post("/", validate(streamValidation.create), async (req, res) => {
//   try {
//     const result = await Stream.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

router.get("/allStreams", authenticate, async (req, res) => {
  try {
    const result = await Stream.find();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticate, validate(streamValidation.id), async (req, res) => {
  try {
    const result = await Stream.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", authenticate, validate(streamValidation.update), async (req, res) => {
  try {
    const result = await Stream.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", authenticate, validate(streamValidation.id), async (req, res) => {
  try {
    const result = await Stream.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/episodes", authenticate, async (req, res) => {
  try {
    const result = await Stream.aggregate([
      {
        $lookup: {
          from: "episodes",
          localField: "episode_id",
          foreignField: "_id",
          as: "Episode",
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/users", authenticate, async (req, res) => {
  try {
    const result = await Stream.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "User",
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/episode/season", authenticate, async (req, res) => {
  try {
    const result = await Stream.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        },
      },
      {
        $lookup: {
          from: "episodes",
          localField: "episode_id",
          foreignField: "_id",
          as: "Episode",
        },
      },
      {
        $unwind: "$Episode",
      },
      {
        $lookup: {
          from: "seasons",
          localField: "Episode.season_id",
          foreignField: "_id",
          as: "Season",
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});


router.get("/:id/episode/season/series", authenticate, async (req, res) => {
  try {
    const result = await Stream.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        },
      },
      {
        $lookup: {
          from: "episodes",
          localField: "episode_id",
          foreignField: "_id",
          as: "Episode",
        },
      },
      {
        $unwind: "$Episode",
      },
      {
        $lookup: {
          from: "seasons",
          localField: "Episode.season_id",
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

router.get("/:id/episode/season/series/genre", authenticate, async (req, res) => {
  try {
    const result = await Stream.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        },
      },
      {
        $lookup: {
          from: "episodes",
          localField: "episode_id",
          foreignField: "_id",
          as: "Episode",
        },
      },
      {
        $unwind: "$Episode",
      },
      {
        $lookup: {
          from: "seasons",
          localField: "Episode.season_id",
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
      {
        $unwind: "$Series",
      },
      {
        $lookup: {
          from: "genres",
          localField: "Series.genre_id",
          foreignField: "_id",
          as: "Genre",
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
