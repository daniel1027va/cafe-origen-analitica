

function valorVenta(venta) {
    return venta.cantidad * (Number(venta.precio) || 0);
}


function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += valorVenta(venta);
    }

    return total;
}


function unidadesVendidas(ventas){
    let total = 0;
    for (const venta of ventas){
        let resultado =  venta.cantidad;
        total += resultado;
    }
    return total
}

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

function totalVendidoM(ventas) {
    return ventas.reduce((total, venta) => {
        return total + (venta.cantidad * venta.precio);
    }, 0);
}

function unidadesVendidasM(ventas) {
    return ventas.reduce((total, venta) => {
        return total + venta.cantidad;
    }, 0);
}

function ventasPorCiudadM(ventas, ciudad) {

    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta => {
            return venta.ciudad.trim().toLowerCase() === ciudadBuscada;
        })
        .reduce((total, venta) => {
            return total + (venta.cantidad * venta.precio);
        }, 0);
}

function totalPorCiudad(ventas) {

    return ventas.reduce((acumulador, venta) => {

        const ciudad = venta.ciudad.trim().toLowerCase();

        const total = venta.cantidad * venta.precio;

        if (!acumulador[ciudad]) {
            acumulador[ciudad] = 0;
        }

        acumulador[ciudad] += total;

        return acumulador;

    }, {});
}

function unidadesPorProducto(ventas) {

    return ventas.reduce((acumulador, venta) => {

        const producto = venta.producto.trim();

        if (!acumulador[producto]) {
            acumulador[producto] = 0;
        }

        acumulador[producto] += venta.cantidad;

        return acumulador;

    }, {});
}

function topProductosPorValor(ventas, k) {

    const productos = ventas.reduce((acumulador, venta) => {

        const producto = venta.producto.trim();

        const total = venta.cantidad * venta.precio;

        if (!acumulador[producto]) {
            acumulador[producto] = 0;
        }

        acumulador[producto] += total;

        return acumulador;

    }, {});

    const ranking = Object.entries(productos).map(([producto, total]) => {
        return {
            producto: producto,
            total: total
        };
    });

    return [...ranking]
        .sort((a, b) => b.total - a.total)
        .slice(0, Math.max(0, k));
}

function ventasDelDia(ventas, fecha) {

    const ventasFecha = ventas.filter(venta => {
        return venta.fecha === fecha;
    });

    const total = ventasFecha.reduce((acumulador, venta) => {
        return acumulador + venta.cantidad * (Number(venta.precio) || 0);
    }, 0);

    const unidades = ventasFecha.reduce((acumulador, venta) => {
        return acumulador + venta.cantidad;
    }, 0);

    const ticketPromedio = ventasFecha.length > 0
        ? total / ventasFecha.length
        : 0;

    return {
        fecha: fecha,
        cantidadVentas: ventasFecha.length,
        unidades: unidades,
        total: total,
        ticketPromedio: ticketPromedio
    };
}




// EXPORTAR FUNCIONES

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    ventaMayor,
    ticketPromedio,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
};

