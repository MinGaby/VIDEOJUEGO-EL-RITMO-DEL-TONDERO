// ==========================
// INSTRUCCIONES
// ==========================

function dibujarInstrucciones() {

    dibujarFondo();

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#FFF8DC";

    ctx.fillRect(
        canvas.width / 2 - 350,
        100,
        700,
        500
    );

    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 8;

    ctx.strokeRect(
        canvas.width / 2 - 350,
        100,
        700,
        500
    );

    ctx.fillStyle = "#8B0000";

    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "¿CÓMO JUGAR?",
        canvas.width / 2,
        170
    );

    ctx.fillStyle = "black";
    ctx.font = "26px Arial";

    ctx.fillText(
        "NIVEL 1: Sigue el ritmo del Tondero",
        canvas.width / 2,
        240
    );

    ctx.fillText(
        "Presiona A (izquierda) o D (derecha)",
        canvas.width / 2,
        285
    );

    ctx.fillText(
        "¡Perfecto! = barra baja → más puntos",
        canvas.width / 2,
        330
    );

    ctx.fillText(
        "5 aciertos seguidos → SECUENCIA TURBO ⚡",
        canvas.width / 2,
        375
    );

    ctx.fillText(
        "NIVEL 2: Mueve el pañuelo con ← ↑ → ↓",
        canvas.width / 2,
        430
    );

    ctx.fillText(
        "Sobrevive 30 segundos",
        canvas.width / 2,
        475
    );

    // ==========================
    // BOTÓN VOLVER
    // ==========================

    botonVolver.x =
        canvas.width / 2 - 125;

    botonVolver.y = 530;

    ctx.fillStyle = "#C0392B";

    ctx.fillRect(
        botonVolver.x,
        botonVolver.y,
        botonVolver.width,
        botonVolver.height
    );

    ctx.fillStyle = "white";

    ctx.font = "bold 35px Arial";

    ctx.fillText(
        "VOLVER",
        canvas.width / 2,
        580
    );
}