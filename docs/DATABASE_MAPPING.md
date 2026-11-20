# NOVAPORTAL Super Admin Dashboard - Database Table & Field Mapping Specification

This document maps every single KPI, analytics section, formula, and chart requirement to the underlying MySQL database tables, column fields, and data types in `novaportal_erp`.

---

## 1. Executive KPI Cards (Section 1)

| KPI Card | Formula / Calculation | Primary Table & Fields | Secondary / Comparison Source | Fallback / Condition |
| :--- | :--- | :--- | :--- | :--- |
| **1. Total Student Strength** | `SUM(total_student_strength)` | `student_analytics_summary.total_student_strength` (INT) | `SUM(prev_year_strength)` for YoY Delta % | If missing: "Data Not Available" |
| **2. Total Faculty Strength** | `SUM(total_faculty_strength)` | `faculty_analytics_summary.total_faculty_strength` (INT) | `SUM(prev_year_faculty_strength)` for YoY Delta % | Validated against active employee master |
| **3. Total Fee Demand** | `SUM(fee_demand)` | `finance_fee_summary.fee_demand` (DECIMAL 15,2) | Aggregated across selected faculties | Formatted in INR Crores / Lakhs |
| **4. Total Fee Collection** | `SUM(fee_collected)` | `finance_fee_summary.fee_collected` (DECIMAL 15,2) | `SUM(prev_year_collected)` for YoY growth % | Collection % = `(Collected / Demand) * 100` |
| **5. Overall Pass Percentage** | `(SUM(passed) / SUM(appeared)) * 100` | `academic_exam_summary.passed_students`, `academic_exam_summary.appeared_students` | `academic_exam_summary.prev_semester_pass_pct` | Safe division by zero guard |
| **6. Total Research Publications** | `SUM(unique_publications)` | `research_publications_summary.unique_publications` (INT) | `SUM(prev_year_publications)` for YoY growth % | De-duplicated unique papers count |
| **7. Overall Placement Percentage**| `(SUM(placed) / SUM(eligible)) * 100` | `placement_summary.placed_students`, `placement_summary.eligible_students` | `placement_summary.prev_year_placed_pct` | Safe division by zero guard |
| **8. Overall Attendance Percentage**| `AVG(overall_attendance_pct)` weighted by student count | `attendance_summary.overall_attendance_pct`, `student_analytics_summary.total_student_strength` | `attendance_summary.prev_year_attendance_pct` | Weighted mean |

---

## 2. Academic Performance (Section 2)

| Analytics Component | Formula / Calculation | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **College-wise Pass % Comparison** | `(passed_students / appeared_students) * 100` | `academic_exam_summary` JOIN `erp_colleges` | `erp_colleges.short_name`, `academic_exam_summary.passed_students`, `academic_exam_summary.appeared_students` |
| **Current vs Previous Semester** | `current_pass_pct` vs `prev_semester_pass_pct` | `academic_exam_summary` | `pass_percentage`, `prev_semester_pass_pct` |
| **UG vs PG Pass Percentage** | `SUM(passed) / SUM(appeared) * 100` grouped by `degree_level` | `academic_exam_summary` | `degree_level` IN ('ug', 'pg') |
| **Student Tallies** | Raw counts | `academic_exam_summary` | `appeared_students`, `passed_students`, `failed_students`, `arrear_students` |
| **Department Drill-down** | Department pass % grouped by `dept_id` | `academic_exam_summary` JOIN `acad_departments` | `acad_departments.dept_name`, `academic_exam_summary.pass_percentage` |

---

## 3. Financial Performance (Section 3)

