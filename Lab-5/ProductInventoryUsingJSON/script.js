let products = [];

function loadInventory() {

    fetch("inventory.json")
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => {
            showMessage("JSON loading/parsing error: " + error.message, "error");
        }
    );
}

function displayProducts(filteredProducts = products) {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = ``;

    if(filteredProducts.length === 0){
        showMessage("No products found.", "error");
        updateTotalValue();
        return;
    }

    filteredProducts.forEach(product => {
        const lowStockClass = product.stock < 5 ? "low-stock" : "";

        const row = `
            <tr class="${lowStockClass}">
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
    updateTotalValue();
}

function addProduct() {
    const id = document.getElementById("productID").value.trim();
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const stock = parseInt(document.getElementById("productStock").value);

    if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
        showMessage("Please fill in all fields correctly.", "error");
        return;
    }

    if(price < 0 || stock < 0){
        showMessage("Price and stock cannot be negative.", "error");
        return;
    }

    if (products.find(p => p.id === parseInt(id))) {
        showMessage("Product ID must be unique.", "error");
        return;
    }

    const newProduct = { id: parseInt(id), name: name, category: category, price: parseFloat(price), stock: parseInt(stock) };
    products.push(newProduct);
    displayProducts();
    showMessage("Product added successfully.", "success");
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) {
        showMessage("Product not found.", "error");
        return;
    }

    const newPrice = prompt("Enter new price:", product.price);
    const newStock = prompt("Enter new stock quantity:", product.stock);
    if (isNaN(newPrice) || isNaN(newStock) || newPrice < 0 || newStock < 0) {
        showMessage("Please enter valid non-negative numbers for price and stock.", "error");
        return;
    }
    product.price = parseFloat(newPrice);
    product.stock = parseInt(newStock);
    displayProducts();
    showMessage("Product updated successfully.", "success");
}


function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        showMessage("Product not found.", "error");
        return;
    }

    products.splice(index, 1);
    displayProducts();
    showMessage("Product deleted successfully.", "success");
}

function searchByCategory() {
    const category = document.getElementById("searchCategory").value.trim();
    console.log("Searching for category:", category);
    if (!category) {
        displayProducts();
        return;
    }
    const filteredProducts = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    displayProducts(filteredProducts);
    updateTotalValue(filteredProducts);
}

function updateTotalValue(productList = products) {
    let totalValue = 0;
    productList.forEach(product => {
        totalValue += product.price * product.stock;
    });
    document.getElementById("totalValue").textContent = totalValue.toFixed(2);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type === "error" ? "error" : "success";
    setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "";
    }, 3000);
}

document.getElementById("addProduct").addEventListener("click", addProduct);
document.getElementById("searchCategory").addEventListener("input", searchByCategory);
loadInventory();
