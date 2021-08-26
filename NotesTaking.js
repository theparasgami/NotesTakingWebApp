console.log("Welcome");

showNotes();
let addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.querySelector("#addTxt");
    let title=document.getElementById("title");

    let impremove = document.getElementById('impBtn');
    if(impremove.checked==true){
        //if imprtant notes part is checked putting it in imp notes section
        impremove.checked=false;
        let impnotes = localStorage.getItem("impnotes");
        
        if (impnotes == null) {
            inotes = [];
        }
        else {
            inotes = JSON.parse(impnotes);
        }

        if(title.value.length==0){alert("Please add a title.");}
        else if (addTxt.value.length != 0){inotes.push([title.value,addTxt.value]);}
        else alert("Notes Section Can't be Empty!");
        localStorage.setItem("impnotes", JSON.stringify(inotes));
        addTxt.value="";
        showNotes();
        title.value="";
      
   }
   else
    {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        if(title.value.length==0){alert("Please add a title.");}
        else if (addTxt.value.length != 0){notesObj.push([title.value,addTxt.value]);}
        else alert("Notes Section Can't be Empty!");
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        showNotes();
    }
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let impnotes = localStorage.getItem("impnotes");
    if (impnotes == null) {
        inotes = [];
    }
    else {
        inotes = JSON.parse(impnotes);
    }
    let html1="";
    inotes.forEach(function(element,index){
        html1 +=
            `
       <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
       <div class="card-body">
           <h5 class="card-title">${element[0]}</h5>
           <p class="card-text"> ${element[1]}</p>
           <button id="${index}" onclick="deleteImpNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
       </div> 
         
       `
    });
    let inotesElm = document.getElementById('impnotes');
    if (inotes.length != 0) {
        inotesElm.innerHTML = html1;
    }
    else {
        inotesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }

 // showing not important notes
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = ""; let cnt = 0;
    notesObj.forEach(function (element, index) {
        cnt++;
        html +=
            `
       <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
       <div class="card-body">
           <h5 class="card-title"> ${element[0]}</h5>
           <p class="card-text"> ${element[1]}</p>
           <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
       </div> 
           `

    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}


function deleteImpNote(index) {
     
    let impnotes=localStorage.getItem("impnotes");
    if (impnotes == null) {
        inotes = [];
    }
    else {
        inotes = JSON.parse(impnotes);
    }
    inotes.splice(index, 1);
    localStorage.setItem("impnotes", JSON.stringify(inotes));
    showNotes();
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function (e) {
   
    let inputval = search.value.toLowerCase();

      let noteCards = document.getElementsByClassName("noteCard");
       Array.from(noteCards).forEach(function (elements) {
        let cardTxt = elements.getElementsByClassName('card-title')[0].innerText;
   
        cardTxt=cardTxt.toLowerCase();
        console.log(cardTxt);

        if (cardTxt.includes(inputval)) {
            elements.style.display = "block";
        }
        else {
            elements.style.display = "none";
        }
    });
});