| Analytics Component | Formula / Calculation | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **Demand vs Collection vs Outstanding** | `fee_demand`, `fee_collected`, `fee_outstanding = demand - collected` | `finance_fee_summary` | `fee_demand`, `fee_collected`, `fee_outstanding` |
| **Monthly Collection Trend** | Monthly breakdown (Apr to Mar) | `finance_monthly_collections` | `month_index`, `month_label`, `collected_amount` |
| **BLR vs KOCHI Collection Trend** | `SUM(collected_amount)` grouped by `campus_code` and `month_index` | `finance_monthly_collections` JOIN `erp_colleges` | `erp_colleges.campus_code`, `finance_monthly_collections.collected_amount` |
| **College-wise Collection %** | `(fee_collected / fee_demand) * 100` | `finance_fee_summary` | `collection_percentage` |
| **Payment Modes Distribution** | `SUM(total_amount)` and `SUM(transaction_count)` by mode | `finance_payment_modes` | `payment_mode`, `total_amount`, `transaction_count` |
| **YoY Collection Growth** | `((collected - prev_year_collected) / prev_year_collected) * 100` | `finance_fee_summary` | `prev_year_collected`, `yoy_collection_growth_pct` |

---

## 4. Research & Innovation (Section 4)

| Analytics Component | Metric Meaning & Formula | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **Unique Publications** | De-duplicated count across all repositories | `research_publications_summary` | `unique_publications` |
| **Scopus Count** | Papers indexed in Elsevier Scopus | `research_publications_summary` | `scopus_count` |
| **Web of Science (WoS)** | Papers indexed in Clarivate WoS | `research_publications_summary` | `wos_count` |
| **Google Scholar Count** | Google Scholar indexed papers | `research_publications_summary` | `google_scholar_count` |
| **Journal vs Conference** | Type split | `research_publications_summary` | `journal_papers`, `conference_papers` |
| **Research Citations** | Total citation count and avg per paper | `research_publications_summary` | `total_citations`, `avg_citations_per_paper`, `h_index` |
| **Patents Status** | Intellectual property asset generation | `research_publications_summary` | `patents_filed`, `patents_granted` |
| **Papers per Faculty** | `unique_publications / total_faculty_strength` | `research_publications_summary` | `papers_per_faculty` |

---

## 5. Student Analytics (Section 5)

| Analytics Component | Formula / Calculation | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **College-wise Student Strength** | Total headcounts per faculty | `student_analytics_summary` | `total_student_strength` |
| **UG vs PG vs PhD Strength** | Proportion breakdown | `student_analytics_summary` | `ug_student_strength`, `pg_student_strength`, `phd_student_strength` |
| **New Admissions Comparison** | Intake Capacity vs Confirmed Admissions | `student_analytics_summary` | `admission_intake_capacity`, `confirmed_admissions` |
| **Conversion Percentage** | `(confirmed_admissions / admission_applications) * 100` | `student_analytics_summary` | `admission_applications`, `confirmed_admissions`, `admission_conversion_pct` |
| **Dropouts & Discontinuations** | Rate: `(student_dropouts / total_strength) * 100` | `student_analytics_summary` | `student_dropouts`, `student_discontinuations`, `dropout_rate_pct` |
| **YoY Strength Growth** | `((current - prev_year) / prev_year) * 100` | `student_analytics_summary` | `prev_year_strength`, `yoy_growth_pct` |

---

## 6. Faculty Analytics (Section 6)

| Analytics Component | Formula / Calculation | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **College-wise Faculty Strength** | Total active academic staff | `faculty_analytics_summary` | `total_faculty_strength` |
| **Cadre Distribution** | Professors, Associate, Assistant | `faculty_analytics_summary` | `professors_count`, `associate_professors_count`, `assistant_professors_count` |
| **Doctoral Qualification** | `(phd_qualified_count / total_faculty_strength) * 100` | `faculty_analytics_summary` | `phd_qualified_count`, `phd_percentage` |
| **Student-to-Faculty Ratio (SFR)** | `total_student_strength / total_faculty_strength` | Derived from `student_analytics_summary` & `faculty_analytics_summary` | `student_to_faculty_ratio` |
| **Research Active Faculty %** | Percentage with active grant or publication | `faculty_analytics_summary` | `faculty_research_active_pct` |

