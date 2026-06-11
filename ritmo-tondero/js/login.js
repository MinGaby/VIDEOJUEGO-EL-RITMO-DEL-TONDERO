// ==========================
// LOGIN
// ==========================

function dibujarLogin() {

    dibujarImagenCompleta(fondoLogin);

    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const panelX = canvas.width / 2 - 260;
    const panelY = 90;
    const panelW = 520;
    const panelH = enRegistro ? 580 : 500;

    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,0.30)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 10;

    ctx.fillStyle = "rgba(255,255,255,0.96)";

    rectRedondo(
        panelX,
        panelY,
        panelW,
        panelH,
        30
    );

    ctx.fill();

    ctx.restore();

    ctx.strokeStyle = "rgba(139,0,0,0.25)";
    ctx.lineWidth = 2;

    rectRedondo(
        panelX,
        panelY,
        panelW,
        panelH,
        30
    );

    ctx.stroke();

    ctx.textAlign = "center";

    let grad = ctx.createLinearGradient(
        0,
        100,
        0,
        220
    );

    grad.addColorStop(0, "#A00000");
    grad.addColorStop(1, "#5B0000");

    ctx.fillStyle = grad;

    ctx.font = "bold 48px Arial";

    ctx.fillText(
        "EL RITMO DEL",
        canvas.width / 2,
        165
    );

    ctx.fillText(
        "TONDERO",
        canvas.width / 2,
        220
    );

    ctx.fillStyle = "#7A4B1D";
    ctx.font = "18px Arial";

    const textoAcceso = enRegistro
        ? "Crea tu cuenta para jugar"
        : "Accede para comenzar la aventura";

    ctx.fillText(
        textoAcceso,
        canvas.width / 2,
        255
    );

    // ==========================
    // INPUT USUARIO
    // ==========================

    inputUsuario.x = canvas.width / 2 - 170;
    inputUsuario.y = 290;
    inputUsuario.width = 340;
    inputUsuario.height = 55;

    ctx.fillStyle = "#5E3A1A";
    ctx.textAlign = "left";
    ctx.font = "bold 20px Arial";

    ctx.fillText(
        "Usuario",
        inputUsuario.x,
        inputUsuario.y - 15
    );

    ctx.fillStyle = "white";

    rectRedondo(
        inputUsuario.x,
        inputUsuario.y,
        inputUsuario.width,
        inputUsuario.height,
        18
    );

    ctx.fill();

    ctx.strokeStyle =
        campoActivo === "usuario"
            ? "#E74C3C"
            : "#C4A484";

    ctx.lineWidth =
        campoActivo === "usuario"
            ? 3
            : 2;

    rectRedondo(
        inputUsuario.x,
        inputUsuario.y,
        inputUsuario.width,
        inputUsuario.height,
        18
    );

    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    ctx.fillText(
        usuario,
        inputUsuario.x + 15,
        inputUsuario.y + 37
    );

    // ==========================
    // PASSWORD
    // ==========================

    inputPassword.x = canvas.width / 2 - 170;
    inputPassword.y = 370;
    inputPassword.width = 340;
    inputPassword.height = 55;

    ctx.fillStyle = "#5E3A1A";
    ctx.font = "bold 20px Arial";

    ctx.fillText(
        "Contraseña",
        inputPassword.x,
        inputPassword.y - 15
    );

    ctx.fillStyle = "white";

    rectRedondo(
        inputPassword.x,
        inputPassword.y,
        inputPassword.width,
        inputPassword.height,
        18
    );

    ctx.fill();

    ctx.strokeStyle =
        campoActivo === "password"
            ? "#E74C3C"
            : "#C4A484";

    ctx.lineWidth =
        campoActivo === "password"
            ? 3
            : 2;

    rectRedondo(
        inputPassword.x,
        inputPassword.y,
        inputPassword.width,
        inputPassword.height,
        18
    );

    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    ctx.fillText(
        "*".repeat(password.length),
        inputPassword.x + 15,
        inputPassword.y + 37
    );

    // ==========================
    // CONFIRM PASSWORD
    // ==========================

    if (enRegistro) {

        inputPasswordConfirm.x =
            canvas.width / 2 - 170;

        inputPasswordConfirm.y = 450;

        inputPasswordConfirm.width = 340;
        inputPasswordConfirm.height = 55;

        ctx.fillStyle = "#5E3A1A";
        ctx.font = "bold 20px Arial";

        ctx.fillText(
            "Confirmar Contraseña",
            inputPasswordConfirm.x,
            inputPasswordConfirm.y - 15
        );

        ctx.fillStyle = "white";

        rectRedondo(
            inputPasswordConfirm.x,
            inputPasswordConfirm.y,
            inputPasswordConfirm.width,
            inputPasswordConfirm.height,
            18
        );

        ctx.fill();

        ctx.strokeStyle =
            campoActivo === "passwordConfirm"
                ? "#E74C3C"
                : "#C4A484";

        ctx.lineWidth =
            campoActivo === "passwordConfirm"
                ? 3
                : 2;

        rectRedondo(
            inputPasswordConfirm.x,
            inputPasswordConfirm.y,
            inputPasswordConfirm.width,
            inputPasswordConfirm.height,
            18
        );

        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "24px Arial";

        ctx.fillText(
            "*".repeat(passwordConfirm.length),
            inputPasswordConfirm.x + 15,
            inputPasswordConfirm.y + 37
        );
    }

    // ==========================
    // BOTONES
    // ==========================

    const botonPrincipalY =
        enRegistro ? 530 : 450;

    botonIngresar.x =
        canvas.width / 2 - 185;

    botonIngresar.y =
        botonPrincipalY;

    botonIngresar.width = 165;
    botonIngresar.height = 58;

    let grad1 = ctx.createLinearGradient(
        0,
        botonIngresar.y,
        0,
        botonIngresar.y + 58
    );

    grad1.addColorStop(0, "#D64545");
    grad1.addColorStop(1, "#9B1C1C");

    ctx.fillStyle = grad1;

    rectRedondo(
        botonIngresar.x,
        botonIngresar.y,
        botonIngresar.width,
        botonIngresar.height,
        18
    );

    ctx.fill();

    botonRegistrar.x =
        canvas.width / 2 + 20;

    botonRegistrar.y =
        botonPrincipalY;

    botonRegistrar.width = 165;
    botonRegistrar.height = 58;

    let grad2 = ctx.createLinearGradient(
        0,
        botonRegistrar.y,
        0,
        botonRegistrar.y + 58
    );

    grad2.addColorStop(0, "#3A91D8");
    grad2.addColorStop(1, "#205E96");

    ctx.fillStyle = grad2;

    rectRedondo(
        botonRegistrar.x,
        botonRegistrar.y,
        botonRegistrar.width,
        botonRegistrar.height,
        18
    );

    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = "white";

    ctx.font = "bold 20px Arial";

    ctx.fillText(
        enRegistro ? "REGISTRARSE" : "INGRESAR",
        botonIngresar.x + botonIngresar.width / 2,
        botonIngresar.y + 37
    );

    ctx.font = "bold 18px Arial";

    ctx.fillText(
        enRegistro ? "VOLVER" : "REGISTRARSE",
        botonRegistrar.x + botonRegistrar.width / 2,
        botonRegistrar.y + 37
    );
}