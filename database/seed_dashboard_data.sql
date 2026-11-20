-- =============================================================================
-- NOVAPORTAL ERP - Super Admin Dashboard Comprehensive Master Seed Data
-- Covers all 10 Faculties across BLR and KOCHI Campuses
-- Real university metric proportions, consistent formulas, and multi-year data
-- =============================================================================

USE `novaportal_erp`;

SET FOREIGN_KEY_CHECKS = 0;

-- Clear previous data
TRUNCATE TABLE `institutional_kpi_targets`;
TRUNCATE TABLE `placement_summary`;
TRUNCATE TABLE `attendance_summary`;
TRUNCATE TABLE `faculty_analytics_summary`;
TRUNCATE TABLE `research_publications_summary`;
TRUNCATE TABLE `finance_payment_modes`;
TRUNCATE TABLE `finance_monthly_collections`;
TRUNCATE TABLE `finance_fee_summary`;
TRUNCATE TABLE `academic_exam_summary`;
TRUNCATE TABLE `student_analytics_summary`;
TRUNCATE TABLE `acad_departments`;
TRUNCATE TABLE `acad_terms_semesters`;
TRUNCATE TABLE `acad_years`;
TRUNCATE TABLE `erp_users`;
TRUNCATE TABLE `erp_roles`;
TRUNCATE TABLE `erp_colleges`;
TRUNCATE TABLE `erp_campuses`;

-- 1. CAMPUSES
INSERT INTO `erp_campuses` (`campus_id`, `campus_code`, `campus_name`, `city`, `state`) VALUES
(1, 'BLR', 'Bangalore Global Campus', 'Bangalore', 'Karnataka'),
(2, 'KOCHI', 'Kochi Coastal Knowledge Campus', 'Kochi', 'Kerala');

-- 2. ALL 10 COLLEGES (FACULTIES)
INSERT INTO `erp_colleges` (`college_id`, `college_code`, `college_name`, `short_name`, `campus_id`, `campus_code`, `faculty_category`, `autonomous_status`, `established_year`, `dean_name`, `dean_email`, `status`) VALUES
(1, 'FET-BLR', 'Faculty of Engineering and Technology - BLR', 'FET Bangalore', 1, 'BLR', 'Engineering', 1, 2005, 'Dr. R. K. Narayanan', 'dean.fet.blr@novaportal.edu', 'active'),
(2, 'FCOM-BLR', 'Faculty of Commerce - BLR', 'FCOM Bangalore', 1, 'BLR', 'Commerce', 1, 2008, 'Dr. Meera Vasudevan', 'dean.fcom.blr@novaportal.edu', 'active'),
(3, 'FMS-BLR', 'Faculty of Management Studies - BLR', 'FMS Bangalore', 1, 'BLR', 'Management', 1, 2006, 'Dr. Arvind Swaminathan', 'dean.fms.blr@novaportal.edu', 'active'),
(4, 'FAC-KOC', 'Faculty of Applied Computing - Kochi', 'FAC Kochi', 2, 'KOCHI', 'Applied Computing', 1, 2014, 'Dr. George Mathew', 'dean.fac.koc@novaportal.edu', 'active'),
(5, 'FAHSS-KOC', 'Faculty of Arts, Humanities and Social Sciences - Kochi', 'FAHSS Kochi', 2, 'KOCHI', 'Humanities', 1, 2012, 'Dr. Ananya Roy', 'dean.fahss.koc@novaportal.edu', 'active'),
(6, 'FCD-KOC', 'Faculty of Creativity and Design - Kochi', 'FCD Kochi', 2, 'KOCHI', 'Design', 1, 2016, 'Prof. Rajesh Varier', 'dean.fcd.koc@novaportal.edu', 'active'),
(7, 'FMS-KOC', 'Faculty of Management Studies - Kochi', 'FMS Kochi', 2, 'KOCHI', 'Management', 1, 2013, 'Dr. K. S. Pillai', 'dean.fms.koc@novaportal.edu', 'active'),
(8, 'FCOM-KOC', 'Faculty of Commerce - Kochi', 'FCOM Kochi', 2, 'KOCHI', 'Commerce', 1, 2013, 'Dr. Jacob Abraham', 'dean.fcom.koc@novaportal.edu', 'active'),
(9, 'FET-KOC', 'Faculty of Engineering and Technology - Kochi', 'FET Kochi', 2, 'KOCHI', 'Engineering', 1, 2011, 'Dr. Suresh Kumar N.', 'dean.fet.koc@novaportal.edu', 'active'),
(10, 'FBAS-KOC', 'Faculty of Basic and Applied Sciences - Kochi', 'FBAS Kochi', 2, 'KOCHI', 'Basic Sciences', 1, 2015, 'Dr. Sujatha Nair', 'dean.fbas.koc@novaportal.edu', 'active');

