
// Declared variables
var keyA = '599c1b07';
var keyB = '15010a1a6526890db1028fed6712f26f';
var userInput = 'John Wick';
var movieURL = 'https://www.omdbapi.com/?apikey=' + keyA + '&t=' + userInput;
var wikiPath = userInput.split(' ').join('%');
var encodedName = encodeURIComponent(userInput + ' (film)')

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

$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
    e.preventDefault();
    $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
  });
  //More (Expand) or Less (Collapse)
$('.categories-menu.menu.nested').each(function(){
    var filterAmount = $(this).find('li').length;
    if( filterAmount > 5){    
      $('li', this).eq(4).nextAll().hide().addClass('toggleable');
      $(this).append('<li class="more">More</li>');    
    }  
  });
  
  $('.categories-menu.menu.nested').on('click','.more', function(){
    if( $(this).hasClass('less') ){    
      $(this).text('More').removeClass('less');    
    }else{
      $(this).text('Less').addClass('less'); 
    }
    $(this).siblings('li.toggleable').slideToggle(); 
  }); 
  
  
  

