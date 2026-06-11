<?php
/**
 * =====================================================
 * CONFIGURACIÓN CENTRALIZADA - EL RITMO DEL TONDERO
 * =====================================================
 */

// =====================================================
// DATABASE CONFIGURATION
// =====================================================

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'juego_piurano');
define('DB_PORT', 3306);

// =====================================================
// APPLICATION CONFIG
// =====================================================

define('GAME_NAME', 'El Ritmo del Tondero');
define('VERSION', '1.0.0');
define('DEBUG', false);
define('SECRET_KEY', 'tu_clave_secreta_super_segura_2024');
define('SESSION_TIME', 1800);

// =====================================================
// TIMEZONE
// =====================================================

date_default_timezone_set('America/Lima');

// =====================================================
// ERROR HANDLING
// =====================================================

if (DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Responder en JSON
 */
function responder($data, $codigo = 200) {
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Respuesta exitosa
 */
function exito($mensaje, $datos = null) {
    responder([
        'exito' => true,
        'mensaje' => $mensaje,
        'datos' => $datos
    ], 200);
}

/**
 * Respuesta de error
 */
function error($mensaje, $codigo = 400) {
    responder([
        'exito' => false,
        'mensaje' => $mensaje
    ], $codigo);
}

/**
 * Sanitizar entrada (prevenir XSS)
 */
function sanitizar($data) {
    if (is_array($data)) {
        return array_map('sanitizar', $data);
    }
    return trim(htmlspecialchars($data ?? '', ENT_QUOTES, 'UTF-8'));
}

/**
 * Validar email
 */
function validar_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Loguear errores (si DEBUG = true)
 */
function log_error($mensaje, $tipo = 'ERROR') {
    if (DEBUG) {
        error_log('[' . date('Y-m-d H:i:s') . '] ' . $tipo . ': ' . $mensaje);
    }
}

?>