'use strict';

//declare a variable for LOC API URL
const searchURL = 'https://www.loc.gov/collections/chronicling-america/';

//declare a variable for Quote API URL
const quoteURL = 'https://qvoca-bestquotes-v1.p.rapidapi.com/quote/?genre=history';
//Declare a variable for Quote API Key
const apiKey = 'eedb904fd7mshdbabd39c1ef8444p1e448cjsn4120f5877999'
//Let Submit button append text and max result LOC API URL

//Format the query results for use in search URL
function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//Get the news articles
function getNews(topic, limit=5){
    const params = {
        q: topic,
        c: limit
    };

const queryString = formatQueryParams(params);
const url = searchURL + '?' + queryString + '&fo=json';
console.log(url)

fetch(url)
.then(response =>{
    if (response.ok){
        return response.json();
    }
    throw new Error(response.statusText);
})
.then(responseJson => console.log(responseJson))
.catch(error => {
    $('error-message').text(`Oops! Something went wrong: ${error.message}`);

});
}


//Display the results into the <ul>
    //Link results image to LOC 

//Upon new search submission, clear previous results 


//On page load, generate QOD 
//On submit click, generate new QOD onto results page 

//create a watchForm to tie in above functions and variables
function watchForm(){
    $('form').submit( event => {
        event.preventDefault();
        const topic = $('#topic-search').val();
        const limit = $('#max-results').val();
        getNews(topic, limit);
    }
    );
}
$(watchForm)