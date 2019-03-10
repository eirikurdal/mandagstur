// Endpoints =================================
const GET_ALL_HIKES_ENDPOINT = '/hikes/getall';

// ADD new list elements --------
const INPUT_LIST_TITLE = "listTitle";

// OUTPUT elements ----------------------
const OUTPUT_LIST_CONTAINER = "hikesContainer";


// ===========================================
// FUNCTIONS =================================
// ===========================================


function showHikes() {
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

                html += `<div id="${hikeId}" class='hikeContainer'>
                            <div class="roundImage"
                                style="background-image: url('/img/${image}')">
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
                        <hr>`;
                
                hikesContainer.innerHTML += html;

            }
        }
    });
}

function getAllHikes() {

    return fetch(GET_ALL_HIKES_ENDPOINT, {
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
    showHikes();
})()
