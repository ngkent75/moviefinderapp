// Declared variables
var keyA = '599c1b07';
var keyB = '15010a1a6526890db1028fed6712f26f';
var searchInputEl = document.getElementById('search');
var userInput;
var movieURL;
var encodedName;
var search;
var userFormEl = document.querySelector('#user-form');
var storageArr = [];
var wikiURL;

// Fetch request for OMDB
var formSubmitHandler = function (event) {
    event.preventDefault();
    // Assigns the search bar value to variable
    userInput = searchInputEl.value
    // Pathing for URLs
    movieURL = 'https://www.omdbapi.com/?apikey=' + keyA + '&t=' + userInput;
    var encodedName = encodeURIComponent(userInput + ' (film)');
    wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodedName + '&format=json&origin=*&prop=links';
    search = searchInputEl.value;
    // Fires funtions for the fetch request, local storage, and initializer
    movieFetch();
    storeHistory();
    init();
};

// Adds event listener to the form
userFormEl.addEventListener('submit', formSubmitHandler);

// Fetch request for the movie information
function movieFetch() {
    fetch(movieURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var titleSpot = document.getElementById('post-header')
            // if no movie data is pulled
            if (data.Error) {
                titleSpot.textContent = 'Sorry, not a valid movie title';
            } else {
                // resets title
                while (titleSpot.textContent) {
                titleSpot.textContent = '';
             }
                // sets title
                titleSpot.textContent = data.Title;
                
                var poster = document.getElementById("poster");  

                // resets poster
                while (poster.firstChild) {
                poster.removeChild(poster.childNodes[0]);
                }

                // sets poster
                var img = document.createElement('img');  
                img.src = data.Poster
                poster.appendChild(img);  

                // Contains all the ratings
                var ratings = data.Ratings
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
            var relatedStuffEl = document.getElementById('relatedContent')
            var relatedContentTitle = document.createElement('h2')
            relatedContentTitle.textContent = "Related to your search"

            // resets related media
            while (relatedStuffEl.firstChild) {
                relatedStuffEl.removeChild(relatedStuffEl.childNodes[0]);
            }

            if (data.continue) {
                // gets the wiki ID to open up proper arrays
                relatedStuffEl.append(relatedContentTitle)
                var wikiID = data.continue.plcontinue.split('|')[0]
                var relatedMedia = data.query.pages[wikiID]['links']
                
                
                // populates items
                for (i = 0; i < relatedMedia.length; i++) {
                    var lItem = document.createElement('li')
                    lItem.textContent = relatedMedia[i]['title']
                    relatedStuffEl.append(lItem)
                }
            // If can't find wiki, shows message
            } else {
                relatedStuffEl.append(relatedContentTitle)
                var lItem = document.createElement('li')
                lItem.textContent = 'Sorry, no results found'
                relatedStuffEl.append(lItem)
            }



        });
}

// local storage

// stores search items into local storage
function storeHistory() {

    if (search) {

        storageArr.unshift(search);
        localStorage.setItem('history', JSON.stringify(storageArr));
        return;
    }

}

// Receives items from local storage and displays them as search history
function init() {
    // gets local storage
    var storedHistory = JSON.parse(localStorage.getItem('history'))
    // If local storage isn't null
    if (storedHistory !== null) {
        // Updates storage array with the storedHistory
        storageArr = storedHistory
        var historyOLEl = document.getElementById('historyOL')
        // resets search history
        while (historyOLEl.firstChild) {
            historyOLEl.removeChild(historyOLEl.childNodes[0]);
        }
        // sets search history
        for (var i = 0; i < 4; i++) {
            if (i < storedHistory.length) {
                const historyItem = document.createElement('li')
                historyItem.textContent = storedHistory[i]
                historyOLEl.append(historyItem)
                // makes searches clickable to make them appear in search bar
                historyItem.addEventListener('click', function (event) {
                    event.preventDefault();
                
                    searchInputEl.value = historyItem.textContent
                    
                });
            }
        }
    }

    return;
}

// runs initializer
init();