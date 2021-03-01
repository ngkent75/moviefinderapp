// Declared variables
var keyA = '599c1b07';
var keyB = '15010a1a6526890db1028fed6712f26f';
var searchInputEl = document.getElementById('search');

// var userInput = searchInputEl.value
var userInput;
var movieURL;

var encodedName;
var search;
var userFormEl = document.querySelector('#user-form');
var storageArr = [];

var wikiURL;

// Fetch request for OMDB. Creates element for title for now.


var formSubmitHandler = function (event) {
    event.preventDefault();

    userInput = searchInputEl.value
    movieURL = 'https://www.omdbapi.com/?apikey=' + keyA + '&t=' + userInput;
    console.log(searchInputEl.value);
    var encodedName = encodeURIComponent(userInput + ' (film)');
    wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodedName + '&format=json&origin=*&prop=links';



    search = searchInputEl.value;
    movieFetch();
    storeHistory();
    init();
};




userFormEl.addEventListener('submit', formSubmitHandler);


function movieFetch() {
    fetch(movieURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.Error) {
                console.log("error");
            } else {
                var titleSpot = document.getElementById('post-header')
            
                while (titleSpot.textContent) {
                titleSpot.textContent = '';
             }
                titleSpot.textContent = data.Title;

                var poster = document.getElementById("poster");  
              

                while (poster.firstChild) {
                poster.removeChild(poster.childNodes[0]);
                }
                var img = document.createElement('img');  
                  
                img.src = data.Poster
                  
                poster.appendChild(img);  
               
                

                var ratings = data.Ratings
                // Contains all the ratings
                var allRatings =[
                    ratings[0]['Source'] + ': ' + ratings[0]['Value'] + '\n' +
                    ratings[1]['Source'] + ': ' + ratings[1]['Value'] + '\n' +
                    'IMDB Rating: ' + data.imdbRating + '\n' +
                    'Metascore: ' + data.Metascore
                ]
                
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

                var movieStuffEl = document.getElementById('movieStuff')

                while (movieStuffEl.firstChild) {
                    movieStuffEl.removeChild(movieStuffEl.childNodes[0]);
                }

                for (var i = 0; i < infoArr.length; i++) {
                    if (document.getElementById('checkbox' + i).checked) {
                        console.log(infoArr[i]);
                        var infoItem = document.createElement('p')
                        infoItem.textContent = infoArr[i]
                        movieStuffEl.append(infoItem)
                    }
                }



                // Starts fetches for wiki.
                wikiFetch();
            }
        });
}





// Fetches wikipedia related media
function wikiFetch() {


    fetch(wikiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.continue) {
                var wikiID = data.continue.plcontinue.split('|')[0]
                console.log(wikiID);
                var relatedMedia = data.query.pages[wikiID]['links']
                console.log(relatedMedia);
            }
            

        })
    fetch(wikiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var relatedStuffEl = document.getElementById('relatedSearches')
            while (relatedStuffEl.firstChild) {
                relatedStuffEl.removeChild(relatedStuffEl.childNodes[0]);
            }

            if (data.continue) {
                
                var wikiID = data.continue.plcontinue.split('|')[0]
                
                var relatedMedia = data.query.pages[wikiID]['links']
                
                for (i = 0; i < relatedMedia.length; i++) {
                    var lItem = document.createElement('li')
                    lItem.textContent = relatedMedia[i]['title']
                    relatedStuffEl.append(lItem)
                }
            } else {
                var lItem = document.createElement('li')
                lItem.textContent = 'Sorry, no results found'
                relatedStuffEl.append(lItem)
            }



        });
}



// local storage

function storeHistory() {

    if (search) {

        storageArr.unshift(search);
        localStorage.setItem('history', JSON.stringify(storageArr));
        return;
    }

}

function init() {
    var storedHistory = JSON.parse(localStorage.getItem('history'))
    console.log(storedHistory);
    if (storedHistory !== null) {
        storageArr = storedHistory
        var historyOLEl = document.getElementById('historyOL')
    
        while (historyOLEl.firstChild) {
            historyOLEl.removeChild(historyOLEl.childNodes[0]);
        }
    
        for (var i = 0; i < 4; i++) {
            if (i < storedHistory.length) {
                const historyItem = document.createElement('li')
                historyItem.textContent = storedHistory[i]
                historyOLEl.append(historyItem)
                historyItem.addEventListener('click', function (event) {
                    event.preventDefault();
                
                    searchInputEl.value = historyItem.textContent
                    
                });
            }
        }
    }

    return;
}


init();