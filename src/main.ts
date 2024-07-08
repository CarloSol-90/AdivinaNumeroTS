// `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`.

//`&&`(y), `||` (o), `!`(no).

//TIPADO DE JS A TS

//Generar numero aleatorio e indicamos que decuelve explicitamente un numero
const generateNumRandom = (): number => Math.floor(Math.random() * 101);

const numeroParaAcertar: number = generateNumRandom();

console.log(numeroParaAcertar);

type Estado =
  | "NO_ES_UN_NUMERO"
  | "EL_NUMERO_ES_MENOR"
  | "EL_NUMERO_ES_MAYOR"
  | "ES_EL_NUMERO_SECRETO"
  | "GAME_OVER";

const MAX_INTENTOS = 5;
let numeroDeIntentos = 0;

const hasSuperadoElNumeroMaximoDeIntentos = (): boolean => {
  return numeroDeIntentos > MAX_INTENTOS;
};

const muestraNumeroIntentos = () => {
  const elementoIntentos = document.getElementById("intentos");
  if (elementoIntentos) {
    elementoIntentos.innerHTML = `${numeroDeIntentos} de ${MAX_INTENTOS}`;
  } else {
    console.error(
      "muestrameNumeroDeIntento: No se ha encontrado el elemento con id intento"
    );
  }
};

//Cargar el DOM mostrar el valor inicial
document.addEventListener("DOMContentLoaded", muestraNumeroIntentos);
const gestionarGameOver = (estado: Estado) => {
  if (estado === "GAME_OVER") {
    const elementoComprobar = document.getElementById("comprobar");
    if (elementoComprobar && elementoComprobar instanceof HTMLButtonElement) {
      elementoComprobar.disabled = true;
    } else {
      console.error(
        "gestionarGameOver: No se ha encontrado el elemento con id intento"
      );
    }
  }
};

const muestraMensajeDeComprobacion = (texto: string, estado: Estado) => {
  let mensaje: string = "";

  switch (estado) {
    case "NO_ES_UN_NUMERO":
      mensaje = `${texto} no es un número 🤨​, prueba otra vez`;
      break;
    case "EL_NUMERO_ES_MENOR":
      mensaje = `UUUYY! ${texto} es MENOR al número secreto 😏​​, prueba otra vez`;
      break;
    case "EL_NUMERO_ES_MAYOR":
      mensaje = `UUUYY! ${texto} es MAYOR al número secreto 🙄​​​, prueba otra vez`;
      break;
    case "ES_EL_NUMERO_SECRETO":
      mensaje = `¡¡¡Enhorabuena, has acertado el número!!! 🎉🎉🎉​`;
      break;
    case "GAME_OVER":
      mensaje = `¡¡¡GAME OVER 😵​, has superado el máximo de intentos`;
      break;
    default:
      mensaje = "Nose que ha pasado, pero no deberías estas aquí 😰​";
      break;
  }

  const elementoResultado = document.getElementById("resultado");
  if (elementoResultado) {
    elementoResultado.innerHTML = mensaje;
  } else {
    console.error(
      "muestraMensajeComprobación: No se ha encontrafo el elemento con id resultado"
    );
  }
};

const comprobarNumero = (texto: string): Estado => {
  const numero = parseInt(texto);
  const esUnNumero = !isNaN(numero);

  if (!esUnNumero) {
    return "NO_ES_UN_NUMERO";
  }

  if (numero === numeroParaAcertar) {
    return "ES_EL_NUMERO_SECRETO";
  }

  if (hasSuperadoElNumeroMaximoDeIntentos()) {
    return "GAME_OVER";
  }

  //Uso de ternarios para sustituir este condicional
  return numero > numeroParaAcertar
    ? "EL_NUMERO_ES_MAYOR"
    : "EL_NUMERO_ES_MENOR";
};

const handleCompruebaClick = () => {
  let texto: string = "";
  const elementoNumero = document.getElementById("numero");
  if (elementoNumero && elementoNumero instanceof HTMLInputElement) {
    texto = elementoNumero.value;
  } else {
    console.error(
      "muestraMensajeComprobación: No se ha encontrado el elemento con id numero"
    );
  }

  const estado: Estado = comprobarNumero(texto);
  muestraMensajeDeComprobacion(texto, estado);
  numeroDeIntentos++;
  muestraNumeroIntentos();
  gestionarGameOver(estado);
};

const botonComprobar = document.getElementById("comprobar");
botonComprobar?.addEventListener("click", handleCompruebaClick);

// CODIGO EN JAVASCRIPT  ⬇️​

/*
const MAX_INTENTOS = 5;
let numeroDeIntentos = 0;

const hasSuperadoElNumeroMaximoDeIntentos = () => {
  return numeroDeIntentos > MAX_INTENTOS;
};

const muestraNumeroIntentos = () => {
  document.getElementById(
    "intentos"
  ).innerHTML = `${numeroDeIntentos} de ${MAX_INTENTOS}`;
};

//Carga el HTML antes de interactuar con el para evitar errores.
document.addEventListener("DOMContentLoaded", muestraNumeroIntentos);

const gestionarGameOver = (estado) => {
  if (estado === MAX_INTENTOS) {
    document.getElementById("comprobar").disabled = true;
  }
};

//funcion para mostrar texto y resultado
const muestraMensajeDeComprobacion = (texto, estado) => {
  let mensaje = "";

  switch (estado) {
    case NO_ES_UN_NUMERO:
      mensaje = `${texto} no es un número 🤨​, prueba otra vez`;
      break;
    case EL_NUMERO_ES_MENOR:
      mensaje = `UUUYY! ${texto} es MENOR al número secreto 😏​​, prueba otra vez`;
      break;
    case EL_NUMERO_ES_MAYOR:
      mensaje = `UUUYY! ${texto} es MAYOR al número secreto 🙄​​​, prueba otra vez`;
      break;
    case ES_EL_NUMERO_SECRETO:
      mensaje = `¡¡¡Enhorabuena, has acertado el número!!! 🎉🎉🎉​`;
      break;
    case GAME_OVER:
      mensaje = `¡¡¡GAME OVER 😵​, has superado el máximo de intentos`;
      break;
    default:
      mensaje = "Nose que ha pasado, pero no deberías estas aquí 😰​";
      break;
  }

  document.getElementById("resultado").innerHTML = mensaje;
};

//funcion para comprobar si el numero es secreto o no
const comprobarNumero = (texto) => {
  const numero = parseInt(texto);
  const esUnNumero = !isNaN(numero);

  if (!esUnNumero) {
    return NO_ES_UN_NUMERO;
  }

  if (numero === numeroParaAcertar) {
    return ES_EL_NUMERO_SECRETO;
  }

  if (hasSuperadoElNumeroMaximoDeIntentos()) {
    return GAME_OVER;
  }

  //Uso de ternarios para sustituir este condicional
  return numero > numeroParaAcertar ? EL_NUMERO_ES_MAYOR : EL_NUMERO_ES_MENOR;
};

const handleCompruebaClick = () => {
  const texto = document.getElementById("numero").value;
  const estado = comprobarNumero(texto);
  muestraMensajeDeComprobacion(texto, estado);
  numeroDeIntentos++;
  muestraNumeroIntentos();
  gestionarGameOver(numeroDeIntentos);
};

const botonComprobar = document.getElementById("comprobar");
botonComprobar.addEventListener("click", handleCompruebaClick);
*/
