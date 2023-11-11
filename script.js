//surah API

let mainSurasContainer=document.getElementById('mainSurahsContainer')

getSurahs()
function getSurahs(){
    //fetch ssurah meta data {names of surah}
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response=> response.json())
    .then(data=>{
        // console.log(data)
        let surahs=data.data.surahs.references;
        let numbersOfSurahs=data.data.surahs.count;
 
        mainSurasContainer.innerHTML ="";
        for (let i = 0; i < numbersOfSurahs; i++) {
         
           mainSurasContainer.innerHTML +=`
                                     <div class="surah">
                                               <p>${surahs[i].name}</p>
                                               <p>${surahs[i].englishName}</p>
                                               <p>    ${surahs[i].number}</p>
                                                 
                                        </div>`
            
        }
// جدا ملاحظه مهمه   برا او خارج لووب وداخل فيتش 
       let surahTitles= document.querySelectorAll('.surah')
       let popup =document.querySelector('.surah-popup')
       let ayatContainer =document.querySelector('.ayat')
       
       surahTitles.forEach((title,index)=>{
        title.addEventListener('click',()=>{
            fetch(`http://api.alquran.cloud/v1/surah/${index + 1 }`)   // +1 مهم جدا لانه يبدا من 0
          .then(response => response.json())
          .then(data=>{

            // جدا مهم لانه يمسح محتويات كلها ويرجع من جديد مع اللوب
           ayatContainer.innerHTML= "";
           let Ayayt =data.data.ayahs;
           Ayayt.forEach(aya=>{
            popup.classList.add('active');
            ayatContainer.innerHTML +=`
             <p>(${aya.numberInSurah}) - ${aya.text}</p>`

        
        })

          })

        })
         

    })
   
       
    let closePopup = document.querySelector('.close-popup')
    closePopup.addEventListener('click',()=>{
        popup.classList.remove('active');
    })
    
    
    
    })
}