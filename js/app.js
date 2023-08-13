// IFII para que las variables que creamos en este archivo se creen de formla local
(function () {

    let DB // definimos esta varibale para guardar el valor de DB para almacenar la base de datos

    document.addEventListener('DOMContentLoaded', () => {
        crearDB()
    })

    // Crear base de datos te indexDB
    function crearDB() {

        const creadaDB = window.indexedDB.open('crm', 2)

        creadaDB.onerror = () => {
            console.log("hubo un error durante la creación de la BBDD")
        }

        creadaDB.onsuccess = () => {
            DB = creadaDB.result
        }

        creadaDB.onupgradeneeded = (e) => {
            const db = e.target.result

            // Definimos el objectStore
            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true })

            // Ahora vamos a crear los campos
            objectStore.createIndex('nombre', 'nombre', { unique: false })
            objectStore.createIndex('email', 'email', { unique: true })
            objectStore.createIndex('telefono', 'telefono', { unique: false })
            objectStore.createIndex('empresa', 'empresa', { unique: false })
            objectStore.createIndex('id', 'id', { unique: true })

            console.log("BBDD creada")
        }

    }
})()