-- 3. ROLES & SUPER ADMIN USER
INSERT INTO `erp_roles` (`role_id`, `role_code`, `role_name`, `hierarchy_level`, `description`) VALUES
(1, 'super_admin', 'Institutional Super Admin', 99, 'Unrestricted cross-campus analytics, governance and institutional reporting access'),
(2, 'campus_director', 'Campus Director', 60, 'Campus-level oversight and approvals'),
(3, 'faculty_dean', 'Dean of Faculty', 50, 'Faculty-wide academic and departmental governance'),
(4, 'hod', 'Head of Department', 40, 'Department operations and course administration'),
(5, 'faculty', 'Faculty Member', 30, 'Teaching, mark entry and research activity'),
(6, 'student', 'Student', 10, 'Student self-service portal');

INSERT INTO `erp_users` (`user_id`, `college_id`, `role_id`, `username`, `email`, `full_name`, `password_hash`, `is_active`) VALUES
(1, NULL, 1, 'superadmin', 'superadmin@novaportal.edu', 'Dr. Vikramaditya Sharma (Chancellor & Super Admin)', '$2y$10$eO0V4hS4/b6sH3G9e6sUfeW.J.mUuR6lJpYxPzYk5mN8qZ6fC1nK2', 1);

-- 4. ACADEMIC YEARS
INSERT INTO `acad_years` (`academic_year_id`, `year_code`, `year_name`, `start_date`, `end_date`, `is_current`) VALUES
(1, '2024-2025', 'Academic Year 2024-2025', '2024-06-01', '2025-05-31', 0),
(2, '2025-2026', 'Academic Year 2025-2026', '2025-06-01', '2026-05-31', 0),
(3, '2026-2027', 'Academic Year 2026-2027 (Current)', '2026-06-01', '2027-05-31', 1);

-- 5. SEMESTERS
INSERT INTO `acad_terms_semesters` (`semester_id`, `academic_year_id`, `term_type`, `semester_code`, `semester_name`, `semester_number`, `is_current`) VALUES
(1, 3, 'odd', 'SEM-1', 'Semester 1 (First Year Odd)', 1, 0),
(2, 3, 'even', 'SEM-2', 'Semester 2 (First Year Even)', 2, 0),
(3, 3, 'odd', 'SEM-3', 'Semester 3 (Second Year Odd)', 3, 0),
(4, 3, 'even', 'SEM-4', 'Semester 4 (Second Year Even)', 4, 0),
(5, 3, 'odd', 'SEM-5', 'Semester 5 (Third Year Odd)', 5, 1),
(6, 3, 'even', 'SEM-6', 'Semester 6 (Third Year Even)', 6, 0),
(7, 3, 'odd', 'SEM-7', 'Semester 7 (Final Year Odd)', 7, 1),
(8, 3, 'even', 'SEM-8', 'Semester 8 (Final Year Even)', 8, 0);

-- 6. DEPARTMENTS PER COLLEGE
INSERT INTO `acad_departments` (`dept_id`, `college_id`, `dept_code`, `dept_name`, `hod_name`) VALUES
-- FET-BLR
(1, 1, 'FET-CSE', 'Computer Science and Engineering', 'Dr. S. K. Gupta'),
(2, 1, 'FET-AI-DS', 'Artificial Intelligence & Data Science', 'Dr. Priya Mani'),
(3, 1, 'FET-ECE', 'Electronics & Communication Engineering', 'Dr. V. Raman'),
(4, 1, 'FET-ME', 'Mechanical Engineering', 'Dr. M. S. Joshi'),
(5, 1, 'FET-CE', 'Civil Engineering', 'Dr. T. Natarajan'),
-- FCOM-BLR
(6, 2, 'FCOM-ACC', 'Accounting & Financial Forensics', 'Dr. Rekha Sundaram'),
(7, 2, 'FCOM-BF', 'Banking & Fintech', 'Dr. N. K. Murthy'),
(8, 2, 'FCOM-TAX', 'International Taxation & Analytics', 'Dr. S. Gopal'),
-- FMS-BLR
(9, 3, 'FMS-MKT', 'Marketing & Digital Strategy', 'Dr. Alok Verma'),
(10, 3, 'FMS-FIN', 'Corporate Finance & Wealth Management', 'Dr. Shalini Sengupta'),
(11, 3, 'FMS-HR', 'Human Resource & Organizational Behavior', 'Dr. Preeti Shenoy'),
(12, 3, 'FMS-OPS', 'Operations & Supply Chain Management', 'Dr. Jayant Patil'),
-- FAC-KOC
(13, 4, 'FAC-CS', 'Computer Applications & Cloud Computing', 'Dr. Biju Varghese'),
(14, 4, 'FAC-CYBER', 'Cyber Security & Forensic Computing', 'Dr. Deepa Sridhar'),
(15, 4, 'FAC-DATA', 'Data Analytics & Big Data Systems', 'Dr. C. P. Manoj'),
-- FAHSS-KOC
(16, 5, 'FAHSS-ENG', 'English & Comparative Literature', 'Dr. Susan George'),
(17, 5, 'FAHSS-SOC', 'Applied Sociology & Public Policy', 'Dr. K. R. Nambiar'),
(18, 5, 'FAHSS-MEDIA', 'Mass Communication & Digital Journalism', 'Dr. Vinod Kurian'),
-- FCD-KOC
(19, 6, 'FCD-UIUX', 'User Experience & Interaction Design', 'Prof. Neha Joseph'),
(20, 6, 'FCD-ANIM', 'Animation, VFX & Game Arts', 'Prof. Kevin Thomas'),
(21, 6, 'FCD-PROD', 'Product & Industrial Design', 'Prof. Tarun Sen'),
-- FMS-KOC
(22, 7, 'FMSK-GEN', 'General Management & Entrepreneurship', 'Dr. K. M. Paul'),
(23, 7, 'FMSK-MAR', 'Maritime Logistics & Port Management', 'Dr. Antony Vithayathil'),
(24, 7, 'FMSK-FIN', 'Financial Analytics', 'Dr. Lakshmi Shankar'),
-- FCOM-KOC
(25, 8, 'FCOMK-CA', 'Professional Accounting & CA Prep', 'Dr. Zachariah George'),
(26, 8, 'FCOMK-IT', 'Information Systems in Commerce', 'Dr. Anita Thomas'),
-- FET-KOC
(27, 9, 'FETK-CSE', 'Computer Engineering & IoT', 'Dr. Radhakrishnan B.'),
(28, 9, 'FETK-ECE', 'Robotics & Automation', 'Dr. Sunil K. Menon'),
(29, 9, 'FETK-EEE', 'Electrical & Renewable Energy Systems', 'Dr. Bindu Haridas'),
-- FBAS-KOC
(30, 10, 'FBAS-MATH', 'Applied Mathematics & Statistics', 'Dr. K. C. Chacko'),
(31, 10, 'FBAS-PHYS', 'Material Physics & Nanotechnology', 'Dr. Sarath Chandran'),
(32, 10, 'FBAS-CHEM', 'Applied Chemistry & Green Energy', 'Dr. Mary Stephen');

