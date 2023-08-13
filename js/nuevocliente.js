// IFII para que las variables que creamos en este archivo se creen de formla local
(function () {

    const formulario = document.querySelector('#formulario')

    let DB // definimos esta varibale para guardar el valor de DB para almacenar la base de datos

    document.addEventListener('DOMContentLoaded', () => {
        // Conectarme a BBDD
        conectarDB()

        // Validamos los datos del formulario cuando se pulse en submit
        formulario.addEventListener('submit', validarCliente)
    })

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1)

        abrirConexion.onerror = () => {
            console.log("Hubo un error")
        }

        abrirConexion.onsuccess = () => {
            DB = abrirConexion.result
        }
    }

    function validarCliente(e) {
        e.preventDefault()

        // Leer los inputs del formulario
        const nombre = document.querySelector('#nombre').value
        const email = document.querySelector('#email').value
        const telefono = document.querySelector('#telefono').value
        const empresa = document.querySelector('#empresa').value

        if (nombre == "" || email == "" || telefono == "" || empresa == "") {
            imprimirAlerta('Todos los campos son obligatorios', 'error')
            return
        }


        // Crear un nuevo objeto ccon la información del formulario
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }

        cliente.id = Date.now()

        crearNuevoCliente(cliente)

    }

    function crearNuevoCliente(cliente) {

        const transaction = DB.transaction(['crm'], 'readwrite')

        transaction.onerror = () => {
            console.log("hubo un error")
        }

        transaction.oncomplete = () => {
            console.log("Cliente agregado")
        }

        const objectStore = transaction.objectStore('crm')

        objectStore.add(cliente)

    }

    function imprimirAlerta(mensaje, tipo) {

        const alerta = document.querySelector('.alerta') // definimos la variable alerta y la aginamos a la clase alerta

        if (!alerta) { // solo debe crear la alerta si no existe
            // Crear la alerta
            const divMensaje = document.createElement('div')
            divMensaje.classList.add('px-4', 'py3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta') // aquí esta la calse alerta

            if (tipo === "error") {
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
            } else {
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
            }

            divMensaje.textContent = mensaje
            formulario.appendChild(divMensaje)

            setTimeout(() => {
                divMensaje.remove()
            }, 3000)

        }

    }

})()


