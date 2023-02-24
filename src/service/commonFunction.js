
  export function genQuickReply(text, quickReplies) {
    let response = {
      text: text,
      quick_replies: []
    };

    for (let quickReply of quickReplies) {
      response["quick_replies"].push({
        content_type: "text",
        title: quickReply["title"],
        payload: quickReply["payload"]
      });
    }

    return response;
  }

  export function genGenericTemplate(image_url, title, subtitle, buttons) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url,
              buttons: buttons
            }
          ]
        }
      }
    };
    return response;
  }

  export function genRecurringNotificationsTemplate(
    image_url,
    title,
    notification_messages_frequency,
    payload
  ) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "notification_messages",
          title: title,
          image_url: image_url,
          notification_messages_frequency: notification_messages_frequency,
          payload: payload
        }
      }
    };
    return response;
  }

  export function genImageTemplate(image_url, title, subtitle = "") {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url
            }
          ]
        }
      }
    };

    return response;
  }

  export function genButtonTemplate(title, buttons) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: title,
          buttons: buttons
        }
      }
    };

    return response;
  }

  export function genText(text) {
    let response = {
      text: text
    };

    return response;
  }

  export function genTextWithPersona(text, persona_id) {
    let response = {
      text: text,
      persona_id: persona_id
    };

    return response;
  }

  export function genPostbackButton(title, payload) {
    let response = {
      type: "postback",
      title: title,
      payload: payload
    };

    return response;
  }

  export function genWebUrlButton(title, url) {
    let response = {
      type: "web_url",
      title: title,
      url: url,
      messenger_extensions: true
    };

    return response;
  }

  export function genNuxMessage() {
    let welcome = genText("Chào mừng bạn đến với trang web của chúng tôi");

    let guide = genText("Hãy sử dụng menu bên dưới bất cứ lúc nào để di chuyển giữa các tính năng");

    let curation = genQuickReply("Chúng tôi có thể giúp gì cho bạn nào?", [
      {
        title: i18n.__("Danh sách sản phẩm"),
        payload: "LISTPRODUCT"
      },
      {
        title: i18n.__("Trò chuyện với nhân viên"),
        payload: "CARE_HELP"
      },
      {
        title: i18n.__("Kiểm tra trạng thái đơn hàng"),
        payload: "ORDER_STATUS"
      }
    ]);

    return [welcome, guide, curation];
  }

