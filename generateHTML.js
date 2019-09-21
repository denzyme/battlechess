const utils = require("./utils");
const apiId = "c77aad0b-77f1-4259-bb9a-ac84f6945c37";
const apiKey = "4678ff43-9b89-4266-a824-f58a027a78c4";
const https = require('https');
const authBase64 = "NWI3NzM0N2ItYjZiNC00YTJhLTk2MGItOTZmNjA0ZDQyZTE3OmVkNjUzYzVlLTRiZWQtNDI2Mi04NDNjLTQ1MzYyZThhNzA4ZA==";
const pieces = {
  "P": "&#9817;",
  "R": "&#9814;",
  "N": "&#9816;",
  "B": "&#9815;",
  "Q": "&#9813;",
  "K": "&#9812;",
  "p": "&#9823;",
  "r": "&#9820;",
  "n": "&#9822;",
  "b": "&#9821;",
  "q": "&#9819;",
  "k": "&#9818;"
};
const getPiece = function(oCellPieces, sCell) {
  return pieces[oCellPieces[sCell]] ? pieces[oCellPieces[sCell]] : "";
};

const buildHTMLBoard = function(oCellPiece) {
    const sHTMLTags ="<table class='table' border=5 cellspacing=0>" +
      "<tr>" +
      "<td bgcolor='#f0d9b5' id=\"a8\"><div><div class=\"left\">8</div>" + getPiece(oCellPiece, "a8") +  "</div></td>" +
      "<td bgcolor='#b58863' id=\"b8\">" + getPiece(oCellPiece, "b8") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"c8\">" + getPiece(oCellPiece, "c8") +  "</td>" +
      "<td bgcolor='#b58863' id=\"d8\">" + getPiece(oCellPiece, "d8") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"e8\">" + getPiece(oCellPiece, "e8") +  "</td>" +
      "<td bgcolor='#b58863' id=\"f8\">" + getPiece(oCellPiece, "f8") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"g8\">" + getPiece(oCellPiece, "g8") +  "</td>" +
      "<td bgcolor='#b58863' id=\"h8\">" + getPiece(oCellPiece, "h8") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#b58863' id=\"a7\"><div><div class=\"left\">7</div>" + getPiece(oCellPiece, "a7") +  "</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"b7\">" + getPiece(oCellPiece, "b7") +  "</td>" +
      "<td bgcolor='#b58863' id=\"c7\">" + getPiece(oCellPiece, "c7") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"d7\">" + getPiece(oCellPiece, "d7") +  "</td>" +
      "<td bgcolor='#b58863' id=\"e7\">" + getPiece(oCellPiece, "e7") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"f7\">" + getPiece(oCellPiece, "f7") +  "</td>" +
      "<td bgcolor='#b58863' id=\"g7\">" + getPiece(oCellPiece, "g7") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"h7\">" + getPiece(oCellPiece, "h7") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#f0d9b5' id=\"a6\"><div><div class=\"left\">6</div>" + getPiece(oCellPiece, "a6") +  "</div></td>" +
      "<td bgcolor='#b58863' id=\"b6\">" + getPiece(oCellPiece, "b6") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"c6\">" + getPiece(oCellPiece, "c6") +  "</td>" +
      "<td bgcolor='#b58863' id=\"d6\">" + getPiece(oCellPiece, "d6") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"e6\">" + getPiece(oCellPiece, "e6") +  "</td>" +
      "<td bgcolor='#b58863' id=\"f6\">" + getPiece(oCellPiece, "f6") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"g6\">" + getPiece(oCellPiece, "g6") +  "</td>" +
      "<td bgcolor='#b58863' id=\"h6\">" + getPiece(oCellPiece, "h6") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#b58863' id=\"a5\"><div><div class=\"left\">5</div>" + getPiece(oCellPiece, "a5") +  "</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"b5\">" + getPiece(oCellPiece, "b5") +  "</td>" +
      "<td bgcolor='#b58863' id=\"c5\">" + getPiece(oCellPiece, "c5") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"d5\">" + getPiece(oCellPiece, "d5") +  "</td>" +
      "<td bgcolor='#b58863' id=\"e5\">" + getPiece(oCellPiece, "e5") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"f5\">" + getPiece(oCellPiece, "f5") +  "</td>" +
      "<td bgcolor='#b58863' id=\"g5\">" + getPiece(oCellPiece, "g5") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"h5\">" + getPiece(oCellPiece, "h5") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#f0d9b5' id=\"a4\"><div><div class=\"left\">4</div>" + getPiece(oCellPiece, "a4") +  "</div></td>" +
      "<td bgcolor='#b58863' id=\"b4\">" + getPiece(oCellPiece, "b4") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"c4\">" + getPiece(oCellPiece, "c4") +  "</td>" +
      "<td bgcolor='#b58863' id=\"d4\">" + getPiece(oCellPiece, "d4") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"e4\">" + getPiece(oCellPiece, "e4") +  "</td>" +
      "<td bgcolor='#b58863' id=\"f4\">" + getPiece(oCellPiece, "f4") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"g4\">" + getPiece(oCellPiece, "g4") +  "</td>" +
      "<td bgcolor='#b58863' id=\"h4\">" + getPiece(oCellPiece, "h4") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#b58863' id=\"a3\"><div><div class=\"left\">3</div>" + getPiece(oCellPiece, "a3") +  "</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"b3\">" + getPiece(oCellPiece, "b3") +  "</td>" +
      "<td bgcolor='#b58863' id=\"c3\">" + getPiece(oCellPiece, "c3") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"d3\">" + getPiece(oCellPiece, "d3") +  "</td>" +
      "<td bgcolor='#b58863' id=\"e3\">" + getPiece(oCellPiece, "e3") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"f3\">" + getPiece(oCellPiece, "f3") +  "</td>" +
      "<td bgcolor='#b58863' id=\"g3\">" + getPiece(oCellPiece, "g3") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"h3\">" + getPiece(oCellPiece, "h3") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#f0d9b5' id=\"a2\"><div><div class=\"left\">2</div>" + getPiece(oCellPiece, "a2") +  "</div></td>" +
      "<td bgcolor='#b58863' id=\"b2\">" + getPiece(oCellPiece, "b2") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"c2\">" + getPiece(oCellPiece, "c2") +  "</td>" +
      "<td bgcolor='#b58863' id=\"d2\">" + getPiece(oCellPiece, "d2") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"e2\">" + getPiece(oCellPiece, "e2") +  "</td>" +
      "<td bgcolor='#b58863' id=\"f2\">" + getPiece(oCellPiece, "f2") +  "</td>" +
      "<td bgcolor='#f0d9b5' id=\"g2\">" + getPiece(oCellPiece, "g2") +  "</td>" +
      "<td bgcolor='#b58863' id=\"h2\">" + getPiece(oCellPiece, "h2") +  "</td>" +
      "</tr>" +
      "<tr>" +
      "<td bgcolor='#b58863' id=\"a1\"><div><div class=\"left\">1</div>" + getPiece(oCellPiece, "a1") +  "</div><div class=\"letter\">a</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"b1\">" + getPiece(oCellPiece, "b1") +  "<div class=\"letter\">b</div></td>" +
      "<td bgcolor='#b58863' id=\"c1\">" + getPiece(oCellPiece, "c1") +  "<div class=\"letter\">c</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"d1\">" + getPiece(oCellPiece, "d1") +  "<div class=\"letter\">d</div></td>" +
      "<td bgcolor='#b58863' id=\"e1\">" + getPiece(oCellPiece, "e1") +  "<div class=\"letter\">e</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"f1\">" + getPiece(oCellPiece, "f1") +  "<div class=\"letter\">f</div></td>" +
      "<td bgcolor='#b58863' id=\"g1\">" + getPiece(oCellPiece, "g1") +  "<div class=\"letter\">g</div></td>" +
      "<td bgcolor='#f0d9b5' id=\"h1\">" + getPiece(oCellPiece, "h1") +  "<div class=\"letter\">h</div></td>" +
      "</tr>" +
      "</table>";

    return sHTMLTags;
};

module.exports = {
  createPNGWithFen(sFen, fnSuccess) {
    const data = JSON.stringify({
      html: buildHTMLBoard(utils.fenToPositions(sFen)),
      css: ".left {display: inline-block; *display: inline; zoom: 1; vertical-align: top; font-size: 8px;} .letter {font-size: 8px;}"
    });

    const options = {
      hostname: 'hcti.io',
      port: 443,
      path: '/v1/image',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + authBase64
      }
    };

    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        const image = JSON.parse(d);
        if (fnSuccess) {
          fnSuccess(image["url"]);
        }
      })
    });

    req.write(data);
    req.end();
  }
};