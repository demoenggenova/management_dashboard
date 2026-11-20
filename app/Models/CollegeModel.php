<?php

namespace App\Models;

use CodeIgniter\Model;

class CollegeModel extends Model
{
    protected $table = 'erp_colleges';
    protected $primaryKey = 'college_id';
    protected $allowedFields = [
        'college_code', 'college_name', 'short_name', 'campus_id',
        'campus_code', 'faculty_category', 'autonomous_status',
        'established_year', 'dean_name', 'dean_email', 'status'
    ];

    /**
     * Get all active colleges, optionally filtered by campus or college IDs
     */
    public function getColleges(?string $campus = null, ?array $collegeIds = null): array
    {
        $builder = $this->db->table('erp_colleges c')
            ->select('c.college_id, c.college_code, c.college_name, c.short_name, c.campus_code, c.faculty_category, c.established_year, c.dean_name, p.campus_name')
            ->join('erp_campuses p', 'p.campus_id = c.campus_id', 'left')
            ->where('c.status', 'active');

        if (!empty($campus) && strtoupper($campus) !== 'ALL') {
            $builder->where('c.campus_code', strtoupper($campus));
        }

        if (!empty($collegeIds)) {
            $builder->whereIn('c.college_id', $collegeIds);
        }

        $builder->orderBy('c.campus_code', 'ASC')->orderBy('c.college_id', 'ASC');

        return $builder->get()->getResultArray();
    }

    /**
     * Get campus list with college counts
     */
    public function getCampuses(): array
    {
        return $this->db->table('erp_campuses p')
            ->select('p.campus_id, p.campus_code, p.campus_name, p.city, p.state, COUNT(c.college_id) as total_colleges')
            ->join('erp_colleges c', 'c.campus_id = p.campus_id AND c.status = "active"', 'left')
            ->groupBy('p.campus_id')
            ->get()->getResultArray();
    }

    /**
     * Get all academic years
     */
    public function getAcademicYears(): array
    {
        return $this->db->table('acad_years')
            ->select('academic_year_id, year_code, year_name, is_current')
            ->orderBy('start_date', 'DESC')
            ->get()->getResultArray();
    }

    /**
     * Get semesters for an academic year
     */
    public function getSemesters(?int $academicYearId = null): array
    {
        $builder = $this->db->table('acad_terms_semesters')
            ->select('semester_id, academic_year_id, term_type, semester_code, semester_name, semester_number, is_current');

        if ($academicYearId) {
            $builder->where('academic_year_id', $academicYearId);
        }

        return $builder->orderBy('semester_number', 'ASC')->get()->getResultArray();
    }
}

