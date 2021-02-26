
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


function wikiFetch() {

    fetch (testWiki)
    .then (function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        var wikiID = data.continue.plcontinue.split('|')[0]
        console.log(wikiID);
        var relatedMedia = data.query.pages.wikiID.links
        console.log(relatedMedia);
        
    });
};


/Declaring Variables

var actionRemeber = document.querySelector('#action-remember');
var adventureRemeber = document.querySelector('#adventure-remember');
var comedyRemeber = document.querySelector('#comedy-remember');
var horrorRemeber = document.querySelector('#horror-remember');
var romanceRemeber = document.querySelector('#romance-remember');

//When checkbox is selected, pull that category of movie


actionRemeber.addEventListener('change', function(e){
    if(actionRemeber.checked){
        console.log(actionRemeber);
    } else {
        console.log(actionRemeber);
    }
});

adventureRemeber.addEventListener('change', function(e){
    if(adventureRemeber.checked){
        console.log(adventureRemeber);
    } else {
        console.log(adventureRemeber);
    }
});

comedyRemeber.addEventListener('change', function(e){
    if(comedyRemeber.checked){
        console.log(comedyRemeber);
    } else {
        console.log(comedyRemeber);
    }
});

horrorRemeber.addEventListener('change', function(e){
    if(horrorRemeber.checked){
        console.log(horrorRemeber);
    } else {
        console.log(horrorRemeber);
    }
});

romanceRemeber.addEventListener('change', function(e){
    if(romanceRemeber.checked){
        console.log(romanceRemeber);
    } else {
        console.log(romanceRemeber);
    }
});

// script goes here
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
  
  
  

