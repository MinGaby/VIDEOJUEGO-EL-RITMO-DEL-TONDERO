// ==========================
// CREAR ENEMIGO
// ==========================

function crearEnemigo() {

    let x;
    let y;

    const lado = Math.floor(
        Math.random() * 4
    );

    if (lado === 0) {

        x = -80;
        y = Math.random() * canvas.height;

    } else if (lado === 1) {

        x = canvas.width + 80;
        y = Math.random() * canvas.height;

    } else if (lado === 2) {

        x = Math.random() * canvas.width;
        y = -80;

    } else {

        x = Math.random() * canvas.width;
        y = canvas.height + 80;
    }

    return {

        x,
        y,

        width: 90,
        height: 120,

        speed: 3,

        esBailarina:
            Math.random() < 0.5
    };
}
// ==========================
// COLISIONES
// ==========================

function colisiona(a, b) {

    return (

        a.x < b.x + b.width &&
        a.x + a.width > b.x &&

        a.y < b.y + b.height &&
        a.y + a.height > b.y

    );
}
// ==========================
// PAÑUELO
// ==========================

function dibujarPañuelo() {

    ctx.save();

    ctx.translate(
        pañuelo.x,
        pañuelo.y
    );

    ctx.fillStyle = "#FFF8DC";

    ctx.strokeStyle = "#8B0000";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(15,25);

    ctx.quadraticCurveTo(
        40,10,
        70,18
    );

    ctx.quadraticCurveTo(
        100,25,
        125,20
    );

    ctx.quadraticCurveTo(
        135,18,
        140,30
    );

    ctx.quadraticCurveTo(
        135,44,
        120,50
    );

    ctx.quadraticCurveTo(
        90,56,
        70,48
    );

    ctx.quadraticCurveTo(
        40,42,
        15,55
    );

    ctx.quadraticCurveTo(
        8,45,
        10,30
    );

    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// ==========================
// ENEMIGO
// ==========================

function dibujarEnemigo(e) {

    const img =
        e.esBailarina
        ? bailarina
        : bailarin;

    ctx.drawImage(
        img,
        e.x,
        e.y,
        e.width,
        e.height
    );
}
function dibujarHUDNivel2() {

    ctx.fillStyle =
        "rgba(0,0,0,0.45)";

    ctx.fillRect(
        20,
        20,
        canvas.width - 40,
        90
    );

    ctx.fillStyle = "white";

    ctx.font =
        "bold 28px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "⭐ " +
        (puntos + puntosNivel2),
        40,
        60
    );

    ctx.textAlign = "center";

    ctx.fillText(
        "NIVEL 2 - EL PAÑUELO",
        canvas.width / 2,
        60
    );

    ctx.textAlign = "right";

    ctx.fillText(
        "❤️".repeat(vidas),
        canvas.width - 40,
        60
    );

    ctx.textAlign = "left";

    ctx.fillText(
        "⏰ " + tiempoNivel,
        40,
        95
    );
}
// ==========================
// DIBUJAR NIVEL 2
// ==========================

function dibujarNivel2() {

    dibujarImagenCompleta(fondoNivel2);

    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    enemigos.forEach(e => {
        dibujarEnemigo(e);
    });

    dibujarPañuelo();

    dibujarHUDNivel2();

    if (tiempoMensaje > 0) {

        ctx.fillStyle = "#FF4444";

        ctx.font =
            "bold 42px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            mensaje,
            canvas.width / 2,
            160
        );
    }

    ctx.fillStyle = "white";

    ctx.font = "22px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "Usa las flechas para moverte",
        canvas.width / 2,
        canvas.height - 30
    );
}
// ==========================
// UPDATE NIVEL 2
// ==========================

