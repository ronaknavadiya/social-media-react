const router = require("express").Router();
const Chats = require("../models/Chats");

// CREATE NEW CHAT
router.post("/", async (req, res) => {
  if (req.body.senderId !== req.body.receiverId) {
    const newChat = new Chats({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const saveChat = await newChat.save();
      res.status(200).json(saveChat);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can not send message to own");
  }
});

// GET CHAT OT USER
router.get("/:userId", async (req, res) => {
  try {
    const chat = await Chats.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET CHAT OF TWO USERID
router.get("/find/:friendId/:userId", async (req, res) => {
  try {
    const chat = await Chats.findOne({
      members: { $all: [req.params.friendId, req.params.userId] },
    });
    if (!chat) {
      const newChat = new Chats({
        members: [req.params.userId, req.params.friendId],
      });
      try {
        const saveChat = await newChat.save();
        res.status(200).json(saveChat);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(200).json(chat);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
