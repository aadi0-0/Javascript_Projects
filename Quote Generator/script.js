let btn = document.querySelector('#new-quote');
let quote = document.querySelector('.quote');
let person = document.querySelector('.person');

const quotes = [{
    quote:'"If you want to live a happy life, tie it to a goal, not to people or things."',
    person: 'Albert'
},{
    quote: '"Never let the fear of striking out keep you from playing the game."',
    person: 'Babe Ruth'
},{
    quote: '"Money and success don’t change people; they merely amplify what is already there."',
    person: 'Will Smith'
},{
    quote: '"Not how long, but how well you have lived is the main thing.”',
    person: 'Seneca'
},{
    quote: '“If life were predictable it would cease to be life, and be without flavor.”',
    person: 'Eleanor'
},{
    quote:'“In order to write about life first you must live it.”',
    person: 'Ernest'
},];

btn.addEventListener('click', function(){
    let random= Math.floor(Math.random()*quotes.length);
    quote.innerText = quotes[random].quote;
    person.innerText = quotes[random].person;
})