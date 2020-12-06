'use strict';

//declare a variable for LOC API URL
const searchURL = 'https://www.loc.gov/collections/chronicling-america/';

//declare a variable for Quote API URL
const quoteURL = 'https://qvoca-bestquotes-v1.p.rapidapi.com/quote/?genre=history';
//Declare a variable for Quote API Key

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
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $('error-message').text(`Oops! Something went wrong: ${error.message}`);
    });
}


//Display the results into the <ul>
function displayResults(responseJson){
    console.log('display function ran')
    //clear previous results
    $('#results-list').empty();
    console.log('results emptied')
    //create a loop to iterate over results
    for (let i = 0; i < responseJson.results.length; i++){
        let title = responseJson.results[i].partof_title;
        let image = responseJson.results[i].image_url[1];
        let url = responseJson.results[i].id;
        let date = responseJson.results[i].date;
        $('#results-list').append(
            `<li><h2> Newspaper Source: ${title}</h2>
            <a href="${url}" target="_blank"><img src="${image}" alt="Digitally Scanned Newspaper"></a>
            <p> Date Published: ${date} </p>
            <p> To follow up with more details <a href="${url}" target="_blank">More Information</a> </p>
            </li>`
            )
            console.log('results appended');
        }
        $('#results').removeClass('hidden')
    }
   


//Get History QOD
function getQuote(){
fetch("https://qvoca-bestquotes-v1.p.rapidapi.com/quote?genre=history", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "eedb904fd7mshdbabd39c1ef8444p1e448cjsn4120f5877999",
        "x-rapidapi-host": "qvoca-bestquotes-v1.p.rapidapi.com"
    }
})
.then(responseQuote =>{
    if (responseQuote.ok){
        return responseQuote.json();
    }
    throw new Error(responseQuote.statusText);
})
.then(responseQuoteJson => displayQuote(responseQuoteJson))
.catch(error => {
    $('error-message').text(`Oops! Something went wrong: ${error.message}`);
});
}

//display historical quote on page load and on each submit click
function displayQuote(responseQuoteJson){
    $('#history-quote').empty();
    $('#history-quote').append(
        `<h3> "${responseQuoteJson.message}" - ${responseQuoteJson.author} </h3>`);
}

//create a watchForm to tie in above functions and variables
function watchForm(){
    $('form').submit( event => {
        event.preventDefault();
        const topic = $('#topic-search').val();
        const limit = $('#max-results').val();
        getNews(topic, limit);
        getQuote();
    });
}
$(watchForm)