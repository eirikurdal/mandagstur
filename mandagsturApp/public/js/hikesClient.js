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


function showHikes(filter) {
    getAllHikes().then(response => {
        if (response.status !== 200) {
            let hikes = response.hikes;
            let hikesContainer = document.getElementById(OUTPUT_HIKES_CONTAINER);
            hikesContainer.innerHTML = "";

            // Filtrere ut gamle turer
            let today = new Date().toJSON().substr(0, 10);

            let filteredHikes = [];

            if (filter == 'upcoming') {
                for (let i = 0; i < hikes.length; i++) {
                    if (hikes[i].date >= today) {
                        filteredHikes.push(hikes[i]);
                        console.log('added hike to filtered list: ' + hikes[i].title);
                    }
                }
            } else {
                filteredHikes = hikes;
            }

            for (let j = 0; j < filteredHikes.length; j++) {
                let hikeId = filteredHikes[j].id;
                let title = filteredHikes[j].title;
                let description = filteredHikes[j].description;
                let date = filteredHikes[j].date;
                let image = filteredHikes[j].image;
                let styleText = '';
                if (!filteredHikes[j].isnew) {
                    styleText = `style='display:none'`;
                }
                let html = "";

                //------

                html += `
                        <hr>
                        <div id="${hikeId}" class='hike-container light'>
                            <div class="hike-image"
                                style="background-image: url('/img/${image}')">
                            </div>
                            <div class='hike-info'>
                                <p class='date'>${convertDate(date)}</p>
                                <h2 class='hike-title'>
                                    <i class="fas fa-star color-accent" ${styleText}></i>
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
    return fetch(URL + ADD_NEW_HIKE_ENDPOINT, {
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
