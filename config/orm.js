var connection = require("../config/connection.js");


function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

var orm = {
    all: function(tableInput, br) {
        var queryString = 'SELECT * FROM' +tableInput + ';';
        connection.query(queryString, function(err,result){
            if (err) {
                throw err;
            }
            br(result);
        });
    },

    create: function(table, cols, vals, br) {
        var queryString = 'INSERT INTO' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ' )';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
            }
            br(result);
        });
    },

    update: function(table, objColVals, condition, br){
        var queryString = 'UPDATE' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }

            br(result);
        });
    },
};

module.exports = orm;