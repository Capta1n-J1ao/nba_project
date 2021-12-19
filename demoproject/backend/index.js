const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// Connect to the DataBase
var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    port: '3308',
    password:'12345678',
    database:'cs411pt1',
})


// start cmd:
// npm run devStart

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// DONE: Get all the players
app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM Players";
    db.query(sqlSelect, function (err, result, fields) {
        response.send(result);
        if (err) throw err;
        //console.log(result);
    });
});

// TODO: Add a new player (pID) to the user (userID) team
app.put("/api/update/add_player/", (require, response) => {
    // TODO
    const sqlUpdate = "insert ignore into UserTeams values (" + require.body.userID + ", " + require.body.pID + ")";
    db.query(sqlUpdate, (err, result) => {
        if (err) 
        console.log(error);
    })
});

// DONE: Get all the players for a specific user with (userID)
app.get("/api/get/user/:userID", (require, response) => {
    const sqlSelect = "SELECT * FROM Users natural join UserTeams natural join Players WHERE uID = " + require.params.userID;
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// DONE: Get the team name for a specific user with (userID)
app.get("/api/get/username/:userID", (require, response) => {
    const sqlSelect = "SELECT uteamName FROM Users WHERE uID = " + require.params.userID;
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// TODO: Remove a player from the team
app.put("/api/update/remove_player", (require, response) => {
    const pID = require.body.pID;
    const uID = require.body.userID;
    var sqlDelete = "DELETE FROM UserTeams WHERE pID = ? and uID = ?";
    db.query(sqlDelete, [pID, uID], (err, result) => {
        if (err)
            console.log(error);
    })
});

// TODO: Generate a set of potential players for the user's team
app.get("/api/get/investigator/:userID", (require, response) => {
    const sqlSelect = "TODO;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// TODO: Delete a player from the DataBase
app.delete("/api/delete/:pID", (require, response) => {
    const movieName = require.params.pID;

    const sqlDelete = "TODO";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) 
        console.log(error);
    })
});

// TODO: Insert/Update a player's information
app.post("/api/modify/player", (require, response) => {
    const pID = require.body.pID;
    const pAttr = require.body.pAttr;
    const teamID = require.body.teamID;
    const pName = require.body.pName;
    const pPos = require.body.pPos;
    const pHeight = require.body.pHeight;
    const pWeight = require.body.pWeight;
    const overall = require.body.overall;
    const insideScore = require.body.insideScore;
    const outsideScore = require.body.outsideScore;
    const athleticism = require.body.athleticism;
    const playMaking = require.body.playMaking;
    const rebounding = require.body.rebounding;
    const defending = require.body.defending;
    var s = "update Players set pAttr=?, teamID=?, pName=?, pPos=?, pHeight=?, pWeight=?, overall=?, insideScore=?, outsideScore=?, athleticism=?, playMaking=?, rebounding=?, defending=? where pID=?";
    db.query(s, [pAttr, teamID, pName, pPos, pHeight, pWeight, overall, insideScore, outsideScore, athleticism, playMaking, rebounding, defending, pID], function (err, result) {
        if (err) throw err;
    });
});


// DONE: Get the MCProvider for a specific user with (userID)
app.get("/api/get/mcprovider/:userID", (require, response) => {
    const sqlSelect = "SELECT * FROM MCProviders";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// DONE: Get all the MCProvider
app.get("/api/get/mcprovider/", (require, response) => {
    const sqlSelect = "SELECT * FROM mcproviders;";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// TODO: Change MCProvider for a user
app.put("/api/update/mcprovider", (require, response) => {
    // TODO
    db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.get("/api/get/adv1/", (require, response) => {
    // the returning reuslt of this query is: teamName, MCFee.
    const sql = `select Teams.teamName as teamName,count(pID)*MCProviders.feePerPlayer as MCFee from MCProviders natural join Teams natural join Players where Players.teamID < 31 group by Players.teamID having avg(overall) >= 60 order by MCFee DESC`;
    db.query(sql, (err, result) => {
        response.send(result);
    })
});

app.get("/api/get/adv2/:teamNameLike/:arenaNameLike", (require, response) => {
    const teamNameLike = require.params.teamNameLike;
    const arenaNameLike = require.params.arenaNameLike;
    // the returning reuslt of this query is: arOpenYear, capacityBuilt
    const sql = '(SELECT arOpenYear, AVG(arCapacity) as capacityBuilt FROM Teams NATURAL JOIN Arenas WHERE teamName LIKE "%'+teamNameLike+'%" GROUP BY arOpenYear ORDER BY arOpenYear DESC ) UNION (SELECT arOpenYear, AVG(arCapacity) as capacityBuilt FROM Teams NATURAL JOIN Arenas WHERE arName LIKE "%'+arenaNameLike+'%" GROUP BY arOpenYear ORDER BY arOpenYear DESC )';
    db.query(sql, (err, result) => {
        response.send(result);
        if (err)
            console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})
