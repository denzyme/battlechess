const languageStrings = require('./translations');
const chessCalls = require("./chessApiCall");

const fenToPositions = function(sFen) {
  var sPositions = sFen.split(" ")[0],
      asRows = sPositions.split("/"),
      asCellsInfo,
      nCellSumatori,
      oPositions = {},
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
        nRow = index + 1;
        sKey = nRow.toString() + getLetterPosition(nCellSumatori);
        oPositions[sKey] = sCellInfo;
        nCellSumatori++;
      }
    });
  });

  return oPositions;
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

chessCalls.getFenPosition("5d854b90b4c0350014217bce", function() {});