
const express = require("express")
const chatbotController = require("../controllers/chatbotController")
const router = express.Router()

router.get("/webhook", chatbotController.getWebhook);
router.post("/webhook", chatbotController.postWebhook);

module.exports = router
