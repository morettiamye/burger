// Require some stuff
var express = require('express');
var router = express.Router();
var burger = require('../models/burgers.js');


// Routers
router.get("/", function (req, res) {
    burger.selectAll(function (allDaBurgers) {
        var hbsBurgersObj = {
            burgers: allDaBurgers
        };
        res.render('index', hbsBurgersObj)
    });
});

router.post('/api/burgers', function (req, res) {
    burger.insertOne("burger_name", req.body.name, function (res) {
        console.log('burger added');
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    var param = req.body;
    burger.updateOne(param, condition, function (result) {
        if (result.changedRows === 0) {
            console.log("404");
            return res.status(404).end();
        } else {
            console.log("updated")
            res.status(200).end();
        }
    });

    router.delete("/api/burgers/:id", function (req, res) {
        var condition = "id = " + req.params.id;
        burger.deleteOne(condition, function (result) {
            if (result.affectedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        })

    })

});


module.exports = router;