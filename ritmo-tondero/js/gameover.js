// ==========================
// GAME OVER NIVEL 1
// ==========================

function dibujarGameOverNivel1() {

    dibujarImagenCompleta(
        fondoNivel1
    );

    ctx.fillStyle =
        "rgba(0,0,0,0.72)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#FF4444";

    ctx.font = "bold 68px Arial";

    ctx.fillText(
        "¡PERDISTE!",
        canvas.width / 2,
        canvas.height / 2 - 100
    );

    ctx.fillStyle = "#FFF8DC";

    ctx.font = "bold 34px Arial";

    ctx.fillText(
        "Puntos conseguidos: " + puntos,
        canvas.width / 2,
        canvas.height / 2 - 20
    );

    ctx.fillText(
        "Necesitabas 150 para avanzar",
        canvas.width / 2,
        canvas.height / 2 + 35
    );

    ctx.fillStyle = "#FFCC55";

    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "Mejor racha: x" + mejorCombo,
        canvas.width / 2,
        canvas.height / 2 + 90
    );

    // ==========================
    // REINTENTAR
    // ==========================

    const bx =
        canvas.width / 2 - 150;

    const by =
        canvas.height / 2 + 140;

    botonReintentar.x = bx;
    botonReintentar.y = by;

    botonReintentar.width = 300;
    botonReintentar.height = 65;

    let gradR =
        ctx.createLinearGradient(
            0,
            by,
            0,
            by + 65
        );

    gradR.addColorStop(0, "#D64545");
    gradR.addColorStop(1, "#8B0000");

    ctx.fillStyle = gradR;

    rectRedondo(
        bx,
        by,
        300,
        65,
        18
    );

    ctx.fill();

    ctx.fillStyle = "white";

    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "REINTENTAR",
        canvas.width / 2,
        by + 43
    );

    // ==========================
    // MENÚ
    // ==========================

    const my = by + 85;

    botonMenuDesdeGameOver.x =
        canvas.width / 2 - 150;

    botonMenuDesdeGameOver.y = my;

    botonMenuDesdeGameOver.width = 300;
    botonMenuDesdeGameOver.height = 65;

    let gradM =
        ctx.createLinearGradient(
            0,
            my,
            0,
            my + 65
        );

    gradM.addColorStop(0, "#444");
    gradM.addColorStop(1, "#222");

    ctx.fillStyle = gradM;

    rectRedondo(
        botonMenuDesdeGameOver.x,
        my,
        300,
        65,
        18
    );

    ctx.fill();

    ctx.fillStyle = "white";

    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "MENÚ PRINCIPAL",
        canvas.width / 2,
        my + 43
    );
}