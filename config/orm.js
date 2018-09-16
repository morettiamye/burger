// Import connection.js
var connection = require("./connection");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

// ORMS
var orm = {
    // Select All
    selectAll: function (table, call) {
        var queryString = "select * from" + table + ";";
        connection.query(queryString, function (err, res) {
            if (err) {
                throw err;
            }
            call(results);
        });
    },

    // Insert One
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // Update One
    updateOne: function(table, obj, condition, cb) {
        let qs = "UPDATE " + table;
        qs += " SET ";
        qs += objToSql(obj);
        qs += " WHERE ";
        qs += condition;
        console.log(qs)
        connection.query(qs, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
};

module.exports = orm;