const { handleTextMessage } = require('./src/service/TextMessage');

require('dotenv').config();
const
  request = require('request'),
  express = require('express'),
  { urlencoded, json } = require('body-parser'),

  app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

//Home page

app.get('/', function (_req, res) {
  res.send('SERVER RUNNING');
});

//Get authentication

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// port

app.post('/webhook', (req, res) => {
  let body = req.body;
  if (body.object === 'page') {
    res.status(200).send("EVENT_RECEIVED");
    body.entry.forEach(function (entry) {
      // handle event when have message
      entry.messaging.forEach(async function (webhookEvent) {
        // Discard uninteresting events
        if ("read" in webhookEvent) {
          console.log("Got a read event");
          return;
        } else if ("delivery" in webhookEvent) {
          console.log("Got a delivery event");
          return;
        } else if (webhookEvent.message && webhookEvent.message.is_echo) {
          console.log(
            "Got an echo of our send, mid = " + webhookEvent.message.mid
          );
          return;
        }
        // Get the sender PSID
        let senderPsid = webhookEvent.sender.id;

        let responses;
        try {
          if (webhookEvent.message) {
            let mesage = webhookEvent.mesage;
            if (mesage.text) {
              responses = handleTextMessage(webhookEvent);
            }
          }
          callSendAPI(senderPsid, responses);

        } catch (error) {
          console.log(error);
          return;
        }
      })
    });
  } else {
    res.sendStatus(404);
  }
});

// Handles messages events
function handleMessage(senderPsid, receivedMessage) {
  let response;

  if (receivedMessage.text) {

    if (receivedMessage.text === "1") {
      response = {
        'text': `Danh sách sản phẩm \n 1. Đông trùng hạ thảo \n 2. Thuốc tăng cường thể lực \n 3. Sản phẩm làm đẹp`
      };
    }
    else if (receivedMessage.text === "2") {
      response = {
        'text': `Bạn vui lòng cho chúng mình biết mã đơn hàng của bạn với cú pháp : CodeOrder#madonhang`
      };
    }
    else if (receivedMessage.text === "3") {
      response = {
        'text': `Bạn vui lòng đặt hàng với cấu trúc: Name: tên người mua \n NumberPhone: số điện thoại \n Product: sản phẩm muốn mua trên danh sách sản phẩm`
      };
    }
    else {
      response = {
        'text': `Cảm ơn bạn đã liên hệ với chúng tôi \n. Ngoài ra bạn còn muốn biến gì nữa không ? \n 1. Danh sách sản phẩm \n 2. Trang thái đơn hàng 
        \n 3. Đặt hàng`
      };
    }

  } else if (receivedMessage.attachments) {

    // Get the URL of the message attachment
    let attachmentUrl = receivedMessage.attachments[0].payload.url;
    response = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': [{
            'title': 'Is this the right picture?',
            'subtitle': 'Tap a button to answer.',
            'image_url': attachmentUrl,
            'buttons': [
              {
                'type': 'postback',
                'title': 'Yes!',
                'payload': 'yes',
              },
              {
                'type': 'postback',
                'title': 'No!',
                'payload': 'no',
              }
            ],
          }]
        }
      }
    };
  }

  // Send the response message
  callSendAPI(senderPsid, response);
}

// Handles messaging_postbacks events
function handlePostback(senderPsid, receivedPostback) {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { 'text': 'Thanks!' };
  } else if (payload === 'no') {
    response = { 'text': 'Oops, try sending another image.' };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
}

// Sends response messages via the Send API
function callSendAPI(senderPsid, response) {

  // The page access token we have generated in your app settings
  const PAGE_ACCESS_TOKEN = process.env.PAGE_VERIFY_TOKEN.substring(13) + 'ZDZD'

  // Construct the message body
  let requestBody = {
    'recipient': {
      'id': senderPsid
    },
    'message': response
  };

  // Send the HTTP request to the Messenger Platform
  request({
    'uri': 'https://graph.facebook.com/v2.6/me/messages',
    'qs': { 'access_token': PAGE_ACCESS_TOKEN },
    'method': 'POST',
    'json': requestBody
  }, (err, _res, _body) => {
    if (!err) {
      console.log('Message sent!');
    } else {
      console.error('Unable to send message:' + err);
    }
  });
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});