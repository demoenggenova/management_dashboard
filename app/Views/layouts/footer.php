      <!-- FOOTER -->
      <footer class="py-4 bg-white border-top mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between text-muted small">
            <div>
              &copy; <?= date('Y') ?> <strong>PK DAS (DEEMED TO BE UNIVERSITY)</strong> &bull; NOVAPORTAL ERP Enterprise Analytics Suite. All Rights Reserved.
            </div>
            <div class="d-flex align-items-center gap-3 mt-2 mt-md-0">
              <span>Bangalore Campus (3 Faculties) &bull; Kochi Campus (7 Faculties)</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  </div>

  <!-- ========================================================================= -->
    <!-- WORKFLOW / e-NOTIFICATION APPROVAL MODAL (Requirement 4) -->
  <div class="modal fade" id="workflowApprovalModal" tabindex="-1" aria-labelledby="workflowApprovalModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-lg">
        
        <!-- Modal Header -->
        <div class="drilldown-modal-header d-flex align-items-center justify-content-between p-3" style="background:#1e1b4b; color:#fff;">
          <div class="d-flex align-items-center gap-3">
            <span class="badge bg-warning text-dark px-2 py-1 fw-bold fs-6" id="wfModalId">#WF-9821</span>
            <div>
              <h5 class="m-0 fw-bold text-white" id="wfModalTitle">FET BLR - Request to Sanction for 4 Lakhs Amount for Annual day</h5>
              <div class="small text-white text-opacity-75" id="wfModalSubtitle">Faculty of Engineering and Technology - BLR (FET-BLR)</div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-outline-light px-2 py-1" id="wfModalPrevBtn" onclick="navigateWorkflow(-1)" title="Previous Workflow Request">
              <i class="bi bi-chevron-left"></i> Prev
            </button>
            <button type="button" class="btn btn-sm btn-outline-light px-2 py-1" id="wfModalNextBtn" onclick="navigateWorkflow(1)" title="Next Workflow Request">
              Next <i class="bi bi-chevron-right"></i>
            </button>
            <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-4" style="background: #f8fafc;">
          <!-- Meta Bar -->
          <div class="p-3 mb-3 bg-white rounded border shadow-sm">
            <div class="row g-2 small">
              <div class="col-6 col-md-3">
                <span class="text-muted d-block">Module:</span>
                <strong class="text-dark" id="wfModalModule">Finance</strong>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted d-block">Reported By:</span>
                <strong class="text-dark" id="wfModalReporter">Dr. R. K. Narayanan (Dean)</strong>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted d-block">Assigned To:</span>
                <span class="badge bg-primary bg-opacity-10 text-primary fw-bold" id="wfModalAssignee">Super Admin</span>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted d-block">Priority:</span>
                <span class="badge bg-danger" id="wfModalPriority">High</span>
              </div>
            </div>
          </div>

          <!-- Query Statement & Narrative -->
          <div class="p-3 mb-3 bg-white rounded border shadow-sm">
            <h6 class="fw-bold text-navy mb-2"><i class="bi bi-chat-left-text text-primary me-2"></i> Query Details &amp; Justification Note</h6>
            <p class="text-muted mb-2" id="wfModalQueryText" style="line-height: 1.6; font-size: 0.92rem;">
              Dean FET submitted formal budget sanction requisition for ₹4,00,000 (Rupees Four Lakhs only) towards the upcoming Institutional Annual Day Celebration 2026-27 at Bangalore Campus. Requisition covers stage infrastructure, sound acoustics, guest felicitations, and student merit awards. Recommended by Campus Cultural Committee and submitted for Super Admin executive approval.
            </p>
            <div class="d-flex align-items-center gap-2 text-muted small pt-2 border-top">
              <span><i class="bi bi-clock me-1"></i> Submission Date: <strong id="wfModalCreated">17-11-2026</strong></span>
              <span class="mx-2">&bull;</span>
              <span><i class="bi bi-person-check me-1"></i> Updated By: <strong id="wfModalUpdatedBy">Finance Officer</strong></span>
            </div>
          </div>

          <!-- Respective Document Viewer Preview -->
          <div class="p-3 bg-white rounded border shadow-sm">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="fw-bold text-navy m-0"><i class="bi bi-file-earmark-pdf-fill text-danger me-2"></i> Attached ERP Verification Document</h6>
              <span class="badge bg-success bg-opacity-10 text-success"><i class="bi bi-shield-check me-1"></i> Digitally Signed SHA-256</span>
            </div>

            <!-- Embedded Document Preview Card -->
            <div class="p-3 rounded border position-relative" style="background-color: #fafbfc; border-left: 4px solid #1e40af !important;">
              <div class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2 flex-wrap gap-2">
                <div>
                  <strong class="text-navy" id="wfDocName">FET_BLR_Annual_Day_Sanction_Requisition_4Lakhs.pdf</strong>
                  <div class="text-muted small">File size: 2.8 MB &bull; ERP Secure Vault Document #DOC-2026-9821</div>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <button type="button" onclick="openWorkflowDocumentViewer()" class="btn btn-sm btn-primary">
                    <i class="bi bi-eye-fill me-1"></i> View Document
                  </button>
                  <button type="button" onclick="downloadWorkflowDocument()" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-download me-1"></i> Download
                  </button>
                </div>
              </div>
              <div class="bg-white p-3 rounded border shadow-xs" style="font-size: 0.88rem; min-height: 130px;">
                <div class="text-center pb-2 border-bottom mb-2">
                  <div class="fw-bold text-uppercase text-navy letter-spacing-1" style="font-size: 0.82rem;">PK DAS (DEEMED TO BE UNIVERSITY) &bull; Official Dossier Clearance</div>
                  <div class="text-muted small">Statutory Academic Moderation &amp; Authentication Clearance Docket</div>
                </div>
                <div class="row g-2 py-1">
                  <div class="col-sm-6"><strong>College:</strong> <span id="wfDocCollege">Faculty of Engineering and Technology (BLR)</span></div>
                  <div class="col-sm-6"><strong>Academic Year / Sem:</strong> 2026-2027 &bull; Odd Semester</div>
                  <div class="col-sm-6"><strong>Verification Status:</strong> <span class="badge bg-success bg-opacity-10 text-success fw-bold">Board of Examiners 100% Cleared</span></div>
                  <div class="col-sm-6"><strong>Audit Category:</strong> Statutory Moderation Sign-Off</div>
                  <div class="col-12 mt-2 pt-2 border-top">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <strong class="text-navy small"><i class="bi bi-shield-lock-fill text-primary me-1"></i> Cryptographic Security Hash:</strong>
                      <span class="badge bg-light text-muted border font-monospace" style="font-size:0.7rem;">SHA-256 Verified Immutable</span>
                    </div>
                    <div class="p-2 bg-light rounded border font-monospace text-dark" style="font-size: 0.76rem; word-break: break-all; letter-spacing: 0.5px;" id="wfDocHash">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </div>
                  </div>
                </div>
                <div class="mt-2 p-2 bg-light rounded text-muted small fst-italic" id="wfDocRemarks">
                  "Dean's Council Recommendation: All question papers strictly follow OBE attainment models with Course Outcome (CO) mapping verified."
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer Actions (Requirement 4: Approve, Reject, Need Clarity) -->
        <div class="modal-footer d-flex align-items-center justify-content-between p-3 bg-light">
          <button type="button" class="btn btn-outline-secondary px-3" data-bs-dismiss="modal">
            <i class="bi bi-x me-1"></i> Close
          </button>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-warning text-dark fw-semibold px-3 shadow-sm" onclick="handleWorkflowAction('Need Clarity')">
              <i class="bi bi-question-circle-fill me-1"></i> Need Clarity
            </button>
            <button type="button" class="btn btn-danger fw-semibold px-3 shadow-sm" onclick="handleWorkflowAction('Rejected')">
              <i class="bi bi-x-circle-fill me-1"></i> Reject
            </button>
            <button type="button" class="btn btn-success fw-semibold px-4 shadow-sm" onclick="handleWorkflowAction('Approved')">
              <i class="bi bi-check-circle-fill me-1"></i> Approve
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL: INSTITUTIONAL FACULTY DRILL-DOWN (ACCESSIBLE FROM EVERY CHART/ROW)   -->
  <!-- ========================================================================= -->

  <div class="modal fade" id="collegeDrilldownModal" tabindex="-1" aria-labelledby="collegeDrilldownModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-lg">
        
        <!-- Modal Header -->
        <div class="drilldown-modal-header d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <img src="<?= base_url('assets/images/pk-das-emblem.png') ?>" alt="PK DAS Emblem" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover; background: #ffffff; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
            <div>
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <span class="badge bg-warning text-dark fw-bold" id="modalCollegeCode">FET-BLR</span>
                <span class="badge bg-light text-primary" id="modalCampusBadge">Bangalore Campus</span>
                <span class="badge bg-secondary bg-opacity-25 text-white" id="modalEstYear">Est. 2005</span>
                <span class="badge bg-info text-dark fw-bold" id="modalActiveModuleBadge"><i class="bi bi-clock-history me-1"></i> Attendance Drill-Down</span>
              </div>
              <h5 class="modal-title fw-bold text-white mb-0 mt-1" id="modalCollegeName">Faculty of Engineering and Technology - BLR</h5>
              <div class="text-white text-opacity-75 small">
                <i class="bi bi-person-fill"></i> Dean: <span id="modalDeanName" class="fw-semibold text-white">Dr. R. K. Narayanan</span> &bull; 
                <i class="bi bi-envelope"></i> <span id="modalDeanEmail" class="text-white-50">dean.fet.blr@pkdasuniversity.ac.in</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          
          <!-- Quick Macro KPI Ribbon -->
          <div class="drilldown-kpi-ribbon">
            <div class="drilldown-kpi-pill" id="pillStudents" onclick="window.switchDrilldownTab('students')">
              <div class="drilldown-kpi-val text-primary" id="modalKpiStudents">4,720</div>
              <div class="drilldown-kpi-lbl">Students Enrolled</div>
            </div>
            <div class="drilldown-kpi-pill" id="pillAttendance" onclick="window.switchDrilldownTab('attendance')">
              <div class="drilldown-kpi-val text-info" id="modalKpiAttendance">86.40%</div>
              <div class="drilldown-kpi-lbl">Attendance Rate</div>
            </div>
            <div class="drilldown-kpi-pill" id="pillDepts" onclick="window.switchDrilldownTab('depts')">
              <div class="drilldown-kpi-val text-success" id="modalKpiPass">90.65%</div>
              <div class="drilldown-kpi-lbl">Pass Percentage</div>
            </div>
            <div class="drilldown-kpi-pill" id="pillFinance" onclick="window.switchDrilldownTab('finance')">
              <div class="drilldown-kpi-val text-warning" id="modalKpiFee">90.15%</div>
              <div class="drilldown-kpi-lbl">Fee Realized Rate</div>
            </div>
            <div class="drilldown-kpi-pill" id="pillPlacement" onclick="window.switchDrilldownTab('placement')">
              <div class="drilldown-kpi-val text-primary" id="modalKpiPlacement">89.44%</div>
              <div class="drilldown-kpi-lbl">Placement Rate</div>
            </div>
            <div class="drilldown-kpi-pill" id="pillFaculty" onclick="window.switchDrilldownTab('faculty')">
              <div class="drilldown-kpi-val text-purple" id="modalKpiFaculty">274 (17.2:1)</div>
              <div class="drilldown-kpi-lbl">Faculty (SFR)</div>
            </div>
            <div class="drilldown-kpi-pill" id="pillResearch" onclick="window.switchDrilldownTab('faculty')">
              <div class="drilldown-kpi-val text-danger" id="modalKpiResearch">242</div>
              <div class="drilldown-kpi-lbl">Research Papers</div>
            </div>
          </div>

          <!-- Tab Navigation -->
          <ul class="nav nav-tabs drilldown-nav-tabs" id="drilldownTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="tab-attendance-link" data-bs-toggle="tab" data-bs-target="#tab-attendance" type="button" role="tab">
                <i class="bi bi-clock-history me-1"></i> Attendance &amp; Biometrics
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-depts-link" data-bs-toggle="tab" data-bs-target="#tab-depts" type="button" role="tab">
                <i class="bi bi-diagram-3-fill me-1"></i> Departments &amp; Academics
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-students-link" data-bs-toggle="tab" data-bs-target="#tab-students" type="button" role="tab">
                <i class="bi bi-people-fill me-1"></i> Students &amp; Intake Funnel
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-finance-link" data-bs-toggle="tab" data-bs-target="#tab-finance" type="button" role="tab">
                <i class="bi bi-cash-stack me-1"></i> Financial Ledger &amp; Fees
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-faculty-link" data-bs-toggle="tab" data-bs-target="#tab-faculty" type="button" role="tab">
                <i class="bi bi-person-badge-fill me-1"></i> Faculty &amp; Research
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tab-placement-link" data-bs-toggle="tab" data-bs-target="#tab-placement" type="button" role="tab">
                <i class="bi bi-briefcase-fill me-1"></i> Placements &amp; Recruiters
              </button>
            </li>
          </ul>

          <!-- Tab Contents -->
          <div class="tab-content" id="drilldownTabContent">
            
            <!-- Tab 1: Attendance & Biometrics -->
            <div class="tab-pane fade show active" id="tab-attendance" role="tabpanel">
              <div class="row g-2 mb-2">
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Overall Attendance Rate</div>
                    <div class="metric-pill-value text-primary" id="modalAttOverallPct">84.80%</div>
                    <div class="metric-pill-sub" id="modalAttYoYSub">+0.90 pp vs Prev Year</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Safe Compliance (&ge;85%)</div>
                    <div class="metric-pill-value text-success" id="modalAttAbove85">1,920</div>
                    <div class="metric-pill-sub" id="modalAttAbove85Sub">61.0% Students on track</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Moderate Tier (75-84.9%)</div>
                    <div class="metric-pill-value text-warning" id="modalAttMid75">890</div>
                    <div class="metric-pill-sub" id="modalAttMid75Sub">Eligible for examinations</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Detention Watchlist (&lt;75%)</div>
                    <div class="metric-pill-value text-danger" id="modalAttBelow75">340</div>
                    <div class="metric-pill-sub" id="modalAttBelow75Sub">265 Condoned • 75 Debarred</div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-1 mt-2">
                <h6 class="fw-bold mb-0 text-dark small"><i class="bi bi-person-check text-primary me-1"></i> Department-wise Biometric Attendance &amp; Detention Risk Ledger</h6>
                <span class="badge bg-light text-dark border small"><i class="bi bi-shield-check text-success me-1"></i> Regulation 8.4 Compliant</span>
              </div>
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Dept Code</th>
                      <th>Department Name</th>
                      <th>Head of Department (HOD)</th>
                      <th class="text-end">Enrolled</th>
                      <th class="text-end">Attendance %</th>
                      <th class="text-end">Safe (&ge;85%)</th>
                      <th class="text-end">Moderate (75-84%)</th>
                      <th class="text-end text-danger">Risk (&lt;75%)</th>
                      <th class="text-end">Condoned</th>
                      <th class="text-end">Detained</th>
                      <th class="text-center">Biometric Status</th>
                    </tr>
                  </thead>
                  <tbody id="modalAttendanceTableBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
              <div class="p-2 px-3 bg-light border rounded mt-2 d-flex align-items-center justify-content-between small text-muted">
                <div><i class="bi bi-info-circle text-primary me-1"></i> <strong>Detention Policy:</strong> Attendance &lt; 75% requires IQAC Condonation Committee approval. Below 65% are strictly debarred.</div>
                <div class="fw-semibold text-success"><i class="bi bi-check-circle-fill me-1"></i> Biometric RFID/Face-Scan Synced</div>
              </div>
            </div>

            <!-- Tab 2: Departments & Academics -->
            <div class="tab-pane fade" id="tab-depts" role="tabpanel">
              <div class="row g-2 mb-2">
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Overall Pass Rate</div>
                    <div class="metric-pill-value text-success" id="modalAcdPassPct">91.40%</div>
                    <div class="metric-pill-sub" id="modalAcdPassYoY">+2.00 pp vs Prev Term</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Students Appeared</div>
                    <div class="metric-pill-value text-primary" id="modalAcdAppeared">3,080</div>
                    <div class="metric-pill-sub" id="modalAcdPassed">Passed: 2,815 Students</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Backlogs &amp; Failed</div>
                    <div class="metric-pill-value text-danger" id="modalAcdFailed">265</div>
                    <div class="metric-pill-sub" id="modalAcdArrears">Active Arrears: 210</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Academic Distinctions</div>
                    <div class="metric-pill-value text-purple" id="modalAcdDistinctions">910</div>
                    <div class="metric-pill-sub" id="modalAcdFirstClass">First Class: 1,480</div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-1 mt-2">
                <h6 class="fw-bold mb-0 text-dark small"><i class="bi bi-diagram-3-fill text-primary me-1"></i> Department-wise Academic &amp; Examination Performance</h6>
                <span class="badge bg-light text-dark border small">Controller of Examinations</span>
              </div>
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Dept Code</th>
                      <th>Department Name</th>
                      <th>Head of Department (HOD)</th>
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
                  <tbody id="modalDeptsTableBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 3: Students & Intake Funnel -->
            <div class="tab-pane fade" id="tab-students" role="tabpanel">
              <div class="row g-2 mb-2">
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Total Student Strength</div>
                    <div class="metric-pill-value text-primary" id="modalStdTotal">3,150</div>
                    <div class="metric-pill-sub" id="modalStdYoY">+5.7% YoY Growth</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Program Cadre Split</div>
                    <div class="metric-pill-value text-dark" id="modalStdCadre">UG: 2,680 | PG: 440</div>
                    <div class="metric-pill-sub" id="modalStdPhd">Ph.D. Scholars: 30</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Intake Capacity &amp; Demand</div>
                    <div class="metric-pill-value text-purple" id="modalStdCap">950 Seats</div>
                    <div class="metric-pill-sub" id="modalStdApps">4,420 Applications (4.65x)</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Admissions Confirmed</div>
                    <div class="metric-pill-value text-success" id="modalStdConf">920</div>
                    <div class="metric-pill-sub" id="modalStdFillRate">96.8% Seat Fill Rate</div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-1 mt-2">
                <h6 class="fw-bold mb-0 text-dark small"><i class="bi bi-people text-primary me-1"></i> Department-wise Admissions, Intake &amp; Enrollment Distribution</h6>
                <span class="badge bg-light text-dark border small">Session 2026-2027</span>
              </div>
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Dept Code</th>
                      <th>Department Name</th>
                      <th class="text-end">Sanctioned Seats</th>
                      <th class="text-end">Applications</th>
                      <th class="text-end">Confirmed</th>
                      <th class="text-end">UG Strength</th>
                      <th class="text-end">PG Strength</th>
                      <th class="text-end">Ph.D. Scholars</th>
                      <th class="text-end">Total Enrolled</th>
                      <th class="text-end">Seat Fill Rate</th>
                    </tr>
                  </thead>
                  <tbody id="modalStudentsTableBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 4: Financial Ledger & Fees -->
            <div class="tab-pane fade" id="tab-finance" role="tabpanel">
              <div class="row g-2 mb-2">
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Total Fee Demand</div>
                    <div class="metric-pill-value text-dark" id="modalFeeDemand">₹0.00 Cr</div>
                    <div class="metric-pill-sub" id="modalFeeDemandYoY">Approved Budget</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Collected Amount</div>
                    <div class="metric-pill-value text-success" id="modalFeeCollected">₹0.00 Cr</div>
                    <div class="metric-pill-sub" id="modalFeeCollectionPctSub">91.65% Realized</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Outstanding Balance</div>
                    <div class="metric-pill-value text-danger" id="modalFeeOutstanding">₹0.00 Cr</div>
                    <div class="metric-pill-sub" id="modalFeeOutstandingSub">Pending Collections</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Collection Efficiency</div>
                    <div class="metric-pill-value text-primary" id="modalFeeStatusBadge">On Track</div>
                    <div class="metric-pill-sub" id="modalFeeEfficiencySub">91.65% Target Met</div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-1 mt-2">
                <h6 class="fw-bold mb-0 text-dark small"><i class="bi bi-cash-stack text-primary me-1"></i> Itemized Revenue Stream Breakdown</h6>
                <span class="badge bg-light text-dark border small">Finance &amp; Accounts Ledger</span>
              </div>
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Fee Head</th>
                      <th class="text-end">Approved Demand</th>
                      <th class="text-end">Collected Amount</th>
                      <th class="text-end">Outstanding Balance</th>
                      <th class="text-end">Realization %</th>
                    </tr>
                  </thead>
                  <tbody id="modalFinanceBreakdownBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 5: Faculty & Research -->
            <div class="tab-pane fade" id="tab-faculty" role="tabpanel">
              <div class="row g-2 mb-2">
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Faculty Strength &amp; SFR</div>
                    <div class="metric-pill-value text-primary" id="modalFacultyProfRow">136</div>
                    <div class="metric-pill-sub" id="modalFacultySfrSub">SFR 23.16:1</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Ph.D. Qualified Cadre</div>
                    <div class="metric-pill-value text-success" id="modalFacultyPhdMetric">74 (54.4%)</div>
                    <div class="metric-pill-sub" id="modalFacultyPhdSub">22 Prof &bull; 38 Assoc</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Indexed Publications</div>
                    <div class="metric-pill-value text-purple" id="modalResScopusMetric">98</div>
                    <div class="metric-pill-sub" id="modalResWosSub">54 Scopus &bull; 38 WoS</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Citations &amp; Patents</div>
                    <div class="metric-pill-value text-danger" id="modalResCitMetric">760</div>
                    <div class="metric-pill-sub" id="modalResPatSub">6 Patents Filed &bull; 2 Granted</div>
                  </div>
                </div>
              </div>

              <div class="row g-2 mb-2">
                <div class="col-12 col-md-6">
                  <div class="p-2 border rounded bg-light">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <span class="fw-bold small"><i class="bi bi-person-badge text-primary me-1"></i> Cadre Breakdown</span>
                      <span class="badge bg-success" id="modalFacultyPhd">74 Ph.D. (54.4%)</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                      <span class="text-muted">Professors</span>
                      <span class="fw-bold" id="modalFacultyProf">22</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                      <span class="text-muted">Associate Professors</span>
                      <span class="fw-bold" id="modalFacultyAssoc">38</span>
                    </div>
                    <div class="d-flex justify-content-between small">
                      <span class="text-muted">Assistant Professors</span>
                      <span class="fw-bold" id="modalFacultyAsst">76</span>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="p-2 border rounded bg-light">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <span class="fw-bold small"><i class="bi bi-journal-check text-success me-1"></i> Research Portfolio</span>
                      <span class="badge bg-primary" id="modalResPatents">6 Filed &bull; 2 Granted</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                      <span class="text-muted">Scopus Indexed</span>
                      <span class="fw-bold" id="modalResScopus">54</span>
                    </div>
                    <div class="d-flex justify-content-between small mb-1">
                      <span class="text-muted">Web of Science (WoS)</span>
                      <span class="fw-bold" id="modalResWos">38</span>
                    </div>
                    <div class="d-flex justify-content-between small">
                      <span class="text-muted">Total Citations</span>
                      <span class="fw-bold" id="modalResCitations">760</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-1">
                <h6 class="fw-bold mb-0 text-dark small"><i class="bi bi-journal-text text-primary me-1"></i> Department-wise Research Contribution</h6>
                <span class="badge bg-light text-dark border small">Dean (R&amp;D)</span>
              </div>
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Dept Code</th>
                      <th>Department Name</th>
                      <th class="text-end">Faculty Count</th>
                      <th class="text-end">Ph.D. Holders</th>
                      <th class="text-end">Scopus Pubs</th>
                      <th class="text-end">Citations</th>
                      <th class="text-end">Patents Filed</th>
                      <th class="text-end">RPF Index</th>
                    </tr>
                  </thead>
                  <tbody id="modalFacultyResearchTableBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 6: Placements & Recruiters -->
            <div class="tab-pane fade" id="tab-placement" role="tabpanel">
              <div class="row g-2 mb-2">
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Placement Rate</div>
                    <div class="metric-pill-value text-success" id="modalPlcRate">86.81%</div>
                    <div class="metric-pill-sub" id="modalPlcRateSub">vs Prev 84.80% (+2.01 pp)</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Placed Students</div>
                    <div class="metric-pill-value text-primary" id="modalPlcPlacedMetric">625 / 720</div>
                    <div class="metric-pill-sub" id="modalPlcEligibleSub">780 Total Offers Made</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Highest Package (LPA)</div>
                    <div class="metric-pill-value text-danger" id="modalPlcHighMetric">₹18.50 LPA</div>
                    <div class="metric-pill-sub" id="modalPlcAvgSub">Avg: ₹6.20 LPA &bull; Med: ₹5.80 LPA</div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="metric-pill-box">
                    <div class="metric-pill-label">Corporate Partners</div>
                    <div class="metric-pill-value text-purple" id="modalPlcCompaniesMetric">92 Partners</div>
                    <div class="metric-pill-sub" id="modalPlcOffersSub">110 Dream Offers (&ge;10 LPA)</div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-1 mt-2">
                <h6 class="fw-bold mb-0 text-dark small"><i class="bi bi-briefcase text-primary me-1"></i> Key Recruiter Partners &amp; Campus Recruitment Drives</h6>
                <span class="badge bg-light text-dark border small">Corporate Relations</span>
              </div>
              <div class="table-responsive">
                <table class="enterprise-table">
                  <thead>
                    <tr>
                      <th>Corporate Partner</th>
                      <th>Recruitment Domain</th>
                      <th class="text-end">Salary Package Offered</th>
                      <th class="text-end">Total Offers Made</th>
                    </tr>
                  </thead>
                  <tbody id="modalRecruitersTableBody">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        <!-- Modal Footer -->
        <div class="modal-footer bg-light d-flex justify-content-between">
          <div>
            <button type="button" class="btn btn-sm btn-outline-primary" id="btnFilterToCollege">
              <i class="bi bi-filter"></i> Set Dashboard Filter to this Faculty
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary ms-2" onclick="window.print()">
              <i class="bi bi-printer"></i> Print Dossier
            </button>
          </div>
          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: INTERACTIVE KPI CLICK-TO-COMPARE (CURRENT VS PREVIOUS PERIOD)      -->
  <!-- ========================================================================= -->
  <div class="modal fade" id="kpiCompareModal" tabindex="-1" aria-labelledby="kpiCompareModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-lg">
        
        <!-- Modal Header (User Theme #E1E6FF Blue) -->
        <div class="kpi-modal-header d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <div class="kpi-modal-icon-badge" id="modalKpiIconBadge">
              <i class="bi bi-mortarboard-fill" id="modalKpiIcon"></i>
            </div>
            <div>
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <span class="badge bg-primary text-white fw-bold" id="modalKpiBadgeCategory">EXECUTIVE KPI</span>
                <span class="badge bg-light text-dark border" id="modalKpiFilterCampus">All Campuses (BLR &amp; KOCHI)</span>
                <span class="badge bg-light text-dark border" id="modalKpiFilterPeriod">Current vs Previous AY Comparison</span>
              </div>
              <h4 class="modal-title fw-bold text-navy mb-0 mt-1" id="modalKpiTitle">Total Student Strength Comparison</h4>
              <div class="text-muted small">
                <i class="bi bi-info-circle me-1"></i> Comparative Analysis &bull; <span id="modalKpiSubtitle">Audited ERP Institutional Records across active faculties</span>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-4 bg-light bg-opacity-50">
          
          <!-- Top Macro Comparison Strip -->
          <div class="kpi-compare-macro-strip">
            
            <!-- Card 1: Previous Period Value -->
            <div class="kpi-macro-card">
              <div class="kpi-macro-title">
                <i class="bi bi-calendar-minus"></i> <span id="modalKpiPrevPeriodLabel">Previous Period</span>
              </div>
              <div class="kpi-macro-val text-muted" id="modalKpiPrevVal">-</div>
              <div class="kpi-macro-sub text-muted" id="modalKpiPrevSub">Benchmark Baseline</div>
            </div>

            <!-- Card 2: Current Period Value -->
            <div class="kpi-macro-card highlight">
              <div class="kpi-macro-title text-primary">
                <i class="bi bi-calendar-check"></i> <span id="modalKpiCurrPeriodLabel">Current Period</span>
              </div>
              <div class="kpi-macro-val text-primary" id="modalKpiCurrVal">-</div>
              <div class="kpi-macro-sub text-primary fw-bold" id="modalKpiCurrSub">Active Period</div>
            </div>

            <!-- Card 3: Absolute Variance -->
            <div class="kpi-macro-card">
              <div class="kpi-macro-title">
                <i class="bi bi-arrow-left-right"></i> Absolute Variance
              </div>
              <div class="kpi-macro-val text-success" id="modalKpiAbsDiff">-</div>
              <div class="kpi-macro-sub text-success" id="modalKpiAbsDiffSub">Net Period Difference</div>
            </div>

            <!-- Card 4: Growth Percentage -->
            <div class="kpi-macro-card">
              <div class="kpi-macro-title">
                <i class="bi bi-graph-up-arrow"></i> Growth Rate (%)
              </div>
              <div class="kpi-macro-val text-success" id="modalKpiPctGrowth">-</div>
              <div class="kpi-macro-sub" id="modalKpiPctGrowthSub">Period-over-Period</div>
            </div>

            <!-- Card 5: Institutional Benchmark / Norm -->
            <div class="kpi-macro-card">
              <div class="kpi-macro-title">
                <i class="bi bi-bullseye"></i> Institutional Benchmark
              </div>
              <div class="kpi-macro-val" style="font-size:1.15rem;" id="modalKpiBenchmark">-</div>
              <div class="kpi-macro-sub text-success" id="modalKpiBenchmarkStatus">Norm Compliant</div>
            </div>

          </div>

          <!-- 3 Tabs Navigation -->
          <ul class="nav nav-tabs kpi-modal-tabs border-bottom mb-3" id="kpiCompareTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="tabKpiOverviewBtn" data-bs-toggle="tab" data-bs-target="#tabKpiOverview" type="button" role="tab">
                <i class="bi bi-grid-1x2-fill me-1"></i> 1. Overview &amp; Sub-Metrics
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tabKpiCollegesBtn" data-bs-toggle="tab" data-bs-target="#tabKpiColleges" type="button" role="tab">
                <i class="bi bi-buildings-fill me-1"></i> 2. College-wise Comparison (10 Faculties)
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="tabKpiTrendBtn" data-bs-toggle="tab" data-bs-target="#tabKpiTrend" type="button" role="tab">
                <i class="bi bi-graph-up me-1"></i> 3. Trend Analysis &amp; Rankings
              </button>
            </li>
          </ul>

          <!-- Tab Content Panes -->
          <div class="tab-content" id="kpiCompareTabContent">
            
            <!-- TAB 1: OVERVIEW -->
            <div class="tab-pane fade show active" id="tabKpiOverview" role="tabpanel">
              <div class="row g-3">
                <!-- Grouped Bar Chart: Previous vs Current across Key Dimensions -->
                <div class="col-12 col-lg-8">
                  <div class="kpi-detail-card">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <h6 class="fw-bold mb-0 text-navy">
                        <i class="bi bi-bar-chart-fill text-primary me-2"></i>
                        <span id="overviewChartTitle">Dimension-wise Current vs Previous Comparison</span>
                      </h6>
                      <span class="badge bg-light text-secondary border">Grouped Metric Comparison</span>
                    </div>
                    <div id="chartKpiCompareOverview" class="chart-compare-container" style="min-height: 380px; height: 380px; width: 100%; display: block;"></div>
                  </div>
                </div>

                <!-- Quick Highlights & Sub-Metric Cards -->
                <div class="col-12 col-lg-4">
                  <div class="kpi-detail-card">
                    <h6 class="fw-bold mb-3 text-navy">
                      <i class="bi bi-pie-chart-fill text-purple me-2"></i>
                      Executive Breakdown
                    </h6>
                    <div id="kpiOverviewCardsContainer" class="d-flex flex-column gap-2 mb-3">
                      <!-- Populated dynamically -->
                    </div>
                    <div class="p-3 bg-light rounded-3 border">
                      <div class="fw-bold small mb-1 text-dark"><i class="bi bi-shield-check text-success me-1"></i> ERP Data Integrity</div>
                      <div class="text-muted" style="font-size:0.75rem;">All comparisons are computed dynamically from verified institutional ledgers and aggregated according to active campus and faculty filters.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 2: COLLEGE-WISE COMPARISON (ALL 10 FACULTIES) -->
            <div class="tab-pane fade" id="tabKpiColleges" role="tabpanel">
              <div class="row g-3">
                <!-- Horizontal Comparison Bar Chart for all 10 faculties -->
                <div class="col-12">
                  <div class="kpi-detail-card">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <h6 class="fw-bold mb-0 text-navy">
                        <i class="bi bi-bar-chart-steps text-primary me-2"></i>
                        Faculty-wise Comparison: Previous vs Current Period
                      </h6>
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-primary">Current Period</span>
                        <span class="badge bg-secondary">Previous Period</span>
                      </div>
                    </div>
                    <div id="chartKpiCompareColleges" class="chart-compare-container" style="min-height: 420px; height: 420px; width: 100%; display: block;"></div>
                  </div>
                </div>

                <!-- Complete Comparative Ledger Table -->
                <div class="col-12">
                  <div class="kpi-detail-card">
                    <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                      <div>
                        <h6 class="fw-bold mb-0 text-navy">
                          <i class="bi bi-table text-primary me-2"></i>
                          Constituent Faculties Comparison Ledger
                        </h6>
                        <small class="text-muted">Click any row or faculty code to open full departmental dossier</small>
                      </div>
                      <div class="d-flex align-items-center gap-2">
                        <input type="text" id="kpiTableSearch" class="form-control form-control-sm" placeholder="Search faculty..." style="width: 200px;">
                      </div>
                    </div>
                    <div class="table-responsive">
                      <table class="table kpi-compare-table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Faculty / Institution</th>
                            <th>Campus</th>
                            <th class="text-end" id="thPrevPeriod">Previous Period</th>
                            <th class="text-end" id="thCurrPeriod">Current Period</th>
                            <th class="text-end">Variance (&Delta;)</th>
                            <th class="text-end">Growth %</th>
                            <th>Performance Status</th>
                          </tr>
                        </thead>
                        <tbody id="kpiCompareTableBody">
                          <!-- Populated dynamically -->
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- TAB 3: TREND ANALYSIS & RANKINGS -->
            <div class="tab-pane fade" id="tabKpiTrend" role="tabpanel">
              <div class="row g-3">
                <!-- Multi-Period Trajectory Line Chart -->
                <div class="col-12 col-lg-8">
                  <div class="kpi-detail-card">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <h6 class="fw-bold mb-0 text-navy">
                        <i class="bi bi-graph-up text-primary me-2"></i>
                        Multi-Period Trajectory &amp; Growth Curve
                      </h6>
                      <span class="badge bg-light text-secondary border">Longitudinal Performance</span>
                    </div>
                    <div id="chartKpiCompareTrend" class="chart-compare-container" style="min-height: 380px; height: 380px; width: 100%; display: block;"></div>
                  </div>
                </div>

                <!-- Top 5 & Bottom 5 Rankings -->
                <div class="col-12 col-lg-4">
                  <div class="kpi-detail-card">
                    <!-- Top 5 -->
                    <h6 class="fw-bold text-success mb-2" style="font-size:0.85rem;">
                      <i class="bi bi-trophy-fill text-warning me-1"></i> Top Performing Faculties
                    </h6>
                    <div id="kpiTop5Rankings" class="mb-3">
                      <!-- Populated dynamically -->
                    </div>

                    <hr class="my-2">

                    <!-- Bottom 5 -->
                    <h6 class="fw-bold text-warning mb-2" style="font-size:0.85rem;">
                      <i class="bi bi-exclamation-triangle-fill text-warning me-1"></i> Faculties Requiring Attention
                    </h6>
                    <div id="kpiBottom5Rankings">
                      <!-- Populated dynamically -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Modal Footer -->
        <div class="modal-footer bg-light d-flex justify-content-between align-items-center py-2 px-4">
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-outline-success" id="btnExportKpiExcel">
              <i class="bi bi-file-earmark-excel-fill me-1"></i> Export to Excel (CSV)
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="btnExportKpiPdf">
              <i class="bi bi-printer-fill me-1"></i> Print / PDF Dossier
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
              <i class="bi bi-x-lg me-1"></i> Close
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- MODAL: IPI TRANSPARENT SCORING METHODOLOGY -->
  <div class="modal fade" id="ipiMethodologyModal" tabindex="-1" aria-labelledby="ipiMethodologyModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <div class="modal-header" style="background-color: #e1e6ff; color: #1e1b4b;">
          <div>
            <h5 class="modal-title fw-bold" id="ipiMethodologyModalLabel">
              <i class="bi bi-calculator text-primary me-2"></i>Institutional Performance Index (IPI) Scoring Methodology
            </h5>
            <div class="small text-muted">Statutory Multi-Vector Academic, Financial &amp; Governance Evaluation Framework</div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="alert alert-primary bg-primary bg-opacity-10 border-primary border-opacity-25 mb-4">
            <div class="fw-bold text-navy mb-1"><i class="bi bi-braces me-1"></i> Transparent Composite Score Formula</div>
            <div class="font-monospace small text-dark p-2 bg-white rounded border">
              Composite IPI = (Pass Rate × 0.25) + (Placement Rate × 0.25) + (Fee Realization × 0.20) + (Research RPF × 0.15) + (SFR Compliance × 0.15)
            </div>
          </div>

          <h6 class="fw-bold mb-3"><i class="bi bi-shield-check text-success me-1"></i> Multi-Vector Weighting Matrix</h6>
          <div class="table-responsive">
            <table class="enterprise-table">
              <thead>
                <tr>
                  <th>Evaluation Pillar</th>
                  <th>Weight</th>
                  <th>Institutional Raw Metric</th>
                  <th>Weighted Contribution</th>
                  <th>Statutory Authority</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Academic Pass Rate</strong></td>
                  <td><span class="badge bg-primary">25%</span></td>
                  <td>90.25% (Pass / Appeared)</td>
                  <td><strong>+22.56 pts</strong></td>
                  <td>NAAC Criterion II: Teaching-Learning &amp; Evaluation</td>
                </tr>
                <tr>
                  <td><strong>Graduate Placement Rate</strong></td>
                  <td><span class="badge bg-primary">25%</span></td>
                  <td>89.28% (Placed / Eligible)</td>
                  <td><strong>+22.32 pts</strong></td>
                  <td>NIRF Metric: Student Placement &amp; Higher Studies</td>
                </tr>
                <tr>
                  <td><strong>Annual Fee Realization</strong></td>
                  <td><span class="badge bg-primary">20%</span></td>
                  <td>90.18% (Collected / Demand)</td>
                  <td><strong>+18.04 pts</strong></td>
                  <td>Finance Committee Statutory Target (&ge; 90%)</td>
                </tr>
                <tr>
                  <td><strong>Research Productivity</strong></td>
                  <td><span class="badge bg-primary">15%</span></td>
                  <td>RPF 1.22 (Scaled to 1.50 norm)</td>
                  <td><strong>+12.20 pts</strong></td>
                  <td>NAAC Criterion III: Research &amp; Scopus Citations</td>
                </tr>
                <tr>
                  <td><strong>Faculty SFR Governance</strong></td>
                  <td><span class="badge bg-primary">15%</span></td>
                  <td>17.59 : 1 (&le; 20:1 statutory ceiling)</td>
                  <td><strong>+15.00 pts</strong></td>
                  <td>AICTE / UGC Statutory Faculty Ratio Norms</td>
                </tr>
                <tr class="table-light fw-bold">
                  <td>Composite Score</td>
                  <td>100%</td>
                  <td>Autonomous Benchmark: 90.00</td>
                  <td class="text-success fs-6">90.45 / 100</td>
                  <td><span class="badge bg-success">Grade A++ Autonomous Excellence</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 p-3 bg-light rounded border">
            <h6 class="fw-bold mb-2"><i class="bi bi-info-circle text-primary me-1"></i> Institutional Performance Tiers</h6>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-success p-2">Tier 1 (&ge; 92.0): Exemplary Autonomous Performance</span>
              <span class="badge bg-primary p-2">Tier 2 (88.0 - 91.9): High Autonomous Standard</span>
              <span class="badge bg-warning text-dark p-2">Tier 3 (&lt; 88.0): Statutory Intervention Watch</span>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- FLOATING DRILL-DOWN TOAST NOTIFICATION -->
  <div id="drilldownToast" class="drilldown-toast p-3 d-none align-items-center gap-3">
    <img src="<?= base_url('assets/images/pk-das-emblem.png') ?>" alt="PK DAS" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; background: #ffffff; border: 1px solid #ffffff;">
    <div>
      <div class="fw-bold text-white small" id="toastTitle">Faculty Drill-Down Activated</div>
      <div class="text-white-50 text-truncate" style="max-width:280px; font-size:0.75rem;" id="toastDesc">Loading granular performance records...</div>
    </div>
    <button type="button" class="btn-close btn-close-white ms-auto" onclick="document.getElementById('drilldownToast').classList.add('d-none')"></button>
  </div>

  <!-- Bootstrap 5 Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Apache ECharts 5.5 -->
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>

  <!-- High-Fidelity Dataset Engine -->
  <script src="<?= base_url('assets/js/dashboard-data.js') ?>"></script>

  <!-- JAIN / NOVAPORTAL Core Dashboard Logic -->
  <script src="<?= base_url('assets/js/dashboard.js') ?>"></script>


  <!-- ========================================================================= -->
  <!-- WORKFLOW OFFICIAL DOCUMENT VIEWER MODAL (Requirement 1) -->
  <!-- ========================================================================= -->
  <div class="modal fade" id="workflowDocumentViewerModal" tabindex="-1" aria-labelledby="workflowDocumentViewerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 shadow-lg">
        <div class="drilldown-modal-header d-flex align-items-center justify-content-between p-3" style="background:#0f172a; color:#fff;">
          <div class="d-flex align-items-center gap-3">
            <span class="badge bg-primary text-white px-2 py-1 font-monospace" id="docViewerBadge">#DOC-2026-9821</span>
            <div>
              <h5 class="m-0 fw-bold text-white fs-6" id="docViewerTitle">Official ERP Statutory Dossier Viewer</h5>
              <div class="small text-white text-opacity-75" id="docViewerSubtitle">PK DAS (DEEMED TO BE UNIVERSITY) Enterprise Clearance Record</div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-sm btn-success px-3" onclick="downloadWorkflowDocument()">
              <i class="bi bi-download me-1"></i> Download PDF
            </button>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body p-4 bg-secondary bg-opacity-10">
          <div class="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style="max-width: 850px; min-height: 700px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <!-- Document Header -->
            <div class="text-center pb-3 border-bottom mb-4">
              <img src="<?= base_url('assets/images/pk-das-logo.jpg') ?>" alt="PK DAS (DEEMED TO BE UNIVERSITY)" style="height: 52px; width: auto; object-fit: contain; margin-bottom: 8px;">
              <div class="fw-bold text-navy" style="font-size: 1.3rem; letter-spacing: 0.5px;">PK DAS (DEEMED TO BE UNIVERSITY)</div>
              <div class="text-muted small text-uppercase">Office of the Controller of Examinations &amp; Statutory Academic Council</div>
              <div class="text-muted small">Center of Academic Excellence &bull; Deemed to be University under Section 3 of UGC Act 1956</div>
              <div class="badge bg-primary bg-opacity-10 text-primary mt-2 px-3 py-1 font-monospace" style="font-size:0.8rem;">CONFIDENTIAL STATUTORY AUDIT DOSSIER</div>
            </div>

            <!-- Meta details table -->
            <div class="row g-3 mb-4">
              <div class="col-6 col-md-3">
                <span class="text-muted small d-block">Document Code:</span>
                <strong class="text-dark font-monospace" id="docViewCode">DOC-2026-9821</strong>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted small d-block">Academic Year:</span>
                <strong class="text-dark">2026-2027 (Odd Sem)</strong>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted small d-block">Submission Date:</span>
                <strong class="text-dark" id="docViewDate">17-Nov-2026</strong>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted small d-block">Classification:</span>
                <span class="badge bg-success">Executive Verified</span>
              </div>
            </div>

            <!-- Content Body -->
            <div class="p-3 bg-light rounded border mb-4">
              <h6 class="fw-bold text-navy mb-2"><i class="bi bi-check2-circle text-success me-1"></i> Budget Sanction Requisition Summary</h6>
              <p class="text-secondary small mb-2" id="docViewSummary" style="line-height: 1.6;">
                Dean FET submitted formal budget sanction requisition for ₹4,00,000 (Rupees Four Lakhs only) towards the upcoming Institutional Annual Day Celebration 2026-27 at Bangalore Campus. Requisition covers stage infrastructure, sound acoustics, guest felicitations, and student merit awards. Recommended by Campus Cultural Committee and submitted for Super Admin executive approval.
              </p>
              <ul class="small text-muted ps-3 mb-0" id="docViewChecklist">
                <li>Campus Cultural Committee Recommendation: <strong>Approved &bull; Unanimous</strong></li>
                <li>Budget Head Allocation Verification: <strong>Institutional Cultural Ceiling (Code: ACC-2026)</strong></li>
                <li>Finance Officer &amp; Dean Endorsement: <strong>Digitally Signed &amp; Audited</strong></li>
              </ul>
            </div>

            <!-- Audit Trail & Signatures -->
            <div class="row g-3 pt-3 border-top mt-4 text-center">
              <div class="col-4">
                <div class="border-top pt-2 mx-auto" style="max-width: 180px;">
                  <div class="text-success small fw-bold"><i class="bi bi-check-all"></i> Digitally Signed</div>
                  <div class="fw-bold text-dark small" id="docViewSignDean">Dr. R. K. Narayanan</div>
                  <div class="text-muted" style="font-size:0.7rem;">Dean of Faculty</div>
                </div>
              </div>
              <div class="col-4">
                <div class="border-top pt-2 mx-auto" style="max-width: 180px;">
                  <div class="text-success small fw-bold"><i class="bi bi-check-all"></i> Digitally Signed</div>
                  <div class="fw-bold text-dark small">Dr. K. S. Sundaram</div>
                  <div class="text-muted" style="font-size:0.7rem;">Controller of Examinations</div>
                </div>
              </div>
              <div class="col-4">
                <div class="border-top pt-2 mx-auto" style="max-width: 180px;">
                  <div class="text-primary small fw-bold"><i class="bi bi-clock-history"></i> Pending Action</div>
                  <div class="fw-bold text-dark small">Vice Chancellor / Super Admin</div>
                  <div class="text-muted" style="font-size:0.7rem;">Final Sign-Off Clearance</div>
                </div>
              </div>
            </div>

            <!-- Security Footer -->
            <div class="mt-4 pt-3 border-top text-center text-muted" style="font-size:0.7rem;">
              <div>This official document is generated from PK DAS (DEEMED TO BE UNIVERSITY) Core ERP. Tampering or unauthorized redistribution is strictly prohibited.</div>
              <div class="font-monospace text-secondary mt-1" id="docViewHashBottom">SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
            </div>
          </div>
        </div>
        <div class="modal-footer p-3 bg-light">
          <button type="button" class="btn btn-outline-secondary px-3" data-bs-dismiss="modal">Close Document</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- CREATE INTERVENTION TICKET MODAL (Requirement 11) -->
  <!-- ========================================================================= -->
  <div class="modal fade" id="createTicketModal" tabindex="-1" aria-labelledby="createTicketModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg">
        <div class="drilldown-modal-header p-3 d-flex align-items-center justify-content-between" style="background:#0f172a; color:#fff;">
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-danger text-white"><i class="bi bi-ticket-detailed-fill me-1"></i> Executive ERP Ticket</span>
            <h5 class="m-0 fw-bold text-white fs-6" id="ticketModalTitle">Create Administrative Intervention Ticket</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 bg-light">
          <form id="createTicketForm" onsubmit="event.preventDefault(); submitInterventionTicket();">
            <div class="p-2 mb-3 bg-white rounded border">
              <div class="d-flex align-items-center justify-content-between mb-1">
                <span class="text-muted small">Generated Ticket Reference:</span>
                <span class="badge bg-primary font-monospace" id="ticketRefCode">#TCK-2026-8941</span>
              </div>
              <div class="small text-navy fw-bold" id="ticketTargetCollege">Faculty of Engineering and Technology - BLR</div>
              <div class="small text-muted" id="ticketAlertSummary">Fee Collection Realization Deficit Watch</div>
            </div>

            <div class="mb-2">
              <label class="form-label small fw-bold text-dark mb-1">Assign Responsible Authority <span class="text-danger">*</span></label>
              <select class="form-select form-select-sm" id="ticketAssignee" required>
                <option value="Dean of Faculty">Dean of Faculty</option>
                <option value="Controller of Examinations">Controller of Examinations (CoE)</option>
                <option value="Director of Finance & Accounts">Director of Finance &amp; Accounts</option>
                <option value="Director of Placements & Corporate Relations">Director of Placements &amp; Corporate Relations</option>
                <option value="Academic Registrar">Academic Registrar</option>
                <option value="Head of Department (HOD)">Head of Department (HOD)</option>
              </select>
            </div>

            <div class="row g-2 mb-2">
              <div class="col-6">
                <label class="form-label small fw-bold text-dark mb-1">Intervention Priority</label>
                <select class="form-select form-select-sm" id="ticketPriority">
                  <option value="Critical - Immediate Action">Critical - Immediate Action</option>
                  <option value="High Priority" selected>High Priority</option>
                  <option value="Medium - Normal Queue">Medium - Normal Queue</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label small fw-bold text-dark mb-1">Statutory SLA Target</label>
                <select class="form-select form-select-sm" id="ticketSla">
                  <option value="24 Hours (Urgent Redressal)">24 Hours (Urgent)</option>
                  <option value="48 Hours (Standard Compliance)" selected>48 Hours (Standard)</option>
                  <option value="5 Working Days">5 Working Days</option>
                  <option value="Before Next Syndicate Meeting">Before Next Syndicate</option>
                </select>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-bold text-dark mb-1">Super Admin Directives &amp; Actionable Instructions <span class="text-danger">*</span></label>
              <textarea class="form-control form-control-sm" id="ticketInstructions" rows="3" required placeholder="Specify remedial instructions, audit requirements, or corrective actions..."></textarea>
            </div>

            <div class="d-flex align-items-center justify-content-between pt-2 border-top">
              <button type="button" class="btn btn-sm btn-outline-secondary px-3" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-sm btn-primary fw-bold px-3">
                <i class="bi bi-send-check-fill me-1"></i> Issue &amp; Dispatch Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Back to Top Button (Requirement 3) -->
  <button id="btnBackToTop" type="button" title="Back to Top" onclick="window.scrollTo({top: 0, behavior: 'smooth'});">
    <i class="bi bi-arrow-up"></i>
  </button>
</body>
</html>
