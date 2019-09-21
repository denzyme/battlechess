const https = require('http');
const hostname = "chess-api-chess.herokuapp.com";
const oHeader = {
  "Content-Type": "application/x-www-form-urlencoded"
};

module.exports = {
  createNewGame(fnSuccess) {
    https.get("http://" + hostname + "/api/v1/chess/one", (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        if (fnSuccess) {
          fnSuccess(JSON.parse(data));
        }
      });

    });
  },

  getFenPosition(sGameId, fnSuccess) {
    const data = "game_id=" + sGameId;

    const options = {
      hostname: hostname,
      path: "/api/v1/chess/one/fen",
      method: 'POST',
      headers: oHeader
    };

    const req = https.request(options, res => {
      res.on("data", d => {
        if (fnSuccess) {
          fnSuccess(JSON.parse(d));
        }
      });
    });

    req.write(data);
    req.end();
  },

  getPossibleMovements(sGameId, sPosition, fnSuccess) {
    const data = "position=" + sPosition + "&game_id=" + sGameId;

    const options = {
      hostname: hostname,
      path: "/api/v1/chess/one/moves",
      method: 'POST',
      headers: oHeader
    };

    const req = https.request(options, res => {
      res.on("data", d => {
        if (fnSuccess) {
          fnSuccess(JSON.parse(d));
        }
      });
    });

    req.write(data);
    req.end();
  },

  moveFigurePlayer(sGameId, sFrom, sTo, fnSuccess) {
    const data = "from=" + sFrom.toLowerCase() + "&to=" + sTo.toLowerCase() + "&game_id=" + sGameId;

    const options = {
      hostname: hostname,
      path: "/api/v1/chess/one/move/player",
      method: 'POST',
      headers: oHeader
    };

    const req = https.request(options, res => {
      res.on("data", d => {
        if (fnSuccess) {
          fnSuccess(JSON.parse(d));
        }
      });
    });

    req.write(data);
    req.end();
  },

  moveFigureAI(sGameId, fnSuccess) {
    const data = "game_id=" + sGameId;

    const options = {
      hostname: hostname,
      path: "/api/v1/chess/one/move/ai",
      method: 'POST',
      headers: oHeader
    };

    const req = https.request(options, res => {
      res.on("data", d => {
        if (fnSuccess) {
          fnSuccess(JSON.parse(d));
        }
      });
    });

    req.write(data);
    req.end();
  },

  getPlayerHelp(sGameId, fnSuccess) {
    const data = "game_id=" + sGameId;

    const options = {
      hostname: hostname,
      path: "/api/v1/chess/one/help",
      method: 'POST',
      headers: oHeader
    };

    const req = https.request(options, res => {
      res.on("data", d => {
        console.log(JSON.parse(d));
        if (fnSuccess) {
          fnSuccess(JSON.parse(d));
        }
      });
    });

    req.write(data);
    req.end();
  }
};