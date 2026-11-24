// ============================================================
// EXPLORADOR - CAFÉ ORIGEN
// Primer acercamiento a los datos y cálculos básicos.
// ============================================================

const ventas = require("./datos");

// EXPLORACIÓN INICIAL
// Estos mensajes solo aparecen cuando ejecutas explorador.js directamente.
if (require.main === module) {
    console.log("===== EXPLORACIÓN DE DATOS =====");
    console.log("Cantidad de registros:", ventas.length);
    console.log("Primer registro:", ventas[0]);
    console.log("Último registro:", ventas[ventas.length - 1]);
    console.log("Producto del registro 5:", ventas[4].producto);
    console.table(ventas);
}

// TOTAL VENDIDO
function totalVendido(ventas) {
    return ventas.reduce((total, venta) => {
        if (venta.precio === undefined || venta.precio === null || venta.precio === "") {
            return total;
        }

        const precio = Number(venta.precio);

        if (!Number.isFinite(precio)) {
            return total;
        }

        return total + venta.cantidad * precio;
    }, 0);
}

// UNIDADES VENDIDAS
function unidadesVendidas(ventas) {
    return ventas.reduce((total, venta) => {
        return total + (Number(venta.cantidad) || 0);
    }, 0);
}

// VENTAS POR CIUDAD
function ventasPorCiudad(ventas, ciudad) {
    return ventas
        .filter(venta => venta.ciudad.trim().toLowerCase() === ciudad.trim().toLowerCase())
        .reduce((total, venta) => {
            if (venta.precio === undefined || venta.precio === null || venta.precio === "") {
                return total;
            }

            const precio = Number(venta.precio);

            if (!Number.isFinite(precio)) {
                return total;
            }

            return total + venta.cantidad * precio;
        }, 0);
}

// EXPORTAR FUNCIONES
module.exports = {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad
};
