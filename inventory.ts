interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

let products: Product[] = [];

function addProduct(): void {

    const nameInput =
        document.getElementById("name") as HTMLInputElement;

    const priceInput =
        document.getElementById("price") as HTMLInputElement;

    if (!nameInput.value || !priceInput.value) {
        alert("Please fill all fields");
        return;
    }

    const product: Product = {
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

function renderProducts(): void {

    const list =
        document.getElementById("productList") as HTMLUListElement;

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

(window as any).addProduct = addProduct;