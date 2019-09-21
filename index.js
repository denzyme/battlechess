var myfunctions = require('./functions');
var message = require('./messages');
var apiChess = require('./chessApiCall');
var utils = require('./utils');
var html = require('./generateHTML');
var local = '';
var user;

exports.handler = function(event, context) {
    try {

        local = event.request.locale;
         //user = event.context.System.user.userId;

        if (event.session.new) {
            onSessionStarted({
                requestId: event.request.requestId
            }, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(myfunctions.buildResponse(sessionAttributes, speechletResponse));
                });
        }
        else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(myfunctions.buildResponse(sessionAttributes, speechletResponse));
                });
        }
        else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    }
    catch (e) {
        console.log('exception: ' + e.message);
    }
};

/**
 * Evento Inicio Sesión
 */
function onSessionStarted(sessionStartedRequest, session) {

}

/**
 * Evento Cierre Sesión
 */
function onSessionEnded(sessionEndedRequest, session) {

}

/**
 * Evento Inicio Skill
 */
function onLaunch(launchRequest, session, callback) {

    var game_id = '';

    if (game_id === '') {
        getWelcomeResponse(callback);
    }
    else {
        var sessionAttributes = {};
        sessionAttributes["game_id"] = game_id;
        callback(sessionAttributes, myfunctions.response("", message.getText("Continue", local), "", false));
    }
}

/**
 * Intents
 */

function onIntent(intentRequest, session, callback) {

    var sessionAttributes = {};
    var intent = intentRequest.intent;

    if (session.attributes) {
        if ("game_id" in session.attributes) {
            sessionAttributes["game_id"] = session.attributes.game_id;
        }
    }

    switch (intent.name) {

        case "AMAZON.HelpIntent":
            talk(sessionAttributes, intent,
                session,
                callback,
                message.getText("Help", local),
                message.getText("Reprompt", local),
                false, "");
            break;

        case "AMAZON.StopIntent":
            talk(sessionAttributes, intent,
                session,
                callback,
                message.getText("Stop", local),
                "",
                true, "");
            break;

        case "AMAZON.CancelIntent":
            talk(sessionAttributes, intent,
                session,
                callback,
                message.getText("Cancel", local),
                "",
                true, "");
            break;

        case "Rules":
            talk(sessionAttributes, intent,
                session,
                callback,
                message.getText("Rules", local),
                "",
                false, "");
            break;

        default:
            Chessintent(intent, session, callback);
            break;
    }
}

// --------------- Helpers that build all of the responses -----------------------

function getWelcomeResponse(callback) {
    callback({}, myfunctions.response("", message.getText("Welcome", local), "", false, 'https://images-na.ssl-images-amazon.com/images/I/71Id0-ltQzL._SL1500_.jpg'));
}

function talk(sessionAttributes, intent, session, callback, speechOutput, repromptText, shouldEndSession, image) {

    var card = speechOutput;
    speechOutput = "<speak>" + speechOutput + "</speak>";
    console.log(speechOutput);
    
    callback(sessionAttributes,
        myfunctions.responseSSML(
            "", card, speechOutput,
            repromptText, shouldEndSession, image
        )
    );

}


// ----------------- Chess intents -------------------------------------------

function Chessintent(intent, session, callback) {

    console.log(intent);
    var sessionAttributes = {};
    var game_id;
    var image = "https://images-na.ssl-images-amazon.com/images/I/61sH3SHEGpL._SX355_.jpg";

    if (session.attributes) {
        if ("game_id" in session.attributes) {
            sessionAttributes["game_id"] = session.attributes.game_id;
            game_id = session.attributes.game_id;
            console.log("GAME_ID:" + game_id);
        }
    }

    switch (intent.name) {

        case "Create_new_game":

            if (intent.confirmationStatus === 'CONFIRMED') {
                apiChess.createNewGame(function(oresponse) {
                    var sessionAttributes = {};
                    sessionAttributes["game_id"] = oresponse.game_id;
                    
                    talk(sessionAttributes, intent,
                        session,
                        callback,
                        message.getText("Create", local),
                        message.getText("Reprompt", local),
                        false, image);
                });

            }
            else {

                talk({}, intent,
                    session,
                    callback,
                    message.getText("NoCreate", local),
                    message.getText("Reprompt", local),
                    false, image);
            }

            break;

        case "New_movement":

            var from = intent.slots.from.value;
            var to = intent.slots.to.value;
            var AIresponse = '';
            var piece = '';
            var audio;

            apiChess.moveFigurePlayer(game_id, from, to, function(response) {

                if (response.status === 'figure moved') {

                    apiChess.moveFigureAI(game_id, function(response) {

                        console.log(response);

                        apiChess.getFenPosition(game_id, function(oresponse) {
                            html.createPNGWithFen(oresponse.fen_string, function(s_url) {
                                image = s_url;
                                console.log(image);
                                piece = utils.getPieceAtGivenPosition(oresponse.fen_string, to, local);

                                AIresponse = "Yo he movido " + piece + ' de ' + response.from + ' a ' + response.to;

                                talk(sessionAttributes, intent,
                                    session,
                                    callback,
                                    AIresponse,
                                    message.getText("Reprompt_game", local),
                                    false, image);

                            });

                        });


                    });

                }
                else {
                    talk(sessionAttributes, intent,
                        session,
                        callback,
                        message.getText("Invalid", local),
                        message.getText("Reprompt", local),
                        false, image);

                }

            })
            break;

        case 'Game_status':

            apiChess.getFenPosition(game_id, function(response) {
                 html.createPNGWithFen(response.fen_string, function(s_url) {
                                image = s_url;
                
                talk(sessionAttributes, intent,
                    session,
                    callback,
                    utils.getPositionsSummary(response.fen_string, local),
                    message.getText("Reprompt", local),
                    false, image);

            });
            });


            break;
    }


}
