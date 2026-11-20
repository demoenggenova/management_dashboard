# NOVAPORTAL Super Admin Dashboard - Verification & Testing Checklist

## 1. Scope of Verification
This checklist verifies data accuracy, formula consistency, responsive rendering, and multi-college selection across all 10 faculties and both campuses (BLR & KOCHI).

---

## 2. Test Execution Matrix

### 2.1 Campus & College Multi-Select Filtering
- [x] **"All Colleges" Selected**: Dashboard aggregates all 10 faculties (FET-BLR, FCOM-BLR, FMS-BLR, FAC-KOC, FAHSS-KOC, FCD-KOC, FMS-KOC, FCOM-KOC, FET-KOC, FBAS-KOC).
- [x] **Campus Filter = BLR**: Multi-select dropdown checks only 3 Bangalore faculties. All charts and KPI cards update to Bangalore totals.
- [x] **Campus Filter = KOCHI**: Multi-select dropdown checks only 7 Kochi faculties. All charts and KPI cards update to Kochi totals.
- [x] **Individual College Multi-Selection**: Selecting 2 colleges (e.g. `FET-BLR` + `FET-KOC`) isolates comparative charts to those two engineering faculties.
- [x] **Single College Selection**: Focusing on an individual college displays its specific metrics and enables granular department drill-down.
- [x] **"Reset Filters" Action**: Reverts all filters back to Academic Year 2026-2027, All Campuses, and All 10 Colleges.

---

### 2.2 Mathematical Formulas & Calculations Validation
- [x] **Pass Percentage**:
  - `Pass % = (Passed Students / Appeared Students) * 100`
  - Division by zero tested (returns 0.00% without PHP fatal error).
- [x] **Fee Collection Percentage**:
  - `Collection % = (Collected Amount / Total Demand) * 100`
  - Outstanding = `Demand - Collected` verified to the exact rupee.
- [x] **Placement Percentage**:
  - `Placement % = (Placed Students / Eligible Students) * 100`
- [x] **Research Non-Duplication**:
  - `unique_publications` <= `scopus_count + wos_count + google_scholar_count`.
  - Unique publication tally reflects de-duplicated papers count accurately.
- [x] **Student-to-Faculty Ratio (SFR)**:
  - `SFR = Total Enrolled Students / Total Active Faculty`.
  - Values match UGC/AICTE norms (15:1 to 23:1).
- [x] **Doctoral Faculty Ratio**:
  - `PhD % = (PhD Qualified Faculty / Total Faculty) * 100`.

---

### 2.3 Section-by-Section Visual & Functional Tests

| Section | Component | Test Criteria | Status |
| :--- | :--- | :--- | :---: |
| **Header & Filter Bar** | NOVAPORTAL Brand & Super Admin Badge | Clear branding, current date/AY badge, responsive wrap on mobile | Passed |
| **Section 1: KPIs** | 8 KPI Cards | Values, currency formatting, YoY comparison badges, sparklines | Passed |
| **Section 2: Academics** | College Pass % Comparison | Horizontal bar chart with all 10 colleges, 80% benchmark markLine | Passed |
| | Current vs Previous Semester | Grouped bar chart comparing Odd 26-27 vs Even 25-26 | Passed |
| | UG vs PG Pass Rate | Split cards and comparative progress bars | Passed |
| | Department Drill-Down | Interactive table / chart drill-down on college selection | Passed |
| **Section 3: Finance** | Demand vs Collection | Stacked bar chart in Crores / Lakhs | Passed |
| | Monthly Trend (Apr-Mar) | Multi-series area chart | Passed |
| | BLR vs KOCHI Collections | Dual area chart comparing regional cash flows | Passed |
| | Payment Modes Split | Donut chart with UPI, Net Banking, Cards, RTGS, Cash | Passed |
| **Section 4: Research** | Unique vs Indexing | Grouped bars showing Unique, Scopus, WoS, Google Scholar | Passed |
| | Patents & Citations | Patents filed vs granted, total citations, h-index cards | Passed |
| | Papers per Faculty | Faculty productivity ratio per college | Passed |
| **Section 5: Students** | Total Strength per College | Ranked bar chart for 10 colleges | Passed |
| | UG / PG / PhD Distribution | Multi-bar stacked breakdown | Passed |
| | Admissions Conversion | Funnel chart: Applications -> Confirmed admissions | Passed |
| | Dropout & Discontinuation | Low-rate attrition analysis | Passed |
| **Section 6: Faculty** | Cadre Distribution | Professors, Associate, Assistant stacked bars | Passed |
| | PhD Qualification % | Percentage gauge / ranked bars | Passed |
| | Student-Faculty Ratio | Benchmark comparison line at 15:1 and 20:1 | Passed |
| **Section 7: Attendance** | College Attendance % | Horizontal bars with 75% statutory threshold | Passed |
| | Below 75% Risk Analysis | Condonation and detention count tallies | Passed |
| | Exam Grading Breakdown | Distinction, First Class, Pass, Arrear distribution | Passed |
| **Section 8: Placements** | Placement Rate % | Ranked bar chart | Passed |
| | CTC Analysis (LPA) | Highest package vs Average package vs Median package | Passed |
| | Corporate Offers | Total offers, dream offers (>=10 LPA), companies visited | Passed |
| **Section 9: Insights** | Top 5 Performing Faculties | Transparent ranked scorecard with multi-metric breakdown | Passed |
| | Bottom 5 Improving Faculties| Highlighted improvement areas and interventions | Passed |
| | Fee Risks & Alerts | Actionable overdue fee alerts (>₹20 Cr or <88%) | Passed |
| | Target vs Actual Performance | Target comparison against institutional objectives | Passed |

---

### 2.4 Browser & Device Responsiveness
- [x] **Desktop (1920x1080 & 1440x900)**: Clean multi-column grids, readable charts, full layout stability.
- [x] **Laptop & Tablet (1024x768 & 768x1024)**: Responsive 2-column card wrapping, responsive ECharts redraw.
- [x] **Mobile (375x812 & 412x915)**: Single-column scrollable layout, horizontal scroll for tables, touch-friendly filter dropdowns.

