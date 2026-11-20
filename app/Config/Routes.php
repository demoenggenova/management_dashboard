<?php

namespace Config;

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('SuperAdmin\Dashboard');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

// Root route redirects or shows the Super Admin Analytics Dashboard
$routes->get('/', 'SuperAdmin\Dashboard::index');

// Super Admin Web Routes (Protected by SuperAdminAuthFilter)
$routes->group('superadmin', ['filter' => 'superadmin_auth'], static function ($routes) {
    $routes->get('dashboard', 'SuperAdmin\Dashboard::index');
    $routes->get('export-report', 'SuperAdmin\Dashboard::exportReport');
});

// REST API Endpoints (Protected by SuperAdminAuthFilter)
$routes->group('api/dashboard', ['namespace' => 'App\Controllers\Api\Dashboard', 'filter' => 'superadmin_auth'], static function ($routes) {
    $routes->get('bootstrap', 'DashboardApiController::bootstrap');
    $routes->get('kpis', 'DashboardApiController::getKpis');
    $routes->get('academic', 'DashboardApiController::getAcademic');
    $routes->get('academic/departments', 'DashboardApiController::getDepartmentsDrillDown');
    $routes->get('financial', 'DashboardApiController::getFinancial');
    $routes->get('research', 'DashboardApiController::getResearch');
    $routes->get('students', 'DashboardApiController::getStudents');
    $routes->get('faculty', 'DashboardApiController::getFaculty');
    $routes->get('attendance-exams', 'DashboardApiController::getAttendanceExams');
    $routes->get('placements', 'DashboardApiController::getPlacements');
    $routes->get('insights', 'DashboardApiController::getInsights');
    $routes->get('consolidated', 'DashboardApiController::getConsolidatedAnalytics');
    $routes->get('kpi-compare', 'DashboardApiController::getKpiCompare');
});

