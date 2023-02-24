import { genNuxMessage } from "./commonFunction";

export function handleTextMessage(webhookEvent){
    let greeting = firstEntity(webhookEvent.message.nlp, "greetings");
    let message = webhookEvent.message.text.trim().toLowerCase();
    let response;
    if (
        (greeting && greeting.confidence > 0.8) ||
        message.includes("start over")
      ) {
        response = genNuxMessage();
      }

}

function  firstEntity(nlp, name) {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
  }