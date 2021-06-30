const router = require("express").Router();
const Message = require("../models/Message");
const Chats = require("../models/Chats");

// ADD MESSAGE
router.post("/", async (req, res) => {
  try {
    const chat = await Chats.findById(req.body.chatId);
    if (chat.members.includes(req.body.sender)) {
      const newMessage = new Message(req.body);
      try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("this chat doesn't contain this senderID");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MESSAGE
router.get("/:chatId", async (req, res) => {
  try {
    const AllMessages = await Message.find({
      chatId: req.params.chatId,
    });
    res.status(200).json(AllMessages);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
