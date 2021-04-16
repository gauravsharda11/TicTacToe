import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';
import Winner from './pages/Winner';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/game' component={Game} />
          <Route path='/winner' component={Winner} />
        </Switch>
      </Router>
    </>
  );
}




const http = require("http");
const url = require("url");
const fs = require("fs");
const { parse } = require('querystring');
const mysql = require("mysql");

const DATABASE = "tictactoe";

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',   ///put your username and pass
    password: 'root',
    database: DATABASE
});

const nodemailer = require("nodemailer");
//Use Gmail go to following link and allow the button
//https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4ONBCFZBxn7kskYJ-sDy3xOzD2sYOQQbV3dN2b-sY9e52DsKZ_0wGGIi9RQyehfOPt_L96tVPyLUCncS0bcnC9lWNn3lA
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '',//gmail
        pass: ''//password
    }
}); /// I dont mind if you dont have a email


const server = http.createServer(function (req, res) {
    if (req.url != '/favicon.ico') {
        let parsedURL = url.parse(req.url, true);
        let path = parsedURL.pathname;
        path = path.replace(/^\/+|\/+$/g, "");
        let qs = parsedURL.query;
        let headers = req.headers;
        let method = req.method.toLowerCase();
        let body = '';

        req.on("data", function (chunk) {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on("end", function () {
            let requestedData = parse(body);
            if (method == "post" && path == "game.html") {
                conn.connect(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Connected');
                        conn.query("DROP DATABASE IF EXISTS " + DATABASE, function (err, result) {
                            if (err) throw err;
                            console.log("Database droped");

                            conn.query("CREATE DATABASE " + DATABASE, function (err, result) {
                                if (err) throw err;
                                console.log("Database created");
                                conn.changeUser({
                                    database: DATABASE
                                }, (err) => {
                                    if (err) {
                                        console.log('Error in changing database', err);
                                        return;
                                    }
                                })

                                conn.query("drop table IF EXISTS players", function (err, result) {
                                    if (err) throw err;
                                    console.log("table dropped");
                                })

                                var sql = "CREATE TABLE players (name VARCHAR(255), email VARCHAR(255), type VARCHAR(2))";
                                conn.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Table created");
                                    var sql = "INSERT INTO players (name, email,type) VALUES ('" + requestedData.p1_uname + "', '" + requestedData.p1_email + "','x'),('" + requestedData.p2_uname + "', '" + requestedData.p2_email + "','o')";
                                    conn.query(sql, function (err, result) {
                                        if (err) throw err;
                                        console.log("Record inserted");
                                    });

                                });
                            });
                        });
                    }
                })
            }
            fs.readFile(path, function (err, data) {
                if (err) {
                    console.log("error=>", err)
                    let route = typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
                    let data = {
                        path: path,
                        queryString: qs,
                        requestedData: requestedData,
                        headers: headers,
                        method: method
                    };
                    route(data, res);
                } else {
                    res.write(data);
                    res.end()
                }
            })
        });
    }
});

server.listen(1234, function () {
    console.log("Listening on port 1234");
});

let routes = {
    matchStatus: function (data, res) {
        if (data.method == 'post') {
            var sql = "select * from players where type=?";
            conn.query(sql, [data.requestedData.player], function (err, results) {
                if (err) throw err;
                let name = results[0].name;
                let email = results[0].email;
                let type = results[0].type;
                const mailOptions = {
                    from: 'tictactoe@info.com',
                    to: email,
                    subject: 'Congratulations you win the match',
                    text: 'Congratulations ' + name + ' you win the Tic Tac Toe Match as ' + type + ' player'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

            });

        }
        res.end("\n");
    },
    notFound: function (data, res) {
        let payload = {
            message: "File Not Found",
            code: 404
        };
        let payloadStr = JSON.stringify(payload);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(404);
        res.write(payloadStr);
        res.end("\n");
    }
};

export default App;