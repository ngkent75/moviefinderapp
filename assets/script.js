// Declared variables
var keyA = '599c1b07';
var keyB = '15010a1a6526890db1028fed6712f26f';
var userInput = 'Jack Reacher';
var movieURL = 'https://www.omdbapi.com/?apikey=' + keyA + '&t=' + userInput;
var wikiPath = userInput.split(' ').join('%');
var encodedName = encodeURIComponent(userInput + ' (film)')
var searchInputEl = document.getElementById('search');
var search;

var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodedName + '&format=json&origin=*&prop=links'

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


function movieFetch() {
    fetch (movieURL)
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var newTitle = document.createElement('h2')
        newTitle.textContent = data.Title
        document.body.append(newTitle)

        var ratings = data.Ratings
        // Contains all the ratings
        var allRatings = 
        ratings[0]['Source'] + ': ' + ratings[0]['Value'] + '\n' + 
        ratings[1]['Source'] + ': ' + ratings[1]['Value'] + '\n' + 
        ratings[2]['Source'] + ': ' + ratings[2]['Value'] + '\n' +
        'IMDB Rating: ' + data.imdbRating + '\n' +
        'Metascore: ' + data.Metascore
        
        // All information stored in array
        var infoArr = [
            'MPA Rating: ' + data.Rated,
            'Runtime: ' + data.Runtime,
            'Genres: ' + data.Genre,
            'Summary: ' + data.Plot,
            'Release Date: ' + data.Released,
            allRatings,
            'Actors: ' + data.Actors,
            'Directors: ' + data.Director,
            'Writers: ' + data.Writer,
            'Box Office Earnings: ' + data.BoxOffice,
            'Production Team: ' + data.Production
        ]

        // Loops through array and populates webpage and console
        for (i = 0; i < infoArr.length; i++) {
            console.log(infoArr[i]);
            var infoItem = document.createElement('p')
            infoItem.textContent = infoArr[i]
            document.body.append(infoItem)
        }
        
            

        // Starts fetches for wiki.
        wikiFetch();
    });
}



movieFetch();

// Fetches wikipedia related media
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


    fetch (wikiURL)
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var wikiID = data.continue.plcontinue.split('|')[0]

        var uList = document.createElement('ul')
        uList.id = 'mediaList'
        document.body.append(uList)
        var relatedMedia = data.query.pages[wikiID]['links']
        for (i = 0; i < relatedMedia.length; i++) {
          var lItem = document.createElement('li')
          lItem.textContent = relatedMedia[i]['title']
          uList.append(lItem)
        }

        

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

var userFormEl = document.querySelector('#user-form');
var storageArr = [];


var formSubmitHandler = function (event) {
    event.preventDefault();
    
    console.log('test');
    search = searchInputEl.value;
    storeHistory();
    init();
};


// local storage
userFormEl.addEventListener('submit', formSubmitHandler);

function storeHistory() {
    
    if (search) {

        storageArr.push(search);
        localStorage.setItem('history', JSON.stringify(storageArr));
        return;
    }
}

function init() {
    var storedHistory = JSON.parse(localStorage.getItem('history'))
    console.log(storedHistory);
    if (storedHistory !== null) {
        storageArr = storedHistory
    }
    return;
}


init();
