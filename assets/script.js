// Declared variables
var keyA = '599c1b07';
var keyB = '15010a1a6526890db1028fed6712f26f';
var userInput = 'Jack Reacher';
var movieURL = 'https://www.omdbapi.com/?apikey=' + keyA + '&t=' + userInput;
var wikiPath = userInput.split(' ').join('%');
var encodedName = encodeURIComponent(userInput + ' (film)')
console.log(encodedName);

var testWiki = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodedName + '&format=json&origin=*&prop=links'

// Fetch request for OMDB. Creates element for title for now.
fetch(movieURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var newTitle = document.createElement('h2')
    newTitle.textContent = data.Title
    document.body.append(newTitle)
    // Starts fetches for poster after so the poster generates underneath.
    wikiFetch();
  });


function wikiFetch() {

  fetch(testWiki)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var wikiID = data.continue.plcontinue.split('|')[0]
      console.log(wikiID);
      var relatedMedia = data.query.pages[wikiID]['links']
      console.log(relatedMedia);

    });
};


//Declaring Variables

var actors = document.querySelector('#actors');
var awards = document.querySelector('#awards');
var earnings = document.querySelector('#earnings');
var directors = document.querySelector('#directors');
var genre = document.querySelector('genre');
var ratings = document.querySelector('#ratings');
var summray = document.querySelector('#summary');
var productionteam = document.querySelector('#productionteam');
var pgr = document.querySelector('#pgr');
var reldate = document.querySelector('#reldate');
var runtime = document.querySelector('#runtime');
var writer = document.querySelector('#writer');

//When checkbox is selected, pull that category of movie

