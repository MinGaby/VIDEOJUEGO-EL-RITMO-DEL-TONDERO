const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.tabIndex = 0;
canvas.style.outline = "none";

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarCanvas();

window.addEventListener("resize", ajustarCanvas);

// ==========================
// IMÁGENES
// ==========================

const fondo = new Image();
fondo.src = "assets/img/fondo.png";

const logo = new Image();
logo.src = "assets/img/logo.png";

const bailarina = new Image();
bailarina.src = "assets/img/bailarina.png";

const bailarin = new Image();
bailarin.src = "assets/img/bailarin.png";

// ==========================
// BOTONES
// ==========================

const btnJugarImg = new Image();
btnJugarImg.src = "assets/img/boton_jugar.png";

const btnInstrImg = new Image();
btnInstrImg.src = "assets/img/boton_instrucciones.png";

const btnRankingImg = new Image();
btnRankingImg.src = "assets/img/boton_ranking.png";

const btnSalirImg = new Image();
btnSalirImg.src = "assets/img/boton_salir.png";

// ==========================
// FONDOS
// ==========================

const fondoNivel1 = new Image();
fondoNivel1.src = "assets/img/fondonivel1.jpg";

const fondoNivel2 = new Image();
fondoNivel2.src = "assets/img/fondonivel2.jpg";

const fondoLogin = new Image();
fondoLogin.src = "assets/img/fondo_login.png";

// ==========================
// AUDIO
// ==========================

const musica = document.getElementById("musica");