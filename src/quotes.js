export default function (quotesData,randomNum){
  const quoteElement = document.querySelector('.quote')
const authorElement = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

function getQuotes() { 
  // let response = JSON.parse(quotes) 
  randomNum = Math.floor(Math.random() * quotesData.length)
  console.log('response',quotesData)
  quoteElement.innerText = quotesData[randomNum].text
  authorElement.innerText = quotesData[randomNum].author
  return quotesData
  // let quotes = './src/js/quotesData.json'
  // const res = await fetch(quotes,{
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   // mode: 'no-cors', // no-cors, *cors, same-origin
  //   //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   //credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //     'Content-Type': 'application/js'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   //redirect: 'follow', // manual, *follow, error
  //   //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   //body: JSON.stringify(data) // body data type must match "Content-Type" header
  // });
  // console.log('res',res);
  // const data = await res.json(); 
  // console.log('quotesData',data);

  // fetch(quotes,{
  //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'no-cors', // no-cors, *cors, same-origin
  //     //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     //credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json'
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     //redirect: 'follow', // manual, *follow, error
  //     //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     //body: JSON.stringify(data) // body data type must match "Content-Type" header
  //    })
  //   .then(res => res.json())
  //   .then(data => { 
  //     console.log(data);
  //   });

  // return response
}
getQuotes();

changeQuote.addEventListener('click', getQuotes)
}