// Endpoints =================================
const URL = 'https://mandagstur.herokuapp.com';
const GET_ALL_HIKES_ENDPOINT = '/hikes/getall';
const ADD_NEW_HIKE_ENDPOINT = '/hikes/add';

// ADD new list elements --------
const INPUT_LIST_TITLE = "listTitle";

// OUTPUT elements ----------------------
const OUTPUT_HIKES_CONTAINER = "hikesContainer";


// ===========================================
// FUNCTIONS =================================
// ===========================================


function showAllHikes() {
    getAllHikes().then(response => {
        if (response.status !== 200) {
            let hikes = response.hikes;
            let hikesContainer = document.getElementById(OUTPUT_HIKES_CONTAINER);
            hikesContainer.innerHTML = "";

            for (let i = 0; i < hikes.length; i++) {
                let hikeId = hikes[i].id;
                let title = hikes[i].title;
                let description = hikes[i].description;
                let date = hikes[i].date;
                let image = hikes[i].image;
                let styleText = '';
                if (!hikes[i].isnew) {
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
            let hikesContainer = document.getElementById(OUTPUT_HIKES_CONTAINER);
            hikesContainer.innerHTML = "";

            for (let i = 0; i < hikes.length; i++) {
                let hikeId = hikes[i].id;
                let title = hikes[i].title;
                let description = hikes[i].description;
                let date = hikes[i].date.substring(0, 10);
                let image = hikes[i].image;
                let styleText = '';
                if (!hikes[i].isnew) {
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

function addNewHike(evt) {
    evt.preventDefault();
    console.log("addNewHike");

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let isnew = document.getElementById('isnew').checked;

    let hike = {
        title: title,
        description: description,
        date: date,
        isnew: isnew
    };

    console.log(hike);


    sendHikeToDB(hike).then(response => {
        window.alert(response.msg);
        location.reload();
    });

}

function sendHikeToDB(hike) {
    console.log("Sending hike to database");
    return fetch(ADD_NEW_HIKE_ENDPOINT, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify(hike)
    }).then(data => {
        return data.json();
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
