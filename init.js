'use strict';
let r = require('rethinkdb');
let config = require('./config');
let fs = require('fs');


const api = r.connect({
  host: config.url,
  port: config.port,
  auth: config.ssl
});


const dataset = JSON
  .parse(fs.readFileSync('./SFPD.json'))
  .map(d => {
    d.X  = +d.X;
    d.Y  = +d.Y;
    d.location = r.point(d.X, d.Y);
    d.date = r.ISO8601(d.UTC.split(' ')[0] + 'T' + d.UTC.split(' ')[1] + '-07:00');
    return {
      location: d.location,
      category: d.Category,
      date: d.date,
      district: d.PdDistrict,
      resolution: d.Resolution
    };
  });


/*
  First create a database called crime.  Then iterate across the JSON
  documents
*/
dataset.forEach((data) => {
  api
    .then(conn => {
      return r
        .db('test')
        .table('crime')
        .insert(data)
        .run(conn);
    })
    .then(res => console.log(res));
});
