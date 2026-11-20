<?php

namespace App\Controllers\Api\Dashboard;

use App\Controllers\BaseController;
use App\Models\CollegeModel;
use App\Services\DashboardAnalyticsService;

/**
 * DashboardApiController
 * REST API for the NOVAPORTAL Super Admin Analytics Dashboard.
 */
class DashboardApiController extends BaseController
{
    /** @var DashboardAnalyticsService */
    protected $analyticsService;

    /** @var CollegeModel */
    protected $collegeModel;

    public function __construct()
    {
        $this->analyticsService = new DashboardAnalyticsService();
        $this->collegeModel = new CollegeModel();
    }

    /**
     * Standard success JSON responder
     */
    protected function respondSuccess(array $data, $message = 'Success', array $meta = [])
    {
        return $this->response->setJSON([
            'success' => true,
            'status'  => 200,
            'message' => $message,
            'meta'    => array_merge([
                'timestamp' => date('c'),
            ], $meta),
            'data'    => $data,
        ]);
    }

    /**
     * Standard error JSON responder
     */
    protected function respondError($message = 'Internal error', $code = 400)
    {
        return $this->response->setStatusCode($code)->setJSON([
            'success' => false,
            'status'  => $code,
            'message' => $message,
            'data'    => null,
        ]);
    }

    /**
     * GET /api/dashboard/bootstrap
     */
    public function bootstrap()
    {
        $campuses = $this->collegeModel->getCampuses();
        $academicYears = $this->collegeModel->getAcademicYears();
        $colleges = $this->collegeModel->getColleges();

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

        $semesters = [
            ['code' => 'all', 'label' => 'All Semesters (Consolidated)'],
            ['code' => 'odd', 'label' => 'Odd Semesters (1, 3, 5, 7)'],
            ['code' => 'even', 'label' => 'Even Semesters (2, 4, 6, 8)'],
            ['code' => 'SEM-1', 'label' => 'Semester 1'],
            ['code' => 'SEM-2', 'label' => 'Semester 2'],
            ['code' => 'SEM-3', 'label' => 'Semester 3'],
            ['code' => 'SEM-4', 'label' => 'Semester 4'],
            ['code' => 'SEM-5', 'label' => 'Semester 5'],
            ['code' => 'SEM-6', 'label' => 'Semester 6'],
            ['code' => 'SEM-7', 'label' => 'Semester 7'],
            ['code' => 'SEM-8', 'label' => 'Semester 8']
        ];

        return $this->respondSuccess([
            'campuses'       => $campuses,
            'colleges'       => $colleges,
            'academic_years' => $academicYears,
            'semesters'      => $semesters,
        ], 'Bootstrap metadata loaded');
    }

    /**
     * GET /api/dashboard/kpis
     */
    public function getKpis()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $kpis = $this->analyticsService->getKpiCards($filters);
        return $this->respondSuccess($kpis, 'KPI cards loaded', $filters);
    }

    /**
     * GET /api/dashboard/academic
     */
    public function getAcademic()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $academic = $this->analyticsService->getAcademicAnalytics($filters);
        return $this->respondSuccess($academic, 'Academic analytics loaded', $filters);
    }

    /**
     * GET /api/dashboard/academic/departments
     */
    public function getDepartmentsDrillDown()
    {
        $collegeId = (int) $this->request->getGet('college_id');
        if ($collegeId <= 0) {
            $collegeId = 1; // Default to FET-BLR
        }

        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $departments = $this->analyticsService->getDepartmentDrillDown($collegeId, $filters);
        return $this->respondSuccess($departments, 'Department drill-down loaded', ['college_id' => $collegeId]);
    }

    /**
     * GET /api/dashboard/financial
     */
    public function getFinancial()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $financial = $this->analyticsService->getFinancialAnalytics($filters);
        return $this->respondSuccess($financial, 'Financial performance loaded', $filters);
    }

    /**
     * GET /api/dashboard/research
     */
    public function getResearch()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $research = $this->analyticsService->getResearchAnalytics($filters);
        return $this->respondSuccess($research, 'Research and innovation analytics loaded', $filters);
    }

    /**
     * GET /api/dashboard/students
     */
    public function getStudents()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $students = $this->analyticsService->getStudentAnalytics($filters);
        return $this->respondSuccess($students, 'Student analytics loaded', $filters);
    }

    /**
     * GET /api/dashboard/faculty
     */
    public function getFaculty()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $faculty = $this->analyticsService->getFacultyAnalytics($filters);
        return $this->respondSuccess($faculty, 'Faculty analytics loaded', $filters);
    }

    /**
     * GET /api/dashboard/attendance-exams
     */
    public function getAttendanceExams()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $attendance = $this->analyticsService->getAttendanceAndExamAnalytics($filters);
        return $this->respondSuccess($attendance, 'Attendance and examination analytics loaded', $filters);
    }

    /**
     * GET /api/dashboard/placements
     */
    public function getPlacements()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $placements = $this->analyticsService->getPlacementAnalytics($filters);
        return $this->respondSuccess($placements, 'Placement analytics loaded', $filters);
    }

    /**
     * GET /api/dashboard/insights
     */
    public function getInsights()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $insights = $this->analyticsService->getManagementInsights($filters);
        return $this->respondSuccess($insights, 'Management insights scorecard loaded', $filters);
    }

    /**
     * GET /api/dashboard/consolidated
     */
    public function getConsolidatedAnalytics()
    {
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $consolidated = $this->analyticsService->getConsolidatedData($filters);
        return $this->respondSuccess($consolidated, 'Consolidated institutional dataset loaded', $filters);
    }

    /**
     * GET /api/dashboard/kpi-compare
     */
    public function getKpiCompare()
    {
        $kpi = $this->request->getGet('kpi') ?? 'student_strength';
        $filters = $this->analyticsService->normalizeFilters($this->request->getGet());
        $compareData = $this->analyticsService->getKpiComparisonData($kpi, $filters);
        return $this->respondSuccess($compareData, 'KPI comparative analysis loaded', $filters);
    }
}
