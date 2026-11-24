// ============================================================
// ANALÍTICA - CAFÉ ORIGEN
// Funciones para calcular y organizar la información de ventas.
// ============================================================

// Devuelve el valor de una venta.
// Si el precio no está registrado, devuelve null para no confundir
// un dato desconocido con una venta de valor cero.
function valorVenta(venta) {
    if (venta.precio === undefined || venta.precio === null || venta.precio === "") {
        return null;
    }

    const precio = Number(venta.precio);

    if (!Number.isFinite(precio)) {
        return null;
    }

    return venta.cantidad * precio;
}

// TOTAL VENDIDO (CICLO)
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        const valor = valorVenta(venta);

        if (valor !== null) {
            total += valor;
        }
    }

    return total;
}

// UNIDADES VENDIDAS (CICLO)
function unidadesVendidas(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += Number(venta.cantidad) || 0;
    }

    return total;
}

// VENTA DE MAYOR VALOR (CICLO)
function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        const valorActual = valorVenta(venta);

        if (valorActual !== null && (mayor === null || valorActual > valorVenta(mayor))) {
            mayor = venta;
        }
    }

    return mayor;
}

// TICKET PROMEDIO (CICLO)
// Solo considera registros que tienen un precio válido.
function ticketPromedio(ventas) {
    let acumulador = 0;
    let contador = 0;

    for (const venta of ventas) {
        const valor = valorVenta(venta);

        if (valor !== null) {
            acumulador += valor;
            contador++;
        }
    }

    if (contador === 0) {
        return 0;
    }

    return acumulador / contador;
}

// VENTAS POR CIUDAD (CICLO)
function ventasPorCiudad(ventas, ciudad) {
    let total = 0;
    const ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        const ciudadActual = venta.ciudad.trim().toLowerCase();
        const valor = valorVenta(venta);

        if (ciudadActual === ciudadBuscada && valor !== null) {
            total += valor;
        }
    }

    return total;
}

// ============================================================
// INDICADORES CON MÉTODOS DE ARREGLO
// ============================================================

// TOTAL VENDIDO (REDUCE)
function totalVendidoM(ventas) {
    return ventas.reduce((total, venta) => {
        const valor = valorVenta(venta);
        return valor === null ? total : total + valor;
    }, 0);
}

// UNIDADES VENDIDAS (REDUCE)
function unidadesVendidasM(ventas) {
    return ventas.reduce((total, venta) => {
        return total + (Number(venta.cantidad) || 0);
    }, 0);
}

// VENTAS POR CIUDAD (FILTER + REDUCE)
function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
        .reduce((total, venta) => {
            const valor = valorVenta(venta);
            return valor === null ? total : total + valor;
        }, 0);
}

// TOTAL VENDIDO POR CIUDAD (REDUCE)
function totalPorCiudad(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const ciudad = venta.ciudad.trim().toLowerCase();
        const valor = valorVenta(venta);

        if (!Object.prototype.hasOwnProperty.call(acumulador, ciudad)) {
            acumulador[ciudad] = 0;
        }

        if (valor !== null) {
            acumulador[ciudad] += valor;
        }

        return acumulador;
    }, {});
}

// UNIDADES VENDIDAS POR PRODUCTO (REDUCE)
function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();

        if (!Object.prototype.hasOwnProperty.call(acumulador, producto)) {
            acumulador[producto] = 0;
        }

        acumulador[producto] += Number(venta.cantidad) || 0;
        return acumulador;
    }, {});
}

// TOP K PRODUCTOS POR VALOR (REDUCE + MAP + SORT)
function topProductosPorValor(ventas, k) {
    const productos = ventas.reduce((acumulador, venta) => {
        const producto = venta.producto.trim();
        const valor = valorVenta(venta);

        if (!Object.prototype.hasOwnProperty.call(acumulador, producto)) {
            acumulador[producto] = 0;
        }

        if (valor !== null) {
            acumulador[producto] += valor;
        }

        return acumulador;
    }, {});

    const ranking = Object.entries(productos).map(([producto, total]) => {
        return {
            producto: producto,
            total: total
        };
    });

    const cantidad = Math.max(0, Math.floor(Number(k) || 0));

    return ranking
        .sort((a, b) => b.total - a.total)
        .slice(0, cantidad);
}

// RESUMEN DE VENTAS DE UN DÍA
function ventasDelDia(ventas, fecha) {
    const ventasFecha = ventas.filter(venta => venta.fecha === fecha);

    const total = totalVendido(ventasFecha);
    const unidades = unidadesVendidas(ventasFecha);

    // El promedio solo incluye ventas con precio registrado.
    const ventasConPrecio = ventasFecha.filter(venta => valorVenta(venta) !== null);
    const promedio = ventasConPrecio.length > 0
        ? total / ventasConPrecio.length
        : 0;

    return {
        fecha: fecha,
        cantidadVentas: ventasFecha.length,
        ventasConPrecio: ventasConPrecio.length,
        unidades: unidades,
        total: total,
        ticketPromedio: promedio
    };
}

// ============================================================
// EXPORTAR FUNCIONES
// ============================================================
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
};
