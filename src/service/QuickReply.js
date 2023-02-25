export function handleQuickReply(receivedMessage) {
    let response;
    const payload = receivedMessage.quick_reply.payload;
    switch (payload) {
        case "LIST_PRODUCT":
            response = [{
                'text': `Danh sách sản phẩm \n 1. Đông trùng hạ thảo \n 2. Thuốc tăng cường thể lực \n 3. Sản phẩm làm đẹp`
            },
            {
                'text': `Danh sách sản phẩm \n 1. Đông trùng hạ thảo \n 2. Thuốc tăng cường thể lực \n 3. Sản phẩm làm đẹp`
            }
            ];
            break;
        case "CHAT_NV":
            response = {
                'text': `Nhân viên bán hàng sẽ sớm liên hệ với bạn`
            };
            break;
        case "ORDER_STATUS":
            response = {
                'text': `Đơn hàng của bạn còn 5 ngày nữa sẽ đến`
            };
            break;
        default:
            response = {
                'text': `Chúng tôi không thể xác định sự lựa chọn của bạn`
            };
            break;
    }
    return response;
}

export function createResponseQuickReply(requestMessage, listQuickReplies) {

    let response = {
        "text": requestMessage,
        "quick_replies": [
            {
                "content_type": "text",
                "title": "danh sách sản phẩm",
                "payload": "LIST_PRODUCT"
            },
            {
                "content_type": "text",
                "title": "trò chuyện với nhân viên",
                "payload": "CHAT_NV"
            },
            {
                "content_type": "text",
                "title": "Trạng thái đơn hàng",
                "payload": "ORDER_STATUS"
            },
        ],
    }
    // if(listQuickReplies && listQuickReplies.length > 0){
    //   listQuickReplies.forEach(quickReply => {
    //     response["quick_replies"].push({
    //       "content_type": "text",
    //       "title": quickReply["title"],
    //       "payload": quickReply["payload"]
    //     });
    //   });
    // }
    return response;
}