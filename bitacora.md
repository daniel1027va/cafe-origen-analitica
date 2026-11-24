Diccionario de datos

El conjunto de datos contiene 12 registros de ventas. Cada registro representa una venta realizada e incluye siete propiedades que permiten identificarla y describirla.

Propiedad	Tipo de dato	Significado
id	Number (entero)	Identificador único de cada venta. Permite distinguir un registro de otro.
fecha	String (texto)	Fecha en la que se realizó la venta, expresada en formato AAAA-MM-DD.
cliente	String (texto)	Código que identifica al cliente que realizó la compra (C01, C02, C03, etc.).
producto	 String (texto)	Nombre del producto vendido, como café de origen, prensa francesa o molino manual.
ciudad	String (texto)	Ciudad donde se registró la venta.
cantidad 	Number (entero)	Número de unidades del producto registradas en la venta.
precio	Number (entero)	Precio unitario del producto, expresado en pesos colombianos (COP).

Tipos de datos: las propiedades id, cantidad y precio son numéricas. Las propiedades fecha, cliente, producto y ciudad son cadenas de texto.


Observaciones sobre los datos

Durante la revisión de la tabla se identificaron algunas particularidades que deben tenerse en cuenta:

    Ciudad: en el registro con ID 5 aparece "medellín" en minúscula, mientras que en los demás registros se utilizan mayúsculas y minúsculas de forma diferente. la solucion seria unificar la escritura en el codigo.
    Cantidad: el registro con ID 8 tiene una cantidad de 0, aunque se conserva como un dato válido del archivo original hasta determinar cómo tratarlo. en este caso lo dejaria de esta manera e intentaria obtener informacion antes de cambiarlo.
    Precio: el registro con ID 12 no contiene un valor para esta propiedad, por lo que el dato está incompleto. aqui se podria consultar los demas registros para observar el precio de origen nariño, sin embargo no se puede asumir completamente que este haya sido el precio de esta venta.

