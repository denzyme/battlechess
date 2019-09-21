const oPiecesIdentification = {
  "es-ES": {
    "P": "Peón",
    "R": "Torre",
    "N": "Caballo",
    "B": "Alfil",
    "Q": "Reina",
    "K": "Rey",
    "p": "Peón",
    "r": "Torre",
    "n": "Caballo negro",
    "b": "Alfil",
    "q": "Reina",
    "k": "Rey"
  },
  "en-US": {
    "p": "Black pawn",
    "r": "Black rook",
    "n": "Black knight",
    "b": "Black bishop",
    "q": "Black queen",
    "k": "Black king",
    "P": "White pawn",
    "R": "White rook",
    "N": "White knight",
    "B": "White bishop",
    "Q": "White queen",
    "K": "White king"
  }
};

const oPieceName = {
  "es-ES": {
    "positions_text": " y su posición es.",
    "game_status_text": "Este es el estado actual de la partida. Tienes",
    "rival_has": "Tu oponente tiene",
    "p": "Peón",
    "r": "Torre",
    "n": "Caballo",
    "b": "Alfil",
    "q": "Reina",
    "k": "Rey"
  },
  "en-US": {
    "positions_text": " and its position is.",
    "game_status_text": "This is the current status of your match. You have",
    "rival_has": "Your rival has",
    "p": "Pawn",
    "r": "Rook",
    "n": "Knight",
    "b": "Bishop",
    "q": "Queen",
    "k": "King"
  }
};

const oPluralPiecesNames = {
  "es-ES": {
    "positions_text": " y sus posiciones son.",
    "p": "Peones",
    "r": "Torres",
    "n": "Caballos",
    "b": "Alfiles"
  },
  "en-US": {
    "positions_text": " and their positions are.",
    "p": "Pawns",
    "r": "Rooks",
    "n": "Knights",
    "b": "Bishops"
  }
};

const countPieces = function(oPositionPiece, sPieceCode) {
  var nCount = 0;

  Object.keys(oPositionPiece)
    .forEach(function(sKey) {
      if (oPositionPiece[sKey] === sPieceCode) {
        nCount++;
      }
    });

  return nCount;
};

const addPieceAndPositionsTexts = function(sMainText, oPositions, sPieceCode, sLocale) {
  var nPieceCount = countPieces(oPositions, sPieceCode),
      sPieceText, sPositionText;

  if (nPieceCount > 0) {
    if (nPieceCount > 1) {
      sPieceText = oPluralPiecesNames[sLocale][sPieceCode.toLowerCase()];
      sPositionText = oPluralPiecesNames[sLocale]["positions_text"];
    } else {
      sPieceText = oPieceName[sLocale][sPieceCode.toLowerCase()];
      sPositionText = oPieceName[sLocale]["positions_text"];
    }

    sMainText += " " + nPieceCount + " " + sPieceText.toLowerCase() + sPositionText + getPositionsString(oPositions, sPieceCode);
  }

  return sMainText;
};

const getPositionsString = function(oPositions, sPieceCode) {
  var sPositions = "";

  Object.keys(oPositions)
    .forEach(function(sKey) {
      if (oPositions[sKey] === sPieceCode) {
        sPositions += " " + sKey + ",";
      }
    });

  sPositions = sPositions.slice(0, -1) + ". ";

  return sPositions;
};

const getLetterPosition = function(sCellPos) {
  var sLetter;

  if (!isNaN(sCellPos)) {
    switch (parseInt(sCellPos)) {
      case 0:
        sLetter = "a";
        break;
      case 1:
        sLetter = "b";
        break;
      case 2:
        sLetter = "c";
        break;
      case 3:
        sLetter = "d";
        break;
      case 4:
        sLetter = "e";
        break;
      case 5:
        sLetter = "f";
        break;
      case 6:
        sLetter = "g";
        break;
      case 7:
        sLetter = "h";
        break;
    }
  }
  return sLetter;
};

module.exports = {
  fenToPositions(sFen) {
    var sPositions = sFen.split(" ")[0],
      asRows = sPositions.split("/"),
      asCellsInfo,
      nCellSumatori,
      oPositionsPiece = {},
      nRow,
      sKey;

    //It splits fen in different rows to check each one and its filled positions
    asRows.forEach(function(sRow, index) {
      nCellSumatori = 0;
      asCellsInfo = sRow.split("");

      //It splits the row into its different cells information. Empty cells are represented with numbers indicating the quantity of empty cells
      asCellsInfo.forEach(function(sCellInfo) {
        if (!isNaN(sCellInfo)) {
          nCellSumatori = nCellSumatori + parseInt(sCellInfo);
        } else {
          nRow = 8 - index;
          sKey = getLetterPosition(nCellSumatori) + nRow.toString();
          oPositionsPiece[sKey] = sCellInfo;
          nCellSumatori++;
        }
      });
    });

    return oPositionsPiece;
  },

  getPositionsSummary(sFen, sLocale) {
    var oPositionPiece = this.fenToPositions(sFen),
        sResponseText = oPieceName[sLocale].game_status_text;

    //White pieces
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "P", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "N", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "B", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "R", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "Q", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "K", sLocale);

    sResponseText += oPieceName[sLocale].rival_has;

    //Black pieces
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "p", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "n", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "b", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "r", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "q", sLocale);
    sResponseText = addPieceAndPositionsTexts(sResponseText, oPositionPiece, "k", sLocale);

    return sResponseText;
  },

  getPieceAtGivenPosition(sFen, sPosition, sLocale) {
    var oPositions = this.fenToPositions(sFen),
        sPieceCode = oPositions[sPosition.toLowerCase()];

    return !!sPieceCode ? oPiecesIdentification[sLocale][sPieceCode] : "None";
  }
};