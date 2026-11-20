/**
 * NOVAPORTAL ERP - Super Admin Institutional Performance & Analytics Dashboard
 * Interactive Core Controller & Apache ECharts Visualization Suite
 * Standards: JAIN UNIVERSITY Enterprise ERP
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Global Refresh Debouncer
  let debouncedDataRefresh = function () {
    loadDashboardData();
  };

  // Global Dashboard State
  const state = {
    academicYear: '2026-2027',
    semester: 'all',
    campus: 'ALL',
    selectedColleges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // All 10 faculties by default
    dateFrom: null,
    dateTo: null,
    activeDrilldownCollegeId: 1,
    abortController: null,
    isLoading: false
  };

  // ECharts instances registry
  const charts = {
    campusComparison: null,
    academicPass: null,
    academicSemCompare: null,
    academicUgPg: null,
    academicDeptDrill: null,
    financeDemandCollection: null,
    financeMonthlyTrend: null,
    financeCampusFlow: null,
    financePaymentModes: null,
    researchComparison: null,
    researchPatents: null,
    researchPerFaculty: null,
    studentStrength: null,
    studentCadre: null,
    studentFunnel: null,
    facultyCadre: null,
    facultySfr: null,
    attendanceComparison: null,
    attendanceTrend: null,
    attendanceBrackets: null,
    placementComparison: null,
    placementCtc: null
  };

  // Color Palette matching JAIN Standards
  const THEME = {
    jainNavy: '#1e1b4b',
    primaryBlue: '#1e3a8a',
    accentBlue: '#2563eb',
    accentCyan: '#06b6d4',
    successGreen: '#10b981',
    warningAmber: '#f59e0b',
    dangerRose: '#ef4444',
    purple: '#3730a3',
    purpleBadge: '#4338ca',
    slateDark: '#0f172a',
    slateMuted: '#64748b',
    borderSubtle: '#e2e8f0',
    gridLine: '#f1f5f9',
    campusBlr: '#1e40af',
    campusKochi: '#059669'
  };

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  initFilterControls();
  initChartInstances();
  setupEventListeners();
  loadDashboardData();

  // --------------------------------------------------------------------------
  // FILTER CONTROLS & MULTI-SELECT DROPDOWN
  // --------------------------------------------------------------------------
  function initFilterControls() {
    renderCollegeMultiselectMenu();
    updateCollegeDropdownTriggerText();
  }

  function renderCollegeMultiselectMenu() {
    const listContainer = document.getElementById('multiselectCollegeList');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const colleges = window.NovaPortalData.COLLEGES;

    colleges.forEach(col => {
      const isChecked = state.selectedColleges.includes(col.id);
      const isVisible = state.campus === 'ALL' || col.campus === state.campus;

      const item = document.createElement('div');
      item.className = 'multiselect-item';
      item.style.display = isVisible ? 'flex' : 'none';
      item.innerHTML = `
        <input type="checkbox" id="col_chk_${col.id}" value="${col.id}" ${isChecked ? 'checked' : ''}>
        <label for="col_chk_${col.id}" class="m-0 flex-grow-1 cursor-pointer">
          <span class="fw-bold">${col.code}</span> - ${col.shortName}
          <span class="campus-pill ${col.campus.toLowerCase()} ms-1">${col.campus}</span>
        </label>
      `;

      item.querySelector('input').addEventListener('change', function (e) {
        const id = parseInt(this.value, 10);
        if (this.checked) {
          if (!state.selectedColleges.includes(id)) state.selectedColleges.push(id);
        } else {
          state.selectedColleges = state.selectedColleges.filter(x => x !== id);
        }
        updateCollegeDropdownTriggerText();
        debouncedDataRefresh();
      });

      listContainer.appendChild(item);
    });
  }

  function updateCollegeDropdownTriggerText() {
    const txt = document.getElementById('txtCollegeSelected');
    const badge = document.getElementById('badgeCollegeCount');
    if (!txt || !badge) return;

    const visibleColleges = window.NovaPortalData.COLLEGES.filter(c => state.campus === 'ALL' || c.campus === state.campus);
    const selectedVisible = state.selectedColleges.filter(id => {
      const col = window.NovaPortalData.COLLEGES.find(c => c.id === id);
      return col && (state.campus === 'ALL' || col.campus === state.campus);
    });

    badge.textContent = selectedVisible.length;

    if (selectedVisible.length === 0) {
      txt.textContent = 'None Selected (Please select at least 1)';
      txt.classList.add('text-danger');
    } else if (selectedVisible.length === visibleColleges.length) {
      txt.textContent = state.campus === 'ALL' ? 'All 10 Faculties Selected' : `All ${visibleColleges.length} Faculties (${state.campus})`;
      txt.classList.remove('text-danger');
    } else if (selectedVisible.length === 1) {
      const single = window.NovaPortalData.COLLEGES.find(c => c.id === selectedVisible[0]);
      txt.textContent = single ? `${single.code} (${single.shortName})` : '1 Faculty Selected';
      txt.classList.remove('text-danger');
    } else {
      txt.textContent = `${selectedVisible.length} Faculties Selected`;
      txt.classList.remove('text-danger');
    }
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Multi-select dropdown toggle
    const btnCollegeDropdown = document.getElementById('btnCollegeDropdown');
    const menuCollegeDropdown = document.getElementById('multiselectCollegeMenu');

    if (btnCollegeDropdown && menuCollegeDropdown) {
      btnCollegeDropdown.addEventListener('click', function (e) {
        e.stopPropagation();
        menuCollegeDropdown.classList.toggle('show');
      });

      document.addEventListener('click', function (e) {
        if (!menuCollegeDropdown.contains(e.target) && e.target !== btnCollegeDropdown) {
          menuCollegeDropdown.classList.remove('show');
        }
      });
    }

    // Select All / Deselect All
    const btnSelectAll = document.getElementById('btnSelectAllColleges');
    if (btnSelectAll) {
      btnSelectAll.addEventListener('click', function () {
        const visible = window.NovaPortalData.COLLEGES.filter(c => state.campus === 'ALL' || c.campus === state.campus);
        visible.forEach(c => {
          if (!state.selectedColleges.includes(c.id)) state.selectedColleges.push(c.id);
          const chk = document.getElementById(`col_chk_${c.id}`);
          if (chk) chk.checked = true;
        });
        updateCollegeDropdownTriggerText();
        debouncedDataRefresh();
      });
    }

    const btnDeselectAll = document.getElementById('btnDeselectAllColleges');
    if (btnDeselectAll) {
      btnDeselectAll.addEventListener('click', function () {
        const visible = window.NovaPortalData.COLLEGES.filter(c => state.campus === 'ALL' || c.campus === state.campus);
        const visibleIds = visible.map(c => c.id);
        state.selectedColleges = state.selectedColleges.filter(id => !visibleIds.includes(id));
        visibleIds.forEach(id => {
          const chk = document.getElementById(`col_chk_${id}`);
          if (chk) chk.checked = false;
        });
        updateCollegeDropdownTriggerText();
        debouncedDataRefresh();
      });
    }

    // 1. Campus Filter Change
    const campusSelect = document.getElementById('filterCampus');
    const collegeSelect = document.getElementById('filterCollege');
    const deptSelect = document.getElementById('filterDepartment');
    const progSelect = document.getElementById('filterProgramme');
    const aySelect = document.getElementById('filterAcademicYear');
    const semSelect = document.getElementById('filterSemester');

    const updateDeptDropdown = (collegeId) => {
      if (!deptSelect) return;
      deptSelect.innerHTML = '<option value="all" selected>All Departments</option>';
      const colId = parseInt(collegeId, 10);
      if (colId && window.NovaPortalData.DEPARTMENTS && window.NovaPortalData.DEPARTMENTS[colId]) {
        window.NovaPortalData.DEPARTMENTS[colId].forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.code;
          opt.textContent = `${d.code} - ${d.name}`;
          deptSelect.appendChild(opt);
        });
      }
    };

    if (campusSelect) {
      campusSelect.addEventListener('change', function () {
        state.campus = this.value;
        if (collegeSelect) {
          collegeSelect.innerHTML = '<option value="all" selected>All 10 Faculties</option>';
          const colleges = window.NovaPortalData.COLLEGES;
          colleges.forEach(c => {
            if (state.campus === 'ALL' || c.campus === state.campus) {
              const opt = document.createElement('option');
              opt.value = c.id;
              opt.textContent = `${c.code} - ${c.shortName} (${c.campus})`;
              collegeSelect.appendChild(opt);
            }
          });
        }
        const matching = window.NovaPortalData.COLLEGES.filter(c => state.campus === 'ALL' || c.campus === state.campus);
        state.selectedColleges = matching.map(c => c.id);
        debouncedDataRefresh();
      });
    }

    if (collegeSelect) {
      collegeSelect.addEventListener('change', function () {
        const val = this.value;
        if (val === 'all') {
          const matching = window.NovaPortalData.COLLEGES.filter(c => state.campus === 'ALL' || c.campus === state.campus);
          state.selectedColleges = matching.map(c => c.id);
        } else {
          state.selectedColleges = [parseInt(val, 10)];
        }
        updateDeptDropdown(val);
        debouncedDataRefresh();
      });
    }

    if (progSelect) {
      progSelect.addEventListener('change', function () {
        state.programme = this.value;
        debouncedDataRefresh();
      });
    }

    if (deptSelect) {
      deptSelect.addEventListener('change', function () {
        state.department = this.value;
        debouncedDataRefresh();
      });
    }

    if (aySelect) {
      aySelect.addEventListener('change', function () {
        state.academicYear = this.value;
        debouncedDataRefresh();
      });
    }

    if (semSelect) {
      semSelect.addEventListener('change', function () {
        state.semester = this.value;
        debouncedDataRefresh();
      });
    }

    // Apply Global Filters Button
    const btnApply = document.getElementById('btnApplyGlobalFilters');
    if (btnApply) {
      btnApply.addEventListener('click', function () {
        debouncedDataRefresh();
      });
    }

    // Reset Global Filters Button
    const btnResetGlobal = document.getElementById('btnResetGlobalFilters');
    if (btnResetGlobal) {
      btnResetGlobal.addEventListener('click', function () {
        state.academicYear = '2026-2027';
        state.semester = 'all';
        state.campus = 'ALL';
        state.selectedColleges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        state.programme = 'all';
        state.department = 'all';

        if (aySelect) aySelect.value = '2026-2027';
        if (semSelect) semSelect.value = 'all';
        if (campusSelect) campusSelect.value = 'ALL';
        if (collegeSelect) collegeSelect.value = 'all';
        if (progSelect) progSelect.value = 'all';
        if (deptSelect) deptSelect.value = 'all';

        debouncedDataRefresh();
      });
    }

    // Reset Filters Button
    const btnReset = document.getElementById('btnResetFilters');
    if (btnReset) {
      btnReset.addEventListener('click', function () {
        state.academicYear = '2026-2027';
        state.semester = 'all';
        state.campus = 'ALL';
        state.selectedColleges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        if (aySelect) aySelect.value = '2026-2027';
        if (semSelect) semSelect.value = 'all';
        if (campusSelect) campusSelect.value = 'ALL';

        renderCollegeMultiselectMenu();
        updateCollegeDropdownTriggerText();
        debouncedDataRefresh();
      });
    }

    // Export Dossier Button
    const btnExport = document.getElementById('btnExportSummary');
    if (btnExport) {
      btnExport.addEventListener('click', function () {
        window.print();
      });
    }

    // Department drill-down selector change
    const deptCollegeSelect = document.getElementById('selectDeptCollege');
    if (deptCollegeSelect) {
      deptCollegeSelect.addEventListener('change', function () {
        state.activeDrilldownCollegeId = parseInt(this.value, 10);
        renderDepartmentDrilldown(state.activeDrilldownCollegeId);
      });
    }

    // Modal action: Set Dashboard Filter to this Faculty
    const btnFilterToCollege = document.getElementById('btnFilterToCollege');
    if (btnFilterToCollege) {
      btnFilterToCollege.addEventListener('click', function () {
        const colId = state.activeDrilldownCollegeId;
        const col = window.NovaPortalData.COLLEGES.find(c => c.id === colId);
        if (col) {
          state.campus = col.campus;
          if (campusSelect) campusSelect.value = col.campus;
          state.selectedColleges = [col.id];
          renderCollegeMultiselectMenu();
          updateCollegeDropdownTriggerText();
          loadDashboardData();

          const modalEl = document.getElementById('collegeDrilldownModal');
          if (modalEl && window.bootstrap) {
            const inst = bootstrap.Modal.getInstance(modalEl);
            if (inst) inst.hide();
          }
          showDrilldownToast(col.code, `Dashboard filtered exclusively to ${col.name}`);
        }
      });
    }

    // Notification search box filter
    const notifSearch = document.getElementById('notificationSearch');
    if (notifSearch) {
      notifSearch.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const rows = document.querySelectorAll('#notificationTableBody tr');
        rows.forEach(r => {
          r.style.display = r.textContent.toLowerCase().includes(query) ? '' : 'none';
        });
      });
    }

    // Responsive window resize for all charts
    window.addEventListener('resize', debounce(() => {
      Object.keys(charts).forEach(key => {
        if (charts[key]) charts[key].resize();
      });
    }, 150));
  }

  // --------------------------------------------------------------------------
  // APACHE ECHARTS REGISTRATION & INSTANTIATION
  // --------------------------------------------------------------------------
  function initChartInstances() {
    const register = (key, elementId) => {
      const el = document.getElementById(elementId);
      if (el) {
        charts[key] = echarts.init(el);
      }
    };

    register('campusComparison', 'chartCampusComparison');
    register('academicPass', 'chartAcademicPass');
    register('academicSemCompare', 'chartAcademicSemCompare');
    register('academicUgPg', 'chartAcademicUgPg');
    register('academicDeptDrill', 'chartAcademicDeptDrill');
    register('financeDemandCollection', 'chartFinanceDemandCollection');
    register('financeMonthlyTrend', 'chartFinanceMonthlyTrend');
    register('financeCampusFlow', 'chartFinanceCampusFlow');
    register('financePaymentModes', 'chartFinancePaymentModes');
    register('researchComparison', 'chartResearchComparison');
    register('researchPatents', 'chartResearchPatents');
    register('researchPerFaculty', 'chartResearchPerFaculty');
    register('studentStrength', 'chartStudentStrength');
    register('studentCadre', 'chartStudentCadre');
    register('studentFunnel', 'chartStudentFunnel');
    register('facultyCadre', 'chartFacultyCadre');
    register('facultySfr', 'chartFacultySfr');
    register('attendanceComparison', 'chartAttendanceComparison');
    register('attendanceTrend', 'chartAttendanceTrend');
    register('attendanceBrackets', 'chartAttendanceBrackets');
    register('placementComparison', 'chartPlacementComparison');
    register('placementCtc', 'chartPlacementCtc');

    // Attach click and pointer cursor listeners across all charts
    attachDrilldownToAllCharts();
    wireKpiCardListeners();
    setupScrollInteractions();
  }

  // --------------------------------------------------------------------------
  // DRILL-DOWN RESOLVER & EVENT ATTACHMENT FOR ALL CHARTS
  // --------------------------------------------------------------------------
  function resolveCollegeIdFromParams(params) {
    if (!params) return state.activeDrilldownCollegeId || 1;

    // 1. Direct collegeId in data payload
    if (params.data && typeof params.data === 'object') {
      if (params.data.collegeId) return parseInt(params.data.collegeId, 10);
      if (params.data.id) return parseInt(params.data.id, 10);
    }

    // 2. Resolve from category name or series name (e.g. 'FET-BLR', 'FET Bangalore')
    const testName = (params.name || params.seriesName || '').trim();
    if (testName) {
      const colleges = window.NovaPortalData.COLLEGES;
      const match = colleges.find(c => 
        c.code.toLowerCase() === testName.toLowerCase() ||
        c.shortName.toLowerCase() === testName.toLowerCase() ||
        c.name.toLowerCase() === testName.toLowerCase() ||
        testName.toLowerCase().startsWith(c.code.toLowerCase()) ||
        testName.toLowerCase().includes(c.shortName.toLowerCase())
      );
      if (match) return match.id;
    }

    // 3. Resolve from campus token
    if (testName.toUpperCase() === 'BLR' || testName.toUpperCase().includes('BANGALORE')) {
      return 1; // FET-BLR
    }
    if (testName.toUpperCase() === 'KOCHI' || testName.toUpperCase().includes('KOCHI')) {
      return 4; // FAC-KOC
    }

    // 4. Default to current drilldown or first available
    return state.activeDrilldownCollegeId || 1;
  }

  const chartTabMap = {
    campusComparison: 'depts',
    academicPass: 'depts',
    academicSemCompare: 'depts',
    academicUgPg: 'depts',
    academicDeptDrill: 'depts',
    financeDemandCollection: 'finance',
    financeMonthlyTrend: 'finance',
    financeCampusFlow: 'finance',
    financePaymentModes: 'finance',
    researchComparison: 'faculty',
    researchPatents: 'faculty',
    researchPerFaculty: 'faculty',
    studentStrength: 'students',
    studentCadre: 'students',
    studentFunnel: 'students',
    facultyCadre: 'faculty',
    facultySfr: 'faculty',
    attendanceComparison: 'attendance',
    attendanceTrend: 'attendance',
    attendanceBrackets: 'attendance',
    placementComparison: 'placement',
    placementCtc: 'placement'
  };

  function attachDrilldownToAllCharts() {
    Object.keys(charts).forEach(key => {
      const chart = charts[key];
      if (!chart) return;

      // Pointer cursor so user knows every bar/point/slice is clickable
      chart.getZr().on('mousemove', function () {
        chart.getZr().setCursorStyle('pointer');
      });

      // Detach any previous listener and attach unified click handler with respective tab
      chart.off('click');
      chart.on('click', function (params) {
        const colId = resolveCollegeIdFromParams(params);
        const targetTab = chartTabMap[key] || 'depts';
        if (colId) {
          openCollegeDrilldownModal(colId, targetTab);
        }
      });
    });
  }


  // --------------------------------------------------------------------------
  // MODAL DRILL-DOWN IMPLEMENTATION (6-TAB EXPANDED DOSSIER)
  // --------------------------------------------------------------------------
  window.switchDrilldownTab = function (tabKey) {
    tabKey = tabKey || 'attendance';
    const tabBtn = document.getElementById(`tab-${tabKey}-link`);
    if (tabBtn && window.bootstrap) {
      const tabInst = bootstrap.Tab.getOrCreateInstance(tabBtn);
      tabInst.show();
    }
    highlightDrilldownPill(tabKey);
    const moduleBadgeEl = document.getElementById('modalActiveModuleBadge');
    const modMap = {
      attendance: '<i class="bi bi-clock-history me-1"></i> Attendance & Biometrics',
      depts: '<i class="bi bi-diagram-3-fill me-1"></i> Departments & Academics',
      students: '<i class="bi bi-mortarboard me-1"></i> Students & Intake Funnel',
      finance: '<i class="bi bi-cash-stack me-1"></i> Financial Ledger & Fees',
      faculty: '<i class="bi bi-people me-1"></i> Faculty & Research',
      placement: '<i class="bi bi-briefcase me-1"></i> Placements & Recruiters'
    };
    if (moduleBadgeEl && modMap[tabKey]) {
      moduleBadgeEl.innerHTML = modMap[tabKey];
    }
  };

  function highlightDrilldownPill(tabKey) {
    const pillMap = {
      attendance: 'pillAttendance',
      depts: 'pillDepts',
      students: 'pillStudents',
      finance: 'pillFinance',
      faculty: 'pillFaculty',
      placement: 'pillPlacement'
    };
    document.querySelectorAll('.drilldown-kpi-pill').forEach(p => p.classList.remove('active-pill'));
    const targetPillId = pillMap[tabKey];
    if (targetPillId) {
      const pill = document.getElementById(targetPillId);
      if (pill) pill.classList.add('active-pill');
    }
  }

  window.openCollegeDrilldownModal = function (collegeId, initialTab) {
    const colId = Number(collegeId) || 1;
    state.activeDrilldownCollegeId = colId;
    initialTab = initialTab || 'attendance';

    const drillData = window.NovaPortalData.getCollegeDrilldownData(colId);
    if (!drillData) return;

    // Header metadata (Support both ID conventions)
    const col = drillData.college;
    const nameEl = document.getElementById('modalCollegeName');
    const badgeEl = document.getElementById('modalCollegeCode') || document.getElementById('modalCollegeBadge');
    const campusEl = document.getElementById('modalCampusBadge') || document.getElementById('modalCollegeCampus');
    const estEl = document.getElementById('modalEstYear') || document.getElementById('modalCollegeEst');
    const deanEl = document.getElementById('modalDeanName');
    const emailEl = document.getElementById('modalDeanEmail');
    const moduleBadgeEl = document.getElementById('modalActiveModuleBadge');

    if (nameEl) nameEl.textContent = col.name;
    if (badgeEl) badgeEl.textContent = col.code;
    if (campusEl) campusEl.textContent = col.campus === 'BLR' ? 'Bangalore Campus' : 'Kochi Campus';
    if (estEl) estEl.textContent = `Est. ${col.est}`;
    if (deanEl) deanEl.textContent = col.dean;
    if (emailEl) {
      emailEl.textContent = col.email;
      emailEl.href = `mailto:${col.email}`;
    }

    const modMap = {
      attendance: '<i class="bi bi-clock-history me-1"></i> Attendance & Biometrics',
      depts: '<i class="bi bi-diagram-3-fill me-1"></i> Departments & Academics',
      students: '<i class="bi bi-mortarboard me-1"></i> Students & Intake Funnel',
      finance: '<i class="bi bi-cash-stack me-1"></i> Financial Ledger & Fees',
      faculty: '<i class="bi bi-people me-1"></i> Faculty & Research',
      placement: '<i class="bi bi-briefcase me-1"></i> Placements & Recruiters'
    };
    if (moduleBadgeEl) {
      moduleBadgeEl.innerHTML = modMap[initialTab] || '<i class="bi bi-info-circle me-1"></i> Faculty Dossier';
    }

    // Top Macro Ribbon Pills (Update BOTH modalKpi* and modalPill* IDs)
    const setPillVal = (id1, id2, val) => {
      const el1 = document.getElementById(id1);
      if (el1) el1.textContent = val;
      const el2 = document.getElementById(id2);
      if (el2) el2.textContent = val;
    };

    setPillVal('modalKpiStudents', 'modalPillStdVal', drillData.students.total.toLocaleString('en-IN'));
    setPillVal('modalKpiAttendance', 'modalPillAttVal', `${drillData.attendance.pct.toFixed(2)}%`);
    setPillVal('modalKpiPass', 'modalPillPassVal', `${drillData.academic.passPct.toFixed(2)}%`);
    setPillVal('modalKpiFee', 'modalPillFeeVal', `${drillData.finance.collectionPct.toFixed(2)}%`);

    const plcRateVal = drillData.placement ? (drillData.placement.rate !== undefined ? drillData.placement.rate : (drillData.placement.placementPct !== undefined ? drillData.placement.placementPct : 0)) : 0;
    const plcRateStr = (typeof plcRateVal === 'number' ? plcRateVal : parseFloat(plcRateVal) || 0).toFixed(2);
    setPillVal('modalKpiPlacement', 'modalPillPlcVal', `${plcRateStr}%`);
    setPillVal('modalKpiFaculty', 'modalPillFacVal', `${drillData.faculty.total} (SFR ${drillData.faculty.sfr}:1)`);
    setPillVal('modalKpiResearch', 'modalPillPubVal', drillData.research.unique.toLocaleString('en-IN'));

    // TAB 1: Attendance & Biometrics
    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    const attPctVal = `${drillData.attendance.pct.toFixed(2)}%`;
    const attDiffVal = drillData.attendance.prev ? (drillData.attendance.pct - drillData.attendance.prev).toFixed(2) : (drillData.attendance.ppDiff || '0.90');
    const attDiffStr = `${Number(attDiffVal) >= 0 ? '+' : ''}${attDiffVal} pp vs Prev Year`;
    const attAboveVal = drillData.attendance.above85.toLocaleString('en-IN');
    const attAbovePctStr = `${((drillData.attendance.above85 / Math.max(1, drillData.students.total)) * 100).toFixed(1)}% Students on track`;
    const attMidVal = (drillData.attendance.mid || drillData.attendance.mid75 || Math.round(drillData.students.total * 0.28)).toLocaleString('en-IN');
    const attBelowVal = drillData.attendance.below75.toLocaleString('en-IN');
    const attBelowSubStr = `${drillData.attendance.cond.toLocaleString('en-IN')} Condoned • ${drillData.attendance.det.toLocaleString('en-IN')} Debarred`;

    setTxt('modalAttOverallPct', attPctVal);
    setTxt('modalAttPct', attPctVal);
    setTxt('modalAttYoYSub', attDiffStr);
    setTxt('modalAttPp', attDiffStr);
    setTxt('modalAttAbove85', attAboveVal);
    setTxt('modalAttAbove', attAboveVal);
    setTxt('modalAttAbove85Sub', attAbovePctStr);
    setTxt('modalAttMid75', attMidVal);
    setTxt('modalAttMid75Sub', 'Eligible for examinations');
    setTxt('modalAttBelow75', attBelowVal);
    setTxt('modalAttBelow', attBelowVal);
    setTxt('modalAttBelow75Sub', attBelowSubStr);
    setTxt('modalAttCond', drillData.attendance.cond.toLocaleString('en-IN'));
    setTxt('modalAttDet', drillData.attendance.det.toLocaleString('en-IN'));

    // Populate Tab 1 Table: #modalAttendanceTableBody
    const attBody = document.getElementById('modalAttendanceTableBody');
    if (attBody && drillData.deptAttendance) {
      attBody.innerHTML = '';
      drillData.deptAttendance.forEach(d => {
        const tr = document.createElement('tr');
        const pctClass = d.attPct >= 85 ? 'text-success' : (d.attPct >= 75 ? 'text-warning text-dark' : 'text-danger');
        tr.innerHTML = `
          <td><span class="badge bg-light text-primary border fw-bold">${d.code}</span></td>
          <td class="fw-semibold text-dark">${d.name}</td>
          <td class="text-secondary small"><i class="bi bi-person me-1"></i>${d.hod}</td>
          <td class="text-end">${d.enrolled.toLocaleString('en-IN')}</td>
          <td class="text-end fw-bold ${pctClass}">${d.attPct.toFixed(2)}%</td>
          <td class="text-end text-success">${d.above85.toLocaleString('en-IN')}</td>
          <td class="text-end text-warning text-dark">${d.mid75.toLocaleString('en-IN')}</td>
          <td class="text-end fw-bold text-danger">${d.below75.toLocaleString('en-IN')}</td>
          <td class="text-end text-muted">${d.condoned.toLocaleString('en-IN')}</td>
          <td class="text-end fw-bold text-danger">${d.detained.toLocaleString('en-IN')}</td>
          <td class="text-center"><span class="badge bg-success-subtle text-success border border-success-subtle"><i class="bi bi-shield-check me-1"></i>${d.biometricStatus || '100% Synced'}</span></td>
        `;
        attBody.appendChild(tr);
      });
    }

    // TAB 2: Departments & Academics Table & Cards
    const totDist = drillData.departments ? drillData.departments.reduce((acc, d) => acc + (d.distinction || 0), 0) : 0;
    const totFirst = drillData.departments ? drillData.departments.reduce((acc, d) => acc + (d.firstClass || 0), 0) : 0;
    const acdDiff = drillData.academic.prevPassPct ? (drillData.academic.passPct - drillData.academic.prevPassPct).toFixed(2) : '1.51';
    const acdDiffStr = `${Number(acdDiff) >= 0 ? '+' : ''}${acdDiff} pp vs Prev Term`;

    setTxt('modalAcdPassPct', `${drillData.academic.passPct.toFixed(2)}%`);
    setTxt('modalAcdPassYoY', acdDiffStr);
    setTxt('modalAcdAppeared', drillData.academic.appeared.toLocaleString('en-IN'));
    setTxt('modalAcdPassed', `Passed: ${drillData.academic.passed.toLocaleString('en-IN')} Students`);
    setTxt('modalAcdFailed', drillData.academic.failed.toLocaleString('en-IN'));
    setTxt('modalAcdArrears', `Active Arrears: ${(drillData.academic.arrears || drillData.academic.failed).toLocaleString('en-IN')}`);
    setTxt('modalAcdDistinctions', totDist.toLocaleString('en-IN'));
    setTxt('modalAcdFirstClass', `First Class: ${totFirst.toLocaleString('en-IN')}`);

    const deptsBody = document.getElementById('modalDeptsTableBody');
    if (deptsBody && drillData.departments) {
      deptsBody.innerHTML = '';
      drillData.departments.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><span class="badge bg-light text-primary border fw-bold">${d.code}</span></td>
          <td class="fw-semibold text-dark">${d.name}</td>
          <td class="text-secondary small"><i class="bi bi-person me-1"></i>${d.hod}</td>
          <td class="text-end">${d.appeared ? d.appeared.toLocaleString('en-IN') : '-'}</td>
          <td class="text-end fw-bold text-success">${d.passed ? d.passed.toLocaleString('en-IN') : '-'}</td>
          <td class="text-end fw-bold text-danger">${d.failed ? d.failed.toLocaleString('en-IN') : '-'}</td>
          <td class="text-end">${d.arrears1 !== undefined ? d.arrears1.toLocaleString('en-IN') : '0'}</td>
          <td class="text-end">${d.arrears2 !== undefined ? d.arrears2.toLocaleString('en-IN') : '0'}</td>
          <td class="text-end">${d.arrearsMore !== undefined ? d.arrearsMore.toLocaleString('en-IN') : '0'}</td>
          <td class="text-end fw-bold ${d.passPct >= 90 ? 'text-success' : 'text-primary'}">${d.passPct ? d.passPct.toFixed(2) : '-'}%</td>
          <td class="text-end text-primary fw-semibold">${d.distinction || '-'}</td>
          <td class="text-end text-secondary">${d.firstClass || '-'}</td>
        `;
        deptsBody.appendChild(tr);
      });
    }

    // TAB 3: Students & Intake Funnel Table & Cards
    const stdGrowth = drillData.students.growthPct || (drillData.students.prev ? (((drillData.students.total - drillData.students.prev) / drillData.students.prev) * 100).toFixed(1) : '5.7');
    const appMultiple = (drillData.students.app / Math.max(1, drillData.students.cap)).toFixed(2);
    const fillRateVal = ((drillData.students.conf / Math.max(1, drillData.students.cap)) * 100).toFixed(1);

    setTxt('modalStdTotal', drillData.students.total.toLocaleString('en-IN'));
    setTxt('modalStdYoY', `+${stdGrowth}% YoY Growth`);
    setTxt('modalStdCadre', `UG: ${drillData.students.ug.toLocaleString('en-IN')} | PG: ${drillData.students.pg.toLocaleString('en-IN')}`);
    setTxt('modalStdPhd', `${drillData.students.phd} Doctoral Scholars`);
    setTxt('modalStdCap', `${drillData.students.cap.toLocaleString('en-IN')} Seats`);
    setTxt('modalStdApps', `${drillData.students.app.toLocaleString('en-IN')} Applications (${appMultiple}x)`);
    setTxt('modalStdConf', drillData.students.conf.toLocaleString('en-IN'));
    setTxt('modalStdRatio', `${fillRateVal}% Seat Fill Rate`);
    setTxt('modalStdFillRate', `${fillRateVal}% Seat Fill Rate`);

    const stdBody = document.getElementById('modalStudentsTableBody');
    if (stdBody && drillData.deptStudents) {
      stdBody.innerHTML = '';
      drillData.deptStudents.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><span class="badge bg-light text-primary border fw-bold">${d.code}</span></td>
          <td class="fw-semibold text-dark">${d.name}</td>
          <td class="text-end">${d.cap.toLocaleString('en-IN')}</td>
          <td class="text-end">${d.app.toLocaleString('en-IN')}</td>
          <td class="text-end fw-semibold text-success">${d.conf.toLocaleString('en-IN')}</td>
          <td class="text-end">${d.ug.toLocaleString('en-IN')}</td>
          <td class="text-end">${d.pg.toLocaleString('en-IN')}</td>
          <td class="text-end text-purple">${d.phd}</td>
          <td class="text-end fw-bold">${d.total.toLocaleString('en-IN')}</td>
          <td class="text-end fw-bold ${d.fillRate >= 95 ? 'text-success' : 'text-primary'}">${d.fillRate.toFixed(1)}%</td>
        `;
        stdBody.appendChild(tr);
      });
    }

    // TAB 4: Financial Ledger & Fees Table & Cards
    const demandStr = window.NovaPortalData.formatCr(drillData.finance.demand);
    const collectedStr = window.NovaPortalData.formatCr(drillData.finance.collected);
    const outstandingStr = window.NovaPortalData.formatCr(drillData.finance.outstanding);
    const realizationStr = `${drillData.finance.collectionPct.toFixed(2)}% Realization`;
    const uncollectedStr = `${(100 - drillData.finance.collectionPct).toFixed(2)}% Uncollected`;

    setTxt('modalFeeDemand', demandStr);
    setTxt('modalFeeDemandYoY', drillData.finance.prev ? `Prev AY: ${window.NovaPortalData.formatCr(drillData.finance.prev)}` : 'Approved Budget');
    setTxt('modalFeeCollected', collectedStr);
    setTxt('modalFeeCollectedPct', realizationStr);
    setTxt('modalFeeCollectionPctSub', realizationStr);
    setTxt('modalFeeOutstanding', outstandingStr);
    setTxt('modalFeeOutstandingPct', uncollectedStr);
    setTxt('modalFeeOutstandingSub', uncollectedStr);

    const feeStatusBadgeEl = document.getElementById('modalFeeStatusBadge');
    if (feeStatusBadgeEl) {
      feeStatusBadgeEl.textContent = drillData.finance.collectionPct >= 90 ? 'Healthy' : (drillData.finance.collectionPct >= 80 ? 'Moderate' : 'Under Review');
      feeStatusBadgeEl.className = `metric-pill-value ${drillData.finance.collectionPct >= 90 ? 'text-success' : (drillData.finance.collectionPct >= 80 ? 'text-primary' : 'text-warning')}`;
    }
    setTxt('modalFeeEfficiencySub', `${drillData.finance.collectionPct.toFixed(2)}% Target Met`);

    const finBody = document.getElementById('modalFinanceBreakdownBody');
    if (finBody && drillData.finance.breakdown) {
      finBody.innerHTML = '';
      drillData.finance.breakdown.forEach(item => {
        const itemPct = item.demand > 0 ? ((item.collected / item.demand) * 100).toFixed(2) : '0.00';
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="fw-semibold text-dark"><i class="bi bi-receipt text-primary me-2"></i>${item.item}</td>
          <td class="text-end fw-semibold">${window.NovaPortalData.formatCr(item.demand)}</td>
          <td class="text-end text-success fw-semibold">${window.NovaPortalData.formatCr(item.collected)}</td>
          <td class="text-end text-danger fw-semibold">${window.NovaPortalData.formatCr(item.outstanding)}</td>
          <td class="text-end fw-bold ${parseFloat(itemPct) >= 90 ? 'text-success' : 'text-primary'}">${itemPct}%</td>
        `;
        finBody.appendChild(tr);
      });
    }

    // TAB 5: Faculty & Research Table & Cards
    const phdPctStr = drillData.faculty.phdPct || ((drillData.faculty.phd / Math.max(1, drillData.faculty.total)) * 100).toFixed(1);

    setTxt('modalFacultyProfRow', drillData.faculty.total);
    setTxt('modalFacTotal', drillData.faculty.total);
    setTxt('modalFacultySfrSub', `SFR ${drillData.faculty.sfr}:1`);
    setTxt('modalFacSfr', `SFR ${drillData.faculty.sfr}:1 (Ideal: 15-20:1)`);
    setTxt('modalFacultyPhdMetric', `${drillData.faculty.phd} (${phdPctStr}%)`);
    setTxt('modalFacPhd', `${drillData.faculty.phd} Ph.D. (${phdPctStr}%)`);
    setTxt('modalFacultyPhdSub', `${drillData.faculty.prof} Prof • ${drillData.faculty.assoc} Assoc`);
    setTxt('modalFacCadre', `Prof: ${drillData.faculty.prof} | Assoc: ${drillData.faculty.assoc} | Asst: ${drillData.faculty.asst}`);
    setTxt('modalFacActive', `${drillData.faculty.researchActive || 55}% Faculty Published This AY`);

    setTxt('modalResScopusMetric', drillData.research.unique || drillData.research.scopus);
    setTxt('modalPubTotal', drillData.research.unique || drillData.research.scopus);
    setTxt('modalResWosSub', `${drillData.research.scopus} Scopus • ${drillData.research.wos} WoS`);
    setTxt('modalPubIndex', `Scopus: ${drillData.research.scopus} | WoS: ${drillData.research.wos} | Scholar: ${drillData.research.scholar}`);
    setTxt('modalResCitMetric', drillData.research.citations.toLocaleString('en-IN'));
    setTxt('modalPubCitations', `${drillData.research.citations.toLocaleString('en-IN')} Citations (h-index: ${drillData.research.hIndex})`);
    setTxt('modalResPatSub', `${drillData.research.filed} Patents Filed • ${drillData.research.granted} Granted`);
    setTxt('modalPubRpf', `${drillData.research.rpf} Papers / Faculty`);
    setTxt('modalPatFiled', `${drillData.research.filed} Patents Filed`);
    setTxt('modalPatGranted', `${drillData.research.granted} Patents Granted`);

    // Cadre sub-box
    setTxt('modalFacultyProf', drillData.faculty.prof);
    setTxt('modalFacultyAssoc', drillData.faculty.assoc);
    setTxt('modalFacultyAsst', drillData.faculty.asst);

    // Research sub-box
    setTxt('modalResPatents', `${drillData.research.filed} Filed • ${drillData.research.granted} Granted`);
    setTxt('modalResScopus', drillData.research.scopus);
    setTxt('modalResWos', drillData.research.wos);
    setTxt('modalResCitations', drillData.research.citations.toLocaleString('en-IN'));

    const facResBody = document.getElementById('modalFacultyResearchTableBody');
    if (facResBody && drillData.deptFacultyResearch) {
      facResBody.innerHTML = '';
      drillData.deptFacultyResearch.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><span class="badge bg-light text-primary border fw-bold">${d.code}</span></td>
          <td class="fw-semibold text-dark">${d.name}</td>
          <td class="text-end fw-semibold">${d.faculty}</td>
          <td class="text-end text-success fw-semibold">${d.phdHolders}</td>
          <td class="text-end text-primary">${d.scopus}</td>
          <td class="text-end">${d.citations.toLocaleString('en-IN')}</td>
          <td class="text-end text-purple">${d.filed}</td>
          <td class="text-end fw-bold ${d.rpf >= 1.0 ? 'text-success' : 'text-primary'}">${d.rpf.toFixed(2)}</td>
        `;
        facResBody.appendChild(tr);
      });
    }

    // TAB 6: Placements & Recruiters Table & Cards
    const plcDiff = drillData.placement.prev ? (drillData.placement.rate - drillData.placement.prev).toFixed(2) : '2.14';
    const plcDiffStr = `vs Prev ${(drillData.placement.prev || 84.8).toFixed(2)}% (${Number(plcDiff) >= 0 ? '+' : ''}${plcDiff} pp)`;

    setTxt('modalPlcRate', `${plcRateStr}%`);
    setTxt('modalPlcRateSub', plcDiffStr);
    setTxt('modalPlcPlacedMetric', `${drillData.placement.placed.toLocaleString('en-IN')} / ${drillData.placement.eligible.toLocaleString('en-IN')}`);
    setTxt('modalPlcCount', `Placed: ${drillData.placement.placed.toLocaleString('en-IN')} / ${drillData.placement.eligible.toLocaleString('en-IN')}`);
    setTxt('modalPlcEligibleSub', `${drillData.placement.offers.toLocaleString('en-IN')} Total Offers Made`);
    setTxt('modalPlcOffers', `${drillData.placement.offers.toLocaleString('en-IN')} Total Job Offers`);
    setTxt('modalPlcHighMetric', `₹${drillData.placement.high.toFixed(2)} LPA`);
    setTxt('modalPlcHigh', `₹${drillData.placement.high.toFixed(2)} LPA`);
    setTxt('modalPlcAvgSub', `Avg: ₹${drillData.placement.avg.toFixed(2)} LPA • Med: ₹${drillData.placement.med.toFixed(2)} LPA`);
    setTxt('modalPlcAvg', `₹${drillData.placement.avg.toFixed(2)} LPA`);
    setTxt('modalPlcMed', `Median: ₹${drillData.placement.med.toFixed(2)} LPA`);
    setTxt('modalPlcCompaniesMetric', `${drillData.placement.companies} Partners`);
    setTxt('modalPlcCompanies', `${drillData.placement.companies} Active Recruiters`);
    setTxt('modalPlcOffersSub', `${drillData.placement.dream} Dream Offers (≥10 LPA)`);
    setTxt('modalPlcDream', `${drillData.placement.dream} Dream (>10 LPA)`);

    const plcBody = document.getElementById('modalRecruitersTableBody');
    if (plcBody && drillData.placement.topRecruiters) {
      plcBody.innerHTML = '';
      drillData.placement.topRecruiters.forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="fw-semibold text-dark"><i class="bi bi-building text-primary me-2"></i>${r.company}</td>
          <td><span class="badge bg-light text-dark border">${r.category}</span></td>
          <td class="text-end fw-semibold text-primary">${r.packages}</td>
          <td class="text-end fw-bold text-success">${r.offers} Offers</td>
        `;
        plcBody.appendChild(tr);
      });
    }

    // Bind tab-switch listener once
    const drilldownTabsEl = document.getElementById('drilldownTabs');
    if (drilldownTabsEl && !drilldownTabsEl.hasAttribute('data-tabs-bound')) {
      drilldownTabsEl.setAttribute('data-tabs-bound', 'true');
      drilldownTabsEl.addEventListener('shown.bs.tab', function (e) {
        const targetId = e.target.getAttribute('id');
        const tabKey = targetId ? targetId.replace('tab-', '').replace('-link', '') : 'attendance';
        highlightDrilldownPill(tabKey);
        const moduleBadgeEl = document.getElementById('modalActiveModuleBadge');
        const modMap = {
          attendance: '<i class="bi bi-clock-history me-1"></i> Attendance & Biometrics',
          depts: '<i class="bi bi-diagram-3-fill me-1"></i> Departments & Academics',
          students: '<i class="bi bi-mortarboard me-1"></i> Students & Intake Funnel',
          finance: '<i class="bi bi-cash-stack me-1"></i> Financial Ledger & Fees',
          faculty: '<i class="bi bi-people me-1"></i> Faculty & Research',
          placement: '<i class="bi bi-briefcase me-1"></i> Placements & Recruiters'
        };
        if (moduleBadgeEl && modMap[tabKey]) {
          moduleBadgeEl.innerHTML = modMap[tabKey];
        }
      });
    }

    // Switch to target tab
    window.switchDrilldownTab(initialTab);

    // Show Bootstrap Modal
    const modalEl = document.getElementById('collegeDrilldownModal');
    if (modalEl && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  };

  function showDrilldownToast(code, name) {
    const toast = document.getElementById('drilldownToast');
    const title = document.getElementById('toastTitle');
    const desc = document.getElementById('toastDesc');
    if (toast && title && desc) {
      title.textContent = `Faculty Drill-Down: ${code}`;
      desc.textContent = name;
      toast.classList.remove('d-none');
      toast.classList.add('d-flex');
      setTimeout(() => {
        toast.classList.remove('d-flex');
        toast.classList.add('d-none');
      }, 4000);
    }
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE KPI CLICK-TO-COMPARE FEATURE (CURRENT VS PREVIOUS PERIOD)
  // --------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------
  // WIRE KPI CARDS CLICK-TO-COMPARE LISTENERS (Requirement 2)
  // --------------------------------------------------------------------------
  function wireKpiCardListeners() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach(card => {
      card.style.cursor = 'pointer';
      const kpiKey = card.dataset.kpi;
      if (kpiKey && !card.dataset.kpiWired) {
        card.dataset.kpiWired = 'true';
        card.addEventListener('click', function (e) {
          e.preventDefault();
          window.openKpiCompareModal(kpiKey);
        });
      }
    });
  }

  window.openKpiCompareModal = function (kpiKey) {
    kpiKey = kpiKey || 'student_strength';
    const data = window.NovaPortalData.getKpiComparisonData(
      kpiKey,
      state.campus,
      state.selectedColleges,
      state.academicYear,
      state.semester
    );
    if (!data) return;
    state.activeKpiCompareData = data;

    // Helper for currency / count formatting
    const formatDisplay = (num) => {
      if (kpiKey === 'fee_demand' || kpiKey === 'fee_collection') {
        return window.NovaPortalData.formatCr(num);
      }
      if (kpiKey.includes('percentage') || kpiKey.includes('rate') || kpiKey === 'pass_percentage' || kpiKey === 'placement_percentage' || kpiKey === 'attendance_percentage') {
        return `${Number(num).toFixed(2)}%`;
      }
      return Number(num).toLocaleString('en-IN');
    };

    // 1. Header Information
    const titleEl = document.getElementById('modalKpiTitle');
    const iconEl = document.getElementById('modalKpiIcon');
    const iconBadge = document.getElementById('modalKpiIconBadge');
    const catEl = document.getElementById('modalKpiBadgeCategory');
    const filterCampusEl = document.getElementById('modalKpiFilterCampus');
    const filterPeriodEl = document.getElementById('modalKpiFilterPeriod');
    const subtitleEl = document.getElementById('modalKpiSubtitle');

    if (titleEl) titleEl.textContent = `${data.title} Comparison`;
    if (iconEl) iconEl.className = `bi ${data.icon}`;
    if (iconBadge) {
      iconBadge.style.backgroundColor = data.iconBg || '#eff6ff';
      iconBadge.style.color = data.iconColor || '#2563eb';
    }
    if (catEl) catEl.textContent = `EXECUTIVE KPI • ${data.unit.toUpperCase()}`;
    if (filterCampusEl) filterCampusEl.textContent = `Campus: ${state.campus === 'ALL' ? 'All (BLR & KOCHI)' : state.campus}`;
    if (filterPeriodEl) filterPeriodEl.textContent = `${data.currPeriod} vs ${data.prevPeriod}`;
    if (subtitleEl) subtitleEl.textContent = `Audited ERP comparisons across ${data.colleges.length} constituent faculties`;

    // 2. Top Comparison Macro Ribbon
    const prevLbl = document.getElementById('modalKpiPrevPeriodLabel');
    const prevVal = document.getElementById('modalKpiPrevVal');
    const prevSub = document.getElementById('modalKpiPrevSub');

    const currLbl = document.getElementById('modalKpiCurrPeriodLabel');
    const currVal = document.getElementById('modalKpiCurrVal');
    const currSub = document.getElementById('modalKpiCurrSub');

    const absDiff = document.getElementById('modalKpiAbsDiff');
    const absDiffSub = document.getElementById('modalKpiAbsDiffSub');

    const pctGrowth = document.getElementById('modalKpiPctGrowth');
    const pctGrowthSub = document.getElementById('modalKpiPctGrowthSub');

    const benchmarkVal = document.getElementById('modalKpiBenchmark');
    const benchmarkStatus = document.getElementById('modalKpiBenchmarkStatus');

    if (prevLbl) prevLbl.textContent = data.prevPeriod;
    if (prevVal) prevVal.textContent = formatDisplay(data.prevVal);
    if (prevSub) prevSub.textContent = 'Benchmark Baseline';

    if (currLbl) currLbl.textContent = data.currPeriod;
    if (currVal) currVal.textContent = formatDisplay(data.currVal);
    if (currSub) currSub.textContent = 'Active Period';

    const isPositive = data.absChange >= 0;
    if (absDiff) {
      absDiff.className = `kpi-macro-val ${isPositive ? 'text-success' : 'text-danger'}`;
      absDiff.textContent = (isPositive ? '+' : '') + formatDisplay(data.absChange);
    }
    if (absDiffSub) absDiffSub.textContent = isPositive ? 'Net Expansion' : 'Net Contraction';

    if (pctGrowth) {
      pctGrowth.className = `kpi-macro-val ${isPositive ? 'text-success' : 'text-danger'}`;
      pctGrowth.textContent = `${isPositive ? '+' : ''}${data.pctChange}%`;
    }
    if (pctGrowthSub) pctGrowthSub.innerHTML = `<span class="badge ${isPositive ? 'bg-success' : 'bg-danger'}">${isPositive ? 'Positive Trend' : 'Decline'}</span> vs ${data.prevPeriod}`;

    if (benchmarkVal) benchmarkVal.textContent = data.benchmark;
    if (benchmarkStatus) benchmarkStatus.textContent = data.benchmarkStatus;

    // 3. Tab 1: Overview Breakdown Cards & Grouped Bar Chart
    const overviewTitle = document.getElementById('overviewChartTitle');
    if (overviewTitle) overviewTitle.textContent = `${data.title}: ${data.currPeriod} vs ${data.prevPeriod}`;

    const cardsContainer = document.getElementById('kpiOverviewCardsContainer');
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
      data.overviewCards.forEach(c => {
        const card = document.createElement('div');
        card.className = 'd-flex align-items-center justify-content-between p-2 rounded-2 border bg-white';
        card.innerHTML = `
          <div>
            <div class="text-muted" style="font-size:0.75rem; font-weight:600;">${c.label}</div>
            <div class="fw-bold ${c.color || 'text-dark'}" style="font-size:1.05rem;">${c.val}</div>
          </div>
          <div class="text-end">
            <span class="badge bg-light text-secondary border" style="font-size:0.72rem;">${c.sub}</span>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }
    renderKpiOverviewChart(data);

    // 4. Tab 2: College-wise Comparison
    const thPrev = document.getElementById('thPrevPeriod');
    const thCurr = document.getElementById('thCurrPeriod');
    if (thPrev) thPrev.textContent = data.prevPeriod;
    if (thCurr) thCurr.textContent = data.currPeriod;

    renderKpiCollegesTable(data.colleges, data.kpiKey);
    renderKpiCollegesChart(data);

    // 5. Tab 3: Trend & Rankings
    renderKpiTrendChart(data);
    renderKpiRankings(data.rankings, data.kpiKey);

    // 6. Reset to first tab
    const firstTabLink = document.getElementById('tabKpiOverviewBtn');
    if (firstTabLink && window.bootstrap) {
      const tabInst = new bootstrap.Tab(firstTabLink);
      tabInst.show();
    }

    // 7. Show Modal and Ensure Charts Resize Perfectly
    const modalEl = document.getElementById('kpiCompareModal');
    if (modalEl && window.bootstrap) {
      const modalInst = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInst.show();

      // Listen for shown.bs.modal to resize charts once visible
      if (!modalEl.dataset.resizeListenerAttached) {
        modalEl.dataset.resizeListenerAttached = 'true';
        modalEl.addEventListener('shown.bs.modal', function () {
          setTimeout(() => {
            if (charts.kpiCompareOverview) charts.kpiCompareOverview.resize();
            if (charts.kpiCompareColleges) charts.kpiCompareColleges.resize();
            if (charts.kpiCompareTrend) charts.kpiCompareTrend.resize();
          }, 80);
        });
      }

      // Tab switch listener for Tab 2 and Tab 3
      const kpiTabBtns = document.querySelectorAll('#kpiCompareTabs button[data-bs-toggle="tab"]');
      kpiTabBtns.forEach(btn => {
        if (!btn.dataset.resizeWired) {
          btn.dataset.resizeWired = 'true';
          btn.addEventListener('shown.bs.tab', function () {
            setTimeout(() => {
              if (charts.kpiCompareOverview) charts.kpiCompareOverview.resize();
              if (charts.kpiCompareColleges) charts.kpiCompareColleges.resize();
              if (charts.kpiCompareTrend) charts.kpiCompareTrend.resize();
            }, 60);
          });
        }
      });
    }

    // Force timeouts resize
    setTimeout(() => {
      if (charts.kpiCompareOverview) charts.kpiCompareOverview.resize();
      if (charts.kpiCompareColleges) charts.kpiCompareColleges.resize();
      if (charts.kpiCompareTrend) charts.kpiCompareTrend.resize();
    }, 150);
    setTimeout(() => {
      if (charts.kpiCompareOverview) charts.kpiCompareOverview.resize();
    }, 350);
  };

  // --------------------------------------------------------------------------
  // KPI MODAL CHART RENDERING ENGINES
  // --------------------------------------------------------------------------
  function renderKpiOverviewChart(data) {
    const el = document.getElementById('chartKpiCompareOverview');
    if (!el) return;
    el.style.minHeight = '380px';
    el.style.height = '380px';
    el.style.width = '100%';
    el.style.display = 'block';
    if (!charts.kpiCompareOverview) {
      charts.kpiCompareOverview = echarts.init(el);
    }

    const c = data.overviewChart;
    charts.kpiCompareOverview.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: [c.prevName, c.currName],
        bottom: 0,
        textStyle: { fontWeight: 600 }
      },
      grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: c.categories,
        axisLabel: {
          interval: 0,
          rotate: c.categories.length > 4 ? 15 : 0,
          fontSize: 11,
          fontWeight: 600,
          color: THEME.jainNavy
        }
      },
      yAxis: {
        type: 'value',
        name: c.unit,
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      series: [
        {
          name: c.prevName,
          type: 'bar',
          barWidth: 18,
          itemStyle: { color: '#94a3b8', borderRadius: [4, 4, 0, 0] },
          data: c.prev
        },
        {
          name: c.currName,
          type: 'bar',
          barWidth: 18,
          itemStyle: { color: '#2563eb', borderRadius: [4, 4, 0, 0] },
          data: c.curr
        }
      ]
    }, true);
  }

  function renderKpiCollegesChart(data) {
    const el = document.getElementById('chartKpiCompareColleges');
    if (!el) return;
    el.style.minHeight = '380px';
    el.style.height = '380px';
    el.style.width = '100%';
    el.style.display = 'block';
    if (!charts.kpiCompareColleges) {
      charts.kpiCompareColleges = echarts.init(el);
    }

    const colleges = [...data.colleges].reverse();
    const categories = colleges.map(c => c.shortName);
    
    // Format values based on KPI
    const isCurrency = data.kpiKey === 'fee_demand' || data.kpiKey === 'fee_collection';
    const isPct = data.kpiKey.includes('percentage') || data.kpiKey.includes('rate') || data.kpiKey === 'pass_percentage' || data.kpiKey === 'placement_percentage' || data.kpiKey === 'attendance_percentage';

    const prevValues = colleges.map(c => ({
      value: isCurrency ? Number((c.prev / 10000000).toFixed(2)) : c.prev,
      collegeId: c.id,
      collegeName: c.name,
      rawPrev: c.prev,
      rawCurr: c.curr,
      diff: c.diff,
      pct: c.pct
    }));

    const currValues = colleges.map(c => ({
      value: isCurrency ? Number((c.curr / 10000000).toFixed(2)) : c.curr,
      collegeId: c.id,
      collegeName: c.name,
      rawPrev: c.prev,
      rawCurr: c.curr,
      diff: c.diff,
      pct: c.pct
    }));

    charts.kpiCompareColleges.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          if (!items || items.length === 0) return '';
          const it = items[0];
          const d = it.data;
          const fmt = (v) => isCurrency ? window.NovaPortalData.formatCr(v) : (isPct ? `${v}%` : Number(v).toLocaleString('en-IN'));
          return `
            <div class="p-2" style="font-size:12px;">
              <div class="fw-bold mb-1">${d.collegeName}</div>
              <div class="text-muted">Previous (${data.prevPeriod}): <strong>${fmt(d.rawPrev)}</strong></div>
              <div class="text-primary">Current (${data.currPeriod}): <strong>${fmt(d.rawCurr)}</strong></div>
              <div class="mt-1">Variance: <strong class="${d.diff >= 0 ? 'text-success' : 'text-danger'}">${d.diff >= 0 ? '+' : ''}${fmt(d.diff)} (${d.diff >= 0 ? '+' : ''}${d.pct}%)</strong></div>
              <div class="text-primary mt-1" style="font-size:10px;">(Click bar to view full Faculty Dossier)</div>
            </div>
          `;
        }
      },
      legend: {
        data: [data.prevPeriod, data.currPeriod],
        bottom: 0,
        textStyle: { fontWeight: 600 }
      },
      grid: { left: '3%', right: '6%', bottom: '10%', top: '4%', containLabel: true },
      xAxis: {
        type: 'value',
        name: isCurrency ? '₹ Crores' : (isPct ? '%' : data.unit),
        axisLabel: { formatter: isPct ? '{value}%' : '{value}' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: categories,
        axisLabel: { fontWeight: 700, color: THEME.jainNavy }
      },
      series: [
        {
          name: data.prevPeriod,
          type: 'bar',
          barWidth: 12,
          itemStyle: { color: '#94a3b8', borderRadius: [0, 4, 4, 0] },
          data: prevValues
        },
        {
          name: data.currPeriod,
          type: 'bar',
          barWidth: 12,
          itemStyle: { color: '#2563eb', borderRadius: [0, 4, 4, 0] },
          data: currValues
        }
      ]
    }, true);

    // Click handler for modal horizontal chart
    charts.kpiCompareColleges.off('click');
    charts.kpiCompareColleges.on('click', function (params) {
      if (params.data && params.data.collegeId) {
        openCollegeDrilldownModal(params.data.collegeId);
      }
    });
  }

  function renderKpiCollegesTable(colleges, kpiKey) {
    const tbody = document.getElementById('kpiCompareTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const isCurrency = kpiKey === 'fee_demand' || kpiKey === 'fee_collection';
    const isPct = kpiKey.includes('percentage') || kpiKey.includes('rate') || kpiKey === 'pass_percentage' || kpiKey === 'placement_percentage' || kpiKey === 'attendance_percentage';

    const fmt = (v) => isCurrency ? window.NovaPortalData.formatCr(v) : (isPct ? `${Number(v).toFixed(2)}%` : Number(v).toLocaleString('en-IN'));

    colleges.forEach((c, index) => {
      const isPos = c.diff >= 0;
      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.title = `Click to drill down into ${c.name}`;
      tr.innerHTML = `
        <td class="fw-bold text-muted">${index + 1}</td>
        <td>
          <div class="fw-bold text-navy" style="font-size:0.86rem;">
            ${c.name}
            <span class="badge bg-light text-primary border ms-1">${c.code}</span>
          </div>
          <div class="text-muted" style="font-size:0.72rem;">Dean: Dr. R. K. Narayanan &bull; Verified ERP Record</div>
        </td>
        <td>
          <span class="campus-pill ${c.campus.toLowerCase()}">${c.campus}</span>
        </td>
        <td class="text-end fw-semibold text-muted">${fmt(c.prev)}</td>
        <td class="text-end fw-bold text-primary">${fmt(c.curr)}</td>
        <td class="text-end">
          <span class="variance-pill ${isPos ? 'positive' : 'negative'}">
            <i class="bi ${isPos ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}"></i>
            ${isPos ? '+' : ''}${fmt(c.diff)}
          </span>
        </td>
        <td class="text-end">
          <span class="badge ${isPos ? 'bg-success' : 'bg-danger'}">${isPos ? '+' : ''}${c.pct}%</span>
        </td>
        <td>
          <span class="badge ${c.statusClass || 'bg-primary'}">${c.status || 'Active'}</span>
        </td>
      `;
      tr.addEventListener('click', () => openCollegeDrilldownModal(c.id));
      tbody.appendChild(tr);
    });
  }

  function renderKpiTrendChart(data) {
    const el = document.getElementById('chartKpiCompareTrend');
    if (!el) return;
    el.style.minHeight = '380px';
    el.style.height = '380px';
    el.style.width = '100%';
    el.style.display = 'block';
    if (!charts.kpiCompareTrend) {
      charts.kpiCompareTrend = echarts.init(el);
    }

    const t = data.trend;
    charts.kpiCompareTrend.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: { left: '3%', right: '4%', bottom: '8%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: t.labels,
        axisLine: { lineStyle: { color: THEME.borderSubtle } },
        axisLabel: { fontWeight: 600, color: THEME.jainNavy }
      },
      yAxis: {
        type: 'value',
        name: t.unit,
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      series: [{
        name: t.unit,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#2563eb' },
        lineStyle: { width: 3, color: '#2563eb' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37, 99, 235, 0.35)' },
            { offset: 1, color: 'rgba(37, 99, 235, 0.02)' }
          ])
        },
        data: t.series
      }]
    }, true);
  }

  function renderKpiRankings(rankings, kpiKey) {
    const topContainer = document.getElementById('kpiTop5Rankings');
    const bottomContainer = document.getElementById('kpiBottom5Rankings');
    if (!topContainer || !bottomContainer) return;

    topContainer.innerHTML = '';
    bottomContainer.innerHTML = '';

    const isCurrency = kpiKey === 'fee_demand' || kpiKey === 'fee_collection';
    const isPct = kpiKey.includes('percentage') || kpiKey.includes('rate') || kpiKey === 'pass_percentage' || kpiKey === 'placement_percentage' || kpiKey === 'attendance_percentage';
    const fmt = (v) => isCurrency ? window.NovaPortalData.formatCr(v) : (isPct ? `${Number(v).toFixed(2)}%` : Number(v).toLocaleString('en-IN'));

    rankings.top5.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'kpi-rank-item cursor-pointer';
      div.title = `Click to drill down into ${item.name}`;
      div.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <span class="rank-badge rank-${index + 1}">${index + 1}</span>
          <div>
            <div class="fw-bold" style="font-size:0.84rem;">${item.shortName} <span class="badge bg-secondary" style="font-size:0.65rem;">${item.campus}</span></div>
            <div class="text-muted" style="font-size:0.72rem;">Current: <strong>${fmt(item.curr)}</strong> | Growth: <strong class="text-success">+${item.pct}%</strong></div>
          </div>
        </div>
        <div class="text-end">
          <span class="badge bg-success" style="font-size:0.75rem;">${item.status}</span>
        </div>
      `;
      div.addEventListener('click', () => openCollegeDrilldownModal(item.id));
      topContainer.appendChild(div);
    });

    rankings.bottom5.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'kpi-rank-item cursor-pointer border-start border-3 border-warning';
      div.title = `Click to drill down into ${item.name}`;
      div.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <span class="rank-badge rank-normal">${index + 6}</span>
          <div>
            <div class="fw-bold" style="font-size:0.84rem;">${item.shortName} <span class="badge bg-secondary" style="font-size:0.65rem;">${item.campus}</span></div>
            <div class="text-muted" style="font-size:0.72rem;">Current: <strong>${fmt(item.curr)}</strong> | Previous: <strong>${fmt(item.prev)}</strong></div>
          </div>
        </div>
        <div class="text-end">
          <span class="badge ${item.statusClass || 'bg-warning text-dark'}" style="font-size:0.75rem;">${item.status}</span>
        </div>
      `;
      div.addEventListener('click', () => openCollegeDrilldownModal(item.id));
      bottomContainer.appendChild(div);
    });
  }

  // --------------------------------------------------------------------------
  // KPI EXCEL / CSV EXPORT UTILITY
  // --------------------------------------------------------------------------
  function exportKpiToCsv() {
    const data = state.activeKpiCompareData;
    if (!data) return;

    const isCurrency = data.kpiKey === 'fee_demand' || data.kpiKey === 'fee_collection';
    const isPct = data.kpiKey.includes('percentage') || data.kpiKey.includes('rate') || data.kpiKey === 'pass_percentage' || data.kpiKey === 'placement_percentage' || data.kpiKey === 'attendance_percentage';
    const fmt = (v) => isCurrency ? window.NovaPortalData.formatCr(v) : (isPct ? `${Number(v).toFixed(2)}%` : Number(v).toLocaleString('en-IN'));

    let csv = `PK DAS (DEEMED TO BE UNIVERSITY) - NOVAPORTAL ERP\n`;
    csv += `EXECUTIVE KPI COMPARATIVE DOSSIER: ${data.title.toUpperCase()}\n`;
    csv += `Active Filter: Campus ${state.campus} | Academic Year ${state.academicYear} | Semester ${state.semester}\n`;
    csv += `Current Period: ${data.currPeriod} | Previous Period: ${data.prevPeriod}\n`;
    csv += `Institutional Aggregates: Previous: ${fmt(data.prevVal)} | Current: ${fmt(data.currVal)} | Variance: ${data.absChange >= 0 ? '+' : ''}${fmt(data.absChange)} | Growth %: ${data.absChange >= 0 ? '+' : ''}${data.pctChange}%\n\n`;

    csv += `Rank,Faculty Code,Faculty Full Name,Campus,Previous Period (${data.prevPeriod}),Current Period (${data.currPeriod}),Absolute Variance,Growth Rate %,Performance Status\n`;

    data.colleges.forEach((c, idx) => {
      const cleanName = `"${c.name.replace(/"/g, '""')}"`;
      csv += `${idx + 1},${c.code},${cleanName},${c.campus},"${fmt(c.prev)}","${fmt(c.curr)}","${c.diff >= 0 ? '+' : ''}${fmt(c.diff)}",${c.pct}%,${c.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const filename = `NOVAPORTAL_${data.kpiKey.toUpperCase()}_Comparison_${state.academicYear}.csv`;
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --------------------------------------------------------------------------
  // MASTER DASHBOARD DATA LOADER & COORDINATOR
  // --------------------------------------------------------------------------
  debouncedDataRefresh = debounce(loadDashboardData, 200);

  async function loadDashboardData() {
    state.isLoading = true;

    const colleges = window.NovaPortalData.getFilteredColleges(state.campus, state.selectedColleges);

    // Populate department drilldown select options
    const deptSelect = document.getElementById('selectDeptCollege');
    if (deptSelect && colleges.length > 0) {
      const currentVal = parseInt(deptSelect.value, 10);
      deptSelect.innerHTML = '';
      colleges.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.code} - ${c.shortName}`;
        if (c.id === state.activeDrilldownCollegeId || c.id === currentVal) opt.selected = true;
        deptSelect.appendChild(opt);
      });
      if (!colleges.find(c => c.id === state.activeDrilldownCollegeId)) {
        state.activeDrilldownCollegeId = colleges[0].id;
        deptSelect.value = state.activeDrilldownCollegeId;
      }
    }

    try {
      // Calculate consolidated data using the high-fidelity master engine
      const aggregated = window.NovaPortalData.aggregateData(colleges);

      // Render all 9 sections
      renderKpiCards(aggregated.kpis);
      renderCampusComparisonCharts();
      renderUniversityMatrixTable();
      renderAcademicCharts(aggregated.academic);
      renderDepartmentDrilldown(state.activeDrilldownCollegeId);
      renderFinancialCharts(aggregated.finance);
      renderResearchCharts(aggregated.research);
      renderStudentCharts(aggregated.students);
      renderFacultyCharts(aggregated.faculty);
      renderAttendanceCharts(aggregated.attendance);
      renderAttendanceTable(aggregated.attendance);
      attachDrilldownToAllCharts();
      wireKpiCardListeners();
      renderPlacementCharts(aggregated.placement);
      renderManagementInsights(aggregated.insights);

      // Re-attach drilldowns to all chart instances
      attachDrilldownToAllCharts();

    } catch (e) {
      console.error('Error updating dashboard analytics:', e);
    } finally {
      state.isLoading = false;
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 1: EXECUTIVE KPI CARDS RENDERING (Click-to-Compare)
  // --------------------------------------------------------------------------
  function renderKpiCards(kpis) {
    if (!kpis) return;

    const updateCard = (valId, trendId, subtextId, data, isCurrency = false, isPct = false) => {
      const valEl = document.getElementById(valId);
      const trendEl = document.getElementById(trendId);
      const subtextEl = document.getElementById(subtextId);

      if (valEl) {
        if (isCurrency) {
          valEl.textContent = data.formatted || window.NovaPortalData.formatCr(data.current);
        } else if (isPct) {
          valEl.textContent = data.current + '%';
        } else {
          valEl.textContent = Number(data.current).toLocaleString('en-IN');
        }
      }

      if (trendEl) {
        trendEl.className = `kpi-trend-badge ${data.trend || 'up'}`;
        const iconClass = data.trend === 'up' ? 'bi-arrow-up-right' : 'bi-arrow-down-right';
        trendEl.innerHTML = `<i class="bi ${iconClass}"></i> ${data.label || ''}`;
      }

      if (subtextEl && data.badge) {
        subtextEl.textContent = data.badge;
      }
    };

    updateCard('kpiStudentStrength', 'kpiStudentTrend', 'kpiStudentSubtext', kpis.student_strength);
    updateCard('kpiFacultyStrength', 'kpiFacultyTrend', 'kpiFacultySubtext', kpis.faculty_strength);
    updateCard('kpiFeeDemand', 'kpiDemandTrend', 'kpiDemandSubtext', kpis.fee_demand, true);
    updateCard('kpiFeeCollection', 'kpiCollectionTrend', 'kpiCollectionSubtext', kpis.fee_collection, true);
    updateCard('kpiPassPercentage', 'kpiPassTrend', 'kpiPassSubtext', kpis.pass_percentage, false, true);
    updateCard('kpiResearchPublications', 'kpiResearchTrend', 'kpiResearchSubtext', kpis.research_publications);
    updateCard('kpiPlacementPercentage', 'kpiPlacementTrend', 'kpiPlacementSubtext', kpis.placement_percentage, false, true);
    updateCard('kpiAttendancePercentage', 'kpiAttendanceTrend', 'kpiAttendanceSubtext', kpis.attendance_percentage, false, true);
  }


  // --------------------------------------------------------------------------
  // SECTION 1B: BLR VS KOCHI CONSOLIDATED COMPARISON CHART (Requirement 4)
  // --------------------------------------------------------------------------
  function renderCampusComparisonCharts() {
    if (!charts.campusComparison) return;

    const data = window.NovaPortalData.getCampusComparisonData ? window.NovaPortalData.getCampusComparisonData() : null;
    if (!data) return;

    const categories = [
      'Pass Rate (%)',
      'Placement Rate (%)',
      'Attendance (%)',
      'Fee Realized (%)',
      'SFR (Ratio :1)',
      'RPF (Papers/Fac)',
      'Avg CTC (LPA)'
    ];

    const blrValues = [
      data.blr.academic.passPct,
      data.blr.placement.rate,
      data.blr.attendance.pct,
      data.blr.finance.collectionPct,
      data.blr.faculty.sfr,
      data.blr.faculty.rpf,
      data.blr.placement.avg
    ];

    const kochiValues = [
      data.kochi.academic.passPct,
      data.kochi.placement.rate,
      data.kochi.attendance.pct,
      data.kochi.finance.collectionPct,
      data.kochi.faculty.sfr,
      data.kochi.faculty.rpf,
      data.kochi.placement.avg
    ];

    charts.campusComparison.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          let html = `<div class="p-2"><div class="fw-bold mb-1 border-bottom pb-1">${items[0].name}</div>`;
          items.forEach(it => {
            html += `<div class="d-flex align-items-center justify-content-between gap-3 small"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${it.value}</strong></div>`;
          });
          const b = items.find(i => i.seriesName.includes('Bangalore'));
          const k = items.find(i => i.seriesName.includes('Kochi'));
          if (b && k) {
            const diff = (b.value - k.value).toFixed(2);
            html += `<div class="mt-1 pt-1 border-top text-primary fw-bold small">Campus Difference: ${diff > 0 ? '+' : ''}${diff}</div>`;
          }
          html += `<div class="text-muted mt-1" style="font-size:10.5px;">Click to inspect constituent faculties</div></div>`;
          return html;
        }
      },
      legend: {
        data: ['Bangalore Campus (BLR - 3 Faculties)', 'Kochi Campus (KOCHI - 7 Faculties)'],
        top: 5,
        textStyle: { fontWeight: 600, fontSize: 11.5 }
      },
      grid: { left: '3%', right: '5%', bottom: '8%', top: '16%', containLabel: true },
      xAxis: {
        type: 'category',
        data: categories,
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      series: [
        {
          name: 'Bangalore Campus (BLR - 3 Faculties)',
          type: 'bar',
          barWidth: 20,
          cursor: 'pointer',
          itemStyle: { color: '#1e3a8a', borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', formatter: '{c}', fontSize: 10, fontWeight: 700 },
          data: blrValues
        },
        {
          name: 'Kochi Campus (KOCHI - 7 Faculties)',
          type: 'bar',
          barWidth: 20,
          cursor: 'pointer',
          itemStyle: { color: '#059669', borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', formatter: '{c}', fontSize: 10, fontWeight: 700 },
          data: kochiValues
        }
      ]
    }, true);
  }

  // --------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------
  // SECTION 1C: CONSOLIDATED UNIVERSITY PERFORMANCE COMPARISON MATRIX
  // --------------------------------------------------------------------------
  function renderUniversityMatrixTable() {
    const tbody = document.getElementById('tableUniversityMatrixBody');
    if (!tbody) return;
    const colleges = window.NovaPortalData.COLLEGES;
    tbody.innerHTML = '';

    colleges.forEach(c => {
      const d = window.NovaPortalData.getCollegeDrilldownData(c.id);
      if (!d) return;

      const passDiff = (d.academic.passPct - d.academic.prevPassPct).toFixed(2);
      const passDiffSign = passDiff >= 0 ? '+' : '';
      const passDiffClass = passDiff >= 0 ? 'text-success' : 'text-danger';

      const plcRateVal = d.placement ? (d.placement.rate !== undefined ? d.placement.rate : (d.placement.placementPct !== undefined ? d.placement.placementPct : 0)) : 0;
      const plcRateStr = (typeof plcRateVal === 'number' ? plcRateVal : parseFloat(plcRateVal) || 0).toFixed(2);

      const feeRateStr = d.finance.collectionPct.toFixed(2);
      const attRateStr = d.attendance.pct.toFixed(2);
      const sfrStr = `${d.faculty.sfr}:1`;

      const isExcellence = d.academic.passPct >= 91 && parseFloat(plcRateStr) >= 88 && d.attendance.pct >= 85;
      const isRisk = d.attendance.pct < 85 || d.academic.passPct < 88 || d.finance.collectionPct < 88;
      const statusBadge = isExcellence 
        ? '<span class="badge bg-success bg-opacity-10 text-success border border-success-subtle">Excellence Benchmark</span>'
        : (isRisk ? '<span class="badge bg-warning bg-opacity-10 text-warning border border-warning-subtle">Review Monitoring</span>' : '<span class="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle">Compliant</span>');

      const ipiScore = (d.academic.passPct * 0.25 + parseFloat(plcRateStr) * 0.25 + d.finance.collectionPct * 0.20 + (Math.min(1.5, d.research.rpf) / 1.5 * 100) * 0.15 + 15).toFixed(1);

      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.title = `Click to inspect ${c.name} full dossier`;
      tr.innerHTML = `
        <td>
          <div class="d-flex align-items-center gap-2">
            <span class="badge bg-light text-primary border fw-bold">${c.code}</span>
            <div>
              <div class="fw-bold text-dark" style="font-size:0.84rem;">${c.name}</div>
              <div class="text-muted text-xs"><i class="bi bi-person me-1"></i>${c.dean}</div>
            </div>
          </div>
        </td>
        <td class="text-center">
          <span class="campus-pill ${c.campus.toLowerCase()}">${c.campus}</span>
        </td>
        <td class="text-end fw-semibold">${d.students.total.toLocaleString('en-IN')}</td>
        <td class="text-center"><span class="badge bg-light text-dark border">${sfrStr}</span></td>
        <td class="text-end">
          <span class="fw-bold text-dark">${d.academic.passPct.toFixed(2)}%</span>
          <span class="small ${passDiffClass} ms-1" style="font-size:0.75rem;">(${passDiffSign}${passDiff}%)</span>
        </td>
        <td class="text-end fw-bold text-primary">${plcRateStr}%</td>
        <td class="text-end text-muted">₹${(d.placement && d.placement.avgCtc ? d.placement.avgCtc : 8.5).toFixed(2)}L</td>
        <td class="text-end fw-semibold ${d.finance.collectionPct >= 90 ? 'text-success' : 'text-warning'}">${feeRateStr}%</td>
        <td class="text-end fw-semibold ${d.attendance.pct >= 85 ? 'text-success' : 'text-danger'}">${attRateStr}%</td>
        <td class="text-center fw-bold text-purple">${d.research.rpf}</td>
        <td class="text-center"><span class="badge bg-primary text-white fw-bold">${ipiScore}</span></td>
        <td class="text-center">${statusBadge}</td>
        <td class="text-center">
          <button type="button" class="btn btn-xs btn-outline-primary py-1 px-2" style="font-size:0.72rem;">
            <i class="bi bi-eye me-1"></i> Dossier
          </button>
        </td>
      `;

      tr.addEventListener('click', () => openCollegeDrilldownModal(c.id));
      tbody.appendChild(tr);
    });
  }

  // --------------------------------------------------------------------------
  // COMPARISON VIEW CONTROLLER (Requirement 6: 3 Views)
  // --------------------------------------------------------------------------
  window.setComparisonView = function (mode) {
    document.querySelectorAll('.view-mode-pill').forEach(p => p.classList.remove('active'));
    if (mode === 'all') {
      const btn = document.getElementById('btnViewAllColleges');
      if (btn) btn.classList.add('active');
      const campSel = document.getElementById('filterCampus');
      const colSel = document.getElementById('filterCollege');
      if (campSel) campSel.value = 'ALL';
      if (colSel) colSel.value = 'all';
      state.campus = 'ALL';
      state.selectedColleges = window.NovaPortalData.COLLEGES.map(c => c.id);
      debouncedDataRefresh();
    } else if (mode === 'campus') {
      const btn = document.getElementById('btnViewBlrVsKochi');
      if (btn) btn.classList.add('active');
      const campSec = document.getElementById('sectionCampusComparison');
      if (campSec) {
        if (campSec.scrollIntoView) { campSec.scrollIntoView({ behavior: 'smooth' }); }
      }
    } else if (mode === 'college') {
      const btn = document.getElementById('btnViewIndividual');
      if (btn) btn.classList.add('active');
      const colSel = document.getElementById('filterCollege');
      if (colSel) {
        if (colSel.focus) colSel.focus();
        if (colSel.value === 'all') {
          colSel.value = '1';
          state.selectedColleges = [1];
          debouncedDataRefresh();
        }
      }
    }
  };

  // Back to Top and Subnav Scrollspy
  function setupScrollInteractions() {
    const btnTop = document.getElementById('btnBackToTop');
    window.addEventListener('scroll', function () {
      if (btnTop) {
        btnTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
      }
      
      // Update subnav active pill
      const sections = [
        'sectionKpis', 'sectionCampusComparison', 'sectionAcademic',
        'sectionFinance', 'sectionResearch', 'sectionStudents',
        'sectionFaculty', 'sectionAttendance', 'sectionPlacements', 'sectionInsights'
      ];
      
      let currentSection = '';
      for (const sId of sections) {
        const sec = document.getElementById(sId);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sId;
            break;
          }
        }
      }
      
      if (currentSection) {
        document.querySelectorAll('.subnav-pill').forEach(pill => {
          const href = pill.getAttribute('href');
          if (href === '#' + currentSection) {
            pill.classList.add('active');
          } else if (href && href.startsWith('#')) {
            pill.classList.remove('active');
          }
        });
      }
    });

    // Wire Collapsible sections to trigger chart resize
    document.querySelectorAll('.collapse').forEach(coll => {
      coll.addEventListener('shown.bs.collapse', function () {
        resizeAllCharts();
      });
    });
  }


  // SECTION 2: ACADEMIC & EXAMINATION PERFORMANCE
  // --------------------------------------------------------------------------
  function renderAcademicCharts(data) {
    if (!charts.academicPass) return;

    const colleges = data.colleges || [];
    const names = colleges.map(c => c.code).reverse();

    // Dropdown listener for College-Wise Pass Percentage Comparison (Requirement 3)
    const passSelect = document.getElementById('selectAcademicPassYear');
    if (passSelect && !passSelect.dataset.initialized) {
      passSelect.dataset.initialized = 'true';
      passSelect.addEventListener('change', function () {
        state.academicPassMode = this.value;
        renderAcademicCharts(data);
      });
    }

    const mode = state.academicPassMode || (passSelect ? passSelect.value : 'current');
    let seriesConfig = [];
    let legendData = [];

    if (mode === 'current') {
      seriesConfig = [{
        name: 'AY 2026-27 (Current)',
        type: 'bar',
        barWidth: 16,
        cursor: 'pointer',
        data: colleges.map(c => ({
          value: c.passPct,
          collegeId: c.id,
          collegeName: c.shortName,
          appeared: c.appeared,
          passed: c.passed,
          failed: c.failed,
          arrears1: c.arrears1,
          arrears2: c.arrears2,
          arrearsMore: c.arrearsMore,
          arrears: c.arrears
        })).reverse(),
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: function (params) {
            return params.value >= 90 ? THEME.successGreen : (params.value >= 85 ? THEME.primaryBlue : THEME.warningAmber);
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          fontWeight: 700,
          fontSize: 11
        },
        markLine: {
          data: [{ xAxis: 75, name: 'Target 75%' }],
          lineStyle: { color: THEME.dangerRose, type: 'dashed', width: 2 },
          label: { formatter: 'Target: 75%', position: 'end', color: THEME.dangerRose, fontSize: 11 }
        }
      }];
      legendData = ['AY 2026-27 (Current)'];
    } else if (mode === '2year') {
      seriesConfig = [
        {
          name: 'AY 2025-26 (Last Year)',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.prevAySlate, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.prevPassPct || Number((c.passPct - 1.8).toFixed(2)), collegeId: c.id })).reverse()
        },
        {
          name: 'AY 2026-27 (Current)',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.currAyBlue, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.passPct, collegeId: c.id })).reverse(),
          label: { show: true, position: 'right', formatter: '{c}%', fontSize: 10, fontWeight: 700 }
        }
      ];
      legendData = ['AY 2025-26 (Last Year)', 'AY 2026-27 (Current)'];
    } else { // 3-year
      seriesConfig = [
        {
          name: 'AY 2024-25',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: '#94a3b8', borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: c.passPct3yr ? c.passPct3yr[0] : Number((c.passPct - 3.2).toFixed(2)), collegeId: c.id })).reverse()
        },
        {
          name: 'AY 2025-26',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: '#0284c7', borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: c.passPct3yr ? c.passPct3yr[1] : (c.prevPassPct || Number((c.passPct - 1.8).toFixed(2))), collegeId: c.id })).reverse()
        },
        {
          name: 'AY 2026-27 (Current)',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: THEME.currAyBlue, borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: c.passPct, collegeId: c.id })).reverse(),
          label: { show: true, position: 'right', formatter: '{c}%', fontSize: 10, fontWeight: 700 }
        }
      ];
      legendData = ['AY 2024-25', 'AY 2025-26', 'AY 2026-27 (Current)'];
    }

    charts.academicPass.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          const item = items[0];
          const raw = item.data;
          let html = `<div class="p-2"><div class="fw-bold mb-1">${item.name}</div>`;
          items.forEach(it => {
            html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${it.value}%</strong></div>`;
          });
          if (raw && raw.appeared) {
            html += `
              <div class="mt-2 pt-1 border-top text-muted small">
                Appeared: <strong>${raw.appeared}</strong> &bull; Passed: <strong>${raw.passed}</strong><br/>
                Failed (Total Arrears): <strong class="text-danger">${raw.failed}</strong><br/>
                <span style="font-size:10.5px;">(1 Arr: ${raw.arrears1 || 0} &bull; 2 Arr: ${raw.arrears2 || 0} &bull; >2 Arr: ${raw.arrearsMore || 0})</span>
              </div>
            `;
          }
          html += `<div class="text-primary mt-1" style="font-size:11px;">(Click bar to view College Dossier)</div></div>`;
          return html;
        }
      },
      legend: {
        data: legendData,
        top: 0,
        textStyle: { fontSize: 11 }
      },
      grid: { left: '3%', right: '10%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'value',
        min: 70,
        max: 100,
        axisLabel: { formatter: '{value}%' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: names,
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      series: seriesConfig
    }, true);

    // Render Comprehensive Examination Ledger Table (Requirement 5: 1 Arrear, 2 Arrears, Arrears > 2)
    const academicTableBody = document.getElementById('tableAcademicBody');
    if (academicTableBody) {
      academicTableBody.innerHTML = '';
      colleges.forEach(c => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.title = `Click to open ${c.name} drilldown`;
        tr.innerHTML = `
          <td><span class="badge bg-light text-primary border fw-bold">${c.code}</span></td>
          <td class="fw-semibold">${c.name}</td>
          <td class="text-end">${c.appeared ? c.appeared.toLocaleString('en-IN') : '-'}</td>
          <td class="text-end text-success fw-bold">${c.passed ? c.passed.toLocaleString('en-IN') : '-'}</td>
          <td class="text-end text-danger fw-bold">${c.failed ? c.failed.toLocaleString('en-IN') : '-'}</td>
          <td class="text-end">${c.arrears1 ? c.arrears1.toLocaleString('en-IN') : '0'}</td>
          <td class="text-end">${c.arrears2 ? c.arrears2.toLocaleString('en-IN') : '0'}</td>
          <td class="text-end">${c.arrearsMore ? c.arrearsMore.toLocaleString('en-IN') : '0'}</td>
          <td class="text-end fw-bold">${c.passPct ? c.passPct.toFixed(2) + '%' : '-'}</td>
          <td class="text-end text-primary">${c.distinction || '-'}</td>
          <td class="text-end text-secondary">${c.firstClass || '-'}</td>
        `;
        tr.addEventListener('click', () => openCollegeDrilldownModal(c.id, 'depts'));
        academicTableBody.appendChild(tr);
      });
    }

    renderDepartmentDrilldown(state.activeDrilldownCollegeId);
  }

  // Department Drilldown Rendering (Requirement 4: Count Verification)
  function renderDepartmentDrilldown(collegeId) {
    if (!charts.academicDeptDrill) return;

    const depts = window.NovaPortalData.DEPARTMENTS[collegeId] || [
      { code: 'CORE-1', name: 'Primary Division 1', passPct: 92.4, appeared: 580, passed: 536, failed: 44, arrears1: 26, arrears2: 12, arrearsMore: 6 },
      { code: 'CORE-2', name: 'Primary Division 2', passPct: 89.1, appeared: 460, passed: 410, failed: 50, arrears1: 30, arrears2: 14, arrearsMore: 6 }
    ];

    charts.academicDeptDrill.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          const item = items[0];
          const d = depts.find(x => x.code === item.name);
          if (!d) return `${item.name}: ${item.value}%`;
          return `
            <div class="p-2" style="min-width: 230px;">
              <div class="fw-bold mb-1 border-bottom pb-1 text-dark">${d.name} (${d.code})</div>
              <div>Pass Percentage: <strong class="text-success">${d.passPct}%</strong></div>
              <div>Appeared Students: <strong>${d.appeared}</strong></div>
              <div>Passed Students: <strong class="text-success">${d.passed}</strong></div>
              <div>Failed / Arrears: <strong class="text-danger">${d.failed}</strong></div>
              <div class="text-muted small mt-1 pt-1 border-top">
                1 Arrear: <strong>${d.arrears1 || 0}</strong> &bull; 2 Arrears: <strong>${d.arrears2 || 0}</strong> &bull; >2: <strong>${d.arrearsMore || 0}</strong>
              </div>
              <div class="text-success small fw-semibold mt-1">
                &check; Appeared (${d.appeared}) = Passed (${d.passed}) + Failed (${d.failed})
              </div>
            </div>
          `;
        }
      },
      grid: { left: '3%', right: '5%', bottom: '5%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: depts.map(d => d.code),
        axisLabel: { fontWeight: 700, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        min: 70,
        max: 100,
        axisLabel: { formatter: '{value}%' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      series: [{
        name: 'Pass %',
        type: 'bar',
        barWidth: 24,
        cursor: 'pointer',
        data: depts.map(d => ({ value: d.passPct, collegeId: collegeId })),
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: function (p) {
            return p.value >= 92 ? THEME.successGreen : (p.value >= 88 ? THEME.jainNavy : THEME.warningAmber);
          }
        },
        label: { show: true, position: 'top', formatter: '{c}%', fontWeight: 700 }
      }]
    }, true);
  }

  // --------------------------------------------------------------------------
  // SECTION 3: FINANCIAL PERFORMANCE VISUALIZATION
  // --------------------------------------------------------------------------
  function renderFinancialCharts(data) {
    if (!charts.financeDemandCollection) return;

    const colleges = data.colleges || [];

    // 1. Demand & Collection: Previous AY vs Current AY Horizontal Grouped Bar
    charts.financeDemandCollection.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          let html = `<div class="p-2"><div class="fw-bold mb-1">${items[0].name}</div>`;
          items.forEach(it => {
            html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${window.NovaPortalData.formatCr(it.value)}</strong></div>`;
          });
          const curr = items.find(i => i.seriesName.includes('Current AY Collected'));
          const dem = items.find(i => i.seriesName.includes('Current AY Demand'));
          if (curr && dem && dem.value > 0) {
            const realization = ((curr.value / dem.value) * 100).toFixed(2);
            html += `<div class="mt-1 pt-1 border-top text-success fw-bold">Collection Realization: ${realization}%</div>`;
          }
          html += `<div class="text-primary mt-1" style="font-size:11px;">(Click bar to view College Dossier)</div></div>`;
          return html;
        }
      },
      legend: {
        data: ['Previous AY Demand', 'Previous AY Collected', 'Current AY Demand', 'Current AY Collected'],
        top: 0,
        textStyle: { fontSize: 10.5 }
      },
      grid: { left: '3%', right: '10%', bottom: '5%', top: '14%', containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { formatter: v => '₹' + (v / 10000000).toFixed(0) + ' Cr' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: colleges.map(c => c.code).reverse(),
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      series: [
        {
          name: 'Previous AY Demand',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: '#cbd5e1', borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: c.prev || Math.round(c.demand * 0.9), collegeId: c.id })).reverse()
        },
        {
          name: 'Previous AY Collected',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: '#94a3b8', borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: Math.round((c.prev || c.demand * 0.9) * 0.88), collegeId: c.id })).reverse()
        },
        {
          name: 'Current AY Demand',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: '#93c5fd', borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: c.demand, collegeId: c.id })).reverse()
        },
        {
          name: 'Current AY Collected',
          type: 'bar',
          barWidth: 8,
          cursor: 'pointer',
          itemStyle: { color: THEME.currAyBlue, borderRadius: [0, 3, 3, 0] },
          data: colleges.map(c => ({ value: c.collected, collegeId: c.id })).reverse(),
          label: {
            show: true,
            position: 'right',
            formatter: p => '₹' + (p.value / 10000000).toFixed(1) + ' Cr',
            fontSize: 9.5,
            fontWeight: 700
          }
        }
      ]
    }, true);

    // 2. Monthly Collection Run-Rate: College-Wise Analysis (Last 6 Months)
    if (charts.financeMonthlyTrend) {
      const allMonths = ['Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026'];
      const collegeColors = ['#1e3a8a', '#2563eb', '#0284c7', '#0891b2', '#0d9488', '#059669', '#16a34a', '#d97706', '#ea580c', '#dc2626'];

      const seriesList = colleges.map((c, idx) => {
        const factor = c.collected / (colleges.reduce((acc, x) => acc + x.collected, 0) || 1);
        const colMonthly = [
          Math.round(280000000 * factor),
          Math.round(410000000 * factor),
          Math.round(590000000 * factor),
          Math.round(780000000 * factor),
          Math.round(620000000 * factor),
          Math.round(c.collected * 0.22)
        ];
        return {
          name: c.code,
          type: 'line',
          smooth: true,
          symbolSize: 4,
          lineStyle: { width: 2, color: collegeColors[idx % collegeColors.length] },
          itemStyle: { color: collegeColors[idx % collegeColors.length] },
          data: colMonthly
        };
      });

      charts.financeMonthlyTrend.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (items) {
            let html = `<div class="p-2" style="max-height:260px;overflow-y:auto;"><div class="fw-bold mb-1 border-bottom pb-1">${items[0].name} Collection Run-Rate</div>`;
            items.forEach(it => {
              html += `<div class="d-flex align-items-center justify-content-between gap-3 small"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${it.color};margin-right:4px;"></span>${it.seriesName}: <strong>${window.NovaPortalData.formatCr(it.value)}</strong></div>`;
            });
            html += `</div>`;
            return html;
          }
        },
        legend: {
          type: 'scroll',
          top: 0,
          textStyle: { fontSize: 10 }
        },
        grid: { left: '3%', right: '5%', bottom: '8%', top: '16%', containLabel: true },
        xAxis: {
          type: 'category',
          data: allMonths,
          axisLabel: { fontWeight: 700, fontSize: 11 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: v => '₹' + (v / 10000000).toFixed(0) + ' Cr' },
          splitLine: { lineStyle: { color: THEME.gridLine } }
        },
        series: seriesList
      }, true);
    }

    // 3. Payment Mode Share Donut (with exact percentages)
    if (charts.financePaymentModes) {
      charts.financePaymentModes.setOption({
        tooltip: {
          trigger: 'item',
          formatter: p => `<div class="p-2"><div class="fw-bold">${p.name}</div><div>Volume: <strong>${window.NovaPortalData.formatCr(p.value)}</strong> (${p.percent}%)</div></div>`
        },
        legend: {
          bottom: 0,
          left: 'center',
          textStyle: { fontSize: 10.5 },
          formatter: function (name) {
            const pMap = { 'Online NetBanking / UPI': '54.2%', 'ERP Integrated Gateway': '26.8%', 'NEFT / RTGS Challan': '14.5%', 'POS Counter / DD': '4.5%' };
            return `${name} (${pMap[name] || ''})`;
          }
        },
        series: [{
          name: 'Channel',
          type: 'pie',
          radius: ['45%', '72%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { show: true, position: 'outside', formatter: '{b}\n{d}%', fontSize: 10.5, fontWeight: 700 },
          labelLine: { length: 12, length2: 8 },
          data: [
            { value: 1610000000, name: 'Online NetBanking / UPI', itemStyle: { color: '#1e3a8a' } },
            { value: 798000000, name: 'ERP Integrated Gateway', itemStyle: { color: '#0284c7' } },
            { value: 432000000, name: 'NEFT / RTGS Challan', itemStyle: { color: '#10b981' } },
            { value: 135000000, name: 'POS Counter / DD', itemStyle: { color: '#f59e0b' } }
          ]
        }]
      }, true);
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 4: RESEARCH & INTELLECTUAL PROPERTY
  // --------------------------------------------------------------------------
  function renderResearchCharts(data) {
    if (!charts.researchComparison) return;

    const colleges = data.colleges || [];

    // 1. Research Publications: Previous vs Current Year Horizontal Grouped Bar
    charts.researchComparison.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          let html = `<div class="p-2"><div class="fw-bold mb-1">${items[0].name}</div>`;
          items.forEach(it => {
            html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${it.value}</strong> publications</div>`;
          });
          const curr = items.find(i => i.seriesName.includes('Current'));
          const prev = items.find(i => i.seriesName.includes('Previous'));
          if (curr && prev && prev.value > 0) {
            const growth = (((curr.value - prev.value) / prev.value) * 100).toFixed(1);
            html += `<div class="mt-1 pt-1 border-top text-success fw-bold">YoY Growth: +${growth}%</div>`;
          }
          html += `<div class="text-primary mt-1" style="font-size:11px;">(Click to view College Dossier)</div></div>`;
          return html;
        }
      },
      legend: {
        data: ['Previous AY 2025-26', 'Current AY 2026-27'],
        top: 0,
        textStyle: { fontSize: 11 }
      },
      grid: { left: '3%', right: '10%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: colleges.map(c => c.code).reverse(),
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      series: [
        {
          name: 'Previous AY 2025-26',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.prevAySlate, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.prev || Math.round(c.unique * 0.88), collegeId: c.id })).reverse()
        },
        {
          name: 'Current AY 2026-27',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.currAyBlue, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.unique, collegeId: c.id })).reverse(),
          label: { show: true, position: 'right', formatter: '{c}', fontSize: 10, fontWeight: 700 }
        }
      ]
    }, true);

    // 2. Patents Filed & Granted
    if (charts.researchPatents) {
      charts.researchPatents.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['Patents Filed', 'Patents Granted'],
          top: 0,
          textStyle: { fontSize: 11 }
        },
        grid: { left: '3%', right: '5%', bottom: '5%', top: '12%', containLabel: true },
        xAxis: {
          type: 'category',
          data: colleges.map(c => c.code),
          axisLabel: { fontWeight: 700, fontSize: 11 }
        },
        yAxis: {
          type: 'value',
          splitLine: { lineStyle: { color: THEME.gridLine } }
        },
        series: [
          {
            name: 'Patents Filed',
            type: 'bar',
            barWidth: 12,
            itemStyle: { color: '#0284c7', borderRadius: [4, 4, 0, 0] },
            data: colleges.map(c => ({ value: c.filed, collegeId: c.id }))
          },
          {
            name: 'Patents Granted',
            type: 'bar',
            barWidth: 12,
            itemStyle: { color: THEME.successGreen, borderRadius: [4, 4, 0, 0] },
            data: colleges.map(c => ({ value: c.granted, collegeId: c.id }))
          }
        ]
      }, true);
    }

    // 3. College Publication Output & Faculty Completion Count
    if (charts.researchPerFaculty) {
      charts.researchPerFaculty.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (items) {
            const code = items[0].name;
            const col = colleges.find(c => c.code === code);
            const fac = window.NovaPortalData.INSTITUTIONAL_DATA[col.id].faculty;
            const completedFac = Math.round(fac.total * (fac.researchActive / 100));
            return `
              <div class="p-2">
                <div class="fw-bold mb-1">${col.name} (${col.code})</div>
                <div>Total Publications: <strong>${col.unique}</strong> papers</div>
                <div>Faculty Publishing Papers: <strong>${completedFac}</strong> of ${fac.total} faculty</div>
                <div>Faculty Participation Rate: <strong>${fac.researchActive}%</strong></div>
                <div>Research Productivity: <strong>${col.rpf}</strong> papers/faculty</div>
              </div>
            `;
          }
        },
        legend: {
          data: ['Published Papers', 'Faculty Completed Publication'],
          top: 0,
          textStyle: { fontSize: 10.5 }
        },
        grid: { left: '3%', right: '5%', bottom: '5%', top: '14%', containLabel: true },
        xAxis: {
          type: 'category',
          data: colleges.map(c => c.code),
          axisLabel: { fontWeight: 700, fontSize: 11 }
        },
        yAxis: [
          { type: 'value', name: 'Papers', splitLine: { lineStyle: { color: THEME.gridLine } } },
          { type: 'value', name: 'Faculty', splitLine: { show: false } }
        ],
        series: [
          {
            name: 'Published Papers',
            type: 'bar',
            barWidth: 14,
            itemStyle: { color: '#1e3a8a', borderRadius: [4, 4, 0, 0] },
            data: colleges.map(c => ({ value: c.unique, collegeId: c.id }))
          },
          {
            name: 'Faculty Completed Publication',
            type: 'line',
            yAxisIndex: 1,
            symbolSize: 6,
            lineStyle: { width: 3, color: '#10b981' },
            itemStyle: { color: '#10b981' },
            data: colleges.map(c => {
              const fac = window.NovaPortalData.INSTITUTIONAL_DATA[c.id].faculty;
              return Math.round(fac.total * (fac.researchActive / 100));
            })
          }
        ]
      }, true);
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 5: STUDENT ENROLLMENT & ACADEMIC LIFECYCLE
  // --------------------------------------------------------------------------
  function renderStudentCharts(data) {
    if (!charts.studentStrength) return;

    const colleges = data.colleges || [];

    // 1. Total Student Strength: Previous AY vs Current AY Horizontal Grouped Bar
    charts.studentStrength.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          let html = `<div class="p-2"><div class="fw-bold mb-1">${items[0].name}</div>`;
          items.forEach(it => {
            html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${it.value.toLocaleString()}</strong> students</div>`;
          });
          const curr = items.find(i => i.seriesName.includes('Current'));
          const prev = items.find(i => i.seriesName.includes('Previous'));
          if (curr && prev && prev.value > 0) {
            const growth = (((curr.value - prev.value) / prev.value) * 100).toFixed(2);
            html += `<div class="mt-1 pt-1 border-top text-success fw-bold">YoY Growth: +${growth}%</div>`;
          }
          html += `<div class="text-primary mt-1" style="font-size:11px;">(Click to view College Dossier)</div></div>`;
          return html;
        }
      },
      legend: {
        data: ['Previous AY 2025-26', 'Current AY 2026-27'],
        top: 0,
        textStyle: { fontSize: 11 }
      },
      grid: { left: '3%', right: '8%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: colleges.map(c => c.code).reverse(),
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      series: [
        {
          name: 'Previous AY 2025-26',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.prevAySlate, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.prev || Math.round(c.total * 0.94), collegeId: c.id })).reverse()
        },
        {
          name: 'Current AY 2026-27',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.currAyBlue, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.total, collegeId: c.id })).reverse(),
          label: { show: true, position: 'right', formatter: '{c}', fontSize: 10, fontWeight: 700 }
        }
      ]
    }, true);

    // 2. Program Cadre Split: 100% Marimekko Stacked Distribution Chart (Requirement 6)
    if (charts.studentCadre) {
      const mekkoColleges = colleges.map(c => {
        const ug = c.ug || Math.round(c.total * 0.78);
        const pg = c.pg || Math.round(c.total * 0.19);
        const phd = c.phd || (c.total - ug - pg);
        const tot = ug + pg + phd;
        return {
          id: c.id,
          code: c.code,
          name: c.name,
          total: tot,
          ug: ug,
          pg: pg,
          phd: phd,
          ugPct: Number(((ug / tot) * 100).toFixed(1)),
          pgPct: Number(((pg / tot) * 100).toFixed(1)),
          phdPct: Number(((phd / tot) * 100).toFixed(1))
        };
      });

      charts.studentCadre.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (items) {
            const code = items[0].name;
            const col = mekkoColleges.find(m => m.code === code);
            if (!col) return code;
            return `
              <div class="p-2" style="min-width: 220px;">
                <div class="fw-bold mb-1 text-dark border-bottom pb-1">${col.name} (${col.code})</div>
                <div class="text-muted small mb-1">Total Enrollment: <strong>${col.total.toLocaleString()}</strong> students</div>
                <div class="d-flex align-items-center justify-content-between">
                  <span><i class="bi bi-circle-fill text-primary me-1" style="font-size:9px;"></i>Undergraduate:</span>
                  <strong>${col.ug.toLocaleString()} (${col.ugPct}%)</strong>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <span><i class="bi bi-circle-fill text-info me-1" style="font-size:9px;"></i>Postgraduate:</span>
                  <strong>${col.pg.toLocaleString()} (${col.pgPct}%)</strong>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <span><i class="bi bi-circle-fill text-indigo me-1" style="font-size:9px;color:#6366f1;"></i>Doctoral (Ph.D.):</span>
                  <strong>${col.phd.toLocaleString()} (${col.phdPct}%)</strong>
                </div>
                <div class="text-primary mt-1 pt-1 border-top" style="font-size:11px;">(100% Marimekko Normalized)</div>
              </div>
            `;
          }
        },
        legend: {
          data: ['Undergraduate (UG)', 'Postgraduate (PG)', 'Doctoral (Ph.D.)'],
          bottom: 0,
          textStyle: { fontSize: 10.5 }
        },
        grid: { left: '3%', right: '4%', bottom: '12%', top: '8%', containLabel: true },
        xAxis: {
          type: 'category',
          data: mekkoColleges.map(c => c.code),
          axisLabel: { interval: 0, fontSize: 10, fontWeight: 700, color: THEME.jainNavy }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 100,
          axisLabel: { formatter: '{value}%' },
          splitLine: { lineStyle: { color: THEME.gridLine } }
        },
        series: [
          {
            name: 'Undergraduate (UG)',
            type: 'bar',
            stack: 'cadreMekko',
            barWidth: 26,
            cursor: 'pointer',
            itemStyle: { color: '#1e3a8a' },
            data: mekkoColleges.map(c => ({ value: c.ugPct, collegeId: c.id }))
          },
          {
            name: 'Postgraduate (PG)',
            type: 'bar',
            stack: 'cadreMekko',
            barWidth: 26,
            cursor: 'pointer',
            itemStyle: { color: '#06b6d4' },
            data: mekkoColleges.map(c => ({ value: c.pgPct, collegeId: c.id }))
          },
          {
            name: 'Doctoral (Ph.D.)',
            type: 'bar',
            stack: 'cadreMekko',
            barWidth: 26,
            cursor: 'pointer',
            itemStyle: { color: '#6366f1', borderRadius: [4, 4, 0, 0] },
            data: mekkoColleges.map(c => ({ value: c.phdPct, collegeId: c.id }))
          }
        ]
      }, true);
    }

    // 3. Admissions Intake Funnel & Multi-Year Comparison (Requirement 7)
    if (charts.studentFunnel) {
      const renderFunnelChart = () => {
        const collegeSel = document.getElementById('selectFunnelCollege');
        const yearSel = document.getElementById('selectFunnelYearMode');
        const colFilter = collegeSel ? collegeSel.value : 'all';
        const yearMode = yearSel ? yearSel.value : '2year';

        let currData = [];
        let prev1Data = [];
        let prev2Data = [];

        if (colFilter !== 'all' && window.NovaPortalData.INSTITUTIONAL_DATA[colFilter]) {
          const rec = window.NovaPortalData.INSTITUTIONAL_DATA[colFilter].students;
          currData = rec.funnelCurrent || [];
          prev1Data = rec.funnelPrev1 || [];
          prev2Data = rec.funnelPrev2 || [];
        } else {
          currData = [
            { value: 28500, name: 'Applications Received' },
            { value: 24200, name: 'Eligibility Screened' },
            { value: 18650, name: 'Entrance Appeared' },
            { value: 12800, name: 'Provisional Offers' },
            { value: 11480, name: 'Confirmed Admissions' }
          ];
          prev1Data = [
            { value: 26800, name: 'Applications Received' },
            { value: 22600, name: 'Eligibility Screened' },
            { value: 17200, name: 'Entrance Appeared' },
            { value: 12100, name: 'Provisional Offers' },
            { value: 10850, name: 'Confirmed Admissions' }
          ];
          prev2Data = [
            { value: 24900, name: 'Applications Received' },
            { value: 20800, name: 'Eligibility Screened' },
            { value: 15900, name: 'Entrance Appeared' },
            { value: 11200, name: 'Provisional Offers' },
            { value: 9980, name: 'Confirmed Admissions' }
          ];
        }

        const colors = ['#1e3a8a', '#2563eb', '#0284c7', '#059669', '#10b981'];

        let seriesList = [];
        let titles = [];

        if (yearMode === 'current') {
          titles = [{
            text: 'Current AY (2026-27) Admissions Funnel',
            left: 'center',
            top: 5,
            textStyle: { fontSize: 13, fontWeight: 'bold', color: '#1e3a8a' }
          }];
          seriesList = [{
            name: 'AY 2026-27 (Current)',
            type: 'funnel',
            left: '18%',
            width: '64%',
            top: 35,
            bottom: 30,
            sort: 'descending',
            gap: 4,
            cursor: 'pointer',
            label: { show: true, position: 'inside', formatter: '{b}\n{c} ({d}%)', fontSize: 11, fontWeight: 700, color: '#fff' },
            itemStyle: { borderColor: '#fff', borderWidth: 2 },
            data: currData.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } }))
          }];
        } else if (yearMode === '2year') {
          titles = [
            { text: 'Current AY (2026-27)', left: '25%', top: 5, textAlign: 'center', textStyle: { fontSize: 12.5, fontWeight: 'bold', color: '#1e3a8a' } },
            { text: 'Previous AY (2025-26)', left: '75%', top: 5, textAlign: 'center', textStyle: { fontSize: 12.5, fontWeight: 'bold', color: '#64748b' } }
          ];
          seriesList = [
            {
              name: 'Current AY (2026-27)',
              type: 'funnel',
              left: '5%',
              width: '42%',
              top: 35,
              bottom: 30,
              sort: 'descending',
              gap: 4,
              cursor: 'pointer',
              label: { show: true, position: 'inside', formatter: '{b}\n{c}', fontSize: 10, fontWeight: 700, color: '#fff' },
              itemStyle: { borderColor: '#fff', borderWidth: 2 },
              data: currData.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } }))
            },
            {
              name: 'Previous AY (2025-26)',
              type: 'funnel',
              left: '53%',
              width: '42%',
              top: 35,
              bottom: 30,
              sort: 'descending',
              gap: 4,
              cursor: 'pointer',
              label: { show: true, position: 'inside', formatter: '{b}\n{c}', fontSize: 10, fontWeight: 700, color: '#fff' },
              itemStyle: { borderColor: '#fff', borderWidth: 2 },
              data: prev1Data.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } }))
            }
          ];
        } else { // 3year
          titles = [
            { text: 'Current (2026-27)', left: '17%', top: 5, textAlign: 'center', textStyle: { fontSize: 11, fontWeight: 'bold', color: '#1e3a8a' } },
            { text: 'Last Year (2025-26)', left: '50%', top: 5, textAlign: 'center', textStyle: { fontSize: 11, fontWeight: 'bold', color: '#0284c7' } },
            { text: '2 Yrs Ago (2024-25)', left: '83%', top: 5, textAlign: 'center', textStyle: { fontSize: 11, fontWeight: 'bold', color: '#64748b' } }
          ];
          seriesList = [
            {
              name: 'AY 2026-27',
              type: 'funnel',
              left: '2%',
              width: '29%',
              top: 35,
              bottom: 30,
              sort: 'descending',
              gap: 3,
              cursor: 'pointer',
              label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10, fontWeight: 700, color: '#fff' },
              itemStyle: { borderColor: '#fff', borderWidth: 2 },
              data: currData.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } }))
            },
            {
              name: 'AY 2025-26',
              type: 'funnel',
              left: '35%',
              width: '29%',
              top: 35,
              bottom: 30,
              sort: 'descending',
              gap: 3,
              cursor: 'pointer',
              label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10, fontWeight: 700, color: '#fff' },
              itemStyle: { borderColor: '#fff', borderWidth: 2 },
              data: prev1Data.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } }))
            },
            {
              name: 'AY 2024-25',
              type: 'funnel',
              left: '68%',
              width: '29%',
              top: 35,
              bottom: 30,
              sort: 'descending',
              gap: 3,
              cursor: 'pointer',
              label: { show: true, position: 'inside', formatter: '{c}', fontSize: 10, fontWeight: 700, color: '#fff' },
              itemStyle: { borderColor: '#fff', borderWidth: 2 },
              data: prev2Data.map((d, i) => ({ ...d, itemStyle: { color: colors[i % colors.length] } }))
            }
          ];
        }

        // Calculate Stage-Wise Conversions
        seriesList.forEach(s => {
          const sData = s.data || [];
          const topVal = sData[0] ? sData[0].value : 1;
          s.data = sData.map((item, idx) => {
            const prevVal = idx === 0 ? item.value : sData[idx - 1].value;
            const pctOfPrev = idx === 0 ? '100%' : ((item.value / prevVal) * 100).toFixed(1) + '%';
            const pctOfTotal = ((item.value / topVal) * 100).toFixed(1) + '%';
            return {
              ...item,
              pctOfPrev,
              pctOfTotal
            };
          });
          s.label = {
            show: true,
            position: 'inside',
            formatter: p => `${p.value.toLocaleString()} (${p.data.pctOfPrev || '100%'})`,
            fontSize: 10,
            fontWeight: 700,
            color: '#fff'
          };
        });

        charts.studentFunnel.setOption({
          title: titles,
          tooltip: {
            trigger: 'item',
            formatter: p => `
              <div class="p-2" style="font-size:12px;">
                <div class="fw-bold mb-1">${p.seriesName} &bull; ${p.name}</div>
                <div>Count: <strong class="text-primary">${p.value.toLocaleString()}</strong></div>
                <div class="text-success">Conversion from Prev Stage: <strong>${p.data.pctOfPrev || '100%'}</strong></div>
                <div class="text-muted">Total Intake Conversion: <strong>${p.data.pctOfTotal || '100%'}</strong></div>
              </div>
            `
          },
          series: seriesList
        }, true);
      };

      // Wire selectors once
      const colSel = document.getElementById('selectFunnelCollege');
      const yrSel = document.getElementById('selectFunnelYearMode');
      if (colSel && !colSel.dataset.wired) {
        colSel.dataset.wired = 'true';
        colSel.addEventListener('change', renderFunnelChart);
      }
      if (yrSel && !yrSel.dataset.wired) {
        yrSel.dataset.wired = 'true';
        yrSel.addEventListener('change', renderFunnelChart);
      }

      renderFunnelChart();
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 6: FACULTY ANALYTICS VISUALIZATION
  // --------------------------------------------------------------------------
  function renderFacultyCharts(data) {
    if (!charts.facultyCadre) return;

    const colleges = data.colleges || [];

    // 1. Cadre Distribution: Professors, Associate, Assistant Professors
    charts.facultyCadre.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Professors', 'Associate Professors', 'Assistant Professors'],
        top: 0,
        textStyle: { fontSize: 11 }
      },
      grid: { left: '3%', right: '5%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'category',
        data: colleges.map(c => c.code),
        axisLabel: { fontWeight: 700, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      series: [
        {
          name: 'Professors',
          type: 'bar',
          stack: 'cadre',
          barWidth: 16,
          itemStyle: { color: '#1e3a8a' },
          data: colleges.map(c => ({ value: c.prof, collegeId: c.id }))
        },
        {
          name: 'Associate Professors',
          type: 'bar',
          stack: 'cadre',
          barWidth: 16,
          itemStyle: { color: '#0284c7' },
          data: colleges.map(c => ({ value: c.assoc, collegeId: c.id }))
        },
        {
          name: 'Assistant Professors',
          type: 'bar',
          stack: 'cadre',
          barWidth: 16,
          itemStyle: { color: '#93c5fd', borderRadius: [4, 4, 0, 0] },
          data: colleges.map(c => ({ value: c.asst, collegeId: c.id }))
        }
      ]
    }, true);

    // 2. Student to Faculty Ratio (SFR)
    if (charts.facultySfr) {
      charts.facultySfr.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (items) {
            const it = items[0];
            return `
              <div class="p-2">
                <div class="fw-bold mb-1">${it.name}</div>
                <div>Student-to-Faculty Ratio: <strong>${it.value}:1</strong></div>
                <div class="text-muted small mt-1">UGC Statutory Benchmark: 15:1 to 20:1</div>
              </div>
            `;
          }
        },
        grid: { left: '3%', right: '5%', bottom: '5%', top: '10%', containLabel: true },
        xAxis: {
          type: 'category',
          data: colleges.map(c => c.code),
          axisLabel: { fontWeight: 700, fontSize: 11 }
        },
        yAxis: {
          type: 'value',
          min: 10,
          max: 30,
          axisLabel: { formatter: '{value}:1' },
          splitLine: { lineStyle: { color: THEME.gridLine } }
        },
        series: [{
          name: 'SFR',
          type: 'bar',
          barWidth: 20,
          cursor: 'pointer',
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: p => p.value <= 18 ? THEME.successGreen : (p.value <= 22 ? THEME.primaryBlue : THEME.warningAmber)
          },
          data: colleges.map(c => ({ value: c.sfr, collegeId: c.id })),
          markLine: {
            data: [{ yAxis: 20, name: 'Statutory Max 20:1' }],
            lineStyle: { color: THEME.dangerRose, type: 'dashed', width: 2 },
            label: { formatter: 'Max 20:1', position: 'end', color: THEME.dangerRose, fontSize: 11 }
          }
        }]
      }, true);
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 7: ATTENDANCE & CLASSROOM ENGAGEMENT
  // --------------------------------------------------------------------------
  function renderAttendanceCharts(data) {
    if (!charts.attendanceComparison) return;

    const colleges = data.colleges || [];

    // 1. Attendance Comparison: Previous vs Current Semester Horizontal Bar
    charts.attendanceComparison.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          let html = `<div class="p-2"><div class="fw-bold mb-1">${items[0].name}</div>`;
          items.forEach(it => {
            html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${it.value}%</strong></div>`;
          });
          const curr = items.find(i => i.seriesName.includes('Current'));
          const prev = items.find(i => i.seriesName.includes('Previous'));
          if (curr && prev) {
            const pp = (curr.value - prev.value).toFixed(2);
            html += `<div class="mt-1 pt-1 border-top text-success fw-bold">Difference: ${pp > 0 ? '+' : ''}${pp} pp</div>`;
          }
          html += `<div class="text-primary mt-1" style="font-size:11px;">(Click to view Attendance Dossier)</div></div>`;
          return html;
        }
      },
      legend: {
        data: ['Previous Semester (Even 2025-26)', 'Current Semester (Odd 2026-27)'],
        top: 0,
        textStyle: { fontSize: 11 }
      },
      grid: { left: '3%', right: '8%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'value',
        min: 70,
        max: 95,
        axisLabel: { formatter: '{value}%' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: colleges.map(c => c.code).reverse(),
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      series: [
        {
          name: 'Previous Semester (Even 2025-26)',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.prevAySlate, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.prev || Number((c.pct - 1.2).toFixed(2)), collegeId: c.id })).reverse()
        },
        {
          name: 'Current Semester (Odd 2026-27)',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color: p => p.value >= 85 ? THEME.successGreen : THEME.warningAmber
          },
          data: colleges.map(c => ({ value: c.pct, collegeId: c.id })).reverse(),
          label: { show: true, position: 'right', formatter: '{c}%', fontSize: 10, fontWeight: 700 },
          markLine: {
            data: [{ xAxis: 75, name: 'Statutory 75% Threshold' }],
            lineStyle: { color: THEME.dangerRose, type: 'dashed', width: 2 },
            label: { formatter: '75%', position: 'end', color: THEME.dangerRose, fontSize: 11 }
          }
        }
      ]
    }, true);

    // 2. Monthly Attendance Trajectory for ALL 10 COLLEGES (Requirement 8)
    if (charts.attendanceTrend) {
      const months = ['Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026'];
      const collegeColors = [
        '#1e3a8a', '#2563eb', '#0284c7', '#0891b2', '#0d9488',
        '#059669', '#16a34a', '#d97706', '#ea580c', '#dc2626'
      ];

      const allColSeries = colleges.map((c, idx) => {
        const instData = window.NovaPortalData.INSTITUTIONAL_DATA ? window.NovaPortalData.INSTITUTIONAL_DATA[c.id] : null;
        const monthly = (instData && instData.attendance && instData.attendance.monthly) 
          ? instData.attendance.monthly 
          : [87.0, 86.4, 85.8, 86.2, c.pct || 85.5];
        return {
          name: c.code,
          type: 'line',
          smooth: true,
          symbolSize: 5,
          lineStyle: { width: 2, color: collegeColors[idx % collegeColors.length] },
          itemStyle: { color: collegeColors[idx % collegeColors.length] },
          data: monthly
        };
      });

      if (allColSeries.length > 0) {
        allColSeries[0].markLine = {
          data: [{ yAxis: 75, name: 'Statutory 75% Minimum' }],
          lineStyle: { color: THEME.dangerRose, type: 'dashed', width: 2 },
          label: { formatter: 'Statutory 75% Norm', position: 'end', color: THEME.dangerRose, fontSize: 10.5 }
        };
      }

      charts.attendanceTrend.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (items) {
            let html = `<div class="p-2" style="max-height:280px;overflow-y:auto;"><div class="fw-bold mb-1 border-bottom pb-1">${items[0].name} Attendance</div>`;
            items.forEach(it => {
              const val = Number(it.value);
              html += `<div class="d-flex align-items-center justify-content-between gap-3 small"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${it.color};margin-right:4px;"></span>${it.seriesName}: <strong>${val}%</strong></div>`;
            });
            html += `</div>`;
            return html;
          }
        },
        legend: {
          type: 'scroll',
          top: 0,
          textStyle: { fontSize: 10 }
        },
        grid: { left: '3%', right: '5%', bottom: '8%', top: '16%', containLabel: true },
        xAxis: {
          type: 'category',
          data: months,
          axisLabel: { fontWeight: 700, fontSize: 11 }
        },
        yAxis: {
          type: 'value',
          min: 70,
          max: 95,
          axisLabel: { formatter: '{value}%' },
          splitLine: { lineStyle: { color: THEME.gridLine } }
        },
        series: allColSeries
      }, true);
    }

    // 3. Biometric Compliance Brackets: Faculty-Aware GAUGE CHART (Requirement 2)
    window.renderBiometricGauge = function (facultyTarget) {
      if (!charts.attendanceBrackets) return;

      const targetVal = String(facultyTarget || 'all');
      let targetRate = 85.92;
      let targetName = 'All Faculties Consolidated';
      let targetCode = 'ALL';
      let a85 = 15480, mid = 5860, cond = 1650, det = 470;

      const badgeEl = document.getElementById('badgeBiometricFaculty');

      if (targetVal !== 'all') {
        const colId = parseInt(targetVal, 10);
        const col = colleges.find(c => c.id === colId) || colleges[0];
        if (col) {
          targetRate = col.pct || 85.5;
          targetName = col.shortName || col.name;
          targetCode = col.code;
          a85 = col.above85 || Math.round(col.enrolled * 0.65);
          mid = col.mid75 || Math.round(col.enrolled * 0.25);
          cond = col.cond || Math.round(col.enrolled * 0.07);
          det = col.det || Math.max(2, col.enrolled - a85 - mid - cond);
          if (badgeEl) badgeEl.textContent = `${col.code} Audited (${targetRate}%)`;
        }
      } else {
        if (badgeEl) badgeEl.textContent = 'All Students Audited (85.92%)';
      }

      charts.attendanceBrackets.setOption({
        tooltip: {
          formatter: function () {
            return `
              <div class="p-2" style="min-width:220px;">
                <div class="fw-bold text-dark border-bottom pb-1 mb-1">${targetName}</div>
                <div class="text-muted small mb-1">Attendance Rate: <strong class="text-primary">${targetRate}%</strong></div>
                <div class="small text-success">&gt;85% High Compliance: <strong>${a85.toLocaleString()}</strong> students</div>
                <div class="small text-primary">75-85% Statutory Eligible: <strong>${mid.toLocaleString()}</strong> students</div>
                <div class="small text-warning">65-75% Condonable Margin: <strong>${cond.toLocaleString()}</strong> students</div>
                <div class="small text-danger">&lt;65% Acute Detention: <strong>${det.toLocaleString()}</strong> students</div>
                <div class="text-primary mt-1 pt-1 border-top" style="font-size:11px;">(Click to view Full Attendance Dossier)</div>
              </div>
            `;
          }
        },
        series: [{
          type: 'gauge',
          startAngle: 200,
          endAngle: -20,
          min: 50,
          max: 100,
          radius: '90%',
          center: ['50%', '55%'],
          axisLine: {
            lineStyle: {
              width: 18,
              color: [
                [0.3, '#ef4444'],  // 50-65% Acute Risk
                [0.5, '#f59e0b'],  // 65-75% Condonable Margin
                [0.7, '#3b82f6'],  // 75-85% Statutory Eligible
                [1.0, '#10b981']   // 85-100% High Attendance
              ]
            }
          },
          pointer: {
            itemStyle: { color: '#0f172a' },
            width: 4,
            length: '65%'
          },
          axisTick: { distance: -18, length: 5, lineStyle: { color: '#fff', width: 1.5 } },
          splitLine: { distance: -18, length: 18, lineStyle: { color: '#fff', width: 2 } },
          axisLabel: {
            distance: 12,
            color: '#64748b',
            fontSize: 10,
            formatter: function (val) {
              if (val === 65) return '65%';
              if (val === 75) return '75%';
              if (val === 85) return '85%';
              return '';
            }
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: targetRate >= 85 ? '#059669' : (targetRate >= 75 ? '#2563eb' : '#dc2626'),
            fontSize: 22,
            fontWeight: 'bold',
            offsetCenter: [0, '40%']
          },
          data: [{ value: targetRate, name: targetCode + ' Rate' }],
          title: {
            offsetCenter: [0, '68%'],
            fontSize: 11,
            color: '#64748b',
            fontWeight: 'bold'
          }
        }]
      }, true);
    };

    // Wire Faculty selector for Biometric Gauge
    const bioSel = document.getElementById('selectBiometricCollege');
    if (bioSel && !bioSel.dataset.wired) {
      bioSel.dataset.wired = 'true';
      bioSel.addEventListener('change', function () {
        window.renderBiometricGauge(this.value);
      });
    }

    const currentBioSelVal = bioSel ? bioSel.value : 'all';
    window.renderBiometricGauge(currentBioSelVal);
  }

  // --------------------------------------------------------------------------
  // SECTION 7B: STUDENT ATTENDANCE & DETENTION RISK LEDGER TABLE
  // --------------------------------------------------------------------------
  function renderAttendanceTable(data) {
    const tbody = document.getElementById('tableAttendanceLedgerBody');
    if (!tbody) return;

    const colleges = data.colleges || [];
    tbody.innerHTML = '';

    colleges.forEach(c => {
      const diff = Number((c.pct - (c.prev || (c.pct - 1.2))).toFixed(2));
      const diffClass = diff >= 0 ? 'text-success' : 'text-danger';
      const diffSign = diff >= 0 ? '+' : '';
      const isCompliant = c.pct >= 85;
      const statusBadge = isCompliant 
        ? '<span class="badge bg-success bg-opacity-10 text-success">Compliant</span>'
        : (c.pct >= 75 ? '<span class="badge bg-warning bg-opacity-10 text-warning">Under Review</span>' : '<span class="badge bg-danger bg-opacity-10 text-danger">Intervention Req</span>');

      const tr = document.createElement('tr');
      tr.style.cursor = 'pointer';
      tr.title = 'Click to view ' + c.name + ' Attendance Dossier';
      tr.innerHTML = `
        <td class="fw-semibold text-dark">
          <span class="badge bg-light text-primary border me-1 fw-bold">${c.code}</span>
          ${c.shortName}
        </td>
        <td><span class="badge bg-light text-secondary border">${c.campus}</span></td>
        <td class="text-end fw-bold ${c.pct >= 85 ? 'text-success' : (c.pct >= 75 ? 'text-primary' : 'text-danger')}">${c.pct.toFixed(2)}%</td>
        <td class="text-end text-muted">${(c.prev || (c.pct - 1.2)).toFixed(2)}%</td>
        <td class="text-end fw-semibold ${diffClass}">${diffSign}${diff} pp</td>
        <td class="text-end text-success">${c.above85 ? c.above85.toLocaleString('en-IN') : '-'}</td>
        <td class="text-end fw-bold ${c.below75 > 150 ? 'text-danger' : 'text-secondary'}">${c.below75 ? c.below75.toLocaleString('en-IN') : '-'}</td>
        <td class="text-center">${statusBadge}</td>
      `;

      tr.addEventListener('click', () => {
        const bioSel = document.getElementById('selectBiometricCollege');
        if (bioSel) {
          bioSel.value = String(c.id);
          if (window.renderBiometricGauge) {
            window.renderBiometricGauge(c.id);
          }
        }
        openCollegeDrilldownModal(c.id, 'attendance');
      });

      tbody.appendChild(tr);
    });
  }

  // --------------------------------------------------------------------------
  // SECTION 8: PLACEMENT & RECRUITMENT OUTCOMES
  // --------------------------------------------------------------------------
  function renderPlacementCharts(data) {
    if (!charts.placementComparison) return;

    const colleges = data.colleges || [];

    // 1. Placement Percentage: Previous AY vs Current AY Horizontal Bar
    charts.placementComparison.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (items) {
          let html = `<div class="p-2"><div class="fw-bold mb-1">${items[0].name}</div>`;
          items.forEach(it => {
            html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>${it.value}%</strong></div>`;
          });
          const curr = items.find(i => i.seriesName.includes('Current'));
          const prev = items.find(i => i.seriesName.includes('Previous'));
          if (curr && prev) {
            const diff = (curr.value - prev.value).toFixed(2);
            html += `<div class="mt-1 pt-1 border-top text-success fw-bold">YoY Gain: ${diff > 0 ? '+' : ''}${diff} pp</div>`;
          }
          html += `<div class="text-primary mt-1" style="font-size:11px;">(Click to view Placement Dossier)</div></div>`;
          return html;
        }
      },
      legend: {
        data: ['Previous AY 2025-26', 'Current AY 2026-27'],
        top: 0,
        textStyle: { fontSize: 11 }
      },
      grid: { left: '3%', right: '8%', bottom: '5%', top: '12%', containLabel: true },
      xAxis: {
        type: 'value',
        min: 65,
        max: 100,
        axisLabel: { formatter: '{value}%' },
        splitLine: { lineStyle: { color: THEME.gridLine } }
      },
      yAxis: {
        type: 'category',
        data: colleges.map(c => c.code).reverse(),
        axisLabel: { fontWeight: 700, fontSize: 11, color: THEME.jainNavy }
      },
      series: [
        {
          name: 'Previous AY 2025-26',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.prevAySlate, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.prev || Number((c.rate - 1.5).toFixed(2)), collegeId: c.id })).reverse()
        },
        {
          name: 'Current AY 2026-27',
          type: 'bar',
          barWidth: 10,
          cursor: 'pointer',
          itemStyle: { color: THEME.currAyBlue, borderRadius: [0, 4, 4, 0] },
          data: colleges.map(c => ({ value: c.rate, collegeId: c.id })).reverse(),
          label: { show: true, position: 'right', formatter: '{c}%', fontSize: 10, fontWeight: 700 }
        }
      ]
    }, true);

    // 2. Highest vs Average CTC Package (LPA)
    if (charts.placementCtc) {
      charts.placementCtc.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: function (items) {
            let html = `<div class="p-2"><div class="fw-bold mb-1">${items[0].name} Salary Packages</div>`;
            items.forEach(it => {
              html += `<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${it.color};margin-right:5px;"></span>${it.seriesName}: <strong>₹${it.value} LPA</strong></div>`;
            });
            html += `</div>`;
            return html;
          }
        },
        legend: {
          data: ['Highest Package (LPA)', 'Average Package (LPA)'],
          top: 0,
          textStyle: { fontSize: 11 }
        },
        grid: { left: '3%', right: '5%', bottom: '5%', top: '12%', containLabel: true },
        xAxis: {
          type: 'category',
          data: colleges.map(c => c.code),
          axisLabel: { fontWeight: 700, fontSize: 11 }
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '₹{value} L' },
          splitLine: { lineStyle: { color: THEME.gridLine } }
        },
        series: [
          {
            name: 'Highest Package (LPA)',
            type: 'bar',
            barWidth: 12,
            itemStyle: { color: '#0284c7', borderRadius: [4, 4, 0, 0] },
            data: colleges.map(c => ({ value: c.high, collegeId: c.id }))
          },
          {
            name: 'Average Package (LPA)',
            type: 'bar',
            barWidth: 12,
            itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
            data: colleges.map(c => ({ value: c.avg, collegeId: c.id }))
          }
        ]
      }, true);
    }
  }

  // --------------------------------------------------------------------------
  // SECTION 9: EXECUTIVE MANAGEMENT INSIGHTS & ALERT CENTRE
  // --------------------------------------------------------------------------
  function renderManagementInsights(insights) {
    if (!insights) return;

    // 1. Institutional Performance Index (IPI) Score Header
    const scoreVal = document.getElementById('ipiScoreValue');
    const badgeTier = document.getElementById('ipiBadgeTier');
    const badgeCategory = document.getElementById('ipiBadgeCategory');

    if (scoreVal) scoreVal.textContent = insights.ipi.score;
    if (badgeTier) badgeTier.textContent = insights.ipi.tier;
    if (badgeCategory) badgeCategory.textContent = insights.ipi.category;

    // 2. Top 5 Colleges
    const top5Container = document.getElementById('topFacultiesList');
    if (top5Container && insights.top5) {
      top5Container.innerHTML = '';
      insights.top5.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'faculty-rank-item';
        row.title = `Click to drill down into ${item.fullName || item.name}`;
        row.innerHTML = `
          <div class="d-flex align-items-center gap-2">
            <span class="rank-badge rank-${index + 1}">${index + 1}</span>
            <div>
              <div class="fw-bold" style="font-size:0.85rem;">${item.name} <span class="badge bg-secondary" style="font-size:0.65rem;">${item.code}</span> <span class="campus-pill ${item.campus.toLowerCase()} ms-1">${item.campus}</span></div>
              <div class="text-muted" style="font-size:0.72rem;">Pass: <strong>${item.passPct}%</strong> | Fee Realized: <strong>${item.feePct}%</strong> | SFR: <strong>${item.sfr}:1</strong></div>
            </div>
          </div>
          <div class="text-end">
            <span class="badge bg-success" style="font-size:0.78rem;">Score: ${item.score}</span>
          </div>
        `;
        row.addEventListener('click', () => openCollegeDrilldownModal(item.id));
        top5Container.appendChild(row);
      });
    }

    // 3. Bottom 5 Colleges Requiring Intervention (Requirement 10: No orange border)
    const bottom5Container = document.getElementById('bottomFacultiesList');
    if (bottom5Container && insights.bottom5) {
      bottom5Container.innerHTML = '';
      insights.bottom5.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'faculty-rank-item';
        row.title = `Click to drill down into ${item.fullName || item.name}`;
        row.innerHTML = `
          <div class="d-flex align-items-center gap-2">
            <span class="rank-badge rank-normal">${index + 6}</span>
            <div>
              <div class="fw-bold" style="font-size:0.85rem;">${item.name} <span class="badge bg-secondary" style="font-size:0.65rem;">${item.code}</span> <span class="campus-pill ${item.campus.toLowerCase()} ms-1">${item.campus}</span></div>
              <div class="text-muted" style="font-size:0.72rem;">Pass: <strong>${item.passPct}%</strong> | Fee Realized: <strong>${item.feePct}%</strong> | SFR: <strong>${item.sfr}:1</strong></div>
            </div>
          </div>
          <div class="text-end">
            <span class="badge bg-warning text-dark" style="font-size:0.78rem;">Score: ${item.score}</span>
          </div>
        `;
        row.addEventListener('click', () => openCollegeDrilldownModal(item.id));
        bottom5Container.appendChild(row);
      });
    }

    // 4. Management Alert Centre (Requirement 11: Check Details & Create Ticket Buttons)
    const alertsContainer = document.getElementById('managementAlertsContainer');
    const alertFilterBar = document.getElementById('alertCategoryFilterBar');

    if (alertsContainer && insights.alerts) {
      const renderAlertCards = (category) => {
        alertsContainer.innerHTML = '';
        const filtered = category === 'all' 
          ? insights.alerts 
          : insights.alerts.filter(a => a.category === category);

        if (filtered.length === 0) {
          alertsContainer.innerHTML = `
            <div class="text-center text-muted p-4">
              <i class="bi bi-shield-check text-success" style="font-size: 2rem;"></i>
              <div class="fw-bold mt-2">Zero Active Risks</div>
              <div class="small">All faculties satisfy target statutory thresholds for this category.</div>
            </div>
          `;
          return;
        }

        filtered.forEach(al => {
          const card = document.createElement('div');
          card.className = `alert-card-enhanced ${al.severity}`;

          let kpisHtml = '';
          if (al.kpis && al.kpis.length > 0) {
            kpisHtml = `
              <div class="d-flex flex-wrap gap-1 my-2">
                ${al.kpis.map(k => `
                  <span class="alert-kpi-chip ${k.isRisk ? 'risk' : ''}">
                    <span class="text-muted">${k.label}:</span> <strong>${k.value}</strong>
                  </span>
                `).join('')}
              </div>
            `;
          }

          const alertTabMap = {
            'Attendance': 'attendance',
            'Academic': 'depts',
            'Financial': 'finance',
            'Faculty': 'faculty',
            'Placement': 'placement',
            'Students': 'students'
          };
          const targetTab = alertTabMap[al.category] || 'depts';

          card.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-1">
              <div class="d-flex align-items-center gap-2">
                <span class="badge ${al.severity === 'critical' ? 'bg-danger' : (al.severity === 'high' ? 'bg-warning text-dark' : 'bg-primary')}" style="font-size:0.68rem;text-transform:uppercase;">
                  ${al.categoryLabel}
                </span>
                <strong style="font-size:0.85rem;color:#1e1b4b;">${al.name} (${al.code})</strong>
                <span class="campus-pill ${al.campus.toLowerCase()}">${al.campus}</span>
              </div>
              <span class="badge bg-light text-dark border fw-bold" style="font-size:0.72rem;">${al.badge}</span>
            </div>
            <div class="fw-semibold text-dark mb-1" style="font-size:0.82rem;">${al.title}</div>
            <div class="text-muted" style="font-size:0.75rem;line-height:1.4;">
              <i class="bi bi-info-circle text-secondary me-1"></i><strong>Root Cause:</strong> ${al.reason || al.description}
            </div>
            ${kpisHtml}
            ${al.action ? `
              <div class="alert-action-box">
                <i class="bi bi-arrow-right-circle-fill text-primary me-1"></i><strong>Recommended Action:</strong> ${al.action}
              </div>
            ` : ''}
            <div class="d-flex align-items-center justify-content-between pt-2 mt-2 border-top">
              <div class="small text-muted" style="font-size: 0.72rem;">
                <i class="bi bi-clock-history me-1"></i> Triggered: Current Term Audit
              </div>
              <div class="d-flex align-items-center gap-2">
                <button type="button" class="btn btn-sm btn-outline-primary py-0 px-2 btn-alert-details" style="font-size: 0.75rem;">
                  <i class="bi bi-eye me-1"></i> Check Details
                </button>
                <button type="button" class="btn btn-sm btn-danger py-0 px-2 btn-alert-ticket" style="font-size: 0.75rem;">
                  <i class="bi bi-ticket-detailed-fill me-1"></i> Create Ticket
                </button>
              </div>
            </div>
          `;

          const detailsBtn = card.querySelector('.btn-alert-details');
          if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              openCollegeDrilldownModal(al.id, targetTab);
            });
          }

          const ticketBtn = card.querySelector('.btn-alert-ticket');
          if (ticketBtn) {
            ticketBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              openCreateTicketModal(al);
            });
          }

          card.addEventListener('click', () => openCollegeDrilldownModal(al.id, targetTab));
          alertsContainer.appendChild(card);
        });
      };

      // Initial render: all alerts
      renderAlertCards('all');

      // Attach filter listeners if not already attached
      if (alertFilterBar && !alertFilterBar.dataset.wired) {
        alertFilterBar.dataset.wired = 'true';
        const btns = alertFilterBar.querySelectorAll('.alert-filter-btn');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter') || 'all';
            renderAlertCards(filter);
          });
        });
      }
    }

    // 5. Consolidated 10-Faculty Statutory Leaderboard Table
    const allRankedBody = document.getElementById('tableAllRankedFacultiesBody');
    if (allRankedBody && insights.allRanked) {
      allRankedBody.innerHTML = '';
      insights.allRanked.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.title = `Click to drill down into ${item.fullName || item.name}`;

        let rankBadgeClass = 'rank-normal';
        if (index === 0) rankBadgeClass = 'rank-1 rank-badge-gold';
        else if (index === 1) rankBadgeClass = 'rank-2 rank-badge-silver';
        else if (index === 2) rankBadgeClass = 'rank-3 rank-badge-bronze';

        tr.innerHTML = `
          <td><span class="rank-badge ${rankBadgeClass}">${index + 1}</span></td>
          <td>
            <strong>${item.name}</strong> <span class="badge bg-light text-secondary border ms-1">${item.code}</span>
          </td>
          <td><span class="campus-pill ${item.campus.toLowerCase()}">${item.campus}</span></td>
          <td class="text-end fw-semibold text-primary">${item.passPct}%</td>
          <td class="text-end fw-semibold text-purple">${item.plcPct}%</td>
          <td class="text-end fw-semibold text-success">${item.feePct}%</td>
          <td class="text-end fw-semibold text-info">${item.rpf} RPF</td>
          <td class="text-end fw-semibold text-warning">${item.sfr}:1</td>
          <td class="text-end fw-black text-dark fs-6">${item.score}</td>
          <td class="text-center"><span class="badge ${item.tierBadgeClass}">${item.tier}</span></td>
          <td class="text-center">
            <button type="button" class="btn btn-xs btn-outline-primary py-0 px-2" style="font-size:0.72rem;">
              Dossier &rarr;
            </button>
          </td>
        `;
        tr.addEventListener('click', () => openCollegeDrilldownModal(item.id));
        allRankedBody.appendChild(tr);
      });
    }

    // 6. Target vs Actual Scorecard Table
    const scorecardBody = document.getElementById('scorecardTableBody');
    if (scorecardBody && insights.targets) {
      scorecardBody.innerHTML = '';
      insights.targets.forEach(tgt => {
        const tr = document.createElement('tr');
        const badgeClass = tgt.status === 'achieved' ? 'bg-success' : 'bg-warning text-dark';
        const statusLabel = tgt.status === 'achieved' ? 'Target Met' : 'Under Review';
        tr.innerHTML = `
          <td><strong>${tgt.metric}</strong></td>
          <td><span class="badge bg-light text-dark border">${tgt.target}</span></td>
          <td><strong class="text-primary">${tgt.actual}</strong></td>
          <td><span class="badge ${badgeClass}">${statusLabel}</span></td>
          <td class="text-muted" style="font-size:0.75rem;">${tgt.authority}</td>
        `;
        scorecardBody.appendChild(tr);
      });
    }
  }

  // --------------------------------------------------------------------------
  // HELPER UTILITIES
  // --------------------------------------------------------------------------
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
});

// ============================================================================
// E-NOTIFICATION / WORKFLOW APPROVALS INTERACTION (Requirement 1)
// ============================================================================
const WORKFLOW_DATA = {
  'WF-9821': {
    id: '#WF-9821',
    title: 'FET BLR - Request to Sanction for 4 Lakhs Amount for Annual day',
    subtitle: 'Faculty of Engineering and Technology - BLR (FET-BLR)',
    module: 'Finance',
    reporter: 'Dr. R. K. Narayanan (Dean)',
    assignee: 'Super Admin',
    priority: 'High',
    priorityClass: 'bg-danger',
    created: '17-11-2026',
    updatedBy: 'Finance Officer',
    queryText: 'Dean FET submitted formal budget sanction requisition for ₹4,00,000 (Rupees Four Lakhs only) towards the upcoming Institutional Annual Day Celebration 2026-27 at Bangalore Campus. Requisition covers stage infrastructure, sound acoustics, guest felicitations, and student merit awards. Recommended by Campus Cultural Committee and submitted for Super Admin executive approval.',
    docName: 'FET_BLR_Annual_Day_Sanction_Requisition_4Lakhs.pdf',
    docCollege: 'Faculty of Engineering and Technology (BLR)',
    docRemarks: 'Finance Advisory: Budget allocation verified against Institutional Annual Cultural Day provisions. Within permissible departmental ceiling.'
  },
  'WF-9815': {
    id: '#WF-9815',
    title: 'Institutional Fee Concession & Scholarship Clearance',
    subtitle: 'Faculty of Management Studies - Kochi (FMS-KOC)',
    module: 'Finance',
    reporter: 'Dr. K. S. Pillai (Dean)',
    assignee: 'Super Admin',
    priority: 'Medium',
    priorityClass: 'bg-warning text-dark',
    created: '16-11-2026',
    updatedBy: 'Accounts Officer',
    queryText: 'Formal sanction request for disbursing ₹14,20,000 across 28 eligible students under the PK DAS Merit-cum-Means Institutional Concession Scheme. Finance committee preliminary audit verified parent income ceilings and minimum 8.0 CGPA criteria.',
    docName: 'FMS_Kochi_Scholarship_Disbursement_Sanction_2026.pdf',
    docCollege: 'Faculty of Management Studies (Kochi)',
    docRemarks: 'Finance Advisory: Total sanction within allocated institutional budget ceiling of ₹18.0 Lakhs.'
  },
  'WF-9804': {
    id: '#WF-9804',
    title: 'Sanction for 4 Associate Professors (AI & Cloud)',
    subtitle: 'Faculty of Applied Computing - Kochi (FAC-KOC)',
    module: 'HR & Faculty',
    reporter: 'Dr. George Mathew (Dean)',
    assignee: 'Super Admin',
    priority: 'Normal',
    priorityClass: 'bg-primary',
    created: '15-11-2026',
    updatedBy: 'Registrar Office',
    queryText: 'Student-to-faculty ratio in MSc Artificial Intelligence and Cloud Computing has risen to 22:1 due to increased intake. Requesting executive approval to release appointment orders for 4 shortlisted Associate Professors following selection committee interviews on 10-Nov-2026.',
    docName: 'FAC_Associate_Professors_Sanction_Dossier_Nov2026.pdf',
    docCollege: 'Faculty of Applied Computing (Kochi)',
    docRemarks: 'Selection Committee Report: All 4 candidates hold Ph.D. degrees with minimum 8 Scopus-indexed papers.'
  },
  'WF-9799': {
    id: '#WF-9799',
    title: 'Publication Incentive for 12 Scopus Q1 Journals',
    subtitle: 'Faculty of Engineering and Technology - Kochi (FET-KOC)',
    module: 'Research',
    reporter: 'Dr. Suresh Kumar N. (Dean)',
    assignee: 'Super Admin',
    priority: 'Normal',
    priorityClass: 'bg-primary',
    created: '14-11-2026',
    updatedBy: 'Dean Research',
    queryText: 'Verification docket for faculty research publication incentives covering 12 Q1 Scopus journal papers with first-author affiliation to PK DAS University. Cumulative cash incentive of ₹3,60,000 recommended per University Research Incentive Policy 2026.',
    docName: 'FET_Kochi_Scopus_Q1_Incentive_Audit_Report.pdf',
    docCollege: 'Faculty of Engineering and Technology (Kochi)',
    docRemarks: 'Dean Research Endorsement: Turnitin similarity indices verified < 10% with zero self-citation anomalies.'
  }
};

let currentActiveWfId = 'WF-9821';
const workflowIds = ['WF-9821', 'WF-9815', 'WF-9804', 'WF-9799'];
let currentWorkflowIdx = 0;

window.openWorkflowDetailModal = function (wfId) {
  currentActiveWfId = wfId;
  currentWorkflowIdx = workflowIds.indexOf(wfId);
  if (currentWorkflowIdx === -1) currentWorkflowIdx = 0;

  const item = WORKFLOW_DATA[wfId] || WORKFLOW_DATA['WF-9821'];

  const setT = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setT('wfModalId', item.id);
  setT('wfModalTitle', item.title);
  setT('wfModalSubtitle', item.subtitle);
  setT('wfModalModule', item.module);
  setT('wfModalReporter', item.reporter);
  setT('wfModalAssignee', item.assignee);

  const prioEl = document.getElementById('wfModalPriority');
  if (prioEl) {
    prioEl.textContent = item.priority;
    prioEl.className = 'badge ' + item.priorityClass;
  }

  setT('wfModalQueryText', item.queryText);
  setT('wfModalCreated', item.created);
  setT('wfModalUpdatedBy', item.updatedBy);
  setT('wfDocName', item.docName);
  setT('wfDocCollege', item.docCollege);
  setT('wfDocRemarks', '"' + item.docRemarks + '"');

  const prevBtn = document.getElementById('wfModalPrevBtn');
  const nextBtn = document.getElementById('wfModalNextBtn');
  if (prevBtn) prevBtn.disabled = currentWorkflowIdx === 0;
  if (nextBtn) nextBtn.disabled = currentWorkflowIdx === workflowIds.length - 1;

  const modalEl = document.getElementById('workflowApprovalModal');
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
};

window.navigateWorkflow = function (delta) {
  currentWorkflowIdx += delta;
  if (currentWorkflowIdx < 0) currentWorkflowIdx = 0;
  if (currentWorkflowIdx >= workflowIds.length) currentWorkflowIdx = workflowIds.length - 1;

  openWorkflowDetailModal(workflowIds[currentWorkflowIdx]);
};

window.handleWorkflowAction = function (action) {
  const modalEl = document.getElementById('workflowApprovalModal');
  if (modalEl && window.bootstrap) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }

  // Show toast confirmation
  const toast = document.createElement('div');
  toast.className = 'alert alert-success position-fixed shadow-lg d-flex align-items-center gap-2';
  toast.style.cssText = 'bottom: 24px; right: 24px; z-index: 99999; min-width: 340px; border-left: 5px solid #10b981; animation: fadeIn 0.3s;';
  toast.innerHTML = `
    <i class="bi bi-shield-check-fill text-success fs-3"></i>
    <div>
      <div class="fw-bold">${currentActiveWfId} &bull; Decision: ${action}</div>
      <div class="small text-muted">Digital signature & timestamp registered into PK DAS Core ERP Audit Trail.</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

window.openWorkflowDocumentViewer = function () {
  const item = WORKFLOW_DATA[currentActiveWfId] || WORKFLOW_DATA['WF-9821'];
  const modalEl = document.getElementById('workflowDocumentViewerModal');
  if (!modalEl || !window.bootstrap) return;

  const setT = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setT('docViewerBadge', '#' + currentActiveWfId);
  setT('docViewerTitle', item.title);
  setT('docViewerSubtitle', item.subtitle);
  setT('docViewCode', 'DOC-2026-' + currentActiveWfId.replace('WF-', ''));
  setT('docViewDate', item.created || '17-Nov-2026');
  setT('docViewSummary', item.queryText);
  setT('docViewSignDean', item.reporter);

  const docModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  docModal.show();
};

window.downloadWorkflowDocument = function () {
  const item = WORKFLOW_DATA[currentActiveWfId] || WORKFLOW_DATA['WF-9821'];
  const fileName = item.docName || 'PKDAS_ERP_Official_Docket.pdf';

  const toast = document.createElement('div');
  toast.className = 'alert alert-primary position-fixed shadow-lg d-flex align-items-center gap-2';
  toast.style.cssText = 'bottom: 24px; right: 24px; z-index: 99999; min-width: 350px; border-left: 5px solid #2563eb; animation: fadeIn 0.3s;';
  toast.innerHTML = `
    <i class="bi bi-file-earmark-pdf-fill text-danger fs-3"></i>
    <div>
      <div class="fw-bold">Downloading Official ERP Dossier</div>
      <div class="small text-muted">${fileName} (SHA-256 Verified)</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

// ============================================================================
// ADMINISTRATIVE INTERVENTION TICKET CREATION (Requirement 11)
// ============================================================================
window.openCreateTicketModal = function (alertObj) {
  const modalEl = document.getElementById('createTicketModal');
  if (!modalEl || !window.bootstrap) return;

  const randNum = Math.floor(1000 + Math.random() * 9000);
  const refCode = '#TCK-2026-' + randNum;

  const setT = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setT('ticketRefCode', refCode);
  setT('ticketTargetCollege', alertObj.name ? `${alertObj.name} (${alertObj.code})` : 'Institutional Directorate');
  setT('ticketAlertSummary', alertObj.title || 'Risk Intervention Protocol');

  const instructionsEl = document.getElementById('ticketInstructions');
  if (instructionsEl) {
    instructionsEl.value = alertObj.action ? `Mandate: ${alertObj.action}` : 'Immediate executive inspection and remedial action plan submission requested within SLA target.';
  }

  const ticketModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  ticketModal.show();
};

window.submitInterventionTicket = function () {
  const modalEl = document.getElementById('createTicketModal');
  if (modalEl && window.bootstrap) {
    const ticketModal = bootstrap.Modal.getInstance(modalEl);
    if (ticketModal) ticketModal.hide();
  }

  const refCode = document.getElementById('ticketRefCode') ? document.getElementById('ticketRefCode').textContent : '#TCK-2026-9000';
  const assignee = document.getElementById('ticketAssignee') ? document.getElementById('ticketAssignee').value : 'Dean';
  const sla = document.getElementById('ticketSla') ? document.getElementById('ticketSla').value : '48 Hours';

  const toast = document.createElement('div');
  toast.className = 'alert alert-success position-fixed shadow-lg d-flex align-items-center gap-2';
  toast.style.cssText = 'bottom: 24px; right: 24px; z-index: 99999; min-width: 360px; border-left: 5px solid #10b981; animation: fadeIn 0.3s;';
  toast.innerHTML = `
    <i class="bi bi-ticket-detailed-fill text-success fs-3"></i>
    <div>
      <div class="fw-bold">Intervention Ticket ${refCode} Dispatched</div>
      <div class="small text-muted">Assigned to <strong>${assignee}</strong> &bull; Target SLA: ${sla}.</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
};
