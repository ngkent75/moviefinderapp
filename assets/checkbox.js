//Declaring Variables

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