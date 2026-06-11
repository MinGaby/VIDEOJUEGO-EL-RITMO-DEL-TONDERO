<?php
/**
 * =====================================================
 * GUARDAR PUNTOS - AL TERMINAR EL JUEGO
 * =====================================================
 * Endpoint: POST /api/guardar_puntos.php
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
// VALIDAR Y PROCESAR ENTRADA
// =====================================================

$id_usuario = intval($data['id_usuario'] ?? 0);
$puntos_nivel1 = intval($data['puntos_nivel1'] ?? 0);
$puntos_nivel2 = intval($data['puntos_nivel2'] ?? 0);
$mejor_combo = intval($data['mejor_combo'] ?? 0);

// Validaciones
if ($id_usuario <= 0) {
    error('Usuario inválido', 400);
}

if ($puntos_nivel1 < 0 || $puntos_nivel2 < 0 || $mejor_combo < 0) {
    error('Valores de puntos inválidos', 400);
}

// =====================================================
// CALCULAR PUNTOS TOTALES
// =====================================================

$puntos_totales = $puntos_nivel1 + $puntos_nivel2;

// Límite máximo de puntos (prevenir ataques)
if ($puntos_totales > 100000) {
    error('Puntos fuera de rango', 400);
}

// =====================================================
// ACTUALIZAR PUNTOS EN BD
// =====================================================

try {
    $stmt = $conn->prepare('
        UPDATE usuarios 
        SET 
            puntos = ?,
            puntos_nivel1 = ?,
            puntos_nivel2 = ?,
            mejor_combo = GREATEST(mejor_combo, ?),
            veces_jugadas = veces_jugadas + 1,
            ultima_sesion = NOW()
        WHERE id = ?
    ');

    if (!$stmt) {
        throw new Exception('Error en preparar consulta: ' . $conn->error);
    }

    $stmt->bind_param('iiiii', $puntos_totales, $puntos_nivel1, $puntos_nivel2, $mejor_combo, $id_usuario);

    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar actualización: ' . $stmt->error);
    }

    if ($stmt->affected_rows === 0) {
        log_error('Usuario no encontrado: ' . $id_usuario, 'PUNTOS');
        error('Usuario no encontrado', 404);
    }

    $stmt->close();

    // =====================================================
    // OBTENER DATOS ACTUALIZADOS
    // =====================================================

    $stmt = $conn->prepare('
        SELECT puntos, puntos_nivel1, puntos_nivel2, mejor_combo, veces_jugadas
        FROM usuarios
        WHERE id = ?
    ');

    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $usuario_data = $resultado->fetch_assoc();
    $stmt->close();

    // =====================================================
    // RESPUESTA EXITOSA
    // =====================================================

    log_error('Puntos guardados para usuario: ' . $id_usuario . ' (Total: ' . $puntos_totales . ')', 'INFO');

    exito('Puntos guardados correctamente', [
        'puntos_totales' => (int)$usuario_data['puntos'],
        'puntos_nivel1' => (int)$usuario_data['puntos_nivel1'],
        'puntos_nivel2' => (int)$usuario_data['puntos_nivel2'],
        'mejor_combo' => (int)$usuario_data['mejor_combo'],
        'veces_jugadas' => (int)$usuario_data['veces_jugadas']
    ]);

} catch (Exception $e) {
    log_error($e->getMessage(), 'PUNTOS ERROR');
    error('Error al guardar puntos', 500);
}

?>