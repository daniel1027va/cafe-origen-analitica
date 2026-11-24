Proyecto: Café Origen – Indicadores de ventas
1. Objetivo del ejercicio

Desarrollar un programa en JavaScript que permita calcular indicadores básicos de negocio para Café Origen, utilizando ciclos manuales y aplicando los patrones de programación contador, acumulador y máximo.

Los indicadores que se deben calcular son:

Total de dinero vendido.
Cantidad total de unidades vendidas.
Venta de mayor valor.
Ticket promedio por compra.
Total de ventas realizadas por ciudad.

Se estableció como condición utilizar ciclos tradicionales y evitar métodos abreviados como reduce(), map() y filter().

2. Estructura de los datos

Para desarrollar el ejercicio se utilizó un arreglo de ventas importado desde el archivo datos.js.

Cada registro contiene información de una venta, utilizando las propiedades:

cantidad: número de unidades compradas.
precio: valor individual de cada producto.
ciudad: ciudad donde se realizó la compra.

Para calcular el valor total de una compra se multiplica la cantidad por el precio.

3. Desarrollo paso a paso de las funciones
Función 1: valorVenta(venta)

Objetivo: Calcular el valor total de una venta individual.

Desarrollo:

Se recibe un objeto que representa una venta.
Se accede a la propiedad cantidad.
Se accede a la propiedad precio.
Se multiplican ambos valores.
Se retorna el resultado.

Código:

javascript
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}


Concepto aplicado: Operación matemática básica.

Esta función permite reutilizar el cálculo del valor de cada venta en las demás funciones, evitando repetir la misma operación.

Función 2: totalVendido(ventas)

Objetivo: Calcular cuánto dinero se ha vendido en total.

Desarrollo:

Se crea una variable llamada total inicializada en cero.
Se utiliza un ciclo for...of para recorrer cada venta.
Dentro del ciclo se llama a la función valorVenta() para calcular el valor de la compra actual.
El resultado se suma al acumulador total.
Cuando termina el ciclo, se retorna el acumulado.

Código:

javascript
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        let resultado = valorVenta(venta);
        total += resultado;
    }

    return total;
}


Patrón aplicado: ACUMULADOR.

Se utiliza porque necesitamos sumar progresivamente el valor de todas las ventas.

Función 3: unidadesVendidas(ventas)

Objetivo: Calcular cuántas unidades se vendieron en total.

Desarrollo:

Se inicializa una variable total en cero.
Se recorre el arreglo de ventas mediante un ciclo for...of.
Se obtiene la cantidad de unidades de cada venta.
Se suma esa cantidad al acumulador.
Finalmente, se retorna el total de unidades vendidas.

Código:

javascript
function unidadesVendidas(ventas) {
    let total = 0;

    for (const venta of ventas) {
        let resultado = venta.cantidad;
        total += resultado;
    }

    return total;
}


Patrón aplicado: ACUMULADOR.

Se utiliza para sumar las cantidades de productos de cada compra.

Función 4: ventaMayor(ventas)

Objetivo: Identificar cuál fue la venta de mayor valor.

Desarrollo:

Primero se verifica si el arreglo está vacío.
Si no existen ventas, se retorna null, porque no hay ningún registro que pueda considerarse como venta mayor.
Se inicializa una variable llamada mayor con la primera venta del arreglo.
Se recorre el arreglo utilizando un ciclo for...of.
Se compara el valor de cada venta con el valor de la venta mayor registrada.
Si se encuentra una venta superior, se actualiza la variable mayor.
Al terminar el ciclo, se retorna el registro de la venta más grande.

Código:

javascript
function ventaMayor(ventas) {

    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];

    for (const venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    return mayor;
}


Patrón aplicado: MÁXIMO.

Se utiliza porque necesitamos encontrar el registro que contiene el valor más alto dentro del arreglo.

Manejo del caso borde:

Cuando el arreglo está vacío, la función retorna null, evitando intentar acceder a una venta inexistente.

Función 5: ticketPromedio(ventas)

Objetivo: Calcular cuánto dinero gasta en promedio un cliente por compra.

Desarrollo:

Se verifica si el arreglo está vacío.
Si no existen ventas, se retorna cero para evitar una división entre cero.
Se inicializa un acumulador en cero.
Se inicializa un contador en cero.
Se recorre el arreglo utilizando un ciclo for...of.
Se calcula el valor de cada compra utilizando valorVenta().
Se suma el resultado al acumulador.
Se incrementa el contador por cada compra procesada.
Al finalizar el ciclo, se divide el acumulador entre el contador.
Se retorna el promedio obtenido.

Código:

javascript
function ticketPromedio(ventas) {

    if (ventas.length === 0) {
        return 0;
    }

    let acumulador = 0;
    let contador = 0;

    for (const venta of ventas) {
        acumulador += valorVenta(venta);
        contador++;
    }

    return acumulador / contador;
}


