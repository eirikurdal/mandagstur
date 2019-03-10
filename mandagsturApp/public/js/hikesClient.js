// Endpoints =================================
const URL = 'https://mandagstur.herokuapp.com';
const GET_ALL_HIKES_ENDPOINT = '/hikes/getall';

// ADD new list elements --------
const INPUT_LIST_TITLE = "listTitle";

// OUTPUT elements ----------------------
const OUTPUT_LIST_CONTAINER = "hikesContainer";


// ===========================================
// FUNCTIONS =================================
// ===========================================


function showAllHikes() {
    getAllHikes().then(response => {
        if (response.status !== 200) {
            let hikes = response.hikes;
            let hikesContainer = document.getElementById(OUTPUT_LIST_CONTAINER);
            hikesContainer.innerHTML = "";

            for (let i = 0; i < hikes.length; i++) {
                let hikeId = hikes[i].id;
                let title = hikes[i].title;
                let description = hikes[i].description;
                let date = hikes[i].date;
                let image = hikes[i].image;
                let styleText = '';
                if (!hikes[i].isNew) {
                    styleText = `style='display:none'`;
                }
                let html = "";

                //------

                html += `
                        <hr>
                        <div id="${hikeId}" class='hikeContainer'>
                            <div class='hikeImage'>
                                <div class="roundImage"
                                    style="background-image: url('/img/${image}')">
                                </div>
                            </div>
                            <div class='hikeInfo'>
                                <p class='date'>${convertDate(date)}</p>
                                <h2 class='title'>
                                    
                                    <i class="fas fa-star newHike" ${styleText}></i>
                                    ${title}
                                </h2>
                                <p class='description'>${description}</p>
                            </div>
                        </div>
                        `;

                hikesContainer.innerHTML += html;

            }
        }
    });
}

function showUpcomingHikes() {
    getAllHikes().then(response => {
        if (response.status !== 200) {
            let hikes = response.hikes;
            let hikesContainer = document.getElementById(OUTPUT_LIST_CONTAINER);
            hikesContainer.innerHTML = "";

            for (let i = 0; i < hikes.length; i++) {
                let hikeId = hikes[i].id;
                let title = hikes[i].title;
                let description = hikes[i].description;
                let date = hikes[i].date.substring(0, 10);
                let image = hikes[i].image;
                let styleText = '';
                if (!hikes[i].isNew) {
                    styleText = `style='display:none'`;
                }
                let html = "";

                // Filtrere ut gamle turer
                let today = new Date().toJSON().substr(0, 10);

                if (date >= today) {
                    html += `
                        <hr>
                        <div id="${hikeId}" class='hikeContainer'>
                            <div class='hikeImage'>
                                <div class="roundImage"
                                    style="background-image: url('/img/${image}')">
                                </div>
                            </div>
                            <div class='hikeInfo'>
                                <p class='date'>${convertDate(date)}</p>
                                <h2 class='title'>
                                    
                                    <i class="fas fa-star newHike" ${styleText}></i>
                                    ${title}
                                </h2>
                                <p class='description'>${description}</p>
                            </div>
                        </div>
                        `;

                    hikesContainer.innerHTML += html;
                }

            }
        }
    });
}

function getAllHikes() {

    return fetch(URL + GET_ALL_HIKES_ENDPOINT, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        },
    }).then(data => {
        return data.json();
    });
}

// ===========================================
// INIT ======================================
// ===========================================

(function () {
    showAllHikes();
})()
