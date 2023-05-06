'use strict';

const comprobarNumeros = (numero,sistema)=>{

	switch(sistema){
		case 1:
			for (let i = 0; i < numero.length; i++) {
				switch(numero[i]){
					case '0':case '1':case '2':case '3':case '4':case '5':case '6':
					case '7':case '8':case '9':case 'A':case 'B':case 'C':case 'D':
					case 'E':case 'F':case 'a':case 'b':case 'c':case 'd':case 'e':
					case 'f':
						input.classList.toggle("error",false);break;
					default:
						input.classList.toggle("error",true);return 1;break;//GeneraUnError
				}
			}
			break;
		case 2:
			for (let i = 0; i < numero.length; i++) {
				switch(numero[i]){
					case '0':case '1':case '2':case '3':case '4':case '5':case '6':
					case '7':case '8':case '9':
						input.classList.toggle("error",false);break;
					default:
						input.classList.toggle("error",true);return 1;break;//GeneraUnError
				}
			}
			break;
		case 3:
			for (let i = 0; i < numero.length; i++) {
				switch(numero[i]){
					case '0':case '1':case '2':case '3':case '4':case '5':case '6':
					case '7':
						input.classList.toggle("error",false);break;
					default:
						input.classList.toggle("error",true);return 1;break;//GeneraUnError
				}
			}
			break;
		case 4:
			for (let i = 0; i < numero.length; i++) {
				switch(numero[i]){
					case '0':case '1':
						input.classList.toggle("error",false);break;
					default:	
						input.classList.toggle("error",true);return 1;break;//GeneraUnError
				}
			}
			break;			
	}
	return 0;
}

const convertirNumeroADecimal = (numero,sistema)=>{	

	if(sistema!=2)
	{
		let valorPotencia;
		let resultado =0,potencia=0;


		if (sistema==1) valorPotencia=16;	
		else if (sistema==3) valorPotencia=8;
		else if (sistema==4) valorPotencia=2;		

		for (let i = numero.length-1; i >= 0; i--) {
			switch(numero[i])
			{
				case'1':case'2':case'3':case'4':case'5':case'6':case'7':case'8':case'9':
					resultado += parseInt(numero[i])*(valorPotencia**potencia); 
					break;
				case'A':case'a':
					resultado += 10*(valorPotencia**potencia); 
					break;	
				case'B':case'b':
					resultado += 11*(valorPotencia**potencia); 
					break;	
				case'C':case'c':
					resultado += 12*(valorPotencia**potencia); 
					break;
				case'D':case'd':
					resultado += 13*(valorPotencia**potencia); 
					break;
				case'E':case'e':
					resultado += 14*(valorPotencia**potencia); 
					break;
				case'F':case'f':
					resultado += 15*(valorPotencia**potencia); 
					break;
			}
			potencia++;
		}
		numero = resultado;		
	}
	

	return numero;
}


const convertirNumeroASistema = (numero,sistema)=>{

	if(sistema!=2){

		let valorPotencia;

		if (sistema==1) valorPotencia=16;	
		else if (sistema==3) valorPotencia=8;
		else if (sistema==4) valorPotencia=2;

		let resultado=[],valorProvisional=parseInt(numero),i=0;

			do{
				resultado[i] = valorProvisional%valorPotencia;
				switch(resultado[i]){
					case 10:
						 resultado[i] = 'A';
						 break;
					case 11:
						 resultado[i] = 'B';
						 break;
					case 12:
						 resultado[i] = 'C';
						 break;
					case 13:
						 resultado[i] = 'D';
						 break;
					case 14:
						 resultado[i] = 'E';
						 break;
					case 15:
						 resultado[i] = 'F';
						 break;	 	 	 	 	 
				}

				valorProvisional = Math.trunc(valorProvisional/valorPotencia);
				i++;
			}while(valorProvisional != 0)
			
			resultado = resultado.reverse();
			resultado = resultado.join('');
			return resultado;
	}

	return numero;
	
}


//Ocultar las secciones
const secciones = document.querySelectorAll('.seccion');

secciones[1].style.display = 'none';
secciones[2].style.display = 'none';

