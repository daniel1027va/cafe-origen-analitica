const ventas = require("./datos");

const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad
} = require("./explorador");

const {
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica");


// FUNCIÓN PARA COMPARAR RESULTADOS

function verificar(nombre, resultadoCiclo, resultadoMetodo) {

    if (resultadoCiclo === resultadoMetodo) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
        console.log("Resultado ciclo:", resultadoCiclo);
        console.log("Resultado método:", resultadoMetodo);
    }
}

// COMPARACIÓN DE INDICADORES

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

// COMPARACIÓN POR CIUDAD

const ciudadPrueba = ventas.length > 0
    ? ventas[0].ciudad
    : "Bogotá";

verificar(
    "Ventas por ciudad",
    ventasPorCiudad(ventas, ciudadPrueba),
    ventasPorCiudadM(ventas, ciudadPrueba)
);

// NUEVOS INDICADORES

console.log("\n===== NUEVOS INDICADORES =====");

console.log("\nTotal vendido por ciudad:");
console.log(totalPorCiudad(ventas));

console.log("\nUnidades por producto:");
console.log(unidadesPorProducto(ventas));

console.log("\nTop 3 productos por valor:");
console.log(topProductosPorValor(ventas, 3));
