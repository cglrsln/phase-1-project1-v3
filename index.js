let currentActivity = " ";
const favButton = document.querySelector("#favorite-button");
const favSpan = document.querySelector("#favorite");
const favActList = document.querySelector(".favorite-activities-list");
const cardImage = document.querySelector(".logo");
const favActCard = document.querySelector("#favorite-activities-card");

//calls random activity page load, adds event listener for search button & favorites
document.addEventListener("DOMContentLoaded", () => {
    randomActivity();
    document.querySelector("#activity-search").addEventListener("submit", (e) => {
        e.preventDefault();
        const activityType = document.querySelector("#activity-type").value;
        activitySearch(activityType);
    })
    hideFavCard();
    favListen();
});

//calls functions to fetch random actvity or activity by type
async function activitySearch(activityType) {
    cardImage.src = "assets/activity-logo.png";
    if (activityType == "random") {
        await randomActivity();
    }
    else {
        await typeSearch(activityType);
    }
    clearFav();
};

async function randomActivity() {
    await fetch("https://www.boredapi.com/api/activity")
        .then((resp) => resp.json())
        .then((data) => {
            const { activity, type} = data;
            currentActivity = activity;
            changeImg(type);
            document.querySelector("#activity-description").textContent = currentActivity;
            console.log("current activity: " + currentActivity);
        })
};

//called by activity search, searches by activity
async function typeSearch(activityType) {
    await fetch(`http://www.boredapi.com/api/activity?type=${activityType}`)
        .then((resp) => resp.json())
        .then((data) => {
            const { activity, type } = data;
            currentActivity = activity;
            document.querySelector("#activity-description").textContent = activity;
            changeImg(type);
            console.log("current activity: " + currentActivity);
        });
};

//changes image depending on activity type
function changeImg(activityType){
    cardImage.src=`assets/${activityType}.png`
};

//to change heart/span text color and call create favorite or remove favorite
const favActivity = () => {
    if (favButton.textContent == '♡' & currentActivity !== " ") {
        favButton.textContent = '♥';
        favSpan.textContent = "This is a favorite activity!"
        favSpan.parentNode.classList.add("favorited");
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
    hideFavCard();
};

//clears the favorite button
function clearFav() {
    favSpan.textContent = "Click the activity to add as a favorite!"
    favButton.textContent = '♡';
    favSpan.parentNode.classList.remove("favorited")
};

//clicking heart removes favorite from list
function unFav() {
    const favList = document.querySelectorAll("li");
    for (let i = 0; i < favList.length; i++) {
        if (favList[i].textContent == currentActivity + '✕') {
            console.log("removed: " + favList[i].textContent);
            favList[i].remove();
        }
    }
    hideFavCard();
};

// event listener that allows heart button to work
function favListen() {
    document.querySelector("#favorite-button").addEventListener("click", () => {
        favActivity();
    })
    // click random activity to add in favorites
    document.querySelector("#activity-description").addEventListener("click", () => {
        favActivity();
    })

};

//deletes favorite by clicking X and clears favorite if it is the current activity
function handleDelete(e) {
    if (e.target.parentNode.textContent == currentActivity + '✕') {
        clearFav()
    };
    console.log("Removed: " + e.target.parentNode.textContent);
    e.target.parentNode.parentNode.remove();
    hideFavCard();
};

//hides favorite-activities-card if favorite-list is empty, shows if favorite activies exist
function hideFavCard() {
    if (favActList.childElementCount < 2) {
        favActCard.classList.add("hidden")
    }
    else if (favActList.childElementCount > 1 && favActCard.classList.contains('hidden')) {
        favActCard.classList.remove("hidden");
    }
};

/*/ to call images for activity type when selected on dropdown menu
    let activityImage = document.createElement("img");
    activityImage.src = `assets/${activityType}.png`
        if( document.querySelector("#if-bored > img:last-child") !== null){
            document.querySelector("#if-bored > img:last-child").remove();
        }
    document.getElementById("if-bored").appendChild(activityImage)
};*/