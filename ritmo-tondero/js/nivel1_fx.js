function colorPorNivelMensaje(tipo) {

    const colores = {
        perfecto: "#FFD700",
        bien: "#00FF88",
        fallo: "#FF3333"
    };

    return colores[tipo] || "white";
}

function spawnParticulas(x, y, color, cantidad) {

    for (let i = 0; i < cantidad; i++) {

        particulas.push({
            x,
            y,
            color,

            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 1.5) * 6,

            alpha: 1,
            radio: Math.random() * 7 + 3
        });
    }
}

function actualizarParticulas() {

    for (let i = particulas.length - 1; i >= 0; i--) {

        const p = particulas[i];

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.18;

        p.alpha -= 0.025;

        if (p.alpha <= 0) {
            particulas.splice(i, 1);
        }
    }
}

function dibujarParticulas() {

    particulas.forEach(p => {

        ctx.save();

        ctx.globalAlpha = Math.max(0, p.alpha);

        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(
            p.x,
            p.y,
            p.radio,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    });
}