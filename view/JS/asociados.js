function recargarPagina(){
    location.reload(true);
}

let datosGeneral = [];

fetch('../controller/getAsociados.php')
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) ) {
            datosGeneral = data;

            datosGeneral.sort((a, b) => a.nombre.localeCompare(b.nombre));
            impriEnTabla(datosGeneral);
        } else {
            error ();
            console.error('La respuesta no es un array:', data);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        handleError(false);
    });

    function buscar() {
        let inputBuscar = document.getElementById('buscar');
        
        let resultados = buscarDatos(inputBuscar.value, datosGeneral);
        if(resultados && resultados.length != 0){
            impriEnTabla(resultados);
        }else{
            handleError(false);
        }
      }
      
      function buscarDatos(busqueda, datos) {
        return datos.filter(item => {
          const valorBusqueda = busqueda.toLowerCase();
          
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              const valorPropiedad = item[key];
              
              if (valorPropiedad != null && valorPropiedad.toString().toLowerCase().includes(valorBusqueda)) {
                return true;
              }
            }
          }
          return false;
        });
      }
      
      
function impriEnTabla(data){
    const tableBody = document.getElementById('data');
    tableBody.innerHTML = ''; 
    handleError(true);
    data.forEach((item) => {
                
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="inicio.html">${item.ficha}</a></td>
            <td>${convertirATitulo(item.nombre)}</td>
            <td>${convertirATitulo(item.apellido)}</td>
            <td>${item.telefono}</td>
        `;
        tableBody.appendChild(row);
    });
}

function convertirATitulo(texto) {
    texto = texto.toLowerCase();
    return texto.split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(' ');
}

function handleError(estado) {
    const contenedor = document.getElementById('informacionGeneral');
    const errorElement = document.getElementById('error');

    if(estado){
        if (contenedor) {
            contenedor.style.display = 'block';
        }

        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }else{
        if (contenedor) {
            contenedor.style.display = 'none';
        }
        
        if (errorElement) {
            errorElement.style.display = 'block';
        }
    }
}