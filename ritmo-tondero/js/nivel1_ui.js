// ==========================
// NIVEL 1
// DIBUJO HUD
// ==========================

function dibujarHUD() {

    ctx.save();

    ctx.fillStyle =
        "rgba(0,0,0,0.45)";

    rectRedondo(
        20,
        14,
        canvas.width - 40,
        72,
        18
    );

    ctx.fill();

    ctx.restore();

    ctx.fillStyle = "#FFF8DC";
    ctx.font = "bold 28px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "⭐ " + puntos,
        44,
        58
    );

    ctx.textAlign = "center";

    ctx.fillText(
        "NIVEL 1 — El Ritmo del Cajón",
        canvas.width / 2,
        58
    );

    ctx.textAlign = "right";

    ctx.fillText(
        "❤️ ".repeat(vidas),
        canvas.width - 44,
        58
    );

    ctx.fillStyle =
        tiempoNivel <= 10
            ? "#FF4444"
            : "#FFF8DC";

    ctx.font = "bold 24px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "⏰ " + tiempoNivel + "s",
        44,
        90
    );

    if (combo >= 2) {

        ctx.save();

        ctx.globalAlpha =
            0.6 +
            Math.sin(animacion * 8) * 0.4;

        ctx.fillStyle = "#FFD700";

        ctx.font = "bold 26px Arial";

        ctx.textAlign = "right";

        ctx.fillText(
            "🔥 x" + combo + " COMBO",
            canvas.width - 44,
            90
        );

        ctx.restore();
    }
}

// ==========================
// BARRA DE RITMO
// ==========================

function dibujarBarraRitmo() {

    const bx =
        canvas.width / 2 -
        BARRA_W / 2;

    const by =
        canvas.height - 80;

    ctx.save();

    ctx.fillStyle =
        "rgba(0,0,0,0.55)";

    rectRedondo(
        bx - 6,
        by - 6,
        BARRA_W + 12,
        BARRA_H + 12,
        18
    );

    ctx.fill();

    ctx.restore();

    const pct = barraProgreso;

    let colorBarra =
        pct > 0.6
            ? "#00CC66"
            : pct > 0.3
            ? "#FFAA00"
            : "#FF3333";

    ctx.save();

    ctx.beginPath();

    rectRedondo(
        bx,
        by,
        BARRA_W,
        BARRA_H,
        12
    );

    ctx.clip();

    ctx.fillStyle =
        "rgba(255,255,255,0.1)";

    ctx.fillRect(
        bx,
        by,
        BARRA_W,
        BARRA_H
    );

    ctx.fillStyle = colorBarra;

    ctx.fillRect(
        bx,
        by,
        BARRA_W * pct,
        BARRA_H
    );

    ctx.restore();

    // zona perfecta

    const zonaPerfX =
        bx + BARRA_W * 0.18;

    ctx.save();

    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;

    ctx.setLineDash([6,4]);

    ctx.beginPath();

    ctx.moveTo(
        zonaPerfX,
        by - 4
    );

    ctx.lineTo(
        zonaPerfX,
        by + BARRA_H + 4
    );

    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle = "#FFD700";

    ctx.font = "bold 13px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        "⭐ PERFECTO",
        bx + 4,
        by - 8
    );

    ctx.restore();

    ctx.strokeStyle =
        "rgba(255,255,255,0.4)";

    ctx.lineWidth = 2;

    rectRedondo(
        bx,
        by,
        BARRA_W,
        BARRA_H,
        12
    );

    ctx.stroke();

    ctx.fillStyle =
        "rgba(255,255,255,0.75)";

    ctx.font = "16px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "RITMO — presiona cuando la barra esté baja",
        canvas.width / 2,
        by + BARRA_H + 22
    );
}
function dibujarNivel1Superado() {

    dibujarImagenCompleta(fondoNivel1);

    // Oscurecer fondo
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";

    // Título

    ctx.fillStyle = "#00FF88";
    ctx.font = "bold 80px Arial";

    ctx.fillText(
        "¡NIVEL SUPERADO!",
        canvas.width / 2,
        170
    );

    // Puntaje

    ctx.fillStyle = "#FFF8DC";
    ctx.font = "bold 44px Arial";

    ctx.fillText(
        "Puntos conseguidos: " + puntos,
        canvas.width / 2,
        280
    );

    // Mensaje

    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 50px Arial";

    ctx.fillText(
        "Pasaste al Nivel 2",
        canvas.width / 2,
        380
    );

    // =====================
    // BOTÓN PASAR NIVEL 2
    // =====================

    botonNivel2.x =
        canvas.width / 2 - 160;

    botonNivel2.y = 450;

    ctx.beginPath();

    ctx.fillStyle = "#00AA55";

    rectRedondo(
        botonNivel2.x,
        botonNivel2.y,
        botonNivel2.width,
        botonNivel2.height,
        15
    );

    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "PASAR AL NIVEL 2",
        canvas.width / 2,
        botonNivel2.y + 45
    );

    // =====================
    // BOTÓN REINTENTAR
    // =====================

    botonReintentar.x =
        canvas.width / 2 - 150;

    botonReintentar.y = 540;

    ctx.beginPath();

    ctx.fillStyle = "#1E90FF";

    rectRedondo(
        botonReintentar.x,
        botonReintentar.y,
        botonReintentar.width,
        botonReintentar.height,
        15
    );

    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "REINTENTAR",
        canvas.width / 2,
        botonReintentar.y + 42
    );

    // =====================
    // BOTÓN MENÚ PRINCIPAL
    // =====================

    botonMenuDesdeGameOver.x =
        canvas.width / 2 - 150;

    botonMenuDesdeGameOver.y = 620;

    ctx.beginPath();

    ctx.fillStyle = "#C0392B";

    rectRedondo(
        botonMenuDesdeGameOver.x,
        botonMenuDesdeGameOver.y,
        botonMenuDesdeGameOver.width,
        botonMenuDesdeGameOver.height,
        15
    );

    ctx.fill();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 24px Arial";

    ctx.fillText(
        "MENÚ PRINCIPAL",
        canvas.width / 2,
        botonMenuDesdeGameOver.y + 42
    );
}
// ==========================
// FLECHA
// ==========================

