<?php

// Path to the front controller (this file)
define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR);

// Polyfill essential framework helpers if running standalone
if (!function_exists('log_message')) {
    function log_message($level, $message, array $context = []) {
        error_log("[$level] $message");
    }
}
if (!function_exists('esc')) {
    function esc($data) {
        return htmlspecialchars((string) $data, ENT_QUOTES, 'UTF-8');
    }
}
if (!function_exists('base_url')) {
    function base_url($path = '') {
        return '/' . ltrim($path, '/');
    }
}

// Ensure the current directory is pointing to the front controller's directory
chdir(FCPATH);

// -----------------------------------------------------------------------------
// CLI / DIRECT DOUBLE-CLICK LAUNCHER LOGIC
// When run directly from CLI (e.g. double-clicked or `php index.php`),
// automatically open the Dashboard on screen in default browser.
// -----------------------------------------------------------------------------
if (php_sapi_name() === 'cli' && empty($_SERVER['REQUEST_URI'])) {
    $targetHtml = FCPATH . 'index.html';
    $targetUrl = 'http://localhost:8080';
    $phpBin = 'D:\\Mari selvam Data\\Mari\\Apachi install\\php\\php.exe';
    if (!file_exists($phpBin)) {
        $phpBin = defined('PHP_BINARY') ? PHP_BINARY : 'php';
    }

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

    // Open HTML on screen immediately
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        pclose(popen("start \"\" \"$targetHtml\"", "r"));
        pclose(popen("start \"\" \"$targetUrl\"", "r"));
    }

    echo "===================================================================\n";
    echo "  NOVAPORTAL - Super Admin Institutional Performance & Analytics\n";
    echo "  Dashboard launched! Starting local server on http://localhost:8080\n";
    echo "  Press Ctrl+C to stop the server at any time.\n";
    echo "===================================================================\n";

    passthru('"' . $phpBin . '" -n -S localhost:8080 -t "' . FCPATH . '"');
    exit(0);
}

$uri = isset($_SERVER['REQUEST_URI']) ? parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) : '/';

// -----------------------------------------------------------------------------
// 1. DIRECT API DISPATCHER (Works on PHP 7.3+ and handles /api/dashboard/*)
// -----------------------------------------------------------------------------
if (strpos($uri, '/api/dashboard') !== false) {
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');

    // Attempt to invoke DashboardAnalyticsService
    $serviceFile = FCPATH . '../app/Services/DashboardAnalyticsService.php';
    if (file_exists($serviceFile)) {
        require_once $serviceFile;
        $analytics = new \App\Services\DashboardAnalyticsService();
        $filters = $analytics->normalizeFilters($_GET);

        if (strpos($uri, '/consolidated') !== false) {
            $data = $analytics->getConsolidatedData($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Consolidated data loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/kpis') !== false) {
            $data = $analytics->getKpiCards($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'KPIs loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/college') !== false) {
            $colId = isset($_GET['id']) ? (int) $_GET['id'] : 1;
            $data = $analytics->getDepartmentDrillDown($colId, $filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Faculty details loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/academic/departments') !== false) {
            $colId = isset($_GET['college_id']) ? (int) $_GET['college_id'] : 1;
            $data = $analytics->getDepartmentDrillDown($colId, $filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Department drilldown loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/academic') !== false) {
            $data = $analytics->getAcademicAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Academic analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/financial') !== false) {
            $data = $analytics->getFinancialAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Financial analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/research') !== false) {
            $data = $analytics->getResearchAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Research analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/students') !== false) {
            $data = $analytics->getStudentAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Student analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/faculty') !== false) {
            $data = $analytics->getFacultyAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Faculty analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/attendance-exams') !== false) {
            $data = $analytics->getAttendanceAndExamAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Attendance analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/placements') !== false) {
            $data = $analytics->getPlacementAnalytics($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Placement analytics loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/insights') !== false) {
            $data = $analytics->getManagementInsights($filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'Insights loaded', 'data' => $data]);
            exit;
        } elseif (strpos($uri, '/kpi-compare') !== false) {
            $kpi = isset($_GET['kpi']) ? $_GET['kpi'] : 'student_strength';
            $data = $analytics->getKpiComparisonData($kpi, $filters);
            echo json_encode(['success' => true, 'status' => 200, 'message' => 'KPI comparative analysis loaded', 'data' => $data]);
            exit;
        }
    }
}

// -----------------------------------------------------------------------------
// 2. CHECK CI4 FRAMEWORK BOOTSTRAPP (If full CI4 vendor package exists & PHP >= 7.4)
// -----------------------------------------------------------------------------
$pathsConfig = FCPATH . '../app/Config/Paths.php';
$hasCi4 = false;

if (version_compare(PHP_VERSION, '7.4', '>=') && file_exists($pathsConfig)) {
    require_once $pathsConfig;
    $paths = new Config\Paths();
    $bootstrap = rtrim($paths->systemDirectory, '\\/ ') . DIRECTORY_SEPARATOR . 'bootstrap.php';
    if (file_exists($bootstrap)) {
        $hasCi4 = true;
        require_once $bootstrap;
        require_once SYSTEMPATH . 'Config/DotEnv.php';
        (new CodeIgniter\Config\DotEnv(ROOTPATH))->load();
        $app = Config\Services::codeigniter();
        $app->initialize();
        $context = is_cli() ? 'php-cli' : 'web';
        $app->setContext($context);
        $app->run();
        exit;
    }
}

// -----------------------------------------------------------------------------
// 3. SEAMLESS UNIFIED DASHBOARD RENDERER (Default fallback for all PHP versions)
// -----------------------------------------------------------------------------
if (file_exists(FCPATH . 'index.html')) {
    include FCPATH . 'index.html';
    exit;
}

echo "NOVAPORTAL Dashboard: index.html not found in public folder.";
