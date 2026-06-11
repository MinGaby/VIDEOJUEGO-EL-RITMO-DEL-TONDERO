
// ==========================
// ESTADOS
// ==========================

let estado = "login";
let animacion = 0;
let frameCount = 0;
let resultadoJuego = "";

// ==========================
// LOGIN
// ==========================

let usuario = "";
let password = "";
let passwordConfirm = "";
let campoActivo = "usuario";
let enRegistro = false;

let usuarioActual = null;

// ==========================
// NOTIFICACIONES
// ==========================

let notificacion = {
    texto: "",
    timer: 0,
    color: "#FFF8DC",
    callback: null
};

// ==========================
// NIVEL 1
// ==========================

let puntos = 0;
let vidas = 3;

let flechaActual = "A";

let tiempoNivel = 60;

let combo = 0;
let tiempoMensaje = 0;

let velocidadNivel = 60;
let tiempoFlecha = 0;

let ventanaTiming = 0;
let esperandoInput = true;
let inputRegistrado = false;

let nivelMensaje = "";
let ultimoPuntaje = 0;

let contadorRacha = 0;

let turboActivo = false;
let turboCount = 0;

let brilloCombo = 0;

let particulas = [];

let barraProgreso = 1.0;

let mejorCombo = 0;

let secuenciaTurbo = [];
let indiceSecuencia = 0;
let enSecuenciaTurbo = false;

// ==========================
// NIVEL 2
// ==========================

let teclas = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
};

let pañuelo = {
    x: 0,
    y: 0,
    width: 140,
    height: 80,
    speed: 8
};

let enemigos = [];

let mensaje = "";

let puntosNivel2 = 0;
let multiplicadorN2 = 1;

let tiempoSinGolpe = 0;

let estelaPos = [];

let rankingData = [];

// ==========================
// CONSTANTES
// ==========================

const BARRA_W = 420;
const BARRA_H = 28;

// ==========================
// BOTONES
// ==========================

const botonJugar = {
    x:0,y:0,width:520,height:120
};

const botonInstr = {
    x:0,y:0,width:520,height:120
};

const botonRanking = {
    x:0,y:0,width:520,height:120
};

const botonSalir = {
    x:0,y:0,width:520,height:120
};

const botonVolver = {
    x:0,y:0,width:250,height:80
};

const botonVolverNivel = {
    x:0,y:0,width:180,height:60
};

const botonIngresar = {
    x:0,y:0,width:300,height:90
};

const botonRegistrar = {
    x:0,y:0,width:300,height:80
};

const botonReintentar = {
    x:0,y:0,width:300,height:65
};

const botonMenuDesdeGameOver = {
    x:0,y:0,width:300,height:65
};

const botonNivel2 = {
    x:0,
    y:0,
    width:320,
    height:70
};

// ==========================
// INPUTS
// ==========================

const inputUsuario = {
    x:0,
    y:0,
    width:400,
    height:60
};

const inputPassword = {
    x:0,
    y:0,
    width:400,
    height:60
};

const inputPasswordConfirm = {
    x:0,
    y:0,
    width:400,
    height:60
};