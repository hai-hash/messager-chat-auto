
export function handleMessageAttachments(receivedMessage){
    let attachmentUrl = receivedMessage.attachments[0].payload.url;
    return response = {
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