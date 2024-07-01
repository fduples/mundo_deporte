function getParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  return productId;
}

// Función para cargar datos del producto
function loadProductDetails() {
  const productId = getParams();

  fetch(`https://fduples.pythonanywhere.com/producto/${productId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(product => {
      console.log('Product data:', product);

      document.getElementById('productImg').src = product.imagen;
      document.getElementById('productTitle').textContent = product.nombre;
      document.getElementById('productPrice').textContent = `$${product.precio.toFixed(2)}`;
      document.getElementById('productDescription').textContent = product.descripcion;
      document.getElementById('productStock').textContent = `Stock: ${product.stock}`;
  })
  .catch(error => {
      console.error('Error fetching product details:', error);
  });
}

// Función para añadir al carrito (puedes implementar esta lógica según tus necesidades)
function addToCart() {
  const productId = getParams();
  const quantity = document.getElementById('productQuantity').value;
  console.log(`Añadiendo ${quantity} unidades del producto ${productId} al carrito.`);
  // Lógica para añadir al carrito aquí
}

// Función para incrementar cantidad
function more() {
  const quantityInput = document.getElementById('productQuantity');
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Función para decrementar cantidad
function less() {
  const quantityInput = document.getElementById('productQuantity');
  if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

// Cargar detalles del producto al cargar la página
window.onload = function() {
  loadProductDetails();
};