function updateNivel2() {

    // tiempo
    if (frameCount % 60 === 0) {
        tiempoNivel--;
    }

    if (tiempoMensaje > 0) {
        tiempoMensaje--;
    }

    // ==========================
    // MOVIMIENTO DEL PAÑUELO
    // ==========================

    if (teclas.ArrowLeft) {
        pañuelo.x -= pañuelo.speed;
    }

    if (teclas.ArrowRight) {
        pañuelo.x += pañuelo.speed;
    }

    if (teclas.ArrowUp) {
        pañuelo.y -= pañuelo.speed;
    }

    if (teclas.ArrowDown) {
        pañuelo.y += pañuelo.speed;
    }

    pañuelo.x = Math.max(
        0,
        Math.min(canvas.width - pañuelo.width, pañuelo.x)
    );

    pañuelo.y = Math.max(
        0,
        Math.min(canvas.height - pañuelo.height, pañuelo.y)
    );

    // ==========================
    // ESTELA
    // ==========================

    estelaPos.push({
        x: pañuelo.x,
        y: pañuelo.y
    });

    if (estelaPos.length > 8) {
        estelaPos.shift();
    }

    // ==========================
    // PUNTOS POR SOBREVIVIR
    // ==========================

    tiempoSinGolpe++;

    if (tiempoSinGolpe % 60 === 0) {

        multiplicadorN2 = Math.min(
            5,
            1 + Math.floor(tiempoSinGolpe / 300)
        );

        puntosNivel2 += 10 * multiplicadorN2;
    }

    // ==========================
    // SOLO 2 ENEMIGOS MÁXIMO
    // ==========================

    if (
        frameCount % 120 === 0 &&
        enemigos.length < 2
    ) {
        enemigos.push(
            crearEnemigo()
        );
    }

    // ==========================
    // MOVIMIENTO ENEMIGOS
    // ==========================

    for (let i = enemigos.length - 1; i >= 0; i--) {

        let e = enemigos[i];

        let cx = pañuelo.x + pañuelo.width / 2;
        let cy = pañuelo.y + pañuelo.height / 2;

        let ex = e.x + e.width / 2;
        let ey = e.y + e.height / 2;

        let dx = cx - ex;
        let dy = cy - ey;

        let dist = Math.hypot(dx, dy);

        if (dist === 0) {
            dist = 1;
        }

        // enemigo normal
        e.x += (dx / dist) * e.speed;
        e.y += (dy / dist) * e.speed;

        // colisión
        if (colisiona(e, pañuelo)) {

            vidas--;

            tiempoSinGolpe = 0;
            multiplicadorN2 = 1;

            mensaje = "¡Cuidado!";
            tiempoMensaje = 40;

            enemigos.splice(i, 1);
        }
    }

    // ==========================
    // FIN DEL JUEGO
    // ==========================

    if (vidas <= 0) {

        musica.pause();
        musica.currentTime = 0;

        resultadoJuego = "derrota";

        estado = "resultado";
    }

    if (tiempoNivel <= 0) {

        guardarPuntos();

        musica.pause();
        musica.currentTime = 0;

        resultadoJuego = "victoria";

        estado = "resultado";
    }
}


// ==========================
// REINICIAR NIVEL 2
// ==========================

function reiniciarNivel2() {

    // NO reiniciar puntos
    vidas = 3;

    tiempoNivel = 30;

    frameCount = 0;

    mensaje = "";
    tiempoMensaje = 0;

    enemigos = [];

    puntosNivel2 = 0;

    multiplicadorN2 = 1;

    tiempoSinGolpe = 0;

    estelaPos = [];

    teclas.ArrowLeft = false;
    teclas.ArrowRight = false;
    teclas.ArrowUp = false;
    teclas.ArrowDown = false;

    pañuelo.x = canvas.width / 2 - 70;
    pañuelo.y = canvas.height / 2 - 40;

    pañuelo.width = 140;
    pañuelo.height = 80;

    pañuelo.speed = 8;
}
// ==========================
// PANTALLA FINAL
// ==========================

function dibujarPantallaFinal() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#FFF8DC";

    ctx.font = "bold 54px Arial";

    ctx.fillText(
        resultadoJuego === "victoria"
            ? "¡Felicidades!"
            : "¡Has perdido!",
        canvas.width / 2,
        canvas.height / 2 - 80
    );

    ctx.font = "28px Arial";

    ctx.fillText(
        resultadoJuego === "victoria"
            ? "Completaste el Nivel 2 del Tondero"
            : "No lograste sobrevivir",
        canvas.width / 2,
        canvas.height / 2 - 10
    );

    if (resultadoJuego === "victoria") {

            ctx.fillStyle = "#FFD700";

            ctx.font = "bold 32px Arial";

            ctx.fillText(
                "Puntos totales: " +
                (puntos + puntosNivel2),
                canvas.width / 2,
                canvas.height / 2 + 50
            );
        
    }

    ctx.fillStyle = "rgba(255,255,255,0.7)";

    ctx.font = "24px Arial";

    ctx.fillText(
        "Haz clic para volver al menú",
        canvas.width / 2,
        canvas.height / 2 + 110
    );
}