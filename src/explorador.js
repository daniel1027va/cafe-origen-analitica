const ventas = require("../src/datos"); 
console.log(ventas.length);
console.log(ventas[0]);
console.log(ventas[ventas.length-1 ]);
console.log(ventas[4].producto);
console.table(ventas);

// TOTAL VENDIDO
function totalVendido(ventas) {
    return ventas.reduce((total, venta) => {
        return total + (venta.cantidad * (venta.precio || 0));
    }, 0);
}

// UNIDADES VENDIDAS
function unidadesVendidas(ventas) {
    return ventas.reduce((total, venta) => {
        return total + venta.cantidad;
    }, 0);
}

// VENTAS POR CIUDAD
function ventasPorCiudad(ventas, ciudad) {
    return ventas
        .filter(venta =>
            venta.ciudad.toLowerCase() === ciudad.toLowerCase()
        )
        .reduce((total, venta) => {
            return total + (venta.cantidad * (venta.precio || 0));
        }, 0);
}

// EXPORTAR FUNCIONES
module.exports = {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad
};