function dibujarFlecha() {

    const cx =
        canvas.width / 2;

    const cy =
        canvas.height / 2 + 20;

    const pulso =
        1 +
        (1 - barraProgreso) * 0.25;

    if (barraProgreso < 0.18) {

        ctx.save();

        ctx.globalAlpha =
            0.25 +
            Math.sin(animacion * 12) * 0.15;

        ctx.fillStyle = "#FFD700";

        ctx.beginPath();

        ctx.arc(
            cx,
            cy - 40,
            115,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }

    ctx.save();

    ctx.shadowColor =
        colorPorNivelMensaje(
            nivelMensaje
        );

    ctx.shadowBlur =
        nivelMensaje
            ? 40
            : 15;

    ctx.font =
        `bold ${Math.round(
            140 * pulso
        )}px Arial`;

    ctx.textAlign = "center";

    if (
        turboActivo ||
        enSecuenciaTurbo
    ) {

        ctx.globalAlpha =
            0.7 +
            Math.sin(animacion * 20) * 0.3;

        ctx.fillStyle = "#FFD700";

    } else if (
        nivelMensaje === "perfecto"
    ) {

        ctx.fillStyle = "#FFD700";

    } else if (
        nivelMensaje === "bien"
    ) {

        ctx.fillStyle = "#00FF88";

    } else if (
        nivelMensaje === "fallo"
    ) {

        ctx.fillStyle = "#FF3333";

    } else {

        ctx.fillStyle = "white";
    }

    ctx.fillText(
        flechaActual === "A"
            ? "⬅"
            : "➡",
        cx,
        cy + 50
    );

    ctx.restore();

    ctx.fillStyle =
        "rgba(255,255,255,0.55)";

    ctx.font =
        "bold 28px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "Presiona " +
        (
            flechaActual === "A"
                ? "[ A ]"
                : "[ D ]"
        ),
        cx,
        cy + 110
    );
}

// ==========================
// FEEDBACK
// ==========================

function dibujarMensajeFeedback() {

    if (
        !nivelMensaje ||
        tiempoMensaje <= 0
    ) return;

    const alpha =
        tiempoMensaje / 55;

    const escala =
        1 +
        (1 - alpha) * 0.15;

    ctx.save();

    ctx.globalAlpha =
        alpha;

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2 - 100
    );

    ctx.scale(
        escala,
        escala
    );

    ctx.textAlign = "center";

    if (
        nivelMensaje === "perfecto"
    ) {

        ctx.font =
            "bold 60px Arial";

        ctx.fillStyle =
            "#FFD700";

        ctx.fillText(
            "¡PERFECTO!",
            0,
            0
        );

        ctx.font =
            "bold 28px Arial";

        ctx.fillStyle =
            "#FFEE88";

        ctx.fillText(
            "+" + ultimoPuntaje,
            0,
            44
        );

    } else if (
        nivelMensaje === "bien"
    ) {

        ctx.font =
            "bold 52px Arial";

        ctx.fillStyle =
            "#00FF88";

        ctx.fillText(
            "¡BIEN!",
            0,
            0
        );

        ctx.font =
            "bold 28px Arial";

        ctx.fillStyle =
            "#88FFCC";

        ctx.fillText(
            "+" + ultimoPuntaje,
            0,
            44
        );

    } else if (
        nivelMensaje === "fallo"
    ) {

        ctx.font =
            "bold 52px Arial";

        ctx.fillStyle =
            "#FF3333";

        ctx.fillText(
            "¡FALLASTE!",
            0,
            0
        );
    }

    ctx.restore();
}

