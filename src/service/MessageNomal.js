import { listMenu } from "../constant/constant";
import { createResponseQuickReply } from "./QuickReply";

export function handleMessageNomal(message) {
    let response;
    if (message.text.includes("start over")) {
        const listQuickReplies = listMenu;
        response = createResponseQuickReply("Chúng tôi có thể giúp gì cho bạn ?", listQuickReplies);
    }
    else {
        response = {
            'text': `mew mew mew mew`
        };
    }
    return response;
}