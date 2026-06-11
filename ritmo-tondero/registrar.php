<?php
/**
 * =====================================================
 * REGISTRAR - CREAR NUEVO USUARIO
 * =====================================================
 * Endpoint: POST /api/registrar.php
 */

require_once('conexion.php');

// =====================================================
// VALIDAR MÉTODO
// =====================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error('Método no permitido', 405);
}

// =====================================================
// OBTENER DATOS
// =====================================================

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    error('Datos inválidos', 400);
}

// =====================================================
// PROCESAR Y SANITIZAR ENTRADA
// =====================================================

$usuario = sanitizar($data['usuario'] ?? '');
$password = $data['password'] ?? '';
$password_confirm = $data['password_confirm'] ?? '';

// =====================================================
// VALIDAR USUARIO
// =====================================================

if (empty($usuario)) {
    error('El usuario es obligatorio', 400);
}

if (strlen($usuario) < 3) {
    error('El usuario debe tener al menos 3 caracteres', 400);
}

if (strlen($usuario) > 50) {
    error('El usuario no puede tener más de 50 caracteres', 400);
}

// Solo letras, números, puntos, guiones y guiones bajos
if (!preg_match('/^[a-zA-Z0-9_.-]+$/', $usuario)) {
    error('El usuario contiene caracteres no permitidos', 400);
}

// =====================================================
// VALIDAR CONTRASEÑA
// =====================================================

if (empty($password)) {
    error('La contraseña es obligatoria', 400);
}

if (strlen($password) < 4) {
    error('La contraseña debe tener al menos 4 caracteres', 400);
}

if (strlen($password) > 100) {
    error('La contraseña es demasiado larga', 400);
}

if ($password !== $password_confirm) {
    error('Las contraseñas no coinciden', 400);
}

// =====================================================
// VERIFICAR SI EL USUARIO EXISTE
// =====================================================

try {
    $stmt = $conn->prepare('SELECT id FROM usuarios WHERE usuario = ?');

    if (!$stmt) {
        throw new Exception('Error en preparar consulta: ' . $conn->error);
    }

    $stmt->bind_param('s', $usuario);

    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar consulta: ' . $stmt->error);
    }

    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        log_error('Intento de registro con usuario existente: ' . $usuario, 'REGISTRO');
        error('El usuario ya existe, intenta con otro nombre', 409);
    }

    $stmt->close();

    // =====================================================
    // HASHEAR CONTRASEÑA (BCRYPT)
    // =====================================================

    $password_hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 11]);

    if (!$password_hash) {
        throw new Exception('Error al hashear contraseña');
    }

    // =====================================================
    // INSERTAR NUEVO USUARIO
    // =====================================================

    $stmt = $conn->prepare('
        INSERT INTO usuarios (usuario, password, puntos, fecha_creacion, activo)
        VALUES (?, ?, 0, NOW(), 1)
    ');

    if (!$stmt) {
        throw new Exception('Error en inserción: ' . $conn->error);
    }

    $stmt->bind_param('ss', $usuario, $password_hash);

    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar inserción: ' . $stmt->error);
    }

    $id_nuevo_usuario = $conn->insert_id;
    $stmt->close();

    // =====================================================
    // RESPUESTA EXITOSA
    // =====================================================

    log_error('Nuevo usuario registrado: ' . $usuario . ' (ID: ' . $id_nuevo_usuario . ')', 'INFO');

    exito('Registrado correctamente. ¡Bienvenido!', [
        'id_usuario' => $id_nuevo_usuario,
        'usuario' => $usuario,
        'mensaje' => 'Puedes iniciar sesión ahora'
    ]);

} catch (Exception $e) {
    log_error($e->getMessage(), 'REGISTRO ERROR');
    error('Error al registrar usuario', 500);
}

?>