Patrones aplicados: ACUMULADOR Y CONTADOR.

El acumulador suma el dinero de todas las compras.
El contador registra cuántas compras fueron procesadas.

Manejo del caso borde:

Si no hay compras, se retorna cero porque no es posible calcular un promedio sin datos.

Función 6: ventasPorCiudad(ventas, ciudad)

Objetivo: Calcular cuánto dinero se vendió en una ciudad específica.

Desarrollo:

Se recibe el arreglo de ventas y el nombre de la ciudad que se desea consultar.
Se inicializa un acumulador en cero.
Se utiliza trim() para eliminar espacios sobrantes y toLowerCase() para convertir el nombre de la ciudad a minúsculas.
Se recorre el arreglo utilizando un ciclo for...of.
Se obtiene la ciudad de cada venta y se normaliza de la misma manera.
Se comparan ambas ciudades.
Si coinciden, se calcula el valor de la venta y se suma al acumulador.
Finalmente, se retorna el total vendido en esa ciudad.

Código:

javascript
function ventasPorCiudad(ventas, ciudad) {

    let total = 0;

    let ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {

        let ciudadActual = venta.ciudad.trim().toLowerCase();

        if (ciudadActual === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}


Patrón aplicado: ACUMULADOR Y CONDICIONAL.

Se utiliza un acumulador para sumar únicamente las ventas que pertenecen a la ciudad solicitada.

La comparación ignora las mayúsculas y los espacios sobrantes.

Por ejemplo, las siguientes búsquedas se consideran equivalentes:

Medellín
MEDELLÍN
medellín
" Medellín "
4. Pruebas de funcionamiento

Se establecieron tres escenarios de prueba para cada función:

Prueba 1: Arreglo completo

Se utiliza el arreglo original con todos los registros de ventas para comprobar que las funciones procesan correctamente varios elementos.

Prueba 2: Arreglo de un solo elemento

Se utiliza un arreglo que contiene únicamente una venta para comprobar que las funciones funcionan correctamente cuando existe un solo registro.

Prueba 3: Arreglo vacío

Se utiliza un arreglo sin registros para comprobar el comportamiento de cada función cuando no existen datos.

5. Manejo de casos borde

Se definieron los siguientes resultados esperados:

Función	Arreglo vacío	Justificación
valorVenta	No aplica	Recibe una venta individual, no un arreglo.
totalVendido	0	No hay dinero para acumular.
unidadesVendidas	0	No hay unidades registradas.
ventaMayor	null	No existe una venta que pueda ser la mayor.
ticketPromedio	0	No se puede dividir entre cero.
ventasPorCiudad	0	No existen ventas para esa ciudad.

Para el arreglo de un solo elemento, las funciones deben procesar correctamente esa única venta.

6. Verificación manual: tablas de traza

Se realizaron comprobaciones manuales para verificar el funcionamiento de los ciclos.

Traza 1: Total vendido

Se utiliza un ejemplo ilustrativo de tres ventas:

Iteración	Valor de venta	Acumulador
Inicial	-	0
1	20.000	20.000
2	30.000	50.000
3	15.000	65.000

Resultado manual: 65.000.

El resultado se obtiene sumando los tres valores de venta.

Traza 2: Venta mayor

Se utilizan los mismos valores:

Iteración	Valor actual	Mayor registrado
Inicial	20.000	20.000
1	20.000	20.000
2	30.000	30.000
3	15.000	30.000

Resultado manual: 30.000.

La venta de mayor valor es la segunda, porque supera los valores de las demás compras.

Nota: Estos valores son ejemplos para explicar el recorrido del ciclo. La comprobación definitiva debe realizarse con los datos reales del archivo datos.js.

7. Patrones de programación utilizados

Durante el desarrollo se aplicaron los siguientes patrones:

Acumulador:

Se utiliza para guardar una suma progresiva. Se implementó en totalVendido(), unidadesVendidas(), ticketPromedio() y ventasPorCiudad().

Contador:

Se utiliza para registrar cuántas veces ocurre un proceso. Se implementó en ticketPromedio() para contar la cantidad de compras.

Máximo:

Se utiliza para identificar el valor más alto de una colección. Se implementó en ventaMayor() mediante comparaciones sucesivas.

Ciclos manuales:

Se utilizaron ciclos for...of para recorrer los registros de ventas sin recurrir a métodos abreviados de arreglos.

8. Conclusión

Con este ejercicio se logró desarrollar un conjunto de funciones para calcular indicadores básicos de negocio utilizando JavaScript.

Se comprendió la importancia de los acumuladores para sumar información, los contadores para registrar cantidades y las comparaciones para identificar valores máximos.

También se implementó el manejo de casos borde, evitando errores cuando el arreglo de ventas está vacío.

Finalmente, se realizaron pruebas con diferentes tamaños de arreglos y verificaciones manuales mediante tablas de traza para comprobar la lógica de los ciclos.