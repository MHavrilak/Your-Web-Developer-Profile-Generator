const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const generateHMTL = require('./generateHTML');
// const convertFactory = require('electron-pdf');
// const pdf = require('html-pdf');
// const html = fs.readFileSync('index.html', 'utf8');




const questions = [ {
    type: 'list',
    name: 'color',
    choices: [
        'green',
        'blue',
        'pink',
        'red'
    ],
    message: 'What color do you prefer?',
    
    },
    {message: 'What is your Github username?',
    type: 'text',
    name: 'username',
} 
  
];

inquirer
.prompt(questions)
// Query Github API
.then(function({ username, color}) {
    const queryUrl = `https://api.github.com/users/${username}`;

    return axios.get(queryUrl).then(function(res) {
      // const repoNames = res.data.map(function(repo) {
      //   return repo.name;
      // });
      let location = '';
      if(res.data.location) {
        location = res.data.location.replace(' ', '+')
      }
      // Query Google Maps
      let mapURL = `https://www.google.com/maps/search/${location}`;
      console.log(res.data);
      let data = {
        color: color,
        name: res.data.login,
        location: res.data.location,
        mapURL: res.data.mapURL,
        url: res.data.html_url,
        blog: res.data.blog,
        repos: res.data.public_repos,
        followers: res.data.followers


        // other keys
      }
       const html = generateHMTL(data)
       writeToFile('./index.html', html)
    })
  }).then(() => {
    
// Convert HTML to PDF
// pdf.create(html, options).toFile('index.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res);
})
// fs.readFile('index.html', 'utf8', (err, htmlString) => {
  // htmlString = htmlString.replace(/href='|src'/g, match => {
  //   return match + '';
  // });
  // const conversion = convertFactory({
  //   convertPath: convertFactory.converters.PDF,
  //   allowLocalFilesAccess: true
  // });
  // conversion({ html: htmlString }, (err, result) => {
  //   if (err) return console.error(err);
  //   result.stream.pipe(fs.createWriteStream('test.pdf'));
  //   conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
  // });
  // conversion({ html: htmlString }, (err, result) => {
  //   if (err) return console.error(err);
  //   result.stream.pipe(fs.createWriteStream('.pdf'));
  //   conversion({
  //     html: '<index.html>',
  //     waitForJS: true
  //   }, cb);
  // }


// Console to index.html
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function(err, result) {
    if (err)throw err;
    return console.log(result);
  })
}

function init() {
};

init()