-- 7. SECTION 1 & 5: STUDENT ENROLLMENTS & ADMISSIONS (Current AY 2026-2027, AY_ID = 3)
INSERT INTO `student_analytics_summary` 
(`college_id`, `academic_year_id`, `total_student_strength`, `ug_student_strength`, `pg_student_strength`, `phd_student_strength`, `admission_intake_capacity`, `admission_applications`, `confirmed_admissions`, `student_dropouts`, `student_discontinuations`, `prev_year_strength`) 
VALUES
(1, 3, 4820, 4120, 620, 80, 1350, 6840, 1310, 42, 18, 4510),
(2, 3, 3150, 2680, 440, 30, 950, 4420, 920, 24, 11, 2980),
(3, 3, 2240, 1180, 1010, 50, 720, 3980, 705, 16, 7, 2110),
(4, 3, 1980, 1540, 410, 30, 600, 3120, 588, 15, 6, 1820),
(5, 3, 1420, 1150, 250, 20, 480, 1850, 445, 19, 12, 1360),
(6, 3, 1180, 980, 185, 15, 360, 2140, 352, 11, 5, 1080),
(7, 3, 1860, 990, 840, 30, 580, 2890, 560, 14, 8, 1750),
(8, 3, 2100, 1820, 260, 20, 650, 2950, 635, 18, 9, 2010),
(9, 3, 3450, 2980, 430, 40, 1050, 4870, 1015, 31, 14, 3290),
(10, 3, 1260, 960, 275, 25, 420, 1760, 395, 12, 6, 1190);

-- Previous AY 2025-2026 (AY_ID = 2) for historical comparison
INSERT INTO `student_analytics_summary` 
(`college_id`, `academic_year_id`, `total_student_strength`, `ug_student_strength`, `pg_student_strength`, `phd_student_strength`, `admission_intake_capacity`, `admission_applications`, `confirmed_admissions`, `student_dropouts`, `student_discontinuations`, `prev_year_strength`) 
VALUES
(1, 2, 4510, 3860, 580, 70, 1280, 6210, 1240, 48, 22, 4230),
(2, 2, 2980, 2540, 415, 25, 900, 4150, 875, 28, 14, 2810),
(3, 2, 2110, 1120, 950, 40, 680, 3650, 665, 18, 9, 1990),
(4, 2, 1820, 1420, 380, 20, 550, 2840, 535, 18, 8, 1690),
(5, 2, 1360, 1110, 235, 15, 450, 1720, 420, 22, 15, 1290),
(6, 2, 1080, 900, 170, 10, 340, 1980, 330, 14, 7, 990),
(7, 2, 1750, 940, 785, 25, 540, 2690, 525, 16, 9, 1640),
(8, 2, 2010, 1750, 245, 15, 620, 2780, 605, 20, 11, 1920),
(9, 2, 3290, 2850, 410, 30, 1000, 4520, 970, 36, 17, 3110),
(10, 2, 1190, 915, 255, 20, 400, 1640, 375, 14, 8, 1130);

