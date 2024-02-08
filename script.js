
// Initialize fruitItems as an empty array
var fruitItems = [];

// Create a new section element
const section = document.createElement("section");
section.style.display = "flex";
section.style.flexWrap = "wrap";
section.className = "products";

// Create five new div elements
for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.className = "fruit-item";

    // Create image element
    const image = document.createElement("img");
    image.src = "https://via.placeholder.com/150"; // Replace with the actual image URL
    image.alt = "Fruit Image";
    div.appendChild(image);

    // Create title element
    const title = document.createElement("h3");
    title.textContent = "Fruit Name"; // Replace with the actual fruit name
    div.appendChild(title);

    // Create description element
    const description = document.createElement("p");
    description.textContent = "Fruit Description"; // Replace with the actual fruit description
    div.appendChild(description);

    // Create price element
    const price = document.createElement("p");
    price.textContent = "$9.99"; // Replace with the actual fruit price
    div.appendChild(price);

    // Create a new div element for the button
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "button-container";

    // Create a button element
    const button = document.createElement("button");
    button.className = "add-to-cart";
    button.textContent = "Add to Cart";

    // Append the button to the button div
    buttonDiv.appendChild(button);

    // Append the button div to the main div
    div.appendChild(buttonDiv);

    // Append the div to the section
    section.appendChild(div);
}

// Append the section to the body
document.body.appendChild(section);

// Add an event listener to the add to cart button
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        // Get the fruit item div
        const fruitItem = button.parentElement.parentElement;

        // Get the fruit name, description, and price
        const fruitName = fruitItem.querySelector(".fruit-item h3")?.textContent || "";
        const fruitDescription = fruitItem.querySelector(".fruit-item p")?.textContent || "";
        const fruitPrice = fruitItem.querySelector(".fruit-item p:last-child")?.textContent || "";

        // Create a new object to store the fruit item details
        const newFruitItem = {
            name: fruitName,
            description: fruitDescription,
            price: fruitPrice,
        };
        console.log(newFruitItem);

        // Add the new fruit item to the database
        addToDatabase(newFruitItem);
    });
});

// Function to add new fruit item to db.json
function addToDatabase(newFruitItem) {
    // Read the existing data from db.json
    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return;
        }
        
        let db = JSON.parse(data); // Parse JSON data
        
        // Add the new fruit item to the database array
        db.push(newFruitItem);
        
        // Write the updated data back to db.json
        fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error("Error writing to database file:", err);
                return;
            }
            console.log("New fruit item added to database:", newFruitItem);
        });
    });
}
