<?= $this->include('layouts/header') ?>

      <!-- DASHBOARD INNER HEADER -->
      <div class="dashboard-page-header">
        <div>
          <h2 class="dashboard-title-main">Dashboard</h2>
          <p class="text-muted small m-0">University Leadership Performance & Strategic Monitoring Suite</p>
        </div>

      </div>

      <!-- ------------------------------------------------------------------- -->
      <!-- SECTION: E-NOTIFICATION (WORKFLOW APPROVALS TABLE)                   -->
      <!-- ------------------------------------------------------------------- -->
      <div class="e-notification-card" id="eNotificationSection">
        <h3 class="gold-section-title">
          <i class="bi bi-bell-fill"></i> e-Notification
        </h3>

        <!-- Subtab links: Waiting on me, My Open, My All, All -->
        <div class="subtab-links">
          <a href="javascript:void(0)" class="subtab-link active" onclick="switchNotificationTab(this, 'waiting')">Waiting on me</a>
          <a href="javascript:void(0)" class="subtab-link" onclick="switchNotificationTab(this, 'open')">My Open</a>
          <a href="javascript:void(0)" class="subtab-link" onclick="switchNotificationTab(this, 'myall')">My All</a>
          <a href="javascript:void(0)" class="subtab-link" onclick="switchNotificationTab(this, 'all')">All</a>
        </div>

        <!-- Controls: Records count and Search box -->
        <div class="table-controls-row">
          <div class="d-flex align-items-center gap-2">
            <select class="form-select form-select-sm" style="width: 85px;">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50" selected>50</option>
              <option value="100">100</option>
            </select>
            <span class="text-muted small">Records</span>
          </div>

          <div class="position-relative">
            <input type="text" id="notificationSearch" class="search-input-rounded" placeholder="Search workflow...">
          </div>
        </div>

        <!-- ERP Table -->
        <div class="table-responsive">
          <table class="enterprise-table" id="eNotificationTable">
            <thead>
              <tr>
                <th>ID <i class="bi bi-arrow-down-up small text-muted"></i></th>
                <th>Module</th>
                <th>Workflow Type</th>
                <th>Title</th>
                <th>Reported By</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Updated By</th>
                <th>Created On</th>
                <th>Last Updated On</th>
              </tr>
            </thead>
            <tbody id="notificationTableBody">
              <tr class="clickable-wf-row" onclick="openWorkflowDetailModal('WF-9821')" title="Click to view query details and document verification">
                <td class="fw-bold text-primary">#WF-9821 <i class="bi bi-box-arrow-up-right small text-muted ms-1"></i></td>
                <td><span class="badge bg-light text-dark border">Finance</span></td>
                <td>Annual Day Budget Sanction</td>
                <td class="fw-semibold">FET BLR - Request to Sanction for 4 Lakhs Amount for Annual day</td>
                <td>Dr. R. K. Narayanan (Dean)</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">Super Admin</span></td>
                <td><span class="badge bg-danger">High</span></td>
                <td>Finance Officer</td>
                <td>17-11-2026</td>
                <td>18-11-2026 09:30</td>
              </tr>
              <tr class="clickable-wf-row" onclick="openWorkflowDetailModal('WF-9818')" title="Click to view query details and document verification">
                <td class="fw-bold text-primary">#WF-9818 <i class="bi bi-box-arrow-up-right small text-muted ms-1"></i></td>
                <td><span class="badge bg-light text-dark border">Finance</span></td>
                <td>Fee Concession Approval</td>
                <td class="fw-semibold">FMS-KOC: Merit-cum-Means Scholarships Batch 2026-27 (₹14.2 L)</td>
                <td>Dr. K. S. Pillai (Dean)</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">Super Admin</span></td>
                <td><span class="badge bg-warning text-dark">Medium</span></td>
                <td>Accounts Officer</td>
                <td>16-11-2026</td>
                <td>18-11-2026 10:15</td>
              </tr>
              <tr class="clickable-wf-row" onclick="openWorkflowDetailModal('WF-9804')" title="Click to view query details and document verification">
                <td class="fw-bold text-primary">#WF-9804 <i class="bi bi-box-arrow-up-right small text-muted ms-1"></i></td>
                <td><span class="badge bg-light text-dark border">HR & Faculty</span></td>
                <td>Faculty Recruitment Sanction</td>
                <td class="fw-semibold">FAC-KOC: Sanction for 4 Associate Professors (AI & Cloud)</td>
                <td>Dr. George Mathew (Dean)</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">Super Admin</span></td>
                <td><span class="badge bg-primary">Normal</span></td>
                <td>Registrar Office</td>
                <td>15-11-2026</td>
                <td>17-11-2026 14:20</td>
              </tr>
              <tr class="clickable-wf-row" onclick="openWorkflowDetailModal('WF-9799')" title="Click to view query details and document verification">
                <td class="fw-bold text-primary">#WF-9799 <i class="bi bi-box-arrow-up-right small text-muted ms-1"></i></td>
                <td><span class="badge bg-light text-dark border">Research</span></td>
                <td>Incentive Grant Disbursement</td>
                <td class="fw-semibold">FET-KOC: Publication Incentive for 12 Scopus Q1 Journals</td>
                <td>Dr. Suresh Kumar N. (Dean)</td>
                <td><span class="badge bg-primary bg-opacity-10 text-primary">Super Admin</span></td>
                <td><span class="badge bg-primary">Normal</span></td>
                <td>Dean Research</td>
                <td>14-11-2026</td>
                <td>17-11-2026 16:45</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex align-items-center justify-content-between text-muted small mt-2">
          <span>Showing 1 to 4 of 4 entries</span>
          
        </div>
      </div>

      <!-- =================================================================== -->
      <!-- GLOBAL STICKY FILTER BAR WITH LIVE ERP SYNC STATUS                   -->
      <!-- =================================================================== -->
      <section class="filter-bar-sticky">
        
        <!-- Live ERP Sync & Institutional Scope Ribbon -->
        <div class="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <span class="erp-sync-pill">
              <span class="sync-pulse"></span>
              <span>Last ERP Sync: <strong id="lblLastSyncTime">19-Nov-2026 13:04:00 IST</strong></span>
              <span class="badge bg-success bg-opacity-10 text-success border border-success-subtle">LIVE</span>
            </span>
            <span class="text-muted small d-none d-md-inline">&bull; Consolidated Institutional Performance Data Feed</span>
          </div>

          <!-- 3 Comparison Views (Requirement 6: All Colleges, BLR vs KOCHI, Individual College) -->
          <div class="d-flex align-items-center gap-2">
            <div class="view-mode-pill-group" id="groupComparisonViews">
              <button type="button" class="view-mode-pill active" id="btnViewAllColleges" onclick="window.setComparisonView('all')">
                <i class="bi bi-grid-3x3-gap-fill"></i> All 10 Colleges
              </button>
              <button type="button" class="view-mode-pill" id="btnViewBlrVsKochi" onclick="window.setComparisonView('campus')">
                <i class="bi bi-buildings-fill"></i> BLR vs KOCHI
              </button>
              <button type="button" class="view-mode-pill" id="btnViewIndividual" onclick="window.setComparisonView('college')">
                <i class="bi bi-building"></i> Individual College
              </button>
            </div>
            <span class="badge bg-light text-primary border" id="badgeActiveFilterScope"><i class="bi bi-funnel-fill text-primary me-1"></i>Scope: All 10 Colleges &bull; Consolidated</span>
          </div>
        </div>

        <!-- 6-Vector Unified Global Filter Bar (Requirement 1) -->
        <div class="row g-2 align-items-center">
          
          <!-- 1. Academic Year -->
          <div class="col-12 col-sm-6 col-md-4 col-xl-2">
            <label for="filterAcademicYear" class="filter-label">
              <i class="bi bi-calendar3"></i> Academic Year
            </label>
            <select id="filterAcademicYear" class="form-select form-select-sm">
              <option value="2026-2027" selected>2026-2027 (Current AY)</option>
              <option value="2025-2026">2025-2026 (Previous AY)</option>
              <option value="2024-2025">2024-2025 (Archived)</option>
            </select>
          </div>

          <!-- 2. Term / Semester -->
          <div class="col-12 col-sm-6 col-md-4 col-xl-2">
            <label for="filterSemester" class="filter-label">
              <i class="bi bi-layers"></i> Term / Semester
            </label>
            <select id="filterSemester" class="form-select form-select-sm">
              <option value="all" selected>All Semesters (Consolidated)</option>
              <option value="odd">Odd Semesters (1, 3, 5, 7)</option>
              <option value="even">Even Semesters (2, 4, 6, 8)</option>
              <option value="SEM-1">Semester 1</option>
              <option value="SEM-3">Semester 3</option>
              <option value="SEM-5">Semester 5</option>
              <option value="SEM-7">Semester 7</option>
            </select>
          </div>

          <!-- 3. Campus Location -->
          <div class="col-12 col-sm-6 col-md-4 col-xl-2">
            <label for="filterCampus" class="filter-label">
              <i class="bi bi-geo-alt"></i> Campus Location
            </label>
            <select id="filterCampus" class="form-select form-select-sm">
              <option value="ALL" selected>All Campuses (BLR &amp; KOCHI)</option>
              <option value="BLR">Bangalore Campus (3 Faculties)</option>
              <option value="KOCHI">Kochi Campus (7 Faculties)</option>
            </select>
          </div>

          <!-- 4. Constituent College -->
          <div class="col-12 col-sm-6 col-md-4 col-xl-2">
            <label for="filterCollege" class="filter-label">
              <i class="bi bi-buildings"></i> College / Faculty
            </label>
            <select id="filterCollege" class="form-select form-select-sm">
              <option value="all" selected>All 10 Faculties</option>
              <option value="1">FET - Engg &amp; Tech (BLR)</option>
              <option value="2">FCOM - Commerce (BLR)</option>
              <option value="3">FMS - Management Studies (BLR)</option>
              <option value="4">FAC - Arts &amp; Commerce (KOC)</option>
              <option value="5">FAHSS - Humanities &amp; Social Sci (KOC)</option>
              <option value="6">FCD - Creative Arts &amp; Design (KOC)</option>
              <option value="7">FMS - Management Studies (KOC)</option>
              <option value="8">FCOM - Commerce (KOC)</option>
              <option value="9">FET - Engineering &amp; Tech (KOC)</option>
              <option value="10">FBAS - Basic &amp; Applied Sciences (KOC)</option>
            </select>
          </div>

          <!-- 5. Programme Cadre -->
          <div class="col-12 col-sm-6 col-md-4 col-xl-2">
            <label for="filterProgramme" class="filter-label">
              <i class="bi bi-mortarboard"></i> Programme Cadre
            </label>
            <select id="filterProgramme" class="form-select form-select-sm">
              <option value="all" selected>All Programmes (UG, PG, Ph.D)</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="PHD">Doctoral Research (Ph.D)</option>
            </select>
          </div>

          <!-- 6. Department -->
          <div class="col-12 col-sm-6 col-md-4 col-xl-2">
            <label for="filterDepartment" class="filter-label">
              <i class="bi bi-diagram-2"></i> Department
            </label>
            <select id="filterDepartment" class="form-select form-select-sm">
              <option value="all" selected>All Departments</option>
            </select>
          </div>

        </div>

        <!-- Filter Action Toolbar -->
        <div class="d-flex align-items-center justify-content-between mt-2 pt-2 border-top flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <button type="button" id="btnApplyGlobalFilters" class="btn btn-sm btn-primary px-3 py-1 fw-semibold">
              <i class="bi bi-funnel me-1"></i> Apply Filters
            </button>
            <button type="button" id="btnResetGlobalFilters" class="btn btn-sm btn-outline-secondary px-3 py-1">
              <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
            </button>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="text-xs text-muted" id="txtFilterStatusMessage">Filtered against actual ERP database records</span>
          </div>
        </div>

      </section>

      <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 1: EXECUTIVE KPI CARDS                                    -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionKpis" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-speedometer2"></i></span>
                Executive KPI Scorecard
              </h2>
              <p class="section-subtitle">Real-time macro indicators aggregated across active university filters</p>
            </div>
            <span class="badge bg-light text-secondary border">Academic Year 2026-2027</span>
          </div>

          <!-- 8 Executive Cards Grid (Click any card or number to open Detailed Current vs Previous Comparison) -->
          <div class="row g-3">
            
            <!-- 1. Total Student Strength -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiStudents" data-kpi="student_strength" onclick="openKpiCompareModal('student_strength')" title="Click to view detailed Current vs Previous Academic Year student comparison">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Total Student Strength</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#eff6ff; color:#2563eb;">
                    <i class="bi bi-mortarboard-fill"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiStudentStrength">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiStudentTrend">
                      <i class="bi bi-arrow-up-right"></i> +5.34%
                    </span>
                    <span class="kpi-context-note" id="kpiStudentSubtext">vs Prev AY</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. Total Faculty Strength -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiFaculty" data-kpi="faculty_strength" onclick="openKpiCompareModal('faculty_strength')" title="Click to view detailed Current vs Previous faculty cadre comparison">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Total Faculty Strength</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#f5f3ff; color:#8b5cf6;">
                    <i class="bi bi-person-workspace"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiFacultyStrength">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiFacultyTrend">
                      <i class="bi bi-arrow-up-right"></i> +5.21%
                    </span>
                    <span class="kpi-context-note" id="kpiFacultySubtext">Active Faculty</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. Total Fee Demand -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiDemand" data-kpi="fee_demand" onclick="openKpiCompareModal('fee_demand')" title="Click to view detailed Current vs Previous fee demand comparison">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Total Fee Demand</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#fffbeb; color:#d97706;">
                    <i class="bi bi-receipt-cutoff"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiFeeDemand">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiDemandTrend">
                      <i class="bi bi-arrow-up-right"></i> +8.7% YoY
                    </span>
                    <span class="kpi-context-note" id="kpiDemandSubtext">Approved Budget</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. Total Fee Collection -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiCollection" data-kpi="fee_collection" onclick="openKpiCompareModal('fee_collection')" title="Click to view detailed Current vs Previous fee collection & recovery comparison">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Total Fee Collection</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#ecfdf5; color:#10b981;">
                    <i class="bi bi-cash-coin"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiFeeCollection">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiCollectionTrend">
                      <i class="bi bi-arrow-up-right"></i> 90.18% Rate
                    </span>
                    <span class="kpi-context-note" id="kpiCollectionSubtext">Realized Amount</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 5. Overall Pass Percentage -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiPass" data-kpi="pass_percentage" onclick="openKpiCompareModal('pass_percentage')" title="Click to view detailed Current vs Previous semester examination outcomes">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Overall Pass Percentage</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#f0fdf4; color:#16a34a;">
                    <i class="bi bi-award-fill"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiPassPercentage">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiPassTrend">
                      <i class="bi bi-arrow-up-right"></i> +1.83%
                    </span>
                    <span class="kpi-context-note" id="kpiPassSubtext">Passed / Appeared</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 6. Total Research Publications -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiResearch" data-kpi="research_publications" onclick="openKpiCompareModal('research_publications')" title="Click to view detailed Current vs Previous research publication comparison">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Research Publications</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#eff6ff; color:#3b82f6;">
                    <i class="bi bi-journal-richtext"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiResearchPublications">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiResearchTrend">
                      <i class="bi bi-arrow-up-right"></i> +14.3% YoY
                    </span>
                    <span class="kpi-context-note" id="kpiResearchSubtext">Unique Peer-Reviewed</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 7. Overall Placement Percentage -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiPlacement" data-kpi="placement_percentage" onclick="openKpiCompareModal('placement_percentage')" title="Click to view detailed Current vs Previous placement rates and packages">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Overall Placement Rate</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#faf5ff; color:#a855f7;">
                    <i class="bi bi-briefcase-fill"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiPlacementPercentage">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiPlacementTrend">
                      <i class="bi bi-arrow-up-right"></i> +2.43%
                    </span>
                    <span class="kpi-context-note" id="kpiPlacementSubtext">Placed / Eligible</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 8. Overall Attendance Percentage -->
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="kpi-card" id="cardKpiAttendance" data-kpi="attendance_percentage" onclick="openKpiCompareModal('attendance_percentage')" title="Click to view detailed Current vs Previous attendance and detention analysis">
                <div class="kpi-card-header">
                  <div>
                    <span class="kpi-title">Overall Attendance Rate</span>
                    
                  </div>
                  <div class="kpi-icon-wrapper" style="background:#ecfeff; color:#06b6d4;">
                    <i class="bi bi-calendar-check-fill"></i>
                  </div>
                </div>
                <div>
                  <div class="kpi-value-main" id="kpiAttendancePercentage">-</div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="kpi-trend-badge up" id="kpiAttendanceTrend">
                      <i class="bi bi-arrow-up-right"></i> +1.14%
                    </span>
                    <span class="kpi-context-note" id="kpiAttendanceSubtext">Institutional Average</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Comprehensive Examination Ledger: Placed immediately after KPI Cards (Requirement 3) -->
            <div class="col-12 mt-3">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-table text-secondary"></i> Comprehensive Examination Ledger
                  </h3>
                  <span class="card-header-badge bg-light text-dark border">Consolidated Student Counts &bull; Click row to open modal</span>
                </div>
                <div class="table-responsive">
                  <table class="enterprise-table" id="tableAcademicDetails">
                    <thead>
                      <tr>
                        <th>College Code</th>
                        <th>Constituent College Name</th>
                        <th class="text-end">Appeared</th>
                        <th class="text-end">Passed</th>
                        <th class="text-end">Failed</th>
                        <th class="text-end">1 Arrear</th>
                        <th class="text-end">2 Arrears</th>
                        <th class="text-end">Arrears &gt; 2</th>
                        <th class="text-end">Pass %</th>
                        <th class="text-end">Distinction</th>
                        <th class="text-end">First Class</th>
                      </tr>
                    </thead>
                    <tbody id="tableAcademicBody">
                      <!-- Dynamic rows -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </section>

                <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 1B: BLR VS KOCHI CONSOLIDATED INSTITUTIONAL COMPARISON    -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionCampusComparison" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-diagram-3-fill"></i></span>
                Consolidated Institutional Comparison: Bangalore (BLR) vs Kochi (KOCHI) Campuses
              </h2>
              <p class="section-subtitle">Multi-vector institutional audit comparing student enrollment, academic outcomes, research, finance, and placement</p>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle">BLR: 3 Faculties &bull; 10,210 Students</span>
              <span class="badge bg-success bg-opacity-10 text-success border border-success-subtle">KOCHI: 7 Faculties &bull; 13,250 Students</span>
              <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseCampusComparison" aria-expanded="true" title="Collapse/Expand Section">
                <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
              </button>
            </div>
          </div>

          <div class="collapse show" id="collapseCampusComparison">
            <!-- Comparison Metrics Grid -->
            <div class="row g-3 mb-3" id="campusMetricsContainer">
              <div class="col-12 col-sm-6 col-lg-3">
                <div class="dashboard-card p-3">
                  <div class="text-xs text-muted fw-bold text-uppercase">Student Strength</div>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary">BLR</span>
                      <div class="fw-bold fs-5 text-dark">10,210</div>
                    </div>
                    <div class="text-end">
                      <span class="badge bg-success-subtle text-success">KOCHI</span>
                      <div class="fw-bold fs-5 text-dark">13,250</div>
                    </div>
                  </div>
                  <div class="text-xs text-muted mt-2 border-top pt-1">Total: <strong>23,460</strong> enrolled</div>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-lg-3">
                <div class="dashboard-card p-3">
                  <div class="text-xs text-muted fw-bold text-uppercase">Pass Percentage</div>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary">BLR</span>
                      <div class="fw-bold fs-5 text-success">92.01%</div>
                    </div>
                    <div class="text-end">
                      <span class="badge bg-success-subtle text-success">KOCHI</span>
                      <div class="fw-bold fs-5 text-primary">89.30%</div>
                    </div>
                  </div>
                  <div class="text-xs text-muted mt-2 border-top pt-1">Delta: <strong>+2.71 pp</strong> BLR Advantage</div>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-lg-3">
                <div class="dashboard-card p-3">
                  <div class="text-xs text-muted fw-bold text-uppercase">Fee Realization</div>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary">BLR</span>
                      <div class="fw-bold fs-5 text-dark">93.05%</div>
                    </div>
                    <div class="text-end">
                      <span class="badge bg-success-subtle text-success">KOCHI</span>
                      <div class="fw-bold fs-5 text-dark">88.88%</div>
                    </div>
                  </div>
                  <div class="text-xs text-muted mt-2 border-top pt-1">Realized: <strong>₹356.6 Cr</strong> Consolidated</div>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-lg-3">
                <div class="dashboard-card p-3">
                  <div class="text-xs text-muted fw-bold text-uppercase">Placement Rate &amp; Avg CTC</div>
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <span class="badge bg-primary-subtle text-primary">BLR</span>
                      <div class="fw-bold fs-5 text-success">91.25% <small class="fs-6 text-muted">(₹9.23L)</small></div>
                    </div>
                    <div class="text-end">
                      <span class="badge bg-success-subtle text-success">KOCHI</span>
                      <div class="fw-bold fs-5 text-primary">87.15% <small class="fs-6 text-muted">(₹7.58L)</small></div>
                    </div>
                  </div>
                  <div class="text-xs text-muted mt-2 border-top pt-1">Highest: <strong>₹52.0 LPA</strong> (FET-BLR)</div>
                </div>
              </div>
            </div>

            <!-- Campus Comparison Grouped Bar Chart -->
            <div class="row g-3 mb-3">
              <div class="col-12">
                <div class="dashboard-card">
                  <div class="card-title-bar">
                    <h3 class="card-header-title">
                      <i class="bi bi-bar-chart-line-fill text-primary"></i> Multi-Vector Performance Comparison: Bangalore vs Kochi Campuses
                    </h3>
                    <span class="card-header-badge bg-light text-dark border">Consolidated Metrics Normalized &bull; Click to Inspect</span>
                  </div>
                  <div id="chartCampusComparison" class="chart-container" style="min-height: 360px;"></div>
                </div>
              </div>
            </div>

            <!-- Consolidated University Performance Comparison Matrix (Requirement 8) -->
            <div class="row g-3">
              <div class="col-12">
                <div class="dashboard-card">
                  <div class="card-title-bar d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div class="d-flex align-items-center gap-2">
                      <h3 class="card-header-title mb-0">
                        <i class="bi bi-grid-3x3 text-primary"></i> Consolidated University Performance Comparison Matrix
                      </h3>
                      <span class="card-header-badge bg-primary bg-opacity-10 text-primary">All 10 Constituent Faculties &bull; Audited ERP Records</span>
                    </div>
                    <div class="text-xs text-muted">
                      <i class="bi bi-cursor me-1"></i> Click any faculty row to open Detailed Performance Dossier
                    </div>
                  </div>
                  <div class="table-responsive" style="max-height: 420px; overflow-y: auto;">
                    <table class="enterprise-table university-matrix-table align-middle">
                      <thead class="table-light sticky-top">
                        <tr>
                          <th>Faculty Code &amp; Name</th>
                          <th class="text-center">Campus</th>
                          <th class="text-end">Enrolled</th>
                          <th class="text-center">SFR</th>
                          <th class="text-end">Pass % (YoY)</th>
                          <th class="text-end">Placement %</th>
                          <th class="text-end">Avg CTC</th>
                          <th class="text-end">Fee Realized</th>
                          <th class="text-end">Attendance</th>
                          <th class="text-center">RPF (Papers/Fac)</th>
                          <th class="text-center">IPI Score</th>
                          <th class="text-center">Institutional Status</th>
                          <th class="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody id="tableUniversityMatrixBody">
                        <!-- Rendered dynamically -->
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 2: ACADEMIC PERFORMANCE                                   -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionAcademic" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-book-half"></i></span>
                Academic Performance Analytics
              </h2>
              <p class="section-subtitle">Examination outcomes, semester comparisons, UG vs PG ratios, and department drill-down</p>
            </div>
            <span class="badge bg-light text-primary border">Formula: Passed / Appeared &times; 100</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseAcademic" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseAcademic">

          <div class="row g-3">
            <!-- College-wise Pass Percentage Comparison (All 10 Colleges) -->
            <div class="col-12 col-xl-7">
              <div class="dashboard-card">
                <div class="card-title-bar flex-wrap gap-2">
                  <div class="d-flex align-items-center gap-2">
                    <h3 class="card-header-title">
                      <i class="bi bi-bar-chart-fill text-primary"></i> College-Wise Pass Percentage Comparison
                    </h3>
                  </div>
                  <div class="d-flex align-items-center gap-2 flex-wrap">
                    <div class="d-flex align-items-center gap-2 ms-auto">
                    <span class="card-header-badge bg-primary bg-opacity-10 text-primary d-none d-sm-inline">Target: 75% &bull; Click to Drilldown</span>
                    <select id="selectAcademicPassYear" class="form-select form-select-sm" style="width: auto; min-width: 175px;">
                      <option value="current" selected>Current Year (2026-27)</option>
                      <option value="2year">vs Last Year (2025-26)</option>
                      <option value="3year">3-Year Trend (2024-27)</option>
                    </select>
                  </div>
                  </div>
                </div>
                <div id="chartAcademicPass" class="chart-container"></div>
              </div>
            </div>

            <!-- Department-wise Performance Drill-Down -->
            <div class="col-12 col-xl-5">
              <div class="dashboard-card" id="deptDrilldownCard">
                <div class="card-title-bar">
                  <div class="d-flex align-items-center gap-2">
                    <h3 class="card-header-title">
                      <i class="bi bi-diagram-3-fill text-primary"></i> Department-Wise Drill-Down
                    </h3>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <select id="selectDeptCollege" class="form-select form-select-sm" style="max-width: 250px;">
                      <!-- Populated dynamically -->
                    </select>
                  </div>
                </div>
                <div id="chartAcademicDeptDrill" class="chart-container"></div>
              </div>
            </div>



          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 3: FINANCIAL PERFORMANCE                                  -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionFinance" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-cash-stack"></i></span>
                Financial Performance & Revenue Realization
              </h2>
              <p class="section-subtitle">Demand vs collection, outstanding balances, monthly trajectory, and payment gateway distribution</p>
            </div>
            <span class="badge bg-light text-success border">Formula: Collected / Demand &times; 100</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseFinance" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseFinance">

          <div class="row g-3">
            <!-- Faculty-wise Fee Demand vs Collection vs Outstanding -->
            <div class="col-12 col-xl-8">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-bar-chart-steps text-success"></i> College-Wise Demand &amp; Collection: Previous AY vs Current AY
                  </h3>
                  <span class="card-header-badge bg-success bg-opacity-10 text-success">₹ In Crores &bull; Click to Drilldown</span>
                </div>
                <div id="chartFinanceDemandCollection" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Payment Mode Comparison -->
            <div class="col-12 col-xl-4">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-pie-chart-fill text-warning"></i> Payment Channel Share
                  </h3>
                  <span class="card-header-badge bg-warning bg-opacity-10 text-dark">UPI / Card / Net Banking</span>
                </div>
                <div id="chartFinancePaymentModes" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Monthly Fee Collection Trend: College-Wise -->
            <div class="col-12">
              <div class="dashboard-card">
                <div class="card-title-bar flex-wrap gap-2">
                  <div class="d-flex align-items-center gap-2">
                    <h3 class="card-header-title">
                      <i class="bi bi-graph-up text-primary"></i> Monthly Collection Run-Rate: College-Wise
                    </h3>
                  </div>
                  <div class="d-flex align-items-center gap-2 flex-wrap">
                    <select id="selectFinanceMonthRange" class="form-select form-select-sm" style="max-width: 250px; font-weight:600;">
                      <option value="last6" selected>Last 6 Months (Jun - Nov 2026)</option>
                      <option value="q1">Q1 (Apr - Jun 2026)</option>
                      <option value="q2">Q2 (Jul - Sep 2026)</option>
                      <option value="full">Full Fiscal Year (2026-27)</option>
                    </select>
                    <span class="card-header-badge bg-success bg-opacity-10 text-success">₹ In Crores &bull; Click to Drilldown</span>
                  </div>
                </div>
                <div id="chartFinanceMonthlyTrend" class="chart-container" style="min-height: 380px;"></div>
              </div>
            </div>

          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 4: RESEARCH AND INNOVATION                                -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionResearch" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-lightbulb-fill"></i></span>
                Research, Publications & Intellectual Property
              </h2>
              <p class="section-subtitle">Scopus, Web of Science, Google Scholar citations, patents filed/granted, and productivity</p>
            </div>
            <span class="badge bg-light text-info border">Strict De-Duplication Protocol</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseResearch" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseResearch">

          <div class="row g-3">
            <!-- College-wise Research Publication Comparison -->
            <div class="col-12 col-xl-7">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-journal-album text-primary"></i> Faculty Research Publications: Previous AY vs Current AY
                  </h3>
                  <span class="card-header-badge bg-primary bg-opacity-10 text-primary">Previous AY vs Current AY &bull; Click to Drilldown</span>
                </div>
                <div id="chartResearchComparison" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Patents Filed vs Granted -->
            <div class="col-12 col-xl-5">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-patch-check-fill text-success"></i> Patent Portfolio: Filed vs Granted
                  </h3>
                  <span class="card-header-badge bg-success bg-opacity-10 text-success">Intellectual Property</span>
                </div>
                <div id="chartResearchPatents" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- College Research Output & Faculty Publishing Activity -->
            <div class="col-12">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-mortarboard-fill text-info"></i> College Research Output &amp; Publishing Faculty Strength
                  </h3>
                  <span class="card-header-badge bg-info bg-opacity-10 text-info">Total Published Papers vs Active Publishing Faculty</span>
                </div>
                <div id="chartResearchPerFaculty" class="chart-container"></div>
              </div>
            </div>

          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 5: STUDENT ANALYTICS                                      -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionStudents" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-people-fill"></i></span>
                Student Demographics & Admissions Funnel
              </h2>
              <p class="section-subtitle">Enrolled strength, UG vs PG cadres, admission conversion efficiency, and retention</p>
            </div>
            <span class="badge bg-light text-secondary border">Academic Registry</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseStudents" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseStudents">

          <div class="row g-3">
            <!-- College-wise Student Strength -->
            <div class="col-12 col-xl-7">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-bar-chart-line-fill text-primary"></i> College-Wise Student Enrollment: Previous AY vs Current AY
                  </h3>
                  <span class="card-header-badge bg-primary bg-opacity-10 text-primary">All 10 Faculties &bull; Click to Drilldown</span>
                </div>
                <div id="chartStudentStrength" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- UG vs PG vs PhD Strength -->
            <div class="col-12 col-xl-5">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-pie-chart text-info"></i> Program Cadre Enrollment Split
                  </h3>
                  <span class="card-header-badge bg-info bg-opacity-10 text-info">UG vs PG vs Ph.D.</span>
                </div>
                <div id="chartStudentCadre" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Admission Funnel: Applications vs Confirmed Admissions -->
            <div class="col-12">
              <div class="dashboard-card">
                <div class="card-title-bar flex-wrap gap-2 d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center gap-2">
                    <h3 class="card-header-title mb-0">
                      <i class="bi bi-funnel-fill text-success"></i> Admissions Intake Funnel &amp; Conversion Ratio
                    </h3>
                    <span class="card-header-badge bg-success bg-opacity-10 text-success">Applications &rarr; Confirmed Seats</span>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <div class="d-flex align-items-center gap-1">
                      <label for="selectFunnelCollege" class="text-xs text-muted mb-0 fw-semibold text-nowrap"><i class="bi bi-buildings"></i> College:</label>
                      <select id="selectFunnelCollege" class="form-select form-select-sm py-1 pe-4" style="min-width: 170px; font-size: 0.78rem;">
                        <option value="all">All Colleges Consolidated</option>
                        <option value="1">FET - Engg &amp; Tech (BLR)</option>
                        <option value="2">CMS - Management Studies</option>
                        <option value="3">FCA - Computer Applications</option>
                        <option value="4">FCOM - Commerce (BLR)</option>
                        <option value="5">FHS - Health Sciences</option>
                        <option value="6">SSA - Sciences &amp; Arts</option>
                        <option value="7">SOD - Design, Media &amp; Arts</option>
                        <option value="8">SOL - Law (Kochi)</option>
                        <option value="9">FOE - Education &amp; Humanities</option>
                        <option value="10">SMS - Sports Management</option>
                      </select>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                      <label for="selectFunnelYearMode" class="text-xs text-muted mb-0 fw-semibold text-nowrap"><i class="bi bi-calendar-range"></i> Comparison:</label>
                      <select id="selectFunnelYearMode" class="form-select form-select-sm py-1 pe-4" style="min-width: 160px; font-size: 0.78rem;">
                        <option value="current">Current AY (2026-27)</option>
                        <option value="2year" selected>vs Last Year (2 Funnels)</option>
                        <option value="3year">Last 2 Years (3 Funnels)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div id="chartStudentFunnel" class="chart-container" style="min-height: 380px;"></div>
              </div>
            </div>

          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 6: FACULTY ANALYTICS                                      -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionFaculty" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-person-badge-fill"></i></span>
                Faculty Cadres & Academic Workload
              </h2>
              <p class="section-subtitle">Professors, Associate Professors, Assistant Professors, PhD credentials, and Student-to-Faculty Ratio</p>
            </div>
            <span class="badge bg-light text-primary border">UGC / AICTE Regulatory Norms</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseFaculty" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseFaculty">

          <div class="row g-3">
            <!-- Faculty Cadre Distribution -->
            <div class="col-12 col-xl-7">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-diagram-2-fill text-primary"></i> Faculty Strength Comparison: Previous AY vs Current AY
                  </h3>
                  <span class="card-header-badge bg-primary bg-opacity-10 text-primary">All 10 Faculties &bull; Click to Drilldown</span>
                </div>
                <div id="chartFacultyCadre" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Student to Faculty Ratio (SFR) -->
            <div class="col-12 col-xl-5">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-people text-warning"></i> Student-to-Faculty Ratio (SFR)
                  </h3>
                  <span class="card-header-badge bg-warning bg-opacity-10 text-dark">Target Norm &le; 20:1</span>
                </div>
                <div id="chartFacultySfr" class="chart-container chart-container-lg"></div>
              </div>
            </div>

          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 7: ATTENDANCE AND EXAMINATION                             -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionAttendance" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-calendar-check-fill"></i></span>
                Attendance Compliance & Examination Classifications
              </h2>
              <p class="section-subtitle">Biometric classroom attendance %, students below 75% threshold, and degree honors</p>
            </div>
            <span class="badge bg-light text-danger border">Statutory Threshold: 75%</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseAttendance" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseAttendance">

          <div class="row g-3">
            <!-- Faculty Attendance Compliance: Previous vs Current Semester -->
            <div class="col-12 col-xl-7">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-person-x-fill text-danger"></i> Faculty Attendance Compliance: Previous vs Current Semester
                  </h3>
                  <span class="card-header-badge bg-danger bg-opacity-10 text-danger">75% Statutory Norm &bull; Click to Drilldown</span>
                </div>
                <div id="chartAttendanceComparison" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Monthly Attendance Trajectory & Multi-Campus Trend -->
            <div class="col-12 col-xl-5">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-graph-up-arrow text-primary"></i> Monthly Attendance Trajectory: College-Wise Analysis
                  </h3>
                  <span class="card-header-badge bg-primary bg-opacity-10 text-primary">July 2026 - Nov 2026 Run-Rate</span>
                </div>
                <div id="chartAttendanceTrend" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Classroom Biometric Bracket Split -->
            <div class="col-12 col-lg-4">
              <div class="dashboard-card">
                <div class="card-title-bar flex-wrap gap-2 d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center gap-2">
                    <h3 class="card-header-title mb-0">
                      <i class="bi bi-pie-chart-fill text-info"></i> Biometric Attendance Brackets
                    </h3>
                    <span id="badgeBiometricFaculty" class="card-header-badge bg-info bg-opacity-10 text-info">All Students Audited</span>
                  </div>
                  <div class="d-flex align-items-center gap-1">
                    <label for="selectBiometricCollege" class="text-xs text-muted mb-0 fw-semibold text-nowrap"><i class="bi bi-buildings"></i> Faculty:</label>
                    <select id="selectBiometricCollege" class="form-select form-select-sm py-1 pe-4" style="min-width: 155px; font-size: 0.78rem;">
                      <option value="all">All Colleges Consolidated</option>
                      <option value="1">FET - Engg &amp; Tech (BLR)</option>
                      <option value="2">FCOM - Commerce (BLR)</option>
                      <option value="3">FMS - Management Studies</option>
                      <option value="4">FAC - Arts &amp; Commerce (KOC)</option>
                      <option value="5">FAHSS - Humanities &amp; Social Sci</option>
                      <option value="6">FCD - Creative Arts &amp; Design</option>
                      <option value="7">FMS - Management Studies (KOC)</option>
                      <option value="8">FCOM - Commerce (KOC)</option>
                      <option value="9">FET - Engineering &amp; Tech (KOC)</option>
                      <option value="10">FBAS - Basic &amp; Applied Sciences</option>
                    </select>
                  </div>
                </div>
                <div id="chartAttendanceBrackets" class="chart-container"></div>
              </div>
            </div>

            <!-- Student Attendance & Detention Risk Ledger -->
            <div class="col-12 col-lg-8">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-table text-primary"></i> Student Attendance &amp; Detention Risk Ledger
                  </h3>
                  <span class="card-header-badge bg-light text-secondary border">All 10 Colleges &bull; Click row to drill down</span>
                </div>
                <div class="table-responsive" style="max-height: 340px; overflow-y: auto;">
                  <table class="enterprise-table">
                    <thead>
                      <tr>
                        <th>College</th>
                        <th>Campus</th>
                        <th class="text-end">Current %</th>
                        <th class="text-end">Previous %</th>
                        <th class="text-end">Delta (pp)</th>
                        <th class="text-end">&gt; 85%</th>
                        <th class="text-end">Below 75%</th>
                        <th class="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody id="tableAttendanceLedgerBody">
                      <!-- Dynamically rendered -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 8: PLACEMENT ANALYTICS                                    -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionPlacements" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-briefcase-fill"></i></span>
                Corporate Placements & Career Outcomes
              </h2>
              <p class="section-subtitle">Eligible vs placed students, CTC remuneration packages (Highest & Average), and recruiter network</p>
            </div>
            <span class="badge bg-light text-success border">Institutional Placement Cell</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapsePlacements" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapsePlacements">

          <div class="row g-3">
            <!-- College-wise Placement Percentage & Offers -->
            <div class="col-12 col-xl-7">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-award-fill text-success"></i> Placement Realization Rate: Previous Batch vs Current Batch
                  </h3>
                  <span class="card-header-badge bg-success bg-opacity-10 text-success">88% Institutional Benchmark &bull; Click to Drilldown</span>
                </div>
                <div id="chartPlacementComparison" class="chart-container chart-container-lg"></div>
              </div>
            </div>

            <!-- Highest Package and Average Package (LPA) -->
            <div class="col-12 col-xl-5">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-currency-rupee text-primary"></i> CTC Package Benchmarks (LPA)
                  </h3>
                  <span class="card-header-badge bg-primary bg-opacity-10 text-primary">Highest vs Average CTC</span>
                </div>
                <div id="chartPlacementCtc" class="chart-container chart-container-lg"></div>
              </div>
            </div>

          </div>
        
          </div>
