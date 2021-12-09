let currentActivity = " ";
let currentKey = " ";
const favButton = document.querySelector("#favorite-button");
const favS = document.querySelector("#favorite");

//calls random activity page load, adds event listener for search button & favorites
document.addEventListener("DOMContentLoaded", () => {
    randomActivity();
    document.querySelector("#activity-search").addEventListener("submit", (e) => {
        e.preventDefault();
        const activityType = document.querySelector("#activity-type").value;
        activitySearch(activityType);
    })
    favListen();
    
    
    // let activityImage = document.createElement("img");
    // activityImage.src = "http://www.google.com/intl/en_com/images/logo_plain.png";
    
    // document.querySelector("#activity-card > img").appendChild(activityImage)
    // console.log(activityImage)

});

function randomActivity() {
    fetch("https://www.boredapi.com/api/activity")
        .then((resp) => resp.json())
        .then((data) => {
            const { activity, key } = data;
            currentActivity = activity;
            currentKey = key;
            document.querySelector("#activity-description").textContent = currentActivity;
            console.log("current activity: " + currentActivity);
        })

};

//searches for activity by type
function activitySearch(activityType) {
    if (activityType == "random") {
        randomActivity();
    }
    else {
        fetch(`http://www.boredapi.com/api/activity?type=${activityType}`)
            .then((resp) => resp.json())
            .then((data) => {
                const { activity, key } = data;
                currentActivity = activity;
                currentKey = key;
                document.querySelector("#activity-description").textContent = activity;
                console.log("current activity: " + currentActivity);
            });
    }
    clearFav();
    

  
// to call images for activity type
    let activityImage = document.createElement("img");
    activityImage.src = `assets/${activityType}.png`
        if( document.querySelector("#if-bored > img:last-child") !== null){
            document.querySelector("#if-bored > img:last-child").remove();
        }
    document.getElementById("if-bored").appendChild(activityImage)
    

};

//

//to change heart/span text color and call create favorite or remove favorite
const favActivity = () => {
    if (favButton.textContent == '♡' & currentActivity !== " ") {
        favButton.textContent = '♥';
        favS.textContent = "This is a favorite activity!"
        favS.parentNode.className += " favorited"
        console.log("favorited: " + currentActivity);
        createFav();
    }
    else if (favButton.textContent == '♥') {
        clearFav();
        unFav();
    };
};

//adds activity to favorite-activities-list, adds event listener to click x and remove.
function createFav() {
    const fav = document.querySelector(".favorite-activities-list");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    span.textContent = currentActivity;
    btn.textContent = "✕";
    btn.addEventListener("click", handleDelete)
    fav.append(li);
    li.append(span)
    span.append(btn);
};

//clears the favorite button
function clearFav() {
    favS.textContent = "Click the activity to add as a favorite!"
    favButton.textContent = '♡';
    favS.parentNode.className -= " favorited"
};

//clicking heart removes favorite from list
function unFav () {
    const favList = document.querySelectorAll("li");
    for (let i = 0; i < favList.length; i++) {
        if (favList[i].textContent == currentActivity + '✕'){
            favList[i].remove();
        }
    }
}

// event listener that allows heart button to work
function favListen() {
    document.querySelector("#favorite-button").addEventListener("click", () => {
        favActivity();
    })
// click random activity to add in favorites
    document.querySelector("#activity-description").addEventListener("click", () => {
        favActivity();
    })

}

//deletes favorite by clicking X and clears favorite if it is the current activity
function handleDelete(e){
    if (e.target.parentNode.textContent == currentActivity + '✕'){
        clearFav()
    };
    console.log(e);
    e.target.parentNode.parentNode.remove();
}

/* !!still in progress!! to build activity object for json 
function (activity, key) {
    "Activity" : activity;
    "Key": key;
}
*/


