// ==========================
// NIVEL 1
// HELPERS
// ==========================

function reiniciarNivel1() {

    puntos = 0;
    vidas = 3;

    combo = 0;

    tiempoNivel = 60;

    frameCount = 0;

    tiempoMensaje = 0;

    velocidadNivel = 60;
    tiempoFlecha = 0;

    flechaActual = sortearFlecha();

    ventanaTiming = velocidadNivel;

    esperandoInput = true;
    inputRegistrado = false;

    nivelMensaje = "";

    contadorRacha = 0;

    turboActivo = false;
    turboCount = 0;

    brilloCombo = 0;

    particulas = [];

    barraProgreso = 1.0;

    ultimoPuntaje = 0;

    mejorCombo = 0;

    secuenciaTurbo = [];
    indiceSecuencia = 0;

    enSecuenciaTurbo = false;
}

function sortearFlecha() {
    return Math.random() < 0.5 ? "A" : "D";
}

// ==========================
// UTILIDADES
// ==========================

function perderVida() {

    vidas--;

    combo = 0;
    contadorRacha = 0;

    turboActivo = false;
    turboCount = 0;

    enSecuenciaTurbo = false;
    secuenciaTurbo = [];
}

function efectoFallo() {

    spawnParticulas(
        canvas.width / 2,
        canvas.height / 2,
        "#FF3333",
        10
    );
}

function gameOverNivel1() {

    musica.pause();
    musica.currentTime = 0;

    mejorCombo = Math.max(
        mejorCombo,
        combo
    );

    if (puntos >= 150) {

        estado = "nivel1Superado";

    } else {

        estado = "gameOverNivel1";
    }
}


function pasarNivel2() {

    console.log("ENTRE A pasarNivel2");

    reiniciarNivel2();

    musica.currentTime = 0;
    musica.play();

    estado = "nivel2";

    console.log("ESTADO:", estado);
}

// ==========================
// PROCESAR TECLAS NIVEL 1
// ==========================

function procesarTeclaNivel1(tecla) {

    tecla = tecla.toUpperCase();

    if (!esperandoInput) {
        return;
    }

    const correcta =
        (flechaActual === "A" && tecla === "A") ||
        (flechaActual === "D" && tecla === "D");

    if (correcta) {

        esperandoInput = false;

        puntos += 10;

        combo++;

        mejorCombo = Math.max(
            mejorCombo,
            combo
        );

        ultimoPuntaje = 10;

        nivelMensaje = "bien";
        tiempoMensaje = 55;

        spawnParticulas(
            canvas.width / 2,
            canvas.height / 2,
            "#00FF88",
            12
        );

        _nuevaFlecha();

    } else {

        _registrarFallo();

        if (vidas > 0) {
            _nuevaFlecha();
        }
    }
}
// ==========================
// UPDATE NIVEL 1
// ==========================

function updateNivel1() {

    if (frameCount % 60 === 0) {
        tiempoNivel--;
    }

    if (tiempoMensaje > 0) {
        tiempoMensaje--;
    }

    if (tiempoMensaje === 0) {
        nivelMensaje = "";
    }

    actualizarParticulas();

    if (enSecuenciaTurbo) {

        velocidadNivel = 20;

    } else if (turboActivo) {

        velocidadNivel = 28;

    } else {

        velocidadNivel = Math.max(
            22,
            60 - Math.floor(puntos / 12)
        );
    }

    tiempoFlecha++;

    ventanaTiming =
        velocidadNivel - tiempoFlecha;

    barraProgreso = Math.max(
        0,
        ventanaTiming / velocidadNivel
    );

        if (tiempoFlecha >= velocidadNivel) {

            if (esperandoInput) {

                _registrarFallo();

                if (vidas <= 0) {
                    return;
                }
            }

            _nuevaFlecha();
        }
    if (tiempoNivel <= 0) {
        _terminarNivel1();
    }
}

// ==========================
// REGISTRAR FALLO
// ==========================

function _registrarFallo() {

    perderVida();

    nivelMensaje = "fallo";
    tiempoMensaje = 55;

    efectoFallo();

    if (vidas <= 0) {
        gameOverNivel1();
    }
}

// ==========================
// NUEVA FLECHA
// ==========================

function _nuevaFlecha() {

    tiempoFlecha = 0;

    esperandoInput = true;
    inputRegistrado = false;

    if (enSecuenciaTurbo) {

        indiceSecuencia++;

        if (
            indiceSecuencia >=
            secuenciaTurbo.length
        ) {

            enSecuenciaTurbo = false;

            secuenciaTurbo = [];

            indiceSecuencia = 0;

            flechaActual =
                sortearFlecha();

        } else {

            flechaActual =
                secuenciaTurbo[
                    indiceSecuencia
                ];
        }

        return;
    }

    flechaActual = sortearFlecha();

    if (turboActivo) {

        turboCount--;

        if (turboCount <= 0) {
            turboActivo = false;
        }
    }
}

// ==========================
// SECUENCIA TURBO
// ==========================

function _lanzarSecuenciaTurbo() {

    secuenciaTurbo = [
        sortearFlecha(),
        sortearFlecha(),
        sortearFlecha()
    ];

    indiceSecuencia = 0;

    enSecuenciaTurbo = true;

    flechaActual =
        secuenciaTurbo[0];

    tiempoFlecha = 0;

    esperandoInput = true;
    inputRegistrado = false;

    spawnParticulas(
        canvas.width / 2,
        canvas.height / 2,
        "#FFD700",
        25
    );

    spawnParticulas(
        canvas.width / 2,
        canvas.height / 2,
        "#FFF8DC",
        15
    );
}

// ==========================
// TERMINAR NIVEL 1
// ==========================

function _terminarNivel1() {

    console.log("FIN NIVEL 1");
    console.log("PUNTOS:", puntos);

    if (puntos >= 150) {

        console.log("PASANDO A NIVEL 2");

        pasarNivel2();

    } else {

        console.log("GAME OVER");

        gameOverNivel1();
    }
}

