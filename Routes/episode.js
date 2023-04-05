import express from "express";
import Episode from "../Models/episode.js";
import Stream from "../Models/stream.js";
import episodeValidation from "../Validations/episode.validation.js";
import streamValidation from "../Validations/stream.validation.js";
import validate from "../Middlewares/validate.js";
import authenticate from "../Middlewares/authenticate.js";
const router = express.Router();

router.post("/", authenticate, validate(episodeValidation.create), async (req, res) => {
  try {
    const result = await Episode.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/allEpisodes", authenticate, async (req, res) => {
  try {
    const result = await Episode.find();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticate, validate(episodeValidation.id), async (req, res) => {
  try {
    const result = await Episode.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", authenticate, validate(episodeValidation.update), async (req, res) => {
  try {
    const result = await Episode.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", authenticate, validate(episodeValidation.id), async (req, res) => {
  try {
    const result = await Episode.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/streams", authenticate, async (req, res) => {
  try {
    const result = await Stream.aggregate([
      {
        $lookup: {
          from: "episodes",
          localField: "_id",
          foreignField: "episode_id",
          as: "Episodes",
        },
      },
    ]);
    res.status(200).send(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post(
  "/:id/streams", authenticate,
  validate(streamValidation.create),
  async (req, res) => {
    try {
      const result = await Stream.create(req.body);
      res.status(200).send(result);
    } catch (error) {
      res.json({ message: error });
    }
  }
);

export default router;
