

// Prototype Cotizador de seguro
function Seguro (marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.calcularSeguro = function () {

    /* 
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
    // console.log(this.marca);

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
        break;
    }


    // Leer el year
    const diferencia = new Date().getFullYear() - this.year;

    // Cada year que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ( (diferencia * 3) * cantidad) / 100;


    /*
        Basico = se multiplica por un 30% mas
        Completo = se multiplica por un 50% mas
    */

        if (this.tipo == 'basico'){
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }

return cantidad;
}


function UI () {};


UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(), 
          min = max -10;
    

          const year = document.querySelector('#year');

    for (let i = max; i >= min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}



UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    // Valida si existe alguna alerta
const alerta = document.querySelector('.error') || document.querySelector('.correcto');
    if (!alerta) {
        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('error');
        } else {
            div.classList.add('correcto');
        }
        div.classList.add('mensaje', 'mt-4')
        div.textContent = mensaje;

        // Agregando al DOM 
        const formulario = document.querySelector('#cotizar-seguro');
        formulario.insertBefore(div, document.querySelector('#resultado'));
        
        setTimeout(() => {
            div.remove();
        }, 3000);
        
    }

}

UI.prototype.mostrarResultado = (total, seguro) => {

    // Destructuring 
    const {marca, year, tipo } = seguro;

    let tipoMarca;

    switch (marca){

        case '1':
            tipoMarca = 'Americano';
            break;

        case '2':
            tipoMarca = 'Asiatico';
            break;

        case '3':
            tipoMarca = 'Europeo';
            break;

        default:
            break;
    }

    // crear el resultado 
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${tipoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `

    const resultado = document.querySelector('#resultado');
    
    // Mostrar el sppiner 
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    
    setTimeout(() => {
        spinner.style.display = 'none'; // ocultando sppiner
        resultado.appendChild(div); // mostrando resultado
    }, 3000);
}

// Instanciando el objeto
const ui = new UI();
// //console.log(ui);


document.addEventListener("DOMContentLoaded", () => {
    // Se pasa el objeto instanciado y se manda a llamar la funcion del prototype
    ui.llenarOpciones();
});


leyendoEventos();
function leyendoEventos(){

    const formulario = document.querySelector('#cotizar-seguro');

    formulario.addEventListener('submit', validando);

    function validando (e) {
        e.preventDefault();

        // VALIDANDO

        // Marca
        const marca = document.querySelector('#marca').value;
        // Year
        const year = document.querySelector('#year').value;
        // Tipo
        const tipo = document.querySelector('input[name="tipo"]:checked').value;

        // Validando 
        if (marca === '' || year === '' || tipo === ''){
            ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
            return;
        } 
            ui.mostrarMensaje('Cotizando....', 'exito');

            // Ocultar contizaciones previas
            const resultados = document.querySelector('#resultado div');

            if (resultados !== null) {
                resultados.remove();
            }
            // console.log('PASO LA VALIDACION');

            // Instanciar Cotizador de seguro 
            const seguro = new Seguro(marca, year, tipo);
            const total = seguro.calcularSeguro();
            // console.log(seguro);

            // Utilizar prototyype que cotice el seguro
        ui.mostrarResultado(total, seguro);
    }
    
}