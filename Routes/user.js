import express from "express";
import User from "../Models/user.js";
import Stream from "../Models/stream.js";
import authenticate from "../Middlewares/authenticate.js";
import validate from "../Middlewares/validate.js";
import userValidation from '../Validations/user.validation.js'
import mongoose from "mongoose";
import jwt  from "jsonwebtoken";

const router = express.Router();

router.post("/register", validate(userValidation.register), async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/login", validate(userValidation.login), async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) return res.status(401).send("Invalid email or password.");
    const token = jwt.sign({ id: user._id }, "My_secret_key", {
      expiresIn: "1h",
    });
    res.send(token);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/allUsers", authenticate, async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticate,  validate(userValidation.id), async (req, res) => {
  try {
    const result = await User.find({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", authenticate, validate(userValidation.update), async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", authenticate, validate(userValidation.id), async (req, res) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.params.id });
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
          from: "users",
          localField: "_id",
          foreignField: "user_id",
          as: "UserStreams",
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id/streams/:streamId", authenticate, async (req, res) => {
  try {
    const { id, streamId } = req.params;
    // Find the user with the specified ID
    // const newUser = await user.findById(id);
    // If the user doesn't exist, return a 404 error
    // if (!newUser) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    // Find the stream with the specified ID and user ID
    // const streams = await stream.findOne({ _id: streamId, user: user._id });
    // If the stream doesn't exist, return a 404 error
    // if (!streams) {
    //   return res.status(404).json({ error: 'Stream not found' });
    // }
    // If the user ID and stream ID match, return the stream
    // res.json(streams);
    // const newStream=await stream.find({_id:streamId,user_id:id}).populate('user_id')
    const newStream = await Stream.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(streamId),
          user_id: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
    res.send(newStream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// router.get("/:id/streams/:streamId", async (req, res) => {
//   try {
//     const { userId, streamId } = req.params;

//     const result = await Stream.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "user_id",
//           as: "UserStream",
//         },
//       },
//       {
//         $match:{
//           _id: mongoose.Types.ObjectId(streamId),
//           'user._id': mongoose.Types.ObjectId(userId)
//         },
//       },
//     ]);
//     res.json(result);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

router.delete("/:id/streams/:streamId", authenticate, async (req, res) => {
  try {
    const { userId, streamId } = req.params;

    const result = await Stream.deleteOne({
      _id: new mongoose.Types.ObjectId(streamId),
      user_id: new mongoose.Types.ObjectId(userId),
    });

    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
