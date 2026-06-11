async function iniciarSesion() {

    try {

        const respuesta = await fetch(
            "login.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuario,
                    password
                })
            }
        );

        const data = await respuesta.json();

            console.log(
        JSON.stringify(
            data,
            null,
            2
        )
    );
        usuarioActual = data;

        console.log("USUARIO ACTUAL:");
        console.log(usuarioActual);

        if (data.exito) {

    usuarioActual = {
        id: data.datos.id_usuario,
        usuario: data.datos.usuario
    };

    console.log(usuarioActual);

    mostrarNotificacion(
        "Bienvenido " + usuario,
        "#00FF88"
    );

    estado = "menu";
    console.log("usuarioActual:");
    console.log(usuarioActual);
} else {

            mostrarNotificacion(
                data.mensaje,
                "#FF4444"
            );
        }

    } catch(error) {

        console.error(error);

        mostrarNotificacion(
            "Error de conexión",
            "#FF4444"
        );
    }
}

async function registrarUsuario() {

    try {

        const respuesta = await fetch(
            "registrar.php",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    usuario: usuario,
                    password: password,
                    password_confirm:
                        passwordConfirm
                })
            }
        );

        const data =
            await respuesta.json();

            console.log(data);

        if (data.exito) {

            mostrarNotificacion(
                "Usuario creado",
                "#00FF88"
            );

            enRegistro = false;

            password = "";
            passwordConfirm = "";

        } else {

            mostrarNotificacion(
                data.mensaje,
                "#FF4444"
            );
        }

    } catch (error) {

        console.error(error);

        mostrarNotificacion(
            "Error de conexión",
            "#FF4444"
        );
    }
}

async function guardarPuntos() {

    if (!usuarioActual) return;

    console.log("Guardando puntos...");
    console.log(usuarioActual);

    try {

        const respuesta = await fetch(
            "guardar_puntos.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_usuario: usuarioActual.id,
                    puntos_nivel1: puntos,
                    puntos_nivel2: puntosNivel2,
                    mejor_combo: mejorCombo
                })
            }
        );

        const data = await respuesta.json();

        console.log("RESPUESTA GUARDAR:");
        console.log(data);

    } catch(error) {

        console.error(error);
    }
}

async function cargarRanking() {

    try {

        const respuesta =
            await fetch("ranking.php");

        const data =
            await respuesta.json();

        console.log(data);

        if (data.exito) {

            rankingData =
                data.datos.ranking;

            estado = "ranking";
        }

    } catch(error) {

        console.error(error);
    }
}