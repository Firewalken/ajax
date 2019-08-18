console.log("Скрипт запущен!");

const ajaxButton = document.querySelector('#ajaxTest');
const ajaxResultsWrapper = document.querySelector('.ajaxResultsWrapper');

ajaxButton.addEventListener('click', sendRequest)


function sendRequest(params) {
    console.log('кликнули на кнопку');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML = this.responseText;
            console.log("пришел ответ от сервер")
            // console.log(this.responseText)
            ajaxInsert(this.responseText);

        } else {
            console.log("this.readyState: " + this.readyState);
            console.log("this.status: " + this.status);
        }
    };
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.send();
}


function ajaxInsert(data) {
    let result = JSON.parse(data);
    // console.log(result)
    // console.log(result)
    result.forEach(element => {
        console.log(element.title)
        let newItem = document.createElement("P");
        newItem.textContent = element.title;
        ajaxResultsWrapper.appendChild(newItem);
    });
}