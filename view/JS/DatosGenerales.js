let datosGeneral = [];

fetch('../controller/getGeneralData.php')
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
    data.forEach((item, index) => {
                
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${convertirATitulo(item.nombre)}</td>
            <td>${convertirATitulo(item.apellidos)}</td>
            <td>${item.numeroCedula}</td>
            <td>${item.numeroTelefono}</td>
            <td>${item.email}</td>
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

function recargarPagina(){
    location.reload(true);
}

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const logoUrl = '../imagenes/iconos/Logo-Verastica.png';
    const consejo = 'Consejo Comunitario Verástica de Cañaveral';
    const correo = 'ccverasticacanaveral@gmail.com';
    const telefono = '312 6560018';
  
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 30, 30);

      doc.setFontSize(12);
      doc.text(consejo, 50, 20);
      doc.text(correo, 50, 30);
      doc.text(telefono, 50, 40);
  
      const columns = ["Nombre", "Apellidos", "Cedula", "Telefono", "Correo"];
      const rows = datosGeneral.map(dato => [
        convertirATitulo(dato.nombre),
        convertirATitulo(dato.apellidos),
        dato.numeroCedula,
        dato.numeroTelefono,
        dato.email
      ]);
  
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 50 
      });
  
      const pdfBlobUrl = doc.output('bloburl');
      window.open(pdfBlobUrl, '_blank');
    };
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnGenerarPDF').addEventListener('click', generarPDF);
  });
  
  