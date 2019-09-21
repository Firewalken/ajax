console.log("Скрипт запущен!");

const ajaxButton = document.querySelector('#ajaxTest');
const ajaxResultsWrapper = document.querySelector('.ajaxResultsWrapper');

ajaxButton.addEventListener('click', sendRequest)


function sendRequest(params) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("пришел ответ от сервера")
            if (document.getElementById("ajaxTable") === null) {
                hbsAjaxInsert(this.responseText);
            } else {
                alert("Таблица уже создана");
            }

        } else {
            console.log("this.readyState: " + this.readyState);
            console.log("this.status: " + this.status);
        }
    };
    xhr.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
    xhr.send();
}


function nativeJS_ajaxInsert(data) {
    let result = JSON.parse(data);

    // 1. Создаём таблицу
    let resultTable = {
        tag: "table",
        id: "ajaxTable",
        place: ajaxResultsWrapper
    }
    createEl(resultTable); // Создаем таблицу

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

function hbsAjaxInsert(ajaxResponse) {
    
    let result = JSON.parse(ajaxResponse);

    // сделать рандомную выборку картинок из массива, в диапазоне 5

    // rangeValue = +prompt("Укажите размер диапазона", 5);
    // console.log(rangeValue);

    // if (rangeValue > result.length || rangeValue < 5 || !Boolean(rangeValue)) {   // проверка допустимости диапазона
    //     alert(`Выборка невозможна так как выбранный диапазон не соответствует размерам массива, либо не является числом`);
    //     return;
    // }

    // let rand;

    // for (let i = 0; i < result.length; i++) {   // поиск первого подходящего случайного числа для старта выборки
    //     rand = Math.floor(Math.random() * result.length);
    //     if (rand <= result.length - rangeValue && rand >= 0) break;
    // }


    // let newArr = result.slice(rand, rand + rangeValue);    // выборка от случайного элемента в массиве по указанному диапазону
    // console.log(newArr.length);

    let selectOption = +prompt("Выберите число соответствующее необходимому методу выборки:\n1 - по id пользователя\n2 - по длине сообщения\n3 - по наличию слова \"dolorem\"\n4 - по комбинации в url");

    let newArr;
    let urlArr = [];

    if (selectOption == 1) {
        let startId = +prompt("Выберите id с которого начнется вывод объектов", 4991);
        let tempArr = [];

        for (let i = 0; i < result.length; i++) {
            if (result[i].id < startId) continue;
            result[i].checked = true;
            tempArr.push(result[i]);
        }

        console.log(tempArr);
        newArr = tempArr;

    } else if (selectOption == 2) {
        let booleanSelectorValue = Boolean(+prompt("Введите \"1\" если нужны сообщения длиной больше 50\n\"0\" - если меньше 50"));
        let tempArr = [];

        if (booleanSelectorValue) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].title.length >= 50) {
                    result[i].long = true;
                    tempArr.push(result[i]);
                }
            }
        } else {
            for (let i = 0; i < result.length; i++) {
                if (result[i].title.length < 50) {
                    result[i].long = false;
                    tempArr.push(result[i]);
                }
            }
        }
        
        console.log(tempArr);
        newArr = tempArr;

    } else if (selectOption == 3) {

        alert("Выборка по слову \"dolorem\" (все \"dolorem\" будут заменены на \"hello\")");
        
        let tempArr = [];

        for (let i = 0; i < result.length; i++) {
            if (result[i].title.indexOf(" dolorem ") >= 0) {
                result[i].title = result[i].title.replace(" dolorem ", " hello ");
                tempArr.push(result[i]);
            }
        }

        

        console.log(tempArr);
        newArr = tempArr;

    } else if (selectOption == 4) {

        let stringSelector = prompt("По каким значениям из URL сделать выборку?", 99);
        let tempArr = [];

        for (let i = 0; i < result.length; i++) {
            if (result[i].url.indexOf(stringSelector) >= 0) {
                urlArr.push(result[i].url);
                tempArr.push(result[i]);
            }
        }

        console.log(tempArr);
        newArr = tempArr;

        console.log(urlArr);
        alert("Выборка завершена! Массив с найдеными URL сохранен в меременной \"urlArr\" и выведен в консоль")

    } else {
        alert("Выбранный метод несуществует, либо указан неверно");
    }



    var ajaxTableHTML = document.querySelector("#ajax_table_hbs").innerHTML; // хранит HTML в строке
    var ajaxTableTemplate = Handlebars.compile(ajaxTableHTML); // содержит собранный handlebars-шаблон из source

    var context = { rows: newArr, author: "Илья"}; // информация которую необходимо записать в шаблон
    var readyTableHTML = ajaxTableTemplate(context); // выдает собранный html в текстовом виде

    document.body.innerHTML = readyTableHTML;

}

function createEl(obj) {
    let newItem = document.createElement(obj.tag);
    newItem.setAttribute("id", obj.id);
    newItem.textContent = obj.content;
    obj.place.appendChild(newItem);
}


// function createElOLD(tagName, innerContent, place, id) {
//     let newItem = document.createElement(tagName);
//     newItem.textContent = innerContent;
//     place.appendChild(newItem);
// }




// var source   = $("#entry-template").html();
// var source   = document.querySelector("#entry-template").innerHTML; // хранит HTML в строке
// var template = Handlebars.compile(source); // содержит собранный handlebars-шаблон из source

// var context = { title: "Собаке Качалова", someinfo: "haha" }; // информация которую необходимо записать в шаблон
// var html    = template(context); // выдает собранный html в текстовом виде

// console.log(html);



// MVC - MODEL - VIEWER - CONTROLLER
