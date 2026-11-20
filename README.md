# NOVAPORTAL Super Admin Institutional Performance & Analytics Dashboard

## Executive Summary
The **NOVAPORTAL Super Admin Institutional Performance & Analytics Dashboard** provides a unified, consolidated, real-time analytics command center for senior university leadership (Chancellor, Vice Chancellor, Board of Governors, Deans). 

It presents a single-page scrollable analytics overview covering all **10 university faculties** across both the **Bangalore (BLR)** and **Kochi (KOCHI)** campuses without requiring module hopping or separate page reloads.

---

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS ES6+), Bootstrap 5, Bootstrap Icons, Apache ECharts 5.5.
- **Backend**: CodeIgniter 4 (PHP 7.4 / 8.1+), MVC Architecture, PSR-4 Autoloading.
- **Database**: MySQL 8.0+ / MariaDB 10.5+ with InnoDB storage engine.
- **Security**: Super Admin Role-Based Access Control (`hierarchy_level = 99`), Query Builder Parameterized Queries, XSS sanitization (`esc()`), CSRF protection, and privacy aggregation controls.

---

## Faculties (Colleges) Included

| ID | College Code | Full College Name | Campus | Established |
| :---: | :--- | :--- | :---: | :---: |
| **1** | `FET-BLR` | Faculty of Engineering and Technology - BLR | BLR | 2005 |
| **2** | `FCOM-BLR` | Faculty of Commerce - BLR | BLR | 2008 |
| **3** | `FMS-BLR` | Faculty of Management Studies - BLR | BLR | 2006 |
| **4** | `FAC-KOC` | Faculty of Applied Computing - Kochi | KOCHI | 2014 |
| **5** | `FAHSS-KOC` | Faculty of Arts, Humanities and Social Sciences - Kochi | KOCHI | 2012 |
| **6** | `FCD-KOC` | Faculty of Creativity and Design - Kochi | KOCHI | 2016 |
| **7** | `FMS-KOC` | Faculty of Management Studies - Kochi | KOCHI | 2013 |
| **8** | `FCOM-KOC` | Faculty of Commerce - Kochi | KOCHI | 2013 |
| **9** | `FET-KOC` | Faculty of Engineering and Technology - Kochi | KOCHI | 2011 |
| **10**| `FBAS-KOC` | Faculty of Basic and Applied Sciences - Kochi | KOCHI | 2015 |

---

## Global Filter Suite & Multi-Select Engine
- **Academic Year**: `2026-2027` (Current), `2025-2026`, `2024-2025`.
- **Term / Semester**: All Semesters, Odd Semesters, Even Semesters, Semester 1 to Semester 8.
- **Campus**: All Campuses, Bangalore (BLR), Kochi (KOCHI).
- **College Multi-Select Dropdown**:
  - `Select All 10 Colleges` toggle.
  - Granular checkboxes for each individual faculty.
  - Dynamic campus linking: Changing campus from "All" to "BLR" automatically selects only the 3 Bangalore faculties.
  - Badge and live label indicate active count (e.g. `All Colleges (10/10)`, `3 Colleges Selected`, `FET-BLR, FMS-BLR`).
  - Zero-page-reload live updates across all KPI cards, Apache ECharts, data tables, and scorecards!
- **Reset Filters**: One-click restoration of institutional default presets.
- **Export**: Generates JSON analytics snapshot or PDF printout.

---

## 9 Unified Analytics Sections
1. **Executive KPI Cards**: 8 cards (Student Strength, Faculty Strength, Fee Demand, Fee Collection, Pass %, Research Publications, Placement Rate, Attendance %) with YoY trend badges.
2. **Academic Performance**: College-wise pass % horizontal bar with 80% benchmark markLine, current vs previous term grouped bar, UG vs PG pass rate donut, and interactive department drill-down.
3. **Financial Performance**: Fee Demand vs Collection vs Outstanding stacked bars, 12-month collection trajectory (Apr to Mar) with regional BLR vs KOCHI cash flows, and payment channels breakdown (UPI, Net Banking, Cards, RTGS, Cash).
4. **Research & Innovation**: De-duplicated unique papers vs indexing (Scopus, WoS, Google Scholar), patents filed vs granted, citations, and papers per faculty ratio.
5. **Student Analytics**: Total enrollment headcounts, UG/PG/PhD proportions, and 3-stage admissions conversion funnel (Applications -> Intake -> Confirmed).
6. **Faculty Analytics**: Academic cadre breakdown (Professors, Associate, Assistant), PhD-qualified ratio, and Student-to-Faculty Ratio (SFR) with AICTE/UGC benchmark reference lines (15:1 & 20:1).
7. **Attendance & Examination**: Attendance compliance horizontal bar with 75% cutoff line, below 75% risk count (condonation and detention tallies).
8. **Placement Analytics**: Placement percentage comparison with 88% target benchmark line, CTC package analysis (Highest, Average, Median in LPA), and corporate offers.
9. **Management Insights**: Transparent top 5 and bottom 5 ranked scorecards (weighted by pass rate, placement, fee collection, research, and SFR), actionable fee collection risk alerts, and institutional benchmark scorecard.

---

## Documentation Deliverables
- [Database Table & Field Mapping Specification](file:///d:/DESIGN_A/Dashboard/docs/DATABASE_MAPPING.md)
- [REST API Endpoint Documentation](file:///d:/DESIGN_A/Dashboard/docs/API_DOCUMENTATION.md)
- [Security & Performance Architecture](file:///d:/DESIGN_A/Dashboard/docs/SECURITY_PERFORMANCE.md)
- [Testing & Verification Checklist](file:///d:/DESIGN_A/Dashboard/docs/TESTING_CHECKLIST.md)

---

## Quick Start & Verification
1. Open `public/index.html` directly in any web browser to view the interactive dashboard with live Apache ECharts visualizations.
2. In a PHP / CodeIgniter 4 environment:
   ```bash
   php spark serve --port 8080
   ```
   Navigate to `http://localhost:8080/superadmin/dashboard`.
3. To import the schema and master seed data into MySQL:
   ```bash
   mysql -u root -p novaportal_erp < database/novaportal_dashboard_schema.sql
   mysql -u root -p novaportal_erp < database/seed_dashboard_data.sql
   ```

