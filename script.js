

// Get the reference to the main container for surahs
let mainSurasContainer = document.getElementById('mainSurahsContainer');

// Function to fetch surah meta data and display it
function getSurahs() {
    // Fetch surah meta data {names of surah}
    fetch("http://api.alquran.cloud/v1/meta")
        .then(response => response.json())
        .then(data => {
            // Extract surah references and count from the response
            let surahs = data.data.surahs.references;
            let numbersOfSurahs = data.data.surahs.count;

            // Clear the existing content of the main container
            mainSurasContainer.innerHTML = "";

            // Populate the main container with surah information
            for (let i = 0; i < numbersOfSurahs; i++) {
                mainSurasContainer.innerHTML += `
                    <div class="surah">
                        <p>${surahs[i].name}</p>
                        <p>${surahs[i].englishName}</p>
                        <p>${surahs[i].number}</p>
                    </div>`;
            }

            // Get references to surah titles, popup, and ayat container
            let surahTitles = document.querySelectorAll('.surah');
            let popup = document.querySelector('.surah-popup');
            let ayatContainer = document.querySelector('.ayat');

            // Add click event listeners to surah titles
            surahTitles.forEach((title, index) => {
                title.addEventListener('click', () => {
                    // Fetch surah details based on the index
                    fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            // Clear existing ayat container content
                            ayatContainer.innerHTML = "";

                            // Extract ayahs and display them in the ayat container
                            let ayahs = data.data.ayahs;
                            ayahs.forEach(aya => {
                                popup.classList.add('active');
                                ayatContainer.innerHTML += `
                                    <p>(${aya.numberInSurah}) - ${aya.text}</p>`;
                            });
                        });
                });
            });

            // Get reference to the close-popup element and add click event listener
            let closePopup = document.querySelector('.close-popup');
            closePopup.addEventListener('click', () => {
                // Remove the 'active' class to hide the popup
                popup.classList.remove('active');
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Call the getSurahs function to initiate the process
getSurahs();
