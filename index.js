const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const { runSQLQuery, handleError } = require('./config/db');
const { exec } = require('child_process');

require('dotenv').config();

var server = express();

server.use(cors());
server.use(logger('dev'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use(session({ secret: process.env.NODE_LOCAL_SECRET }));

server.post('/save', (req, res, next) => {
    const {
        url
    } = req.body;

    if (!url) return res.status(400).json({
        success : false,
        msg : "Missing url."
    });

    runSQLQuery(`select Id_website from Website where url="${url}";`)
    .then(rr => {
        if (!rr.length) {
            // Save in DB
            runSQLQuery(`select uuid() as filename;`).then(id => {
                runSQLQuery(`insert into Website(Id_website, url, addedAt) values("${id[0].filename}", "${url}", NOW());`)
                .then(r => {
                    if (r.affectedRows) {
                        // Install website in the public directory
                        exec(`wget ${url} -r -O ./public/${id[0].filename}`, (error, stdout, stderr) => {
                            if (error) handleError(error, res);
                            else if (stdout || stderr) res.json({
                                success: true
                            });
                        });                    
                    }

                    else return res.status(400).json({
                        success : false,
                        msg : "An error occured while trying to save the new website."
                    })
                })
                .catch(err => handleError(err, res));
            })
            .catch(err => handleError(err, res));
        }

        else return res.status(400).json({
            success : false,
            msg : "Url already saved."
        });
    })
    .catch(err => handleError(err, res));

});

server.get('/view/:id', (req, res, next) => {
    const {
        id
    } = req.params;

    if (!id) return res.status(400).json({
        success : false,
        msg : "Missing url."
    });

    runSQLQuery(`select Id_website from Website where Id_website="${id}";`)
    .then(r => {
        if (r.length) res.sendFile(path.join(__dirname, "public/", "dd2a7586-cc73-11ec-bae5-b1db367bc775"));
        else res.status(400).json({
            success : false,
            msg : "Not found."
        });
    })
    .catch(err => handleError(err, res));
});

server.get("/list", (req, res, next) => {
    runSQLQuery(`select * from Website;`).then(r => res.json({
        success : true,
        data : r
    }))
    .catch(err => handleError(err, res));
});

server.get("/remove/:id", (req, res, next) => {
    const {
        id
    } = req.params;

    if (!id) return res.status(400).json({
        success : false,
        msg : "Missing id."
    });

    runSQLQuery(`delete from Website where Id_website="${id}";`).then(r => res.json({
        success : true
    }))
    .catch(err => handleError(err, res));
});


// catch 404 and forward to error handler
server.use(function(req, res, next) {
  res.status(404).json({ msg : "La page n'existe pas." });
});

// error handler
server.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  
  if (req.user) {
    res.json({ msg : err.message });
    console.log(err.message);
  } else {
  	res.json({ msg : err.message });
  	console.log(err.message);
  }
});

const port = process.env.NODE_LOCAL_PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));