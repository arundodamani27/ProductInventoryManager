"use strict";
let products = [];
let nextId = 1;
// HTML elements
const form = document.getElementById("productForm");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const searchInput = document.getElementById("search");
const productList = document.getElementById("productList");
const totalProducts = document.getElementById("totalProducts");
const availableProducts = document.getElementById("availableProducts");
const emptyMessage = document.getElementById("emptyMessage");
const message = document.getElementById("message");
// Add a product
function addProduct(name, price, quantity) {
    const product = {
        id: nextId++,
        name,
        price,
        quantity,
        inStock: true,
        tags: ["store"]
    };
    products.push(product);
    renderProducts(searchInput.value);
    message.textContent = "Product added successfully!";
    message.className = "mt-3 text-sm text-green-600";
}
// Get products marked as in stock
function getAvailableProducts(items) {
    return items.filter(product => product.inStock);
}
// Delete a product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts(searchInput.value);
    message.textContent = "Product deleted successfully!";
    message.className = "mt-3 text-sm text-indigo-600";
}
// Render inventory table
function renderProducts(searchTerm = "") {
    productList.innerHTML = "";
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    for (const product of filteredProducts) {
        const row = document.createElement("tr");
        row.className = "border-b hover:bg-slate-50";
        // Product ID
        const idCell = document.createElement("td");
        idCell.className = "p-3";
        idCell.textContent = String(product.id);
        // Product name
        const nameCell = document.createElement("td");
        nameCell.className = "p-3 font-medium";
        nameCell.textContent = product.name;
        // Product price
        const priceCell = document.createElement("td");
        priceCell.className = "p-3";
        priceCell.textContent = `₹${product.price.toFixed(2)}`;
        // Product quantity
        const quantityCell = document.createElement("td");
        quantityCell.className = "p-3";
        quantityCell.textContent = String(product.quantity);
        // Manual stock status dropdown
        const statusCell = document.createElement("td");
        statusCell.className = "p-3";
        const statusSelect = document.createElement("select");
        statusSelect.className =
            "border rounded-lg px-2 py-1 text-sm font-medium";
        const inStockOption = document.createElement("option");
        inStockOption.value = "true";
        inStockOption.textContent = "In Stock";
        const outOfStockOption = document.createElement("option");
        outOfStockOption.value = "false";
        outOfStockOption.textContent = "Out of Stock";
        statusSelect.append(inStockOption, outOfStockOption);
        statusSelect.value = String(product.inStock);
        statusSelect.classList.add(product.inStock ? "text-green-700" : "text-red-700");
        statusSelect.addEventListener("change", () => {
            product.inStock = statusSelect.value === "true";
            renderProducts(searchInput.value);
            message.textContent = "Product status updated successfully!";
            message.className = "mt-3 text-sm text-green-600";
        });
        statusCell.appendChild(statusSelect);
        // Delete button
        const actionCell = document.createElement("td");
        actionCell.className = "p-3";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className =
            "bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg";
        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });
        actionCell.appendChild(deleteButton);
        row.append(idCell, nameCell, priceCell, quantityCell, statusCell, actionCell);
        productList.appendChild(row);
    }
    // Update counters
    totalProducts.textContent = String(products.length);
    availableProducts.textContent = String(getAvailableProducts(products).length);
    emptyMessage.classList.toggle("hidden", filteredProducts.length > 0);
    emptyMessage.textContent = products.length === 0
        ? "No products added yet."
        : "No matching products found.";
}
// Handle adding products
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (name.length === 0 ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(quantity) ||
        quantity < 0) {
        message.textContent =
            "Enter a valid name, positive price, and whole-number quantity (0 or more).";
        message.className = "mt-3 text-sm text-red-600";
        return;
    }
    addProduct(name, price, quantity);
    form.reset();
    quantityInput.value = "1";
    nameInput.focus();
});
// Search products
searchInput.addEventListener("input", () => {
    renderProducts(searchInput.value);
});
// Initial display
renderProducts();
