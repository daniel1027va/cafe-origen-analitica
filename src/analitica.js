const ventas = require("../src/datos")

function valorVenta(venta){
return(venta.cantidad*venta.precio)
}

function totalVendido(ventas){
    let total = 0;
    for (const venta of ventas){
        let resultado = valorVenta(venta);
        total += resultado;
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

console.log("Venta mayor:", ventaMayor(ventas));

