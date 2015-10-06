'use strict';
let express = require('express');
let r = require('rethinkdb');
//let config = require('./config');
let app = express();


/*
  Return promise for api
*/
const api = r.connect({
  host: 'localhost',
  port: 28015
});

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

/*
  {
    "category":  "ROBBERY" ,
    "date": Wed Jan 01 2014 02:00:00 GMT-07:00 ,
    "district":  "SOUTHERN" ,
    "id":  "00c05764-6fa1-4bb5-a3d1-705181ea5e9b" ,
    "location": {
      "$reql_type$":  "GEOMETRY" ,
      "coordinates": [
        -122.4140273 ,
        37.77186362
      ],
    "type":  "Point"
    } ,
    "resolution":  "NONE"
  }
*/


/*
  Retrieves all entries within 0.5 mi of x,y point provided.  Could be
  extended to take arbitary (but bounded) radius.  TODO: switch to metric
*/
app.get('/location/:x/:y/:r', (req, res) => {
  let x = +req.params.x;
  let y = +req.params.y;
  let radius = +req.params.r;

  api
    .then(conn => {
      return r
        .db('test')
        .table('crime')
        .getIntersecting(
          r.circle(
            [x, y],
            radius,
            {unit: 'm'}
          ), {index: 'location'})
        .group( r.row('category') )
        .count()
        .run(conn);
    })
    .then(cursor => cursor.toArray())
    .then(data => {
      if (data.length === 0) {
        res.json([{group: 'DEFAULT', reduction: 0}]);
      } else {
        res.json(data);
      }
    })
    .then(() => res.end());
});





app.listen(9000);
