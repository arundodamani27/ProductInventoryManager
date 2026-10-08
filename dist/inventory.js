"use strict";
let products = [];
function addProduct() {
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    if (!nameInput.value || !priceInput.value) {
        alert("Please fill all fields");
        return;
    }
    const product = {
        id: products.length + 1,
        name: nameInput.value,
        price: Number(priceInput.value),
        inStock: true
    };
    products.push(product);
    renderProducts();
    nameInput.value = "";
    priceInput.value = "";
}
function renderProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";
    products.forEach(product => {
        const li = document.createElement("li");
        li.className =
            "bg-gray-50 border rounded p-3 flex justify-between";
        li.innerHTML = `
            <span>
                #${product.id} - ${product.name}
            </span>
            <span class="font-bold text-green-600">
                ₹${product.price}
            </span>
        `;
        list.appendChild(li);
    });
}
window.addProduct = addProduct;
