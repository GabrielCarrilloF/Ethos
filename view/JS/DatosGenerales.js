fetch('../controller/getGeneralData.php')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verifica la estructura de los datos aquí
        if (Array.isArray(data) && data.length != 0) {
            const tableBody = document.getElementById('data');
            tableBody.innerHTML = ''; // Limpiar el contenido existente

            data.forEach((item, index) => {
                // Crear una nueva fila para cada item en los datos
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.nombre}</td>
                    <td>${item.apellidos}</td>
                    <td>${item.numeroCedula}</td>
                    <td>${item.numeroTelefono}</td>
                    <td>${item.email}</td>
                `;
                tableBody.appendChild(row); // Agregar la fila al cuerpo de la tabla
            });
        } else {
            error ();
            console.error('La respuesta no es un array:', data);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        handleError(); // Llama a tu función para manejar el error
    });

function handleError() {
    const contenedor = document.getElementById('informacionGeneral');
    const errorElement = document.getElementById('error');

    if (contenedor) {
        contenedor.style.display = 'none';
    }

    if (errorElement) {
        errorElement.style.display = 'block';
    }
}

function recargarPagina(){
    location.reload(true);
}

