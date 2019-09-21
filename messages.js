const getRandomText = function(asTexts) {
    var nPosition = Math.round(Math.random() * (asTexts.length - 1));

    console.log(nPosition);
    return asTexts[nPosition];
};

module.exports = {
    getText(sKey, sLocale, asVariables) {
        var sResponseText;
        var i = 0;
        var oTexts = {
            "es-ES": {
                Welcome: ["Bienvenido a Battle Chess, el desafío de ajedrez más duro del universo. Puedes comenzar una nueva partida o continuar una que tuvieras guardada.", "Hola. Soy Battle Chess, el desafío de ajedrez para mentes brillantes. Podemos jugar una nueva partida o continuar con una guardada."],
                Create: ["Se ha creado una nueva partida. Puedes mover, es tu turno", "La partida ha dado comienzo. Adelante, mueve tus peones."],
                NoCreate: ["Vale, vale podemos esperar a que estés listo", "Tu mandas, seguiré entrenando para poder batirte"],
                Rules: ["Las reglas de Battle Chess son sencillas. Tienes que dar jaque al rey. El tablero tiene un formato ocho por ocho. Las filas van de la 1 a la 8 de abajo hacia arriba. Las columnas van de la A a la H de izquierda a derecha. Las piezas blancas comienzan en la parte inferior del tablero, por lo que tus peones se sitúan en la fila 2 y el resto de piezas en la fila 1. Yo empezaré en las filas 7 y 8. Si en algún momento te encuentras  perdido sólo tienes que preguntarme cómo va la partida y yo te ayudaré."],
                Reprompt_game: ["Veo que mi último movimiento te ha dejado sin palabras. Cuando estés listo mueve ficha"],
                Help: ["¿Te puedo ayudar?"],
                Reprompt: ["¿Te puedo ayudar en algo?"],
                Stop: ["Gracias por usar Battle Chess. Seguiré entrenando para darte la mejor experiencia de juego"],
                Cancel: ["Gracias por usar Battle Chess. Seguiré entrenando para darte la mejor experiencia de juego"],
                Invalid: ["El movimiento no es correcto. Si necesitas ayuda pídemelo"],
                Movement: ["Yo también he movido, supéralo"],
                Continue: ["Hola! Soy Battle Chess. Tienes una partida sin finalizar. Si quieres retomarla sólo haz un movimiento o pideme que te diga como va la partida"]
            },
            "en-US": {}
        };


        sResponseText = getRandomText(oTexts[sLocale][sKey]);

        while (sResponseText.indexOf("%") > -1) {
            if (asVariables && asVariables[i]) {
                sResponseText = sResponseText.replace("%", asVariables[i]);
            }
            else {
                sResponseText = sResponseText.replace("%", "");
            }
            i++;
        }

        return sResponseText;
    }
};
