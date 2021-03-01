# MovieFinder App

## Table of Contents

<br>

[Description](#description)

[Usage](#Usage)

[Criteria](#criteria)

<br>

## Description

<br>

This project allows the user to search for a movie a have information displayed about the movie and related media. The information shown can be customized using checkboxes in the side panel. All searches will be saved to local storage and the last four searches will be displayed underneath the search bar. The user can click on one of the history items to make them appear in the search bar.

The movie information is fetched from OMDB and the related media is fetched from the Wikipedia database. In the event that the user types in a title that's not available, they will receive a message telling them so. If the related media information fails to load due to linking inconsistencies, another message will display telling them so. This project utilizes the pure css library for formatting purposes.



<br>
<br>


## Usage
<br>
To access the website, go to #

<br>
Click on the search bar to type in the city you want the forecast for, and click the button. Your history will be saved and listed below.
<br>

![Home](assets/screenshots/demonstration.PNG)




<br>

## Criteria

<br>

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```