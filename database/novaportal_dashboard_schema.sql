-- =============================================================================
-- NOVAPORTAL ERP - Super Admin Institutional Performance & Analytics Database Schema
-- Compatible with MySQL 8.0+ / MariaDB 10.5+
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `novaportal_erp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `novaportal_erp`;

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. CORE INSTITUTIONAL ENTITIES: CAMPUSES & COLLEGES
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `erp_campuses` (
  `campus_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `campus_code` VARCHAR(20) NOT NULL UNIQUE,
  `campus_name` VARCHAR(150) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `erp_colleges` (
  `college_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_code` VARCHAR(30) NOT NULL UNIQUE,
  `college_name` VARCHAR(255) NOT NULL,
  `short_name` VARCHAR(80) NOT NULL,
  `campus_id` INT UNSIGNED NOT NULL,
  `campus_code` ENUM('BLR', 'KOCHI') NOT NULL,
  `faculty_category` ENUM('Engineering', 'Commerce', 'Management', 'Applied Computing', 'Humanities', 'Design', 'Basic Sciences') NOT NULL,
  `autonomous_status` TINYINT(1) DEFAULT 1,
  `established_year` SMALLINT UNSIGNED NOT NULL,
  `dean_name` VARCHAR(150) DEFAULT NULL,
  `dean_email` VARCHAR(150) DEFAULT NULL,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_college_campus` (`campus_code`),
  INDEX `idx_college_category` (`faculty_category`),
  CONSTRAINT `fk_colleges_campus` FOREIGN KEY (`campus_id`) REFERENCES `erp_campuses` (`campus_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `erp_roles` (
  `role_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `role_code` VARCHAR(50) NOT NULL UNIQUE,
  `role_name` VARCHAR(100) NOT NULL,
  `hierarchy_level` INT UNSIGNED NOT NULL DEFAULT 10,
  `description` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `erp_users` (
  `user_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED DEFAULT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `username` VARCHAR(80) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `full_name` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login` DATETIME DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_users_college` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `erp_roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. ACADEMIC STRUCTURE: YEARS, TERMS, DEPARTMENTS & PROGRAMMES
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `acad_years` (
  `academic_year_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `year_code` VARCHAR(20) NOT NULL UNIQUE COMMENT 'e.g. 2026-2027',
  `year_name` VARCHAR(100) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `is_current` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `acad_terms_semesters` (
  `semester_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `term_type` ENUM('odd', 'even', 'summer') NOT NULL,
  `semester_code` VARCHAR(30) NOT NULL COMMENT 'e.g. SEM-1 to SEM-8, ALL-ODD, ALL-EVEN',
  `semester_name` VARCHAR(100) NOT NULL,
  `semester_number` TINYINT UNSIGNED NOT NULL,
  `is_current` TINYINT(1) DEFAULT 0,
  INDEX `idx_sem_year` (`academic_year_id`),
  CONSTRAINT `fk_sem_year` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `acad_departments` (
  `dept_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `dept_code` VARCHAR(30) NOT NULL,
  `dept_name` VARCHAR(150) NOT NULL,
  `hod_name` VARCHAR(150) DEFAULT NULL,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  INDEX `idx_dept_college` (`college_id`),
  UNIQUE KEY `uk_college_dept` (`college_id`, `dept_code`),
  CONSTRAINT `fk_dept_college_ref` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. SECTION 1 & 5: STUDENT ENROLLMENTS & ADMISSIONS ANALYTICS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `student_analytics_summary` (
  `summary_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `total_student_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `ug_student_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `pg_student_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `phd_student_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `admission_intake_capacity` INT UNSIGNED NOT NULL DEFAULT 0,
  `admission_applications` INT UNSIGNED NOT NULL DEFAULT 0,
  `confirmed_admissions` INT UNSIGNED NOT NULL DEFAULT 0,
  `admission_conversion_pct` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `admission_applications` > 0 
         THEN ROUND((`confirmed_admissions` / `admission_applications`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `student_dropouts` INT UNSIGNED NOT NULL DEFAULT 0,
  `student_discontinuations` INT UNSIGNED NOT NULL DEFAULT 0,
  `dropout_rate_pct` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `total_student_strength` > 0 
         THEN ROUND((`student_dropouts` / `total_student_strength`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `prev_year_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `yoy_growth_pct` DECIMAL(6,2) GENERATED ALWAYS AS (
    CASE WHEN `prev_year_strength` > 0 
         THEN ROUND(((`total_student_strength` - `prev_year_strength`) / `prev_year_strength`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_student_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_stu_sum_college` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_stu_sum_year` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. SECTION 2 & 7: ACADEMIC & EXAMINATION PERFORMANCE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `academic_exam_summary` (
  `exam_summary_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `dept_id` INT UNSIGNED DEFAULT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `semester_id` INT UNSIGNED DEFAULT NULL,
  `term_type` ENUM('odd', 'even', 'consolidated') NOT NULL DEFAULT 'consolidated',
  `degree_level` ENUM('ug', 'pg', 'combined') NOT NULL DEFAULT 'combined',
  `appeared_students` INT UNSIGNED NOT NULL DEFAULT 0,
  `passed_students` INT UNSIGNED NOT NULL DEFAULT 0,
  `failed_students` INT UNSIGNED NOT NULL DEFAULT 0,
  `arrear_students` INT UNSIGNED NOT NULL DEFAULT 0,
  `distinction_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `first_class_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `pass_percentage` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `appeared_students` > 0 
         THEN ROUND((`passed_students` / `appeared_students`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `prev_semester_pass_pct` DECIMAL(5,2) DEFAULT 0.00,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_exam_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_exam_college` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_exam_dept` FOREIGN KEY (`dept_id`) REFERENCES `acad_departments` (`dept_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_exam_year` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. SECTION 3: FINANCIAL PERFORMANCE & COLLECTIONS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `finance_fee_summary` (
  `finance_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `fee_demand` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'In INR Rupees',
  `fee_collected` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'In INR Rupees',
  `fee_outstanding` DECIMAL(15,2) GENERATED ALWAYS AS (`fee_demand` - `fee_collected`) STORED,
  `collection_percentage` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `fee_demand` > 0 
         THEN ROUND((`fee_collected` / `fee_demand`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `prev_year_collected` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `yoy_collection_growth_pct` DECIMAL(6,2) GENERATED ALWAYS AS (
    CASE WHEN `prev_year_collected` > 0 
         THEN ROUND(((`fee_collected` - `prev_year_collected`) / `prev_year_collected`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_fin_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_fin_college` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fin_year` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `finance_monthly_collections` (
  `monthly_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `month_index` TINYINT UNSIGNED NOT NULL COMMENT '1: Apr, 2: May, ... 12: Mar',
  `month_label` VARCHAR(15) NOT NULL COMMENT 'e.g. Apr 2026',
  `collected_amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  INDEX `idx_fin_month` (`college_id`, `academic_year_id`, `month_index`),
  CONSTRAINT `fk_fin_m_col` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fin_m_yr` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `finance_payment_modes` (
  `mode_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `payment_mode` ENUM('UPI', 'Credit/Debit Card', 'Net Banking', 'Bank Transfer (NEFT/RTGS)', 'Cash/Challan') NOT NULL,
  `transaction_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `total_amount` DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `share_percentage` DECIMAL(5,2) DEFAULT 0.00,
  INDEX `idx_fin_mode` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_fin_mode_col` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fin_mode_yr` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. SECTION 4: RESEARCH, PUBLICATIONS & INNOVATION ANALYTICS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `research_publications_summary` (
  `research_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `unique_publications` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'De-duplicated count across all databases',
  `scopus_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `wos_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Web of Science indexed',
  `google_scholar_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `journal_papers` INT UNSIGNED NOT NULL DEFAULT 0,
  `conference_papers` INT UNSIGNED NOT NULL DEFAULT 0,
  `total_citations` INT UNSIGNED NOT NULL DEFAULT 0,
  `avg_citations_per_paper` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `unique_publications` > 0 
         THEN ROUND(`total_citations` / `unique_publications`, 2) 
         ELSE 0.00 END
  ) STORED,
  `h_index` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `patents_filed` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `patents_granted` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `papers_per_faculty` DECIMAL(4,2) DEFAULT 0.00,
  `prev_year_publications` INT UNSIGNED NOT NULL DEFAULT 0,
  `yoy_publication_growth_pct` DECIMAL(6,2) GENERATED ALWAYS AS (
    CASE WHEN `prev_year_publications` > 0 
         THEN ROUND(((`unique_publications` - `prev_year_publications`) / `prev_year_publications`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_res_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_res_col` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_res_year` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 7. SECTION 6: FACULTY ANALYTICS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `faculty_analytics_summary` (
  `faculty_summary_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `total_faculty_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `professors_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `associate_professors_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `assistant_professors_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `phd_qualified_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `phd_percentage` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `total_faculty_strength` > 0 
         THEN ROUND((`phd_qualified_count` / `total_faculty_strength`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `student_to_faculty_ratio` DECIMAL(5,2) DEFAULT 0.00 COMMENT 'Calculated: Total Students / Total Faculty',
  `faculty_research_active_pct` DECIMAL(5,2) DEFAULT 0.00 COMMENT '% faculty with at least 1 publication or grant',
  `prev_year_faculty_strength` INT UNSIGNED NOT NULL DEFAULT 0,
  `yoy_growth_pct` DECIMAL(6,2) GENERATED ALWAYS AS (
    CASE WHEN `prev_year_faculty_strength` > 0 
         THEN ROUND(((`total_faculty_strength` - `prev_year_faculty_strength`) / `prev_year_faculty_strength`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_fac_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_fac_col` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fac_yr` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 8. SECTION 7: ATTENDANCE ANALYTICS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `attendance_summary` (
  `attendance_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `overall_attendance_pct` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `students_above_85_pct` INT UNSIGNED NOT NULL DEFAULT 0,
  `students_75_to_85_pct` INT UNSIGNED NOT NULL DEFAULT 0,
  `students_below_75_pct` INT UNSIGNED NOT NULL DEFAULT 0,
  `condonation_eligible_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Attendance 65% to 74.99%',
  `detained_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Attendance < 65%',
  `prev_year_attendance_pct` DECIMAL(5,2) DEFAULT 0.00,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_att_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_att_col` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_att_yr` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 9. SECTION 8: PLACEMENT ANALYTICS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `placement_summary` (
  `placement_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `college_id` INT UNSIGNED NOT NULL,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `eligible_students` INT UNSIGNED NOT NULL DEFAULT 0,
  `placed_students` INT UNSIGNED NOT NULL DEFAULT 0,
  `placement_percentage` DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE WHEN `eligible_students` > 0 
         THEN ROUND((`placed_students` / `eligible_students`) * 100, 2) 
         ELSE 0.00 END
  ) STORED,
  `highest_package_lpa` DECIMAL(6,2) NOT NULL DEFAULT 0.00 COMMENT 'In Lakhs Per Annum',
  `average_package_lpa` DECIMAL(6,2) NOT NULL DEFAULT 0.00 COMMENT 'In Lakhs Per Annum',
  `median_package_lpa` DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  `companies_visited` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `total_offers` INT UNSIGNED NOT NULL DEFAULT 0,
  `dream_offers_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Offers >= 10 LPA',
  `prev_year_placed_pct` DECIMAL(5,2) DEFAULT 0.00,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_plc_col_year` (`college_id`, `academic_year_id`),
  CONSTRAINT `fk_plc_col` FOREIGN KEY (`college_id`) REFERENCES `erp_colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_plc_yr` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 10. SECTION 9: MANAGEMENT INSIGHTS & BENCHMARK TARGETS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `institutional_kpi_targets` (
  `target_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `academic_year_id` INT UNSIGNED NOT NULL,
  `metric_code` VARCHAR(50) NOT NULL COMMENT 'pass_pct, fee_collection_pct, placement_pct, attendance_pct, sfr, phd_pct',
  `metric_title` VARCHAR(150) NOT NULL,
  `target_value` DECIMAL(10,2) NOT NULL,
  `unit_of_measure` VARCHAR(30) DEFAULT '%',
  `benchmark_body` VARCHAR(80) DEFAULT 'UGC / NAAC Criterion IV',
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  INDEX `idx_tgt_year` (`academic_year_id`),
  CONSTRAINT `fk_tgt_yr` FOREIGN KEY (`academic_year_id`) REFERENCES `acad_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