//Elegir sistema del numero a convertir
const botonSistema = document.querySelectorAll('.main__article-section-ul-li');
const botonSeleccionarSistema = document.getElementById('seleccionar');

let sistema,valorSeleccion,sistemaString,sistemaDestino,sistemaDestinoString,resultado;

//Seleccion
botonSistema[0].addEventListener('click',()=>valorSeleccion = botonSistema[0].tabIndex);
botonSistema[1].addEventListener('click',()=>valorSeleccion = botonSistema[1].tabIndex);
botonSistema[2].addEventListener('click',()=>valorSeleccion = botonSistema[2].tabIndex);
botonSistema[3].addEventListener('click',()=>valorSeleccion = botonSistema[3].tabIndex);


botonSeleccionarSistema.addEventListener('click',()=>{
	//Si es la primera vez que se presiona el boton
	if (valorSeleccion!=undefined && sistemaString==undefined) {

		if (valorSeleccion==1) sistemaString='Hexadecimal';
		else if (valorSeleccion==2) sistemaString='Decimal';
		else if (valorSeleccion==3) sistemaString='Octal';
		else if (valorSeleccion==4) sistemaString='Binario';

		//quitar boton ya seleccionado
		botonSistema[valorSeleccion-1].style.display = 'none';	

		sistema = valorSeleccion;

		//ocultar seccion para mostrar el input 
		secciones[0].style.display = 'none';
		secciones[1].style.display = 'flex';	

		//cambiar contenido h3
		document.querySelector('.main__article-h3').textContent=`Digite número ${sistemaString} a convertir.`;

	}else{//Elegir el sistema destiono

		if (valorSeleccion==1) sistemaDestinoString='Hexadecimal';
		else if (valorSeleccion==2) sistemaDestinoString='Decimal';
		else if (valorSeleccion==3) sistemaDestinoString='Octal';
		else if (valorSeleccion==4) sistemaDestinoString='Binario';

		sistemaDestino = valorSeleccion;

		//ocultar seccion para mostrar el resultado
		secciones[0].style.display = 'none';
		secciones[2].style.display = 'flex';

		//cambiar contenido h3
		document.querySelector('.main__article-h3').textContent=`Numero Convertido.`;

		//Convertir numero
		resultado = convertirNumeroASistema(convertirNumeroADecimal(input.value,sistema),sistemaDestino);

		//pasar los valores a las tags
		document.querySelector('.numero').textContent=input.value;
		document.querySelector('.sistema').textContent=sistemaString;
		document.querySelectorAll('.sistema-destino')[0].textContent=sistemaDestinoString;
		document.querySelectorAll('.sistema-destino')[1].textContent=sistemaDestinoString;
		document.querySelector('.resultado').textContent=resultado;
	}
});

//Digitar numero a convertir
const input = document.querySelector('.main__article-section-input');
const botonInput = document.getElementById('enviar-input');

botonInput.addEventListener('click',()=>{

	//si no hay errores en el numero
	if(comprobarNumeros(input.value,sistema)==0){

		//ocultar input para mostrar seleccion
		secciones[1].style.display = 'none';
		secciones[0].style.display = 'flex';

		//cambiar contenido h3		
		document.querySelector('.main__article-h3').textContent=`Seleccione el Sistema a destino.`;
	}
});

//para mostrar un mensaje de error en sintaxis invalida
input.addEventListener('change',()=>{
	if(comprobarNumeros(input.value,sistema) == 1){
		console.error(`El valor: ${input.value}. NO es correcto para el sistemas ${sistemaString}`);
	}	
});

//REINICIAR
document.getElementById('recargar').addEventListener('click',()=>{

	botonSistema[sistema-1].style.display = 'block';	
	secciones[0].style.display = 'flex';	
	secciones[1].style.display = 'none';
	secciones[2].style.display = 'none';

	document.querySelector('.main__article-h3').textContent=`Seleccione el Sistema del número a convertir.`;

	input.value='';
	sistemaString=undefined;
});

//Convertir a otro sistema
document.getElementById('convertir').addEventListener('click',()=>{

	secciones[0].style.display = 'flex';	
	secciones[1].style.display = 'none';
	secciones[2].style.display = 'none';

	document.querySelector('.main__article-h3').textContent=`Seleccione el Sistema a destino.`;
});