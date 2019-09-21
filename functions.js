exports.voice = function switchVoice(text,voice_name) {
  if (text){
    return "<voice name='" + voice_name + "'>" + text + "</voice>";
  }
};


// Plain text
exports.response = function buildSpeechletResponse(title, output, repromptText, shouldEndSession, image) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Standard",
            title: title,
            text: output,
            image: {
                smallImageUrl: image
            }
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

//SSML
exports.responseSSML = function buildSpeechletResponseSSML(title, card_txt,output, repromptText, shouldEndSession, image) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: output
        },
        card: {
            type: "Standard",
            title: title,
            text: card_txt,
            image: {
                smallImageUrl: image
            }
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
};

// Normal response
exports.buildResponse = function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
};



exports.getSlots = function parse(intent) {
  
var slots = intent.slots;
console.log(JSON.stringify(slots));
var filters = [];
for (var i in slots) {
  var element = {};
  element.name = slots[i].name.toUpperCase();
  element.value = slots[i].value.toUpperCase(); 
  element.id = '';
 if( slots[i].resolutions && 
 slots[i].resolutions.resolutionsPerAuthority && 
 slots[i].resolutions.resolutionsPerAuthority[0].status &&
 slots[i].resolutions.resolutionsPerAuthority[0].status.code === "ER_SUCCESS_MATCH"){
  element.id = slots[i].resolutions.resolutionsPerAuthority[0].values[0].value.id;
 }
  filters.push(element);
} 

var filters_table = '{ "it_filters" : '+ JSON.stringify(filters) + ', "iv_intent" : "'+ intent.name.toUpperCase() + '"}';
console.log(JSON.stringify(filters_table));
return filters_table;

};

