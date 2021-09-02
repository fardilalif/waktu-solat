const WAKTUSOLATAPI = "https://waktu-solat-api.herokuapp.com/api/v1/prayer_times.json?zon="
const ZONEAPI = "https://waktu-solat-api.herokuapp.com/api/v1/states.json?negeri=";
const STATEAPI = "https://waktu-solat-api.herokuapp.com/api/v1/states.json";

function displayState() {
    fetch(STATEAPI)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response.json();
        })
        .then(data => {
            data.data.negeri.forEach(state => {
                let optionState = document.createElement("OPTION");
                optionState.label = optionState.innerText = state;
                optionState.value = state;
                document.querySelector(".states").appendChild(optionState);
            })
        })
}

function getZone() {
    // clear waktu solat
    document.querySelector(".waktu-solat").innerHTML = "";

    selectBox = document.querySelector(".states");
    let selectedState = selectBox.options[selectBox.selectedIndex].value;

    displayZone(selectedState);
}


function displayZone(state) {
    if(state !== undefined) {
        fetch(ZONEAPI + state)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let selectZone = document.querySelector(".zone");

            // clear zone dropdown
            selectZone.innerHTML = "";
            
            document.querySelector(".state").innerHTML = "Waktu solat in: " + data.data.negeri.nama;
            
            // add default option to zone
            let defaultOption= document.createElement("OPTION");
            defaultOption.label = "-- select a zone --";
            selectZone.appendChild(defaultOption);

            data.data.negeri.zon.forEach(zone => {
                let optionZone = document.createElement("OPTION");
                optionZone.label = optionZone.innerText = zone;
                optionZone.value = zone;
                selectZone.appendChild(optionZone);
            });
        })
    }
}

function getWaktuSolat() {
    let selectBox = document.querySelector("#zone");
    let selectedZone = selectBox.options[selectBox.selectedIndex].value;
    
    displayWaktuSolat(selectedZone);

}

function displayWaktuSolat(zone) {
    fetch(WAKTUSOLATAPI + zone)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.querySelector(".waktu-solat").innerHTML = "";
            data.data[0].waktu_solat.forEach(waktuSolat => {
                let text = document.createElement("H3");
                text.innerHTML = waktuSolat.name + ": " + waktuSolat.time;
                document.querySelector(".waktu-solat").appendChild(text);
            });
        })
}


displayState();