// ==========================
// MENÚ PRINCIPAL
// ==========================

function dibujarMenu() {

    dibujarFondo();

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // ==========================
    // LOGO
    // ==========================

    ctx.shadowColor = "black";
    ctx.shadowBlur = 30;

    ctx.drawImage(
        logo,
        canvas.width / 2 - 350,
        20,
        700,
        260
    );

    ctx.shadowBlur = 0;

    // ==========================
    // BAILARINES
    // ==========================

    const movimiento =
        Math.sin(animacion) * 8;

    ctx.shadowColor = "black";
    ctx.shadowBlur = 30;

    ctx.drawImage(
        bailarina,
        170,
        260 + movimiento,
        380,
        460
    );

    ctx.drawImage(
        bailarin,
        canvas.width - 550,
        260 + movimiento,
        380,
        460
    );

    ctx.shadowBlur = 0;

    // ==========================
    // BOTONES
    // ==========================

    const anchoBoton = 420;
    const altoBoton = 90;

    const inicioY = 300;
    const separacion = 110;

    // JUGAR

    botonJugar.x =
        canvas.width / 2 - anchoBoton / 2;

    botonJugar.y = inicioY;

    botonJugar.width = anchoBoton;
    botonJugar.height = altoBoton;

    // INSTRUCCIONES

    botonInstr.x =
        canvas.width / 2 - anchoBoton / 2;

    botonInstr.y =
        inicioY + separacion;

    botonInstr.width = anchoBoton;
    botonInstr.height = altoBoton;

    // RANKING

    botonRanking.x =
        canvas.width / 2 - anchoBoton / 2;

    botonRanking.y =
        inicioY + separacion * 2;

    botonRanking.width = anchoBoton;
    botonRanking.height = altoBoton;

    // SALIR

    botonSalir.x =
        canvas.width / 2 - anchoBoton / 2;

    botonSalir.y =
        inicioY + separacion * 3;

    botonSalir.width = anchoBoton;
    botonSalir.height = altoBoton;

    // ==========================
    // DIBUJAR BOTONES
    // ==========================

    ctx.drawImage(
        btnJugarImg,
        botonJugar.x,
        botonJugar.y,
        botonJugar.width,
        botonJugar.height
    );

    ctx.drawImage(
        btnInstrImg,
        botonInstr.x,
        botonInstr.y,
        botonInstr.width,
        botonInstr.height
    );

    ctx.drawImage(
        btnRankingImg,
        botonRanking.x,
        botonRanking.y,
        botonRanking.width,
        botonRanking.height
    );

    ctx.drawImage(
        btnSalirImg,
        botonSalir.x,
        botonSalir.y,
        botonSalir.width,
        botonSalir.height
    );

    // ==========================
    // USUARIO LOGUEADO
    // ==========================

    if (usuarioActual) {

        ctx.fillStyle = "#FFF8DC";

        ctx.font = "18px Arial";

        ctx.textAlign = "left";

        ctx.fillText(
            "👤 " + usuarioActual.usuario,
            44,
            40
        );
    }
}