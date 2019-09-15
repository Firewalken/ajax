"use strict"

const objectsTest = document.querySelector(".objectsTest");

const user = {
    albumId:	1,
    id:	13,
    title:	"repudiandae iusto deleniti rerum",
    url:	"https://via.placeholder.com/600/197d29",
    thumbnailUrl:	"https://via.placeholder.com/150/197d29"
}



console.log(user["title"]);
// console.log(user[KEYS[i]]);


function showObjValues(obj) {
    // console.log(this);
    console.log(Object.keys(obj));
    const KEYS = Object.keys(obj);

    for (let i = 0; i < KEYS.length; i++) {
        console.log(`${KEYS[i]}: ${obj[KEYS[i]]}` );
    }


}