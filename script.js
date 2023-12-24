document.addEventListener("DOMContentLoaded", function () {
    // Add a small delay to ensure that the DOM is fully loaded
    setTimeout(fetchDataAndDisplay, 100);
});

function fetchDataAndDisplay() {
    // Fetch JSON data from the API
    fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Extract JSON data here
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Adapt the code based on the actual structure of the data
            if (Array.isArray(data)) {
                // If data is an array, assume it's the array of products
                displayProducts(data);
            } else if (data && Array.isArray(data.products)) {
                // If data has a 'products' property that is an array
                displayProducts(data.products);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayProducts(products) {
    const tableBody = document.getElementById("tableBody");

    // Clear previous data
    tableBody.innerHTML = "";

    // Add rows to the table
    products.forEach(product => {
        const row = document.createElement("tr");

        // Create table cells and add text content
        const titleCell = document.createElement("td");
        titleCell.textContent = product.Title;
        row.appendChild(titleCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = product.Price;
        row.appendChild(priceCell);

        const popularityCell = document.createElement("td");
        popularityCell.textContent = product.Popularity;
        row.appendChild(popularityCell);

        const subcategoryCell = document.createElement("td");
        subcategoryCell.textContent = product.Subcategory;
        row.appendChild(subcategoryCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}