// ==========================
// BAILARINES
// ==========================

function dibujarBailarines() {

    const ampBase = 12;
    const ampCombo = Math.min(combo * 3, 30);

    const amplitud =
        ampBase + ampCombo;

    const velocidad =
        (turboActivo || enSecuenciaTurbo)
            ? 6
            : 4;

    const movBailarina =
        Math.sin(animacion * velocidad)
        * amplitud;

    const movBailarin =
        Math.cos(animacion * velocidad)
        * amplitud;

    if (combo >= 2) {

        const intensidad =
            Math.min(
                (combo - 1) * 0.03,
                0.22
            );

        ctx.save();

        ctx.globalAlpha =
            intensidad;

        ctx.fillStyle =
            "#FFD700";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.restore();
    }

    if (brilloCombo > 0) {

        ctx.save();

        ctx.globalAlpha =
            brilloCombo * 0.18;

        ctx.fillStyle =
            "#FFD700";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.restore();

        brilloCombo =
            Math.max(
                0,
                brilloCombo - 0.015
            );
    }

    const baseY =
        canvas.height / 2 - 120;

    ctx.save();

    ctx.shadowColor =
        "rgba(0,0,0,0.4)";

    ctx.shadowBlur = 20;

    ctx.drawImage(
        bailarina,
        80,
        baseY + movBailarina,
        300,
        380
    );

    ctx.drawImage(
        bailarin,
        canvas.width - 380,
        baseY + movBailarin,
        300,
        380
    );

    ctx.restore();
}

// ==========================
// TURBO
// ==========================

function dibujarIndicadorTurbo() {

    if (
        !turboActivo &&
        !enSecuenciaTurbo
    ) return;

    ctx.save();

    ctx.globalAlpha =
        0.7 +
        Math.sin(animacion * 15)
        * 0.3;

    ctx.fillStyle =
        "#FFD700";

    ctx.font =
        "bold 32px Arial";

    ctx.textAlign =
        "center";

    if (enSecuenciaTurbo) {

        ctx.fillText(
            "⚡ SECUENCIA RÁPIDA — flecha "
            + (indiceSecuencia + 1)
            + " de "
            + secuenciaTurbo.length,
            canvas.width / 2,
            140
        );

    } else {

        ctx.fillText(
            "⚡ MODO TURBO — "
            + turboCount
            + " restantes",
            canvas.width / 2,
            140
        );
    }

    ctx.restore();
}

// ==========================
// DIBUJAR NIVEL 1
// ==========================

function dibujarNivel1() {

    dibujarImagenCompleta(
        fondoNivel1
    );

    ctx.fillStyle =
        "rgba(0,0,0,0.52)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    dibujarBailarines();

    ctx.fillStyle =
        "rgba(255,255,255,0.10)";

    rectRedondo(
        canvas.width / 2 - 200,
        canvas.height / 2 - 130,
        400,
        300,
        24
    );

    ctx.fill();

    ctx.strokeStyle =
        "rgba(255,255,255,0.18)";

    ctx.lineWidth = 2;

    rectRedondo(
        canvas.width / 2 - 200,
        canvas.height / 2 - 130,
        400,
        300,
        24
    );

    ctx.stroke();

    dibujarFlecha();

    dibujarBarraRitmo();

    dibujarHUD();

    dibujarParticulas();

    dibujarMensajeFeedback();

    dibujarIndicadorTurbo();

    botonVolverNivel.x =
        canvas.width - 220;

    botonVolverNivel.y =
        30;

    const gradiente =
        ctx.createLinearGradient(
            0,
            botonVolverNivel.y,
            0,
            botonVolverNivel.y +
            botonVolverNivel.height
        );

    gradiente.addColorStop(
        0,
        "#D64545"
    );

    gradiente.addColorStop(
        1,
        "#8B0000"
    );

    ctx.save();

    ctx.shadowColor =
        "rgba(0,0,0,0.4)";

    ctx.shadowBlur = 10;

    ctx.fillStyle =
        gradiente;

    rectRedondo(
        botonVolverNivel.x,
        botonVolverNivel.y,
        botonVolverNivel.width,
        botonVolverNivel.height,
        15
    );

    ctx.fill();

    ctx.restore();

    ctx.fillStyle =
        "white";

    ctx.font =
        "bold 24px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "← Volver",
        botonVolverNivel.x +
        botonVolverNivel.width / 2,
        botonVolverNivel.y + 38
    );
}