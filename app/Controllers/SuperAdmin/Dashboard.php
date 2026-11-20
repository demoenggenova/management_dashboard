<?php

namespace App\Controllers\SuperAdmin;

use App\Controllers\BaseController;
use App\Models\CollegeModel;
use App\Services\DashboardAnalyticsService;

/**
 * Super Admin Dashboard View Controller
 */
class Dashboard extends BaseController
{
    /** @var CollegeModel */
    protected $collegeModel;

    /** @var DashboardAnalyticsService */
    protected $analyticsService;

    public function __construct()
    {
        $this->collegeModel = new CollegeModel();
        $this->analyticsService = new DashboardAnalyticsService();
    }

    /**
     * Render the unified institutional dashboard
     */
    public function index()
    {
        $campuses = $this->collegeModel->getCampuses();
        $academicYears = $this->collegeModel->getAcademicYears();
        $colleges = $this->collegeModel->getColleges();

        // Fallbacks if tables not seeded yet
        if (empty($colleges)) {
            $colleges = $this->analyticsService->getActiveCollegesList(['campus' => 'ALL', 'selected_colleges' => []]);
        }

        if (empty($campuses)) {
            $campuses = [
                ['campus_id' => 1, 'campus_code' => 'BLR', 'campus_name' => 'Bangalore Global Campus', 'total_colleges' => 3],
                ['campus_id' => 2, 'campus_code' => 'KOCHI', 'campus_name' => 'Kochi Coastal Knowledge Campus', 'total_colleges' => 7]
            ];
        }

        if (empty($academicYears)) {
            $academicYears = [
                ['academic_year_id' => 3, 'year_code' => '2026-2027', 'year_name' => 'Academic Year 2026-2027 (Current)', 'is_current' => 1],
                ['academic_year_id' => 2, 'year_code' => '2025-2026', 'year_name' => 'Academic Year 2025-2026', 'is_current' => 0],
                ['academic_year_id' => 1, 'year_code' => '2024-2025', 'year_name' => 'Academic Year 2024-2025', 'is_current' => 0],
            ];
        }

        $data = [
            'page_title'       => 'Institutional Performance & Analytics | NOVAPORTAL Super Admin',
            'campuses'         => $campuses,
            'colleges'         => $colleges,
            'academic_years'   => $academicYears,
            'current_year'     => '2026-2027',
            'user'             => [
                'name'  => session()->get('full_name') ? session()->get('full_name') : 'Dr. Vikramaditya Sharma',
                'role'  => 'Super Admin',
                'title' => 'Vice Chancellor / Chancellor Oversight'
            ]
        ];

        return view('dashboard/index', $data);
    }

    /**
     * Export analytics summary report
     */
    public function exportReport()
    {
        $params = $this->request->getGet();
        $filters = $this->analyticsService->normalizeFilters($params);
        $reportData = $this->analyticsService->getConsolidatedData($filters);

        $filename = 'novaportal_analytics_' . date('Ymd_His') . '.json';

        return $this->response
            ->setHeader('Content-Type', 'application/json')
            ->setHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->setJSON($reportData);
    }
}
