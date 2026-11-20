<?php
/**
 * NOVAPORTAL ERP - Root Entry Point
 * Automatically opens the Dashboard on screen in your browser when executed.
 */

define('ROOTPATH', __DIR__ . DIRECTORY_SEPARATOR);
$publicDir = ROOTPATH . 'public';
$publicIndex = $publicDir . DIRECTORY_SEPARATOR . 'index.php';
$publicHtml = $publicDir . DIRECTORY_SEPARATOR . 'index.html';
$targetUrl = 'http://localhost:8080';

// Check for PHP binary
$phpBin = 'D:\\Mari selvam Data\\Mari\\Apachi install\\php\\php.exe';
if (!file_exists($phpBin)) {
    $phpBin = defined('PHP_BINARY') ? PHP_BINARY : 'php';
}

// -----------------------------------------------------------------------------
// CLI / DIRECT DOUBLE-CLICK LAUNCHER
// -----------------------------------------------------------------------------
if (php_sapi_name() === 'cli' && empty($_SERVER['REQUEST_URI'])) {
    // Check if web server is already running on port 8080
    $fp = @fsockopen('127.0.0.1', 8080, $errno, $errstr, 0.5);
    if ($fp) {
        fclose($fp);
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            pclose(popen("start \"\" \"$targetUrl\"", "r"));
        }
        echo "Dashboard is active! Opened $targetUrl in your browser.\n";
        exit(0);
    }

    // Launch HTML directly on screen
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        pclose(popen("start \"\" \"$publicHtml\"", "r"));
        pclose(popen("start \"\" \"$targetUrl\"", "r"));
    }

    echo "===================================================================\n";
    echo "  NOVAPORTAL - Super Admin Institutional Performance & Analytics\n";
    echo "  Dashboard launched! Starting local server on http://localhost:8080\n";
    echo "  Press Ctrl+C to stop the server at any time.\n";
    echo "===================================================================\n";

    passthru('"' . $phpBin . '" -n -S localhost:8080 -t "' . $publicDir . '"');
    exit(0);
}

// -----------------------------------------------------------------------------
// WEB SERVER DISPATCHER
// -----------------------------------------------------------------------------
if (file_exists($publicIndex)) {
    require_once $publicIndex;
} elseif (file_exists($publicHtml)) {
    include $publicHtml;
} else {
    echo "Dashboard public/index.html not found.";
}

