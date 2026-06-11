<?php
/**
 * =====================================================
 * CONEXIÓN A BASE DE DATOS
 * =====================================================
 */

require_once('config.php');

// =====================================================
// HEADERS CORS
// =====================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// =====================================================
// CREAR CONEXIÓN
// =====================================================

try {
    $conn = new mysqli(
        DB_HOST,
        DB_USER,
        DB_PASS,
        DB_NAME,
        DB_PORT
    );

    // =====================================================
    // VERIFICAR CONEXIÓN
    // =====================================================

    if ($conn->connect_error) {
        throw new Exception('Error de conexión: ' . $conn->connect_error);
    }

    // =====================================================
    // CONFIGURAR CHARSET UTF-8
    // =====================================================

    if (!$conn->set_charset('utf8mb4')) {
        throw new Exception('Error al establecer charset: ' . $conn->error);
    }

    // =====================================================
    // CONEXIÓN EXITOSA
    // =====================================================

    if (DEBUG) {
        log_error('✅ Conexión exitosa a BD: ' . DB_NAME, 'INFO');
    }

} catch (Exception $e) {
    // Error de conexión
    http_response_code(500);
    log_error($e->getMessage(), 'CONEXIÓN');
    
    echo json_encode([
        'exito' => false,
        'mensaje' => 'Error de conexión a la base de datos',
        'detalle' => DEBUG ? $e->getMessage() : 'Por favor contacta al administrador'
    ], JSON_UNESCAPED_UNICODE);
    
    exit();
}

?>