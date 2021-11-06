const express = require("express");
// post请求解析
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// start cmd:
// npm run devStart

var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    port: '3308',
    password:'12345678',
    database:'cs411pt1',
})

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (6,'inception2', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Ironman2', 'cool movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

// 相关模块配置
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// url解码
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.delete("/api/delete/:movieName", (require, response) => {
    const movieName = require.params.movieName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.put("/api/update/", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
    db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
        if (err) 
        console.log(error);
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})

