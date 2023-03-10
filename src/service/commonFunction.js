
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
    let welcome = genText("Ch??o m???ng b???n ?????n v???i trang web c???a ch??ng t??i");

    let guide = genText("H??y s??? d???ng menu b??n d?????i b???t c??? l??c n??o ????? di chuy???n gi???a c??c t??nh n??ng");

    let curation = genQuickReply("Ch??ng t??i c?? th??? gi??p g?? cho b???n n??o?", [
      {
        title: "Danh s??ch s???n ph???m",
        payload: "LISTPRODUCT"
      },
      {
        title: "Tr?? chuy???n v???i nh??n vi??n",
        payload: "CARE_HELP"
      },
      {
        title: "Ki???m tra tr???ng th??i ????n h??ng",
        payload: "ORDER_STATUS"
      }
    ]);

    return [welcome, guide, curation];
  }

  