-- 8. SECTION 2 & 7: ACADEMIC & EXAMINATION PERFORMANCE (AY 2026-2027)
-- Consolidated college level performance
INSERT INTO `academic_exam_summary` 
(`college_id`, `dept_id`, `academic_year_id`, `semester_id`, `term_type`, `degree_level`, `appeared_students`, `passed_students`, `failed_students`, `arrear_students`, `distinction_count`, `first_class_count`, `prev_semester_pass_pct`) 
VALUES
(1, NULL, 3, 7, 'odd', 'combined', 4720, 4310, 410, 365, 1420, 2240, 89.80), -- 91.31%
(2, NULL, 3, 7, 'odd', 'combined', 3080, 2815, 265, 210, 910, 1480, 89.40),  -- 91.40%
(3, NULL, 3, 7, 'odd', 'combined', 2210, 2085, 125, 95, 840, 1085, 92.50),   -- 94.34%
(4, NULL, 3, 7, 'odd', 'combined', 1940, 1765, 175, 148, 620, 890, 88.50),   -- 90.98%
(5, NULL, 3, 7, 'odd', 'combined', 1390, 1195, 195, 162, 310, 640, 84.10),   -- 85.97%
(6, NULL, 3, 7, 'odd', 'combined', 1160, 1085, 75, 62, 450, 530, 91.80),     -- 93.53%
(7, NULL, 3, 7, 'odd', 'combined', 1830, 1710, 120, 98, 680, 860, 91.20),    -- 93.44%
(8, NULL, 3, 7, 'odd', 'combined', 2060, 1825, 235, 188, 540, 990, 86.80),   -- 88.59%
(9, NULL, 3, 7, 'odd', 'combined', 3380, 2960, 420, 345, 960, 1580, 85.90),  -- 87.57%
(10, NULL, 3, 7, 'odd', 'combined', 1230, 1060, 170, 138, 380, 520, 84.20);  -- 86.18%

-- Department breakdown for drill-down (Sample colleges 1, 2, 3, 4, 9)
INSERT INTO `academic_exam_summary` 
(`college_id`, `dept_id`, `academic_year_id`, `semester_id`, `term_type`, `degree_level`, `appeared_students`, `passed_students`, `failed_students`, `arrear_students`, `distinction_count`, `first_class_count`, `prev_semester_pass_pct`) 
VALUES
(1, 1, 3, 7, 'odd', 'ug', 1480, 1410, 70, 58, 590, 680, 93.20),
(1, 2, 3, 7, 'odd', 'ug', 850, 805, 45, 38, 340, 390, 92.10),
(1, 3, 3, 7, 'odd', 'ug', 920, 825, 95, 84, 240, 460, 87.50),
(1, 4, 3, 7, 'odd', 'ug', 820, 715, 105, 98, 160, 420, 84.20),
(1, 5, 3, 7, 'odd', 'ug', 650, 555, 95, 87, 90, 290, 81.50),
(2, 6, 3, 7, 'odd', 'ug', 1350, 1260, 90, 72, 420, 680, 91.00),
(2, 7, 3, 7, 'odd', 'ug', 980, 895, 85, 68, 290, 490, 89.20),
(2, 8, 3, 7, 'odd', 'ug', 750, 660, 90, 70, 200, 310, 86.10),
(3, 9, 3, 7, 'odd', 'pg', 720, 688, 32, 24, 290, 340, 93.50),
(3, 10, 3, 7, 'odd', 'pg', 680, 645, 35, 28, 270, 320, 92.80),
(3, 11, 3, 7, 'odd', 'pg', 450, 428, 22, 18, 160, 230, 93.00),
(3, 12, 3, 7, 'odd', 'pg', 360, 324, 36, 25, 120, 195, 88.50),
(4, 13, 3, 7, 'odd', 'ug', 850, 785, 65, 52, 290, 390, 90.10),
(4, 14, 3, 7, 'odd', 'ug', 580, 528, 52, 44, 180, 270, 89.40),
(4, 15, 3, 7, 'odd', 'ug', 510, 452, 58, 52, 150, 230, 86.00),
(9, 27, 3, 7, 'odd', 'ug', 1320, 1195, 125, 102, 410, 640, 88.20),
(9, 28, 3, 7, 'odd', 'ug', 1140, 990, 150, 124, 310, 520, 84.50),
(9, 29, 3, 7, 'odd', 'ug', 920, 775, 145, 119, 240, 420, 81.80);

