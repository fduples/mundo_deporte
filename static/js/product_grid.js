fetch('https://fduples.pythonanywhere.com/productos', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log('Fetched product data:', data);

    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    data.forEach(product => {
        const col = document.createElement('div');
        col.classList.add('col-md-3', 'mb-4'); // Bootstrap grid column classes

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
            <div class="card-body">
                <h5 class="card-title">${product.nombre}</h5>
                <p class="card-text">$${product.precio.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="btn btn-primary">Ver Producto</a>
            </div>
        `;

        col.appendChild(card);
        productGrid.appendChild(col);
    });
})
.catch(error => {
    console.error('Error al obtener los productos:', error);
});
