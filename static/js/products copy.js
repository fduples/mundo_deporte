document.addEventListener('DOMContentLoaded', function () {
    
    fetch('http://127.0.0.1:5000/productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = '';

        

        const promises = data.map(product => {
                       
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.nombre}</td>
                    <td>${product.descripcion}</td>
                    <td>${product.precio}</td>
                    <td>${product.stock}</td>
                    <td>${product.categoria}</td>
                    <td><img src="${product.imagen}" alt="Imagen de producto" style="width: 50px; height: auto;"></td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${product.id}" data-bs-toggle="modal" data-bs-target="#productModal"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                `;
                productTableBody.appendChild(row);
            
        });

        Promise.all(promises).then(() => {
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', handleEdit);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        });
    })
    .catch(error => {
        console.error('Error al obtener los productos:', error);
    });

    const addProductBtn = document.getElementById('addProductBtn');
    addProductBtn.addEventListener('click', function() {
        resetModal();
        document.getElementById('productModalLabel').innerText = 'Agregar Producto';
        document.getElementById('modalSubmitBtn').innerText = 'Agregar Producto';
    });

    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productId = document.getElementById('productId').value;
        const nombre = document.getElementById('productName').value;
        const descripcion = document.getElementById('productDescription').value;
        const precio = document.getElementById('productPrice').value;
        const stock = document.getElementById('productStock').value;
        const cat_id = document.getElementById('productCategory').value;
        const imagen = document.getElementById('productImage').value;

        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `http://127.0.0.1:5000/producto/${productId}` : 'http://127.0.0.1:5000/producto';
        console.log(url);
        console.log(method);
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, precio, stock, cat_id, imagen })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resetModal();
                location.reload();
            } else {
                alert('Failed to ' + (productId ? 'update' : 'add') + ' product.');
            }
        });
    });

});

function handleEdit(event) {
    const productId = event.target.getAttribute('data-id');
    fetch(`http://127.0.0.1:5000/producto/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(product => {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.nombre;
        document.getElementById('productDescription').value = product.descripcion;
        document.getElementById('productPrice').value = product.precio;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productCategory').value = product.cat_id;
        document.getElementById('productImage').value = product.imagen;

        document.getElementById('productModalLabel').innerText = 'Editar Producto';
        document.getElementById('modalSubmitBtn').innerText = 'Guardar Cambios';
    });
}

function handleDelete(event) {
    const productId = event.target.getAttribute('data-id');

    if (confirm("¿Seguro que quieres eliminar este producto?")) {
        fetch(`http://127.0.0.1:5000/producto/${productId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert('Failed to delete product.');
            }
        });
    }
}

function resetModal() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productImage').value = '';
}
