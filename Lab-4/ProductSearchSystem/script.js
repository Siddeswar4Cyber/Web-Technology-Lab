const searchInput = document.getElementById('searchInput');
const resultDiv = document.getElementById('results');

let debounceTimer;

function debounce(callback, delay) {
    return function(...args){
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            callback.apply(this,args);
        },delay);
    };
}

async function searchProducts(query) {
    try {
        resultDiv.innerHTML = "";

        if(query.trim() === "") {
            return;
        }
        const response = await fetch("products.json");
        if(!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();
        console.log(products);
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        if(filteredProducts.length === 0){
            resultDiv.innerHTML = "<p class='no-results'>No products found.</p>";
            return;
        }

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
            <h3>${product.name} (${product.category})</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            `;
            resultDiv.appendChild(productDiv);
        });
    } catch (error) {
        resultDiv.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
    }
}

searchInput.addEventListener('input', debounce((event) => {
    searchProducts(event.target.value);
}, 500));