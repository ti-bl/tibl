const marked = require('marked')
const tocbot = require('tocbot')
const hljs = require('highlight.js')
const jsyaml = require("js-yaml")
const fs = require('fs');
const path = require('path');

// function build(outfile = "static") {
//     bleh("data")
//     function bleh(dir) {
//         readdir_options = {
//             'withFilaaaeTypes': true
//         };
//         fs.readdir(dir, readdir_options, (err, files) => {
//         files.forEach(file => {
//           file = path.resolve(dir, file);
//           if(file.isDirectory() == true) {
//               console.log(" bleh")
//           }  
//         });
//       });
//     }

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
};
      

function build(infiles, outfolder="static") {
    for(let i=0; i<infiles.length; i++) {
        if(path.extname(infiles[i]) == ".md") {
            let outpath = infiles[i].replace("data", "static");
            console.log(outpath);
        }
    }
}
    //build the index
    //build pages and topics
    //build the build.json file

// build();
walk("data", function(err, results) {
    if (err) throw err;
    build(results);
    // console.log(results);
  });