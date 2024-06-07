const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result =document.getElementById("result");
const sound =document.getElementById("sound");
const btn=document.getElementById("search-btn");

btn.addEventListener("click", () =>{
    let inpword=document.getElementById("inp-word").value;
    fetch(`${url}${inpword}`)
    .then((response)=>response.json())
    .then((data)=>{
         console.log(data);
         result.innerHTML=` 
         <div class="word">
         <h3>${inpword}</h3>
         <button onclick="playSound()" >
             <i class="fa-solid fa-volume-high"></i>
         </button>
     </div>
     <div class="details">
         <p>${data[0].meanings[0].partOfSpeech}</p>
         <p>/${data[0].phonetic}/</p>
     </div>
     <p class="word-meaning">
         ${data[0].meanings[0].definitions[0].definition}
     </p>
     <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
     </p>`;
     //Find a valid audio URL from the response
     const phonetics = data[0].phonetics;
     let audioSrc = "";
     for (let i = 0; i < phonetics.length; i++) {
         if (phonetics[i].audio) {
             audioSrc = phonetics[i].audio;
             break;
         }
     }
     if(audioSrc){
        sound.setAttribute("src",audioSrc);
     }else{
        sound.setAttribute("src");
        console.log("No audio available for this word")
     }
    })
           .catch( ()=>{
            result.innerHTML= `<h3 class="error">Couldn't Find The Word </h3>`
           })

});
function playSound(){
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        console.error("No audio source set for the word");
    }
}