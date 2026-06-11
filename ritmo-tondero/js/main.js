// ==========================
// CONTROL DEL GAME LOOP
// ==========================

let animationFrameId = null;

function detenerGameLoop() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function iniciarGameLoop() {
    detenerGameLoop();
    gameLoop();
}

// ==========================
// UPDATE PRINCIPAL
// ==========================

function update() {

    animacion += 0.04;
    frameCount++;

    if (estado === "nivel1") {
        updateNivel1();
    }

    if (estado === "nivel2") {
        updateNivel2();
    }
}

// ==========================
// DRAW PRINCIPAL
// ==========================

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (estado) {

        case "login":
            dibujarLogin();
            break;

        case "menu":
            dibujarMenu();
            break;

        case "instrucciones":
            dibujarInstrucciones();
            break;

        case "nivel1":
            dibujarNivel1();
            break;

        case "gameOverNivel1":
            dibujarGameOverNivel1();
            break;
        case "nivel1Superado":
            dibujarNivel1Superado();
            break;

        case "nivel2":
            dibujarNivel2();
            break;

        case "resultado":
            dibujarPantallaFinal();
            break;
        case "ranking":
            dibujarRanking();
            break;
    }

    dibujarNotificacion();
}

// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    update();
    draw();

    animationFrameId = requestAnimationFrame(gameLoop);
}

// ==========================
// EVENTOS CLICK
// ==========================

canvas.addEventListener("click", function (e) {

    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    canvas.focus();

    // LOGIN

if (estado === "login") {

    if (
        estaSobreInput(
            mouseX,
            mouseY,
            inputUsuario
        )
    ) {
        campoActivo = "usuario";
    }

    else if (
        estaSobreInput(
            mouseX,
            mouseY,
            inputPassword
        )
    ) {
        campoActivo = "password";
    }

    else if (
        enRegistro &&
        estaSobreInput(
            mouseX,
            mouseY,
            inputPasswordConfirm
        )
    ) {
        campoActivo = "passwordConfirm";
    }

    // BOTÓN INGRESAR

    if (
        estaSobreBoton(
            mouseX,
            mouseY,
            botonIngresar
        )
    ) {

        if (!camposLoginValidos()) {

            mostrarNotificacion(
                "Completa todos los campos",
                "#FF4444"
            );

            return;
        }

        if (enRegistro) {

            registrarUsuario();

        } else {

            iniciarSesion();
        }

        return;
    }

    // BOTÓN REGISTRAR / VOLVER

    if (
        estaSobreBoton(
            mouseX,
            mouseY,
            botonRegistrar
        )
    ) {

        enRegistro = !enRegistro;

        password = "";
        passwordConfirm = "";

        return;
    }

    return;
}
    // MENU
    if (estado === "menu") {

        if (estaSobreBoton(mouseX, mouseY, botonJugar)) {

            musica.currentTime = 0;
            musica.play();

            reiniciarNivel1();

            estado = "nivel1";

            return;
        }

        if (estaSobreBoton(mouseX, mouseY, botonInstr)) {
            estado = "instrucciones";
            return;
        }

        if (estaSobreBoton(mouseX, mouseY, botonRanking)) {

            cargarRanking();

            return;
        }

        if (estaSobreBoton(mouseX, mouseY, botonSalir)) {

            musica.pause();
            musica.currentTime = 0;

            usuarioActual = null;

            estado = "login";

            return;
        }
    }
// NIVEL 1
if (estado === "nivel1") {

    if (
        estaSobreBoton(
            mouseX,
            mouseY,
            botonVolverNivel
        )
    ) {

        musica.pause();
        musica.currentTime = 0;

        estado = "menu";

        return;
    }
}

if (estado === "nivel1Superado") {

    if (
        estaSobreBoton(
            mouseX,
            mouseY,
            botonNivel2
        )
    ) {

        pasarNivel2();

        return;
    }

    if (
        estaSobreBoton(
            mouseX,
            mouseY,
            botonReintentar
        )
    ) {

        reiniciarNivel1();

        estado = "nivel1";

        return;
    }

    if (
        estaSobreBoton(
            mouseX,
            mouseY,
            botonMenuDesdeGameOver
        )
    ) {

        estado = "menu";

        return;
    }
}
    // INSTRUCCIONES
    if (estado === "instrucciones") {

        if (estaSobreBoton(mouseX, mouseY, botonVolver)) {
            estado = "menu";
        }

        return;
    }
    if (estado === "ranking") {

        if (
            estaSobreBoton(
                mouseX,
                mouseY,
                botonVolver
            )
        ) {

            estado = "menu";
        }

        return;
    }
    



    // GAME OVER NIVEL 1
    if (estado === "gameOverNivel1") {

        if (estaSobreBoton(mouseX, mouseY, botonReintentar)) {

            reiniciarNivel1();

            musica.currentTime = 0;
            musica.play();

            estado = "nivel1";

            return;
        }

        if (
            estaSobreBoton(
                mouseX,
                mouseY,
                botonMenuDesdeGameOver
            )
        ) {

            estado = "menu";

            return;
        }
    }

    // RESULTADO FINAL
    if (estado === "resultado") {

        estado = "menu";

        resultadoJuego = "";

        return;
    }
});

// ==========================
// EVENTOS TECLADO
// ==========================

document.addEventListener("keydown", function (e) {

    // NIVEL 2
    if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
    ) {

        teclas[e.key] = true;

        e.preventDefault();
    }

    // LOGIN
    if (estado === "login") {

        if (e.key === "Backspace") {

            if (campoActivo === "usuario") {
                usuario = usuario.slice(0, -1);
            }

            else if (campoActivo === "password") {
                password = password.slice(0, -1);
            }

            else if (campoActivo === "passwordConfirm") {
                passwordConfirm =
                    passwordConfirm.slice(0, -1);
            }

            return;
        }

        if (e.key.length === 1) {

            if (campoActivo === "usuario") {
                usuario += e.key;
            }

            else if (campoActivo === "password") {
                password += e.key;
            }

            else if (campoActivo === "passwordConfirm") {
                passwordConfirm += e.key;
            }
        }

        return;
    }

    // NIVEL 1
    if (estado === "nivel1") {
        procesarTeclaNivel1(e.key);
    }
});

// ==========================
// KEY UP
// ==========================

document.addEventListener("keyup", function (e) {

    if (teclas.hasOwnProperty(e.key)) {
        teclas[e.key] = false;
    }
});

// ==========================
// INICIO DEL JUEGO
// ==========================

window.onload = function () {

    if (fondo.complete) {

        detenerGameLoop();
        gameLoop();

    } else {

        fondo.onload = () => {

            detenerGameLoop();
            gameLoop();
        };
    }
};