---

## 7. Attendance & Examination (Section 7)

| Analytics Component | Formula / Calculation | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **College-wise Attendance %** | Institutional average | `attendance_summary` | `overall_attendance_pct` |
| **Attendance Below 75%** | Students at risk of condonation / detention | `attendance_summary` | `students_below_75_pct`, `condonation_eligible_count`, `detained_count` |
| **Distinction & First Class** | High academic achievement counts | `academic_exam_summary` | `distinction_count`, `first_class_count` |
| **Arrear / Backlog Tallies** | Uncleared courses count | `academic_exam_summary` | `arrear_students` |

---

## 8. Placement Analytics (Section 8)

| Analytics Component | Formula / Calculation | Source Table | Key Fields |
| :--- | :--- | :--- | :--- |
| **Placement Percentage** | `(placed_students / eligible_students) * 100` | `placement_summary` | `eligible_students`, `placed_students`, `placement_percentage` |
| **Salary Packages (CTC)** | In Lakhs Per Annum (LPA) | `placement_summary` | `highest_package_lpa`, `average_package_lpa`, `median_package_lpa` |
| **Corporate Engagement** | Companies visited and job offers | `placement_summary` | `companies_visited`, `total_offers`, `dream_offers_count` |
| **YoY Placement Delta** | `current_placement_pct - prev_year_placed_pct` | `placement_summary` | `prev_year_placed_pct` |

---

## 9. Management Insights & Scorecard (Section 9)

| Insight Metric | Transparent Methodology | Source Tables | Evaluation Threshold |
| :--- | :--- | :--- | :--- |
| **Top 5 Faculties** | Transparent multi-criteria scoring: Academic Pass % (25%), Placement % (25%), Fee Collection % (20%), Research Output (15%), SFR Compliance (15%) | `academic_exam_summary`, `placement_summary`, `finance_fee_summary`, `research_publications_summary`, `faculty_analytics_summary` | Ranked 1 to 5 |
| **Bottom 5 Faculties** | Faculties with lowest aggregate compliance requiring institutional intervention | Same as above | Ranked 6 to 10 with key bottleneck tags |
| **Fee Collection Risks** | Outstanding balance > ₹20 Crore or Collection % < 88% | `finance_fee_summary` | Alert badge: Urgent / Moderate |
| **Target vs Actual** | Difference between Institutional KPI Target and Actual Aggregate | `institutional_kpi_targets` JOIN real aggregates | Status: Exceeded / Achieved / Underperformed |

---

## 10. All 10 Institutional Faculties Mapping

| College ID | College Code | Full College Name | Campus | Faculty Category | Established |
| :---: | :--- | :--- | :---: | :--- | :---: |
| **1** | `FET-BLR` | Faculty of Engineering and Technology - BLR | BLR | Engineering | 2005 |
| **2** | `FCOM-BLR` | Faculty of Commerce - BLR | BLR | Commerce | 2008 |
| **3** | `FMS-BLR` | Faculty of Management Studies - BLR | BLR | Management | 2006 |
| **4** | `FAC-KOC` | Faculty of Applied Computing - Kochi | KOCHI | Applied Computing | 2014 |
| **5** | `FAHSS-KOC` | Faculty of Arts, Humanities and Social Sciences - Kochi | KOCHI | Humanities | 2012 |
| **6** | `FCD-KOC` | Faculty of Creativity and Design - Kochi | KOCHI | Design | 2016 |
| **7** | `FMS-KOC` | Faculty of Management Studies - Kochi | KOCHI | Management | 2013 |
| **8** | `FCOM-KOC` | Faculty of Commerce - Kochi | KOCHI | Commerce | 2013 |
| **9** | `FET-KOC` | Faculty of Engineering and Technology - Kochi | KOCHI | Engineering | 2011 |
| **10**| `FBAS-KOC` | Faculty of Basic and Applied Sciences - Kochi | KOCHI | Basic Sciences | 2015 |