-- UG vs PG Split per college (AY 2026-2027)
INSERT INTO `academic_exam_summary` 
(`college_id`, `dept_id`, `academic_year_id`, `semester_id`, `term_type`, `degree_level`, `appeared_students`, `passed_students`, `failed_students`, `arrear_students`, `distinction_count`, `first_class_count`, `prev_semester_pass_pct`) 
VALUES
-- UG rows
(1, NULL, 3, 7, 'odd', 'ug', 4040, 3680, 360, 320, 1180, 1920, 89.20),
(2, NULL, 3, 7, 'odd', 'ug', 2630, 2390, 240, 190, 740, 1280, 88.90),
(3, NULL, 3, 7, 'odd', 'ug', 1160, 1070, 90, 70, 410, 580, 90.80),
(4, NULL, 3, 7, 'odd', 'ug', 1510, 1365, 145, 122, 470, 710, 87.80),
(5, NULL, 3, 7, 'odd', 'ug', 1125, 960, 165, 138, 240, 530, 83.50),
(6, NULL, 3, 7, 'odd', 'ug', 960, 895, 65, 54, 370, 440, 91.00),
(7, NULL, 3, 7, 'odd', 'ug', 975, 905, 70, 58, 340, 470, 90.50),
(8, NULL, 3, 7, 'odd', 'ug', 1785, 1575, 210, 168, 450, 870, 86.20),
(9, NULL, 3, 7, 'odd', 'ug', 2920, 2535, 385, 318, 810, 1380, 85.00),
(10, NULL, 3, 7, 'odd', 'ug', 940, 805, 135, 110, 280, 410, 83.10),
-- PG rows
(1, NULL, 3, 7, 'odd', 'pg', 680, 630, 50, 45, 240, 320, 91.50),
(2, NULL, 3, 7, 'odd', 'pg', 450, 425, 25, 20, 170, 200, 92.50),
(3, NULL, 3, 7, 'odd', 'pg', 1050, 1015, 35, 25, 430, 505, 94.20),
(4, NULL, 3, 7, 'odd', 'pg', 430, 400, 30, 26, 150, 180, 91.00),
(5, NULL, 3, 7, 'odd', 'pg', 265, 235, 30, 24, 70, 110, 86.50),
(6, NULL, 3, 7, 'odd', 'pg', 200, 190, 10, 8, 80, 90, 94.00),
(7, NULL, 3, 7, 'odd', 'pg', 855, 805, 50, 40, 340, 390, 92.00),
(8, NULL, 3, 7, 'odd', 'pg', 275, 250, 25, 20, 90, 120, 89.00),
(9, NULL, 3, 7, 'odd', 'pg', 460, 425, 35, 27, 150, 200, 90.00),
(10, NULL, 3, 7, 'odd', 'pg', 290, 255, 35, 28, 100, 110, 86.00);

-- 9. SECTION 3: FINANCIAL PERFORMANCE & COLLECTIONS (AY 2026-2027)
-- Fee Demand, Collections & Outstanding (in Rupees)
INSERT INTO `finance_fee_summary` 
(`college_id`, `academic_year_id`, `fee_demand`, `fee_collected`, `prev_year_collected`) 
VALUES
(1, 3, 895000000.00, 828000000.00, 755000000.00), -- 92.51%
(2, 3, 395000000.00, 362000000.00, 332000000.00), -- 91.65%
(3, 3, 610000000.00, 578000000.00, 518000000.00), -- 94.75%
(4, 3, 275000000.00, 248000000.00, 219000000.00), -- 90.18%
(5, 3, 142000000.00, 121000000.00, 112000000.00), -- 85.21%
(6, 3, 218000000.00, 201000000.00, 178000000.00), -- 92.20%
(7, 3, 440000000.00, 405000000.00, 368000000.00), -- 92.05%
(8, 3, 245000000.00, 212000000.00, 198000000.00), -- 86.53%
(9, 3, 565000000.00, 492000000.00, 448000000.00), -- 87.08%
(10, 3, 138000000.00, 119000000.00, 108000000.00); -- 86.23%

