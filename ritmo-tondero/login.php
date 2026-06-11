<?php
/**
 * =====================================================
 * LOGIN - INICIAR SESIÓN
 * =====================================================
 * Endpoint: POST /api/login.php
 */

require_once('conexion.php');

// =====================================================
// VALIDAR MÉTODO
// =====================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error('Método no permitido', 405);
}

// =====================================================
// OBTENER Y VALIDAR DATOS
// =====================================================

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    error('Datos inválidos', 400);
}

$usuario = sanitizar($data['usuario'] ?? '');
$password = $data['password'] ?? '';

// =====================================================
// VALIDACIONES
// =====================================================

if (empty($usuario)) {
    error('El usuario es obligatorio', 400);
}

if (empty($password)) {
    error('La contraseña es obligatoria', 400);
}

if (strlen($usuario) < 3) {
    error('Usuario inválido', 401);
}

// =====================================================
// BUSCAR USUARIO EN BD
// =====================================================

try {
    $stmt = $conn->prepare('
        SELECT id, usuario, password, puntos, mejor_combo
        FROM usuarios
        WHERE usuario = ? AND activo = 1
        LIMIT 1
    ');

    if (!$stmt) {
        throw new Exception('Error en preparar consulta: ' . $conn->error);
    }

    $stmt->bind_param('s', $usuario);

    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar consulta: ' . $stmt->error);
    }

    $resultado = $stmt->get_result();

    // =====================================================
    // VERIFICAR SI EXISTE EL USUARIO
    // =====================================================

    if ($resultado->num_rows === 0) {
        log_error('Intento de login fallido para usuario: ' . $usuario, 'LOGIN');
        error('Usuario o contraseña incorrectos', 401);
    }

    $usuario_data = $resultado->fetch_assoc();
    $stmt->close();

    // =====================================================
    // VERIFICAR CONTRASEÑA
    // =====================================================

    if (!password_verify($password, $usuario_data['password'])) {
        log_error('Contraseña incorrecta para usuario: ' . $usuario, 'LOGIN');
        error('Usuario o contraseña incorrectos', 401);
    }

    // =====================================================
    // ACTUALIZAR ÚLTIMA SESIÓN
    // =====================================================

    $stmt = $conn->prepare('UPDATE usuarios SET ultima_sesion = NOW() WHERE id = ?');
    $stmt->bind_param('i', $usuario_data['id']);
    $stmt->execute();
    $stmt->close();

    // =====================================================
    // RESPUESTA EXITOSA
    // =====================================================

    log_error('Login exitoso para usuario: ' . $usuario, 'INFO');

    exito('Inicio de sesión exitoso', [
        'id_usuario' => $usuario_data['id'],
        'usuario' => $usuario_data['usuario'],
        'puntos' => (int)$usuario_data['puntos'],
        'mejor_combo' => (int)$usuario_data['mejor_combo']
    ]);

} catch (Exception $e) {
    log_error($e->getMessage(), 'LOGIN ERROR');
    error('Error al processar login', 500);
}

?>