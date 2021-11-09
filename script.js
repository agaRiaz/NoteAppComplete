//Hamburger 
burger = document.querySelector(".burger");
navbar = document.querySelector(".navbar");
navLeft = document.querySelector(".navLeft");
search = document.querySelector(".search");



burger.addEventListener('click',()=>{
    search.classList.toggle('v-class-resp');
    navLeft.classList.toggle('v-class-resp');
    navbar.classList.toggle('navToggle');
});

//notes coding starts here...
showNotes();

//adding to local storage
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener("click",function(e){
    let noteTitle = document.getElementById('noteTitle');
    let noteBody = document.getElementById('noteBody');
   
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }else{

        notesObj = JSON.parse(notes);
    }


    //adding time

    let now = new Date();
    let date = now.getDate() + "-" + (now.getMonth()+1) + "-" + now.getFullYear();
    let time = now.getHours() + ":"+now.getMinutes() + ":" +now.getSeconds();

    //adding important

    let checkBox = document.getElementById('checkBox');
    let imp = "";
    if(checkBox.checked === true) {
        imp = "important";
    } else{
        imp = "";
    }
    checkBox.checked = false;

    // object creation

    let tempObj = {text:noteBody.value,title:noteTitle.value,date:date,time:time,imp:imp};
    notesObj.push(tempObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    noteBody.value ="";
    noteTitle.value = "";

    showNotes();

});

//function to show notes from localstorage

function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesObj = [];

    }else{
        notesObj = JSON.parse(notes);
    }


    let total = "";

    notesObj.forEach(function (element,index) {
        total += `
         <div class="notesCard">         
         <div class="cardBody">
        <div class="imp">${element.imp}</div>
        <div class="cardTitle">${index +1} ${element.title}</div>
        <div class="cardText">${element.text}</div>
        <div class="time">${element.date} |${element.time}</div>
        <div><button id="${index}" onclick="deleteNote(this.id)"class="delBtn">Delete</button></div>
    </div>
    </div>`;
        
    });

    let notesCard = document.getElementById('notesCard');
    if(notesObj.length !=0) {
        notesCard.innerHTML=total;
    }else{
        
        notesCard.innerHTML = ` No Notes Are Available! Please Add New Notes`
    }
}


// delete functionality 

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//search functionality

let searchNote = document.getElementById('searchNote');
 searchNote.addEventListener("input",function(){
     let inputVal = searchNote.value.toLowerCase();
    //  console.log("event fired");
     let notesCard = document.getElementsByClassName('notesCard');
     Array.from(notesCard).forEach(function(element){
         let cardTxt = element.querySelectorAll('div')[0].innerText;
         if (cardTxt.includes(inputVal)){
             element.style.display = "block";
         }
         else{
             element.style.display = "none";
         }
         console.log(cardTxt);
     });
 });