-- Monthly Collections (Apr 2026 to Mar 2027) for BLR vs KOCHI and all colleges
INSERT INTO `finance_monthly_collections` (`college_id`, `academic_year_id`, `month_index`, `month_label`, `collected_amount`) VALUES
-- FET-BLR (Total 82.8 Cr)
(1, 3, 1, 'Apr 2026', 42000000.00), (1, 3, 2, 'May 2026', 58000000.00), (1, 3, 3, 'Jun 2026', 165000000.00),
(1, 3, 4, 'Jul 2026', 198000000.00), (1, 3, 5, 'Aug 2026', 92000000.00), (1, 3, 6, 'Sep 2026', 45000000.00),
(1, 3, 7, 'Oct 2026', 38000000.00), (1, 3, 8, 'Nov 2026', 42000000.00), (1, 3, 9, 'Dec 2026', 78000000.00),
(1, 3, 10, 'Jan 2027', 35000000.00), (1, 3, 11, 'Feb 2027', 21000000.00), (1, 3, 12, 'Mar 2027', 15000000.00),
-- FCOM-BLR (Total 36.2 Cr)
(2, 3, 1, 'Apr 2026', 18000000.00), (2, 3, 2, 'May 2026', 26000000.00), (2, 3, 3, 'Jun 2026', 74000000.00),
(2, 3, 4, 'Jul 2026', 88000000.00), (2, 3, 5, 'Aug 2026', 41000000.00), (2, 3, 6, 'Sep 2026', 22000000.00),
(2, 3, 7, 'Oct 2026', 16000000.00), (2, 3, 8, 'Nov 2026', 18000000.00), (2, 3, 9, 'Dec 2026', 32000000.00),
(2, 3, 10, 'Jan 2027', 14000000.00), (2, 3, 11, 'Feb 2027', 8000000.00), (2, 3, 12, 'Mar 2027', 5000000.00),
-- FMS-BLR (Total 57.8 Cr)
(3, 3, 1, 'Apr 2026', 32000000.00), (3, 3, 2, 'May 2026', 45000000.00), (3, 3, 3, 'Jun 2026', 118000000.00),
(3, 3, 4, 'Jul 2026', 135000000.00), (3, 3, 5, 'Aug 2026', 64000000.00), (3, 3, 6, 'Sep 2026', 31000000.00),
(3, 3, 7, 'Oct 2026', 28000000.00), (3, 3, 8, 'Nov 2026', 30000000.00), (3, 3, 9, 'Dec 2026', 52000000.00),
(3, 3, 10, 'Jan 2027', 22000000.00), (3, 3, 11, 'Feb 2027', 12000000.00), (3, 3, 12, 'Mar 2027', 9000000.00),
-- FAC-KOC (Total 24.8 Cr)
(4, 3, 1, 'Apr 2026', 12000000.00), (4, 3, 2, 'May 2026', 18000000.00), (4, 3, 3, 'Jun 2026', 52000000.00),
(4, 3, 4, 'Jul 2026', 61000000.00), (4, 3, 5, 'Aug 2026', 28000000.00), (4, 3, 6, 'Sep 2026', 14000000.00),
(4, 3, 7, 'Oct 2026', 11000000.00), (4, 3, 8, 'Nov 2026', 12000000.00), (4, 3, 9, 'Dec 2026', 22000000.00),
(4, 3, 10, 'Jan 2027', 9000000.00), (4, 3, 11, 'Feb 2027', 5000000.00), (4, 3, 12, 'Mar 2027', 4000000.00),
-- FAHSS-KOC (Total 12.1 Cr)
(5, 3, 1, 'Apr 2026', 6000000.00), (5, 3, 2, 'May 2026', 9000000.00), (5, 3, 3, 'Jun 2026', 24000000.00),
(5, 3, 4, 'Jul 2026', 31000000.00), (5, 3, 5, 'Aug 2026', 14000000.00), (5, 3, 6, 'Sep 2026', 7000000.00),
(5, 3, 7, 'Oct 2026', 5500000.00), (5, 3, 8, 'Nov 2026', 6000000.00), (5, 3, 9, 'Dec 2026', 10500000.00),
(5, 3, 10, 'Jan 2027', 4000000.00), (5, 3, 11, 'Feb 2027', 2500000.00), (5, 3, 12, 'Mar 2027', 1500000.00),
-- FCD-KOC (Total 20.1 Cr)
(6, 3, 1, 'Apr 2026', 9500000.00), (6, 3, 2, 'May 2026', 15000000.00), (6, 3, 3, 'Jun 2026', 41000000.00),
(6, 3, 4, 'Jul 2026', 51000000.00), (6, 3, 5, 'Aug 2026', 23000000.00), (6, 3, 6, 'Sep 2026', 12000000.00),
(6, 3, 7, 'Oct 2026', 9000000.00), (6, 3, 8, 'Nov 2026', 10500000.00), (6, 3, 9, 'Dec 2026', 17000000.00),
(6, 3, 10, 'Jan 2027', 7000000.00), (6, 3, 11, 'Feb 2027', 3500000.00), (6, 3, 12, 'Mar 2027', 2500000.00),
-- FMS-KOC (Total 40.5 Cr)
(7, 3, 1, 'Apr 2026', 21000000.00), (7, 3, 2, 'May 2026', 31000000.00), (7, 3, 3, 'Jun 2026', 82000000.00),
(7, 3, 4, 'Jul 2026', 98000000.00), (7, 3, 5, 'Aug 2026', 46000000.00), (7, 3, 6, 'Sep 2026', 24000000.00),
(7, 3, 7, 'Oct 2026', 19000000.00), (7, 3, 8, 'Nov 2026', 21000000.00), (7, 3, 9, 'Dec 2026', 36000000.00),
(7, 3, 10, 'Jan 2027', 15000000.00), (7, 3, 11, 'Feb 2027', 7500000.00), (7, 3, 12, 'Mar 2027', 4500000.00),
-- FCOM-KOC (Total 21.2 Cr)
(8, 3, 1, 'Apr 2026', 10500000.00), (8, 3, 2, 'May 2026', 16000000.00), (8, 3, 3, 'Jun 2026', 44000000.00),
(8, 3, 4, 'Jul 2026', 52000000.00), (8, 3, 5, 'Aug 2026', 24000000.00), (8, 3, 6, 'Sep 2026', 12500000.00),
(8, 3, 7, 'Oct 2026', 9500000.00), (8, 3, 8, 'Nov 2026', 11000000.00), (8, 3, 9, 'Dec 2026', 18500000.00),
(8, 3, 10, 'Jan 2027', 8000000.00), (8, 3, 11, 'Feb 2027', 3500000.00), (8, 3, 12, 'Mar 2027', 2500000.00),
-- FET-KOC (Total 49.2 Cr)
(9, 3, 1, 'Apr 2026', 25000000.00), (9, 3, 2, 'May 2026', 38000000.00), (9, 3, 3, 'Jun 2026', 101000000.00),
(9, 3, 4, 'Jul 2026', 121000000.00), (9, 3, 5, 'Aug 2026', 56000000.00), (9, 3, 6, 'Sep 2026', 29000000.00),
(9, 3, 7, 'Oct 2026', 22500000.00), (9, 3, 8, 'Nov 2026', 25000000.00), (9, 3, 9, 'Dec 2026', 44000000.00),
(9, 3, 10, 'Jan 2027', 18000000.00), (9, 3, 11, 'Feb 2027', 8500000.00), (9, 3, 12, 'Mar 2027', 4000000.00),
-- FBAS-KOC (Total 11.9 Cr)
(10, 3, 1, 'Apr 2026', 5800000.00), (10, 3, 2, 'May 2026', 8800000.00), (10, 3, 3, 'Jun 2026', 24200000.00),
(10, 3, 4, 'Jul 2026', 29500000.00), (10, 3, 5, 'Aug 2026', 13500000.00), (10, 3, 6, 'Sep 2026', 6800000.00),
(10, 3, 7, 'Oct 2026', 5600000.00), (10, 3, 8, 'Nov 2026', 6200000.00), (10, 3, 9, 'Dec 2026', 10600000.00),
(10, 3, 10, 'Jan 2027', 4200000.00), (10, 3, 11, 'Feb 2027', 2300000.00), (10, 3, 12, 'Mar 2027', 1500000.00);

