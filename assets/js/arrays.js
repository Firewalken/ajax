"use strict"

const arraysTest = document.querySelector(".arraysTest");
const arraysTitle = document.querySelector(".arraysTitle");

arraysTitle.addEventListener("click", function (e) {
    console.log(this);
    this.style.color="red";
}) 



const user = {
    albumId:	1,
    id:	13,
    title:	"repudiandae iusto deleniti rerum",
    url:	"https://via.placeholder.com/600/197d29",
    thumbnailUrl:	"https://via.placeholder.com/150/197d29"
}

const userArray = [1, "hello", "Danil", user]

const arr = ["new", "111111111"]



console.log(userArray);

function showObjValues(obj) {
    // console.log(this);
    console.log(Object.keys(obj));
    const KEYS = Object.keys(obj);

    for (let i = 0; i < KEYS.length; i++) {
        console.log(`${KEYS[i]}: ${obj[KEYS[i]]}` );
    }


}