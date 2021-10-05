let generateHTMLCode = ( response ) =>
{
	let HTMLCode = "";
	let j= 0;
		for (let i=0; i<8; i++)
		{
			if (response [i].casa.nombre === "Dolar Soja" || response [i].casa.nombre === "Bitcoin") { continue; }
			
			HTMLCode += `<p>Panel nro ${j} valor-->${response [i].casa.nombre}, compra: ${response [i].casa.compra}, venta: ${response [i].casa.venta}, variacion: ${response [i].casa.variacion}<p>`;
			document.getElementById(`TituloPanel${j}`).innerHTML = response [i].casa.nombre;	
			document.getElementById(`Compra${j}`).innerHTML = `$ ${response [i].casa.compra}`;
			document.getElementById(`Venta${j}`).innerHTML = `$ ${response [i].casa.venta}`;
			document.getElementById(`Variacion${j}`).innerHTML = `VARIACION: ${response [i].casa.variacion} %`;
			document.getElementById(`Actualizado${j}`).innerHTML = `ACTUALIZADO: ${response [8].casa.fecha}  ${response [8].casa.recorrido}`;
		j++
		}

		return HTMLCode;			
}




//Peticiones al servidor: API XMLhttpRequest

let procesarRespuestaDelServer = (event) =>
{
	if (event.currentTarget.status == 200)
	{
		let serverRespose = event.currentTarget.responseText;
		

		console.log('La respuesta del servidor es: '+ serverRespose);
		let inbody = document.getElementById("table");
		inbody.innerHTML = generateHTMLCode( JSON.parse(serverRespose) );
	}

}

let PeticionPorXMLhttpRequest = (event) =>
{
	let connection = new XMLHttpRequest(); //Crea el Objeto connetcion que va a ser utilizado para la petición al server

	connection.open('GET', 'https://www.dolarsi.com/api/api.php?type=valoresprincipales');//Establece la conexión por el método GET/POST y solicita el recurso server.php

	
	connection.addEventListener('loadend', procesarRespuestaDelServer);//Cuando el estado de conexión pasa a loadendd ejecuta la función procesarRespuestaDelServer 

	
	connection.send();
}

let botonDeCarga = document.getElementById('loadTable');
botonDeCarga.addEventListener('click', PeticionPorXMLhttpRequest);