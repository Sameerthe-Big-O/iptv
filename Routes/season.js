import express from "express";
import Season from "../Models/season.js";
import Episode from "../Models/episode.js";
import validate from "../Middlewares/validate.js";
import authenticate from "../Middlewares/authenticate.js";
import seasonValidation from "../Middlewares/validate.js";

const router = express.Router();

router.post("/", authenticate, validate(seasonValidation.create), async (req, res) => {
  try {
    const result = await Season.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/allSeasons", authenticate, async (req, res) => {
  try {
    const result = await Season.find();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticate, validate(seasonValidation.id), async (req, res) => {
  try {
    const result = await Season.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", authenticate, validate(seasonValidation.update), async (req, res) => {
  try {
    const result = await Season.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", authenticate, validate(seasonValidation.id), async (req, res) => {
  try {
    const result = await Season.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get(
  "/:id/episodes", authenticate,
  validate(seasonValidation.update),
  async (req, res) => {
    try {
      const result = await Episode.aggregate([
        {
          $lookup: {
            from: "seasons",
            localField: "_id",
            foreignField: "season_id",
            as: "Season",
          },
        },
      ]);
      res.status(200).send(result);
    } catch (error) {
      res.json({ message: error });
    }
  }
);

export default router;
