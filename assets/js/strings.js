"use strict"

window.addEventListener("DOMContentLoaded", () => {
    // DOM ready! Images, frames, and other subresources are still downloading.
    console.log("DOM ready!")
});

const stringsTest = document.querySelector(".stringsTest");
const stringsTitle = document.querySelector(".stringsTitle");
const ajaxButton = document.querySelector("#ajaxButton");


let randomString = "some random words";
let randomNum = "200";

stringsTitle.addEventListener("click", function (e) {
    let newString = this.textContent;
    newString = newString.split(" ").join('');
    console.log(newString)

    randomString = randomString.replace("random", "special").slice(5, 12);
    console.log(randomString)
}) 







function showObjValues(obj) {
    // console.log(this);
    console.log(Object.keys(obj));
    const KEYS = Object.keys(obj);

    for (let i = 0; i < KEYS.length; i++) {
        console.log(`${KEYS[i]}: ${obj[KEYS[i]]}` );
    }


}

let userArr = [{user: "Danil"}, {user: "Petr"}, {user: "Andrey"}];


ajaxButton.addEventListener("click", function (e) {


var ajaxTableHTML = document.querySelector("#ajax_table_hbs").innerHTML;
var ajaxTableTemplate = Handlebars.compile(ajaxTableHTML);

var context = { rows: userArr };
var readyTableHTML = ajaxTableTemplate(context);

document.body.innerHTML = readyTableHTML;
})