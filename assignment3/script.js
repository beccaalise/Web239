
const generateButton = document.getElementById("generate-btn");
const catCount = document.getElementById("cat-count");
const catGallery = document.getElementById("cat-gallery");

// Get random cats from the API
async function getCats() {
    const count = catCount.value;

    // Get the number of cats based on the dropdown
    const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${count}`;

    catGallery.textContent = "Loading cats...";
    generateButton.disabled = true;

    try {
        // Send the API request
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        // Convert the response to JSON
        const cats = await response.json();

        // Clear out previous cats before adding more
        catGallery.textContent = "";

        // Display each cat on their own card
        cats.forEach(function(cat) {
            const card = document.createElement("article");
            card.classList.add("cat-card");

            const image = document.createElement("img");
            image.src = cat.url;
            image.alt = "Random cat";

            const id = document.createElement("p");
            id.textContent = `Image ID: ${cat.id}`;

            const width = document.createElement("p");
            width.textContent = `Width: ${cat.width} pixels`;

            const height = document.createElement("p");
            height.textContent = `Height: ${cat.height} pixels`;

            card.appendChild(image);
            card.appendChild(id);
            card.appendChild(width);
            card.appendChild(height);

            catGallery.appendChild(card);
        });
    } catch (error) {
        catGallery.textContent = "Sorry, the cats couldn't be loaded. Please try again.";
        console.error("Error fetching cats:", error);
    } finally {
        generateButton.disabled = false;
    }
}

// Generate cats when the button is clicked
generateButton.addEventListener("click", getCats);

// Show a cat when the page loads
getCats();