-- Payment Modes Distribution (Consolidated per college)
INSERT INTO `finance_payment_modes` (`college_id`, `academic_year_id`, `payment_mode`, `transaction_count`, `total_amount`, `share_percentage`) VALUES
(1, 3, 'UPI', 8450, 248400000.00, 30.00),
(1, 3, 'Credit/Debit Card', 6200, 198720000.00, 24.00),
(1, 3, 'Net Banking', 4900, 231840000.00, 28.00),
(1, 3, 'Bank Transfer (NEFT/RTGS)', 1850, 124200000.00, 15.00),
(1, 3, 'Cash/Challan', 620, 24840000.00, 3.00),
(2, 3, 'UPI', 5600, 115840000.00, 32.00),
(2, 3, 'Credit/Debit Card', 3800, 94120000.00, 26.00),
(2, 3, 'Net Banking', 3200, 90500000.00, 25.00),
(2, 3, 'Bank Transfer (NEFT/RTGS)', 1100, 50680000.00, 14.00),
(2, 3, 'Cash/Challan', 380, 10860000.00, 3.00),
(3, 3, 'UPI', 3900, 161840000.00, 28.00),
(3, 3, 'Credit/Debit Card', 3400, 156060000.00, 27.00),
(3, 3, 'Net Banking', 3100, 167620000.00, 29.00),
(3, 3, 'Bank Transfer (NEFT/RTGS)', 1250, 80920000.00, 14.00),
(3, 3, 'Cash/Challan', 240, 11560000.00, 2.00);

-- 10. SECTION 4: RESEARCH, PUBLICATIONS & INNOVATION ANALYTICS (AY 2026-2027)
-- Unique publications tracked separately from indexing to avoid double counting
INSERT INTO `research_publications_summary` 
(`college_id`, `academic_year_id`, `unique_publications`, `scopus_count`, `wos_count`, `google_scholar_count`, `journal_papers`, `conference_papers`, `total_citations`, `h_index`, `patents_filed`, `patents_granted`, `papers_per_faculty`, `prev_year_publications`) 
VALUES
(1, 3, 385, 298, 215, 365, 265, 120, 4820, 34, 42, 18, 1.48, 332),
(2, 3, 98, 54, 38, 92, 74, 24, 760, 16, 6, 2, 0.72, 85),
(3, 3, 145, 96, 72, 138, 112, 33, 1420, 22, 12, 4, 1.12, 124),
(4, 3, 184, 142, 98, 175, 128, 56, 1890, 24, 18, 7, 1.53, 155),
(5, 3, 76, 32, 24, 72, 58, 18, 480, 12, 2, 0, 0.76, 68),
(6, 3, 62, 28, 18, 58, 38, 24, 390, 10, 14, 5, 0.86, 52),
(7, 3, 112, 74, 52, 106, 84, 28, 980, 18, 8, 3, 1.02, 96),
(8, 3, 84, 46, 31, 80, 62, 22, 620, 14, 4, 1, 0.69, 74),
(9, 3, 268, 198, 142, 252, 182, 86, 2940, 28, 28, 11, 1.34, 230),
(10, 3, 122, 92, 78, 116, 94, 28, 1750, 21, 10, 4, 1.45, 105);

