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
                let isNew = hikes[i].isNew;
                let html = "";

                //------

                html += `<div id="${hikeId}" class='hikeContainer'>
                            <img src='/img/${image}'>
                            <p class='date'>${date}</p>
                            <h3>${title}</h3>
                            <p class='description'>${description}</p>
                        </div>`;
                
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
