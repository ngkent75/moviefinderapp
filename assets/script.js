
// Declared variables
var keyA = '599c1b07';
var keyB = '15010a1a6526890db1028fed6712f26f';
var userInput = 'John Wick';
var movieURL = 'https://www.omdbapi.com/?apikey=' + keyA + '&t=' + userInput;
var wikiPath = userInput.split(' ').join('%');
var encodedName = encodeURIComponent(userInput + ' (film)')
var searchInputEl = document.getElementById('search');
var search;

var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodedName + '&format=json&origin=*&prop=links'

// Fetch request for OMDB. Creates element for title for now.

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
        // Starts fetches for poster after so the poster generates underneath.
        wikiFetch();
    });
}

movieFetch();

// Fetches wikipedia related media
function wikiFetch() {

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


var userFormEl = document.querySelector('#user-form');
var storageArr = [];


var formSubmitHandler = function (event) {
    event.preventDefault();
    
    console.log('test');
    search = searchInputEl.value;
    storeHistory();
    init();
};

userFormEl.addEventListener('submit', formSubmitHandler);

function storeHistory() {
    
    if (search) {

        storageArr.push(search);
        localStorage.setItem('history', JSON.stringify(storageArr));
        return;
    }
}
// renders history
function renderHistory() {
    var grabHistory = JSON.parse(localStorage.getItem('history'));
    var recentS = document.getElementById('recentS') 
    var liItem1 = document.createElement('li')
    var liItem2 = document.createElement('li')
    var liItem3 = document.createElement('li')
    var liItem4 = document.createElement('li')
    var liItem5 = document.createElement('li')
    liItem1.id = 'recentSearch1'
    liItem2.id = 'recentSearch2'
    liItem3.id = 'recentSearch3'
    liItem4.id = 'recentSearch4'
    liItem5.id = 'recentSearch5'
    for (i = 0; i < history.length; i++) {
        liItem1.textContent = grabHistory[0]
        liItem2.textContent = grabHistory[1]
        liItem3.textContent = grabHistory[2]
        liItem4.textContent = grabHistory[3]
        liItem5.textContent = grabHistory[4]
        recentS.append(liItem1, liItem2, liItem3, liItem4, liItem5)
        

    }
}
renderHistory();
function init() {
    var storedHistory = JSON.parse(localStorage.getItem('history'))
    console.log(storedHistory);
    if (storedHistory !== null) {
        storageArr = storedHistory
    }
    return;
}
init();









  
  