-- 11. SECTION 6: FACULTY ANALYTICS (AY 2026-2027)
INSERT INTO `faculty_analytics_summary` 
(`college_id`, `academic_year_id`, `total_faculty_strength`, `professors_count`, `associate_professors_count`, `assistant_professors_count`, `phd_qualified_count`, `student_to_faculty_ratio`, `faculty_research_active_pct`, `prev_year_faculty_strength`) 
VALUES
(1, 3, 260, 48, 78, 134, 182, 18.54, 78.50, 245),
(2, 3, 136, 22, 38, 76, 74, 23.16, 52.00, 130),
(3, 3, 130, 28, 42, 60, 92, 17.23, 68.00, 122),
(4, 3, 120, 22, 36, 62, 78, 16.50, 74.00, 112),
(5, 3, 100, 16, 28, 56, 58, 14.20, 48.00, 96),
(6, 3, 72, 10, 20, 42, 32, 16.39, 56.00, 68),
(7, 3, 110, 20, 34, 56, 72, 16.91, 62.00, 104),
(8, 3, 122, 18, 32, 72, 62, 17.21, 50.00, 118),
(9, 3, 200, 34, 58, 108, 134, 17.25, 71.00, 190),
(10, 3, 84, 18, 26, 40, 64, 15.00, 76.00, 80);

-- 12. SECTION 7: ATTENDANCE ANALYTICS (AY 2026-2027)
INSERT INTO `attendance_summary` 
(`college_id`, `academic_year_id`, `overall_attendance_pct`, `students_above_85_pct`, `students_75_to_85_pct`, `students_below_75_pct`, `condonation_eligible_count`, `detained_count`, `prev_year_attendance_pct`) 
VALUES
(1, 3, 86.40, 3120, 1260, 440, 340, 100, 85.10),
(2, 3, 84.80, 1920, 890, 340, 265, 75, 83.90),
(3, 3, 88.90, 1580, 510, 150, 120, 30, 87.50),
(4, 3, 85.70, 1240, 540, 200, 155, 45, 84.80),
(5, 3, 81.60, 780, 410, 230, 170, 60, 80.50),
(6, 3, 87.20, 790, 285, 105, 85, 20, 86.00),
(7, 3, 88.10, 1290, 430, 140, 112, 28, 87.20),
(8, 3, 83.50, 1260, 560, 280, 215, 65, 82.80),
(9, 3, 84.90, 2140, 930, 380, 290, 90, 84.10),
(10, 3, 86.10, 820, 320, 120, 95, 25, 85.30);

-- 13. SECTION 8: PLACEMENT ANALYTICS (AY 2026-2027)
INSERT INTO `placement_summary` 
(`college_id`, `academic_year_id`, `eligible_students`, `placed_students`, `highest_ctc_lpa`, `average_ctc_lpa`, `median_ctc_lpa`, `companies_visited`, `total_offers`, `dream_offers_count`, `prev_year_placed_pct`) 
VALUES
(1, 3, 1150, 1060, 52.00, 9.85, 8.50, 185, 1420, 340, 90.50), -- 92.17%
(2, 3, 720, 625, 18.50, 6.20, 5.80, 92, 780, 110, 84.80),    -- 86.81%
(3, 3, 680, 642, 36.00, 11.40, 10.20, 145, 890, 260, 92.40),  -- 94.41%
(4, 3, 490, 448, 28.00, 8.10, 7.20, 84, 580, 130, 88.50),     -- 91.43%
(5, 3, 320, 245, 12.00, 4.80, 4.20, 48, 290, 25, 73.50),      -- 76.56%
(6, 3, 260, 238, 22.00, 7.40, 6.80, 58, 320, 65, 88.20),      -- 91.54%
(7, 3, 540, 502, 30.00, 10.20, 9.10, 118, 690, 185, 91.00),   -- 92.96%
(8, 3, 480, 408, 15.00, 5.60, 5.10, 64, 495, 55, 82.60),      -- 85.00%
(9, 3, 820, 715, 38.00, 8.40, 7.50, 132, 940, 195, 85.20),    -- 87.20%
(10, 3, 280, 224, 16.00, 5.90, 5.40, 42, 270, 38, 77.50);     -- 80.00%

-- 14. INSTITUTIONAL BENCHMARK TARGETS
INSERT INTO `institutional_kpi_targets` 
(`academic_year_id`, `metric_code`, `metric_title`, `target_value`, `unit_of_measure`, `benchmark_body`) 
VALUES
(3, 'pass_pct', 'Minimum Institutional Pass Rate', 90.00, '%', 'NAAC Criterion II'),
(3, 'fee_collection_pct', 'Annual Fee Realization Rate', 92.00, '%', 'Board of Governors Target'),
(3, 'placement_pct', 'Graduate Employability & Placement', 88.00, '%', 'AICTE / UGC Benchmark'),
(3, 'attendance_pct', 'Minimum Aggregate Class Attendance', 85.00, '%', 'Statutory Academic Regulations'),
(3, 'sfr', 'Student to Faculty Ratio Maximum', 18.00, 'Ratio', 'AICTE Norms (15-20:1)'),
(3, 'phd_pct', 'Faculty Doctoral Qualification Ratio', 60.00, '%', 'NIRF Ranking Parameter');

SET FOREIGN_KEY_CHECKS = 1;