</section>

        <!-- ----------------------------------------------------------------- -->
        <!-- SECTION 9: MANAGEMENT INSIGHTS & INSTITUTIONAL PERFORMANCE INDEX -->
        <!-- ----------------------------------------------------------------- -->
        <section id="sectionInsights" class="section-anchor mb-4">
          <div class="analytics-section-header">
            <div>
              <h2 class="section-title">
                <span class="section-icon-box"><i class="bi bi-compass-fill"></i></span>
                Executive Management Insights &amp; Institutional Index
              </h2>
              <p class="section-subtitle">Institutional Performance Index (IPI), statutory rankings, multi-vector risk alerts, and NIRF criteria</p>
            </div>
            <span class="badge bg-light text-primary border">Statutory Multi-Vector Audit</span>
          
            <button type="button" class="btn btn-sm section-collapse-btn" data-bs-toggle="collapse" data-bs-target="#collapseInsights" aria-expanded="true" title="Collapse/Expand Section">
              <i class="bi bi-chevron-up me-1"></i><span class="collapse-label">Collapse</span>
            </button>
          </div>

          <div class="collapse show" id="collapseInsights">

          <!-- Executive Management Summary Card (Requirement 8) -->
          <div class="dashboard-card mb-3 p-3">
            <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-dark text-white p-2"><i class="bi bi-briefcase-fill"></i></span>
                <div>
                  <h3 class="card-header-title mb-0">Executive Management Summary &amp; Institutional Briefing</h3>
                  <span class="text-xs text-muted">Audited High-Level Performance Highlights &amp; Priority Remedial Action Plan</span>
                </div>
              </div>
              <span class="badge bg-success bg-opacity-10 text-success border border-success-subtle">Odd Semester 2026-2027</span>
            </div>

            <div class="row g-3">
              <!-- Positive Performance Highlights -->
              <div class="col-12 col-lg-6">
                <div class="p-3 rounded-2 border bg-light bg-opacity-50 h-100 border-start border-4 border-success">
                  <h4 class="fw-bold text-success fs-6 mb-2">
                    <i class="bi bi-check-circle-fill me-1"></i> Positive Institutional Performance Highlights
                  </h4>
                  <ul class="list-unstyled mb-0 small text-dark d-flex flex-column gap-2">
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-arrow-up-right-circle text-success mt-1"></i>
                      <div><strong>IPI Composite Score 88.2/100:</strong> High-performance tier ranking within top 50 national NIRF band with robust institutional governance.</div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-arrow-up-right-circle text-success mt-1"></i>
                      <div><strong>Placement Quality Surge:</strong> 89.28% overall placement rate with ₹9.85 LPA average CTC and record ₹52.0 LPA super-dream package.</div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-arrow-up-right-circle text-success mt-1"></i>
                      <div><strong>Healthy Revenue Realization:</strong> ₹272.26 Cr fee realization achieved (90.45% collection efficiency), beating budget forecasts.</div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-arrow-up-right-circle text-success mt-1"></i>
                      <div><strong>Biometric Attendance Baseline:</strong> 85.92% institutional attendance with 76.8% students exceeding the 85% high compliance bracket.</div>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Areas Requiring Attention -->
              <div class="col-12 col-lg-6">
                <div class="p-3 rounded-2 border bg-light bg-opacity-50 h-100 border-start border-4 border-warning">
                  <h4 class="fw-bold text-warning-emphasis fs-6 mb-2">
                    <i class="bi bi-exclamation-triangle-fill me-1 text-warning"></i> Priority Areas Requiring Executive Attention
                  </h4>
                  <ul class="list-unstyled mb-0 small text-dark d-flex flex-column gap-2">
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-exclamation-circle text-warning mt-1"></i>
                      <div><strong>Condonable Attendance Risk:</strong> FAHSS-KOC (81.6%) and FCOM-KOC (83.5%) have 685 candidates in condonation margin requiring proactive intervention.</div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-exclamation-circle text-warning mt-1"></i>
                      <div><strong>Backlog Remedial Coaching:</strong> 265 candidates across 3 departments have &gt;2 arrears requiring fast-track modular coaching.</div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-exclamation-circle text-warning mt-1"></i>
                      <div><strong>Fee Outstanding Recovery:</strong> ₹28.74 Cr pending realization across residential and software lab fee components.</div>
                    </li>
                    <li class="d-flex align-items-start gap-2">
                      <i class="bi bi-exclamation-circle text-warning mt-1"></i>
                      <div><strong>SFR Governance:</strong> FCOM-BLR Student-Faculty Ratio at 23.16:1 requires sanctioning 14 additional faculty posts.</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Academic & Institutional Risk Monitoring Matrix (Requirement 7) -->
          <div class="dashboard-card mb-3 p-3">
            <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-danger text-white p-2"><i class="bi bi-shield-slash-fill"></i></span>
                <div>
                  <h3 class="card-header-title mb-0">Academic &amp; Institutional Risk Monitoring Matrix</h3>
                  <span class="text-xs text-muted">Active Risk Surveillance: Low Attendance (&lt;75%), Low Pass Rate (&lt;88%), and Fee Outstanding (&gt;10%)</span>
                </div>
              </div>
              <span class="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle">3 Breaches Flagged</span>
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-4">
                <div class="border rounded-2 p-3 bg-white h-100">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-bold text-dark small"><i class="bi bi-person-x text-danger me-1"></i> Low Attendance Risk</span>
                    <span class="badge bg-danger">Critical</span>
                  </div>
                  <div class="text-xs text-muted">Faculties below 85% with high detention margin:</div>
                  <div class="mt-2 small">
                    <div class="d-flex justify-content-between py-1 border-bottom">
                      <span><strong>FAHSS-KOC</strong> (Kochi)</span>
                      <span class="text-danger fw-bold">81.60% (142 at risk)</span>
                    </div>
                    <div class="d-flex justify-content-between py-1">
                      <span><strong>FCOM-KOC</strong> (Kochi)</span>
                      <span class="text-warning fw-bold">83.50% (118 at risk)</span>
                    </div>
                  </div>
                  <button type="button" class="btn btn-xs btn-outline-danger w-100 mt-2" onclick="openCollegeDrilldownModal(5, 'attendance')">
                    Inspect Attendance Risk
                  </button>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="border rounded-2 p-3 bg-white h-100">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-bold text-dark small"><i class="bi bi-mortarboard text-warning me-1"></i> Low Pass Percentage Risk</span>
                    <span class="badge bg-warning text-dark">Moderate</span>
                  </div>
                  <div class="text-xs text-muted">Faculties with pass rate below 88% target:</div>
                  <div class="mt-2 small">
                    <div class="d-flex justify-content-between py-1 border-bottom">
                      <span><strong>FAHSS-KOC</strong> (Kochi)</span>
                      <span class="text-danger fw-bold">85.97% (199 failed)</span>
                    </div>
                    <div class="d-flex justify-content-between py-1">
                      <span><strong>FBAS-KOC</strong> (Kochi)</span>
                      <span class="text-warning fw-bold">86.18% (174 failed)</span>
                    </div>
                  </div>
                  <button type="button" class="btn btn-xs btn-outline-warning w-100 mt-2 text-dark" onclick="openCollegeDrilldownModal(5, 'depts')">
                    Inspect Academic Backlogs
                  </button>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="border rounded-2 p-3 bg-white h-100">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="fw-bold text-dark small"><i class="bi bi-cash-stack text-primary me-1"></i> Fee Outstanding Risk</span>
                    <span class="badge bg-primary">Monitoring</span>
                  </div>
                  <div class="text-xs text-muted">Faculties with &gt;10% fee outstanding:</div>
                  <div class="mt-2 small">
                    <div class="d-flex justify-content-between py-1 border-bottom">
                      <span><strong>FAHSS-KOC</strong> (Kochi)</span>
                      <span class="text-danger fw-bold">14.79% (₹2.10 Cr)</span>
                    </div>
                    <div class="d-flex justify-content-between py-1">
                      <span><strong>FCOM-KOC</strong> (Kochi)</span>
                      <span class="text-danger fw-bold">13.47% (₹3.50 Cr)</span>
                    </div>
                  </div>
                  <button type="button" class="btn btn-xs btn-outline-primary w-100 mt-2" onclick="openCollegeDrilldownModal(5, 'finance')">
                    Inspect Uncollected Dues
                  </button>
                </div>
              </div>
            </div>
          </div>



          <div class="row g-3">
            <!-- Top 5 Performing Colleges -->
            <div class="col-12 col-lg-6">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-trophy-fill text-warning"></i> Top 5 Performing Colleges
                  </h3>
                  <span class="card-header-badge bg-success bg-opacity-10 text-success">Excellence Benchmark &bull; Click to Drilldown</span>
                </div>
                <div id="topFacultiesList" class="mt-2">
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>

            <!-- Bottom 5 Colleges Requiring Intervention -->
            <div class="col-12 col-lg-6">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-exclamation-triangle-fill text-warning"></i> Colleges Requiring Intervention
                  </h3>
                  <span class="card-header-badge bg-warning bg-opacity-10 text-dark">Priority Focus &bull; Click to Drilldown</span>
                </div>
                <div id="bottomFacultiesList" class="mt-2">
                  <!-- Dynamically populated -->
                </div>
              </div>
            </div>

            <!-- Management Risk & Alert Centre (Academic, Financial, Attendance, Placement, Faculty) -->
            <div class="col-12">
              <div class="dashboard-card">
                <div class="card-title-bar flex-wrap gap-2">
                  <h3 class="card-header-title">
                    <i class="bi bi-shield-exclamation text-danger"></i> Management Alert Centre
                  </h3>
                  <div class="d-flex align-items-center gap-1 flex-wrap" id="alertCategoryFilterBar">
                    <button type="button" class="alert-filter-btn active" data-filter="all">All</button>
                    <button type="button" class="alert-filter-btn" data-filter="financial">Finance</button>
                    <button type="button" class="alert-filter-btn" data-filter="academic">Academic</button>
                    <button type="button" class="alert-filter-btn" data-filter="attendance">Attendance</button>
                    <button type="button" class="alert-filter-btn" data-filter="placement">Placement</button>
                    <button type="button" class="alert-filter-btn" data-filter="faculty">Faculty</button>
                  </div>
                </div>
                <div id="managementAlertsContainer" class="mt-2" style="max-height: 400px; overflow-y: auto;">
                  <!-- Dynamically populated alerts -->
                </div>
              </div>
            </div>

            <!-- Consolidated Institutional Ranking Leaderboard for All 10 Faculties -->
            <div class="col-12">
              <div class="dashboard-card">
                <div class="card-title-bar">
                  <h3 class="card-header-title">
                    <i class="bi bi-award-fill text-warning"></i> Consolidated Institutional Ranking Leaderboard (All 10 Colleges)
                  </h3>
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-primary bg-opacity-10 text-primary">All 10 Colleges Consolidated</span>
                    <button type="button" class="btn btn-sm btn-outline-primary" id="btnOpenIpiMethodologyModal" data-bs-toggle="modal" data-bs-target="#ipiMethodologyModal">
                      <i class="bi bi-calculator me-1"></i> Transparent Methodology
                    </button>
                  </div>
                </div>
                <div class="table-responsive mt-2">
                  <table class="enterprise-table">
                    <thead>
                      <tr>
                        <th style="width: 60px;">Rank</th>
                        <th>Constituent Faculty</th>
                        <th>Campus</th>
                        <th class="text-end">Prev IPI</th>
                        <th class="text-end">Curr IPI</th>
                        <th class="text-end">Growth</th>
                        <th class="text-end">Pass (25%)</th>
                        <th class="text-end">Placement (25%)</th>
                        <th class="text-end">Fee (20%)</th>
                        <th class="text-end">Research (15%)</th>
                        <th class="text-end">SFR (15%)</th>
                        <th class="text-center">Risk Status</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody id="tableAllRankedFacultiesBody">
                      <!-- Dynamically rendered -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        
          </div>
</section>

      </main>

<?= $this->include('layouts/footer') ?>
