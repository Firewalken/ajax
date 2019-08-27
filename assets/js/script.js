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
            if (document.getElementById("ajaxTable") === null) {
                ajaxInsert(this.responseText);
            } else {
                alert("Таблица уже создана");
            }

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

    // 1. Создаём таблицу
    let resultTable = {
        tag: "table",
        id: "ajaxTable",
        place: ajaxResultsWrapper
    }
    createEl(resultTable); // Создаем таблица

    result.forEach( (element, index) => {
        console.log(element)
        let row = {
            tag: "tr",
            id: "row_"+index,
            place: document.getElementById("ajaxTable")
        }
        // 2. "Находим" эту таблицу и заполняем данными
        createEl(row); // Создаем строки таблицы

        // Наполняем строки - Создаем колонки таблицы
        for (let elementKey in element) {
            console.log(elementKey+ ": " + element[elementKey]);
            let col = {
                tag: "td",
                content: element[elementKey],
                place: document.getElementById("row_"+index)
            }
            createEl(col);
          }
        

        // let newItem = document.createElement("P");
        // newItem.textContent = element.title;
        // ajaxResultsWrapper.appendChild(newItem);
    });
}

function createEl(obj) {
    let newItem = document.createElement(obj.tag);
    newItem.setAttribute("id", obj.id);
    newItem.textContent = obj.content;
    obj.place.appendChild(newItem);
}


function createElOLD(tagName, innerContent, place, id) {
    let newItem = document.createElement(tagName);
    newItem.textContent = innerContent;
    place.appendChild(newItem);
}


