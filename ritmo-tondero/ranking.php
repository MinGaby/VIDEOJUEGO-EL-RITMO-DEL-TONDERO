<?php
/**
 * =====================================================
 * RANKING - OBTENER TOP 10 JUGADORES
 * =====================================================
 * Endpoint: GET /api/ranking.php
 */

require_once('conexion.php');

// =====================================================
// VALIDAR MÉTODO
// =====================================================

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    error('Método no permitido', 405);
}

// =====================================================
// OBTENER PARÁMETROS OPCIONALES
// =====================================================

$limite = intval($_GET['limite'] ?? 10);
$limite = min($limite, 100); // Máximo 100 registros
$limite = max($limite, 5);   // Mínimo 5 registros

// =====================================================
// OBTENER RANKING
// =====================================================

try {
    $stmt = $conn->prepare('
        SELECT 
            id,
            usuario,
            puntos,
            puntos_nivel1,
            puntos_nivel2,
            mejor_combo,
            veces_jugadas,
            DATE_FORMAT(fecha_creacion, "%d/%m/%Y") as fecha_creacion
        FROM usuarios
        WHERE activo = 1
        ORDER BY puntos DESC
        LIMIT ?
    ');

    if (!$stmt) {
        throw new Exception('Error en preparar consulta: ' . $conn->error);
    }

    $stmt->bind_param('i', $limite);

    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar consulta: ' . $stmt->error);
    }

    $resultado = $stmt->get_result();
    $ranking = [];
    $posicion = 1;

    while ($fila = $resultado->fetch_assoc()) {
        $ranking[] = [
            'posicion' => $posicion++,
            'usuario' => $fila['usuario'],
            'puntos' => (int)$fila['puntos'],
            'puntos_nivel1' => (int)$fila['puntos_nivel1'],
            'puntos_nivel2' => (int)$fila['puntos_nivel2'],
            'mejor_combo' => (int)$fila['mejor_combo'],
            'veces_jugadas' => (int)$fila['veces_jugadas'],
            'fecha_union' => $fila['fecha_creacion']
        ];
    }

    $stmt->close();

    // =====================================================
    // RESPUESTA EXITOSA
    // =====================================================

    exito('Ranking obtenido correctamente', [
        'total_registros' => count($ranking),
        'ranking' => $ranking
    ]);

} catch (Exception $e) {
    log_error($e->getMessage(), 'RANKING ERROR');
    error('Error al obtener ranking', 500);
}

?>