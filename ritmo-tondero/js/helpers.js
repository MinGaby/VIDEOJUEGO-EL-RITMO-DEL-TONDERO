// ==========================
// HELPERS GENERALES
// ==========================

function estaSobreInput(mx, my, input) {
    return (
        mx >= input.x &&
        mx <= input.x + input.width &&
        my >= input.y &&
        my <= input.y + input.height
    );
}

function estaSobreBoton(mx, my, boton) {
    return (
        mx >= boton.x &&
        mx <= boton.x + boton.width &&
        my >= boton.y &&
        my <= boton.y + boton.height
    );
}

function camposLoginValidos() {
    if (enRegistro) {
        return (
            usuario.trim() !== "" &&
            password.trim() !== "" &&
            passwordConfirm.trim() !== ""
        );
    }

    return (
        usuario.trim() !== "" &&
        password.trim() !== ""
    );
}

function rectRedondo(x, y, w, h, r) {
    ctx.beginPath();

    ctx.moveTo(x + r, y);

    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);

    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);

    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);

    ctx.closePath();
}

function dibujarFondo() {

    const scale = Math.max(
        canvas.width / fondo.width,
        canvas.height / fondo.height
    );

    const x =
        (canvas.width - fondo.width * scale) / 2;

    const y =
        (canvas.height - fondo.height * scale) / 2;

    ctx.drawImage(
        fondo,
        x,
        y,
        fondo.width * scale,
        fondo.height * scale
    );
}

function dibujarImagenCompleta(imagen) {

    if (!imagen.complete || imagen.width === 0) return;

    const scale = Math.max(
        canvas.width / imagen.width,
        canvas.height / imagen.height
    );

    const x =
        (canvas.width - imagen.width * scale) / 2;

    const y =
        (canvas.height - imagen.height * scale) / 2;

    ctx.drawImage(
        imagen,
        x,
        y,
        imagen.width * scale,
        imagen.height * scale
    );
}

// ==========================
// NOTIFICACIONES
// ==========================

function mostrarNotificacion(
    texto,
    color = "#FFF8DC",
    duracion = 180,
    cb = null
) {
    notificacion.texto = texto;
    notificacion.timer = duracion;
    notificacion.color = color;
    notificacion.callback = cb;
}

function dibujarNotificacion() {

    if (notificacion.timer <= 0) return;

    const alpha = Math.min(
        1,
        notificacion.timer / 30
    );

    const panelW = 520;
    const panelH = 100;

    const px =
        canvas.width / 2 - panelW / 2;

    const py =
        canvas.height / 2 - panelH / 2;

    ctx.save();

    ctx.globalAlpha = alpha;

    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 30;

    ctx.fillStyle = "rgba(20,10,10,0.92)";

    rectRedondo(
        px,
        py,
        panelW,
        panelH,
        22
    );

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle = notificacion.color;
    ctx.lineWidth = 2.5;

    rectRedondo(
        px,
        py,
        panelW,
        panelH,
        22
    );

    ctx.stroke();

    ctx.fillStyle = notificacion.color;

    ctx.font = "bold 26px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        notificacion.texto,
        canvas.width / 2,
        py + panelH / 2 + 9
    );

    ctx.restore();

    notificacion.timer--;

    if (
        notificacion.timer === 0 &&
        notificacion.callback
    ) {
        notificacion.callback();
        notificacion.callback = null;
    }
}

