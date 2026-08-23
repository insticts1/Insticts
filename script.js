const container = document.getElementById("wallpaperGrid");

let wallpapers = [];

// Get wallpapers automatically from Python
async function loadWallpapers() {
    try {
        const response = await fetch("/api/wallpapers");

        if (!response.ok) {
            throw new Error("Server could not load wallpapers");
        }

        wallpapers = await response.json();

        console.log("Wallpapers found:", wallpapers);

        displayWallpapers(wallpapers);

    } catch (error) {

        console.error("Could not load wallpapers:", error);

        container.innerHTML = `
            <div class="empty">
                Could not load wallpapers.<br><br>
                Make sure you opened the website at:<br>
                http://localhost:8000
            </div>
        `;
    }
}


// Display wallpapers
function displayWallpapers(list) {

    container.innerHTML = "";

    document.getElementById("wallpaperCount").textContent =
        wallpapers.length;

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty">
                No wallpapers found.<br><br>
                Put pictures inside the <b>images</b> folder.
            </div>
        `;

        return;
    }


    list.forEach((wallpaper) => {

        const card = document.createElement("article");

        card.className = "wallpaper-card";

        card.innerHTML = `

            <img
                src="${wallpaper.image}"
                alt="${wallpaper.title}"
                loading="lazy"
            >

            <div class="card-overlay">

                <div class="card-top">

                    <span class="tag">
                        Wallpaper
                    </span>

                </div>


                <div class="card-bottom">

                    <div>

                        <h3>${wallpaper.title}</h3>

                    </div>


                    <a
                        href="${wallpaper.image}"
                        download
                        class="icon-btn"
                    >
                        ↓
                    </a>

                </div>

            </div>

        `;

        container.appendChild(card);

    });

}


// Surprise Me button
document.getElementById("randomHero").addEventListener("click", () => {

    if (wallpapers.length === 0) {

        alert("No wallpapers found yet!");

        return;

    }


    const randomIndex =
        Math.floor(Math.random() * wallpapers.length);

    const wallpaper =
        wallpapers[randomIndex];


    window.open(
        wallpaper.image,
        "_blank"
    );

});


// Start the website
loadWallpapers();
