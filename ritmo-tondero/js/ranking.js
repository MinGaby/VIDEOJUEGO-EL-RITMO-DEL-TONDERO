function dibujarRanking() {

    dibujarFondo();

    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#FFD700";

    ctx.font = "bold 54px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "🏆 RANKING 🏆",
        canvas.width / 2,
        80
    );

    ctx.fillStyle = "#FFF8DC";
    ctx.font = "28px Arial";

    let y = 170;

    rankingData.forEach((j) => {

        let medalla = "";

        if (j.posicion === 1) medalla = "🥇";
        if (j.posicion === 2) medalla = "🥈";
        if (j.posicion === 3) medalla = "🥉";

        ctx.fillText(
            medalla +
            " " +
            j.posicion +
            ". " +
            j.usuario +
            " - " +
            j.puntos +
            " pts",
            canvas.width / 2,
            y
        );

        y += 50;
    });

    // BOTÓN VOLVER

    botonVolver.x =
        canvas.width / 2 - 125;

    botonVolver.y =
        canvas.height - 120;

    botonVolver.width = 250;
    botonVolver.height = 70;

    ctx.fillStyle = "#8B0000";

    rectRedondo(
        botonVolver.x,
        botonVolver.y,
        botonVolver.width,
        botonVolver.height,
        15
    );

    ctx.fill();

    ctx.fillStyle = "white";

    ctx.font = "bold 30px Arial";

    ctx.fillText(
        "VOLVER",
        canvas.width / 2,
        canvas.height - 75
    );
}