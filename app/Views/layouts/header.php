<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="PK DAS (DEEMED TO BE UNIVERSITY) - NOVAPORTAL ERP Super Admin Institutional Performance & Analytics Dashboard">
  <meta name="author" content="PK DAS (DEEMED TO BE UNIVERSITY) Institutional Intelligence">
  <title><?= esc($page_title ?? 'PK DAS (DEEMED TO BE UNIVERSITY) | Institutional Performance & Analytics') ?></title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="<?= base_url('assets/images/favicon.png') ?>">
  
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Bootstrap Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  
  <!-- JAIN ERP Custom Stylesheet -->
  <link rel="stylesheet" href="<?= base_url('assets/css/dashboard.css') ?>">
</head>
<body>

  <!-- ========================================================================= -->
  <!-- MAIN APPLICATION SHELL (FULL WIDTH CLEAN VIEW)                            -->
  <!-- ========================================================================= -->
  <div class="app-shell">

    <!-- MAIN WORKSPACE & CONTENT AREA -->
    <div class="main-content-wrapper">

      <!-- TOP APP NAVIGATION BAR (PK DAS DEEMED TO BE UNIVERSITY) -->
      <header class="jain-topbar d-flex align-items-center justify-content-between px-3">
        
        <!-- Left: PK DAS University Logo & Title -->
        <div class="brand-wrapper d-flex align-items-center gap-3">
          <img src="<?= base_url('assets/images/pk-das-logo.jpg') ?>" alt="PK DAS (DEEMED TO BE UNIVERSITY)" class="pkdas-topbar-logo" style="height: 42px; width: auto; max-width: 175px; object-fit: contain; border-radius: 4px; background: #ffffff; padding: 2px 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
          <div>
            <h1 class="jain-title-text" style="font-size: 0.95rem; font-weight: 800; color: #1e1b4b; line-height: 1.2; margin: 0;">PK DAS (DEEMED TO BE UNIVERSITY)</h1>
            <p class="jain-subtitle-text mb-0" style="font-size: 0.70rem; font-weight: 600; color: #475569; letter-spacing: 0.2px;">INSTITUTIONAL PERFORMANCE &amp; ANALYTICS &bull; ALL 10 CONSTITUENT FACULTIES</p>
          </div>
        </div>

        <!-- Right: Term Selector, Alerts & Enova Profile -->
        <div class="d-flex align-items-center gap-3">
          
          <!-- Academic Term Selector -->
          <div class="dropdown">
            <button class="term-selector-box dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span>AT: Odd sem 2026-2027</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 font-monospace" style="font-size:0.8rem;">
              <li><a class="dropdown-item active" href="#">Odd sem 2026-2027 (Active)</a></li>
              <li><a class="dropdown-item" href="#">Even sem 2025-2026</a></li>
              <li><a class="dropdown-item" href="#">Odd sem 2025-2026</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Academic Year Archive (2024-2025)</a></li>
            </ul>
          </div>

          <!-- Chat bubble with badge 12 -->
          <div class="topbar-action-icon" title="Institutional Messages">
            <i class="bi bi-chat-dots-fill"></i>
            <span class="topbar-badge-purple">12</span>
          </div>

          <!-- Language Selector -->
          <div class="topbar-action-icon" title="Change Language">
            <span style="font-size: 0.85rem; font-weight: 700;">A 文</span>
          </div>

          <!-- Notification Bell -->
          <div class="topbar-action-icon" title="Notifications">
            <i class="bi bi-bell-fill"></i>
          </div>

          <!-- User Profile: ENOVA SOFTWARE / ADMIN -->
          <div class="user-profile-widget">
            <div class="user-avatar-circle">
              <i class="bi bi-person-fill"></i>
            </div>
            <div class="user-info-text d-none d-sm-block">
              <div class="user-info-name">ENOVA SOFTWARE</div>
              <div class="user-info-role">ADMIN</div>
            </div>
          </div>

        </div>
      </header>

            <!-- JAIN SUB-NAVIGATION BAR WITH QUICK TABS & FLASH NEWS RIBBON -->
      <nav class="jain-subnav">
        <!-- Horizontal Tabs -->
        <div class="subnav-tabs">
          <a href="#sectionKpis" class="subnav-pill active"><i class="bi bi-house-door"></i> Overview &amp; Ledger</a>
          <a href="#sectionCampusComparison" class="subnav-pill"><i class="bi bi-buildings"></i> BLR vs KOCHI</a>
          <a href="#sectionAcademic" class="subnav-pill"><i class="bi bi-mortarboard"></i> Academics</a>
          <a href="#sectionFinance" class="subnav-pill"><i class="bi bi-cash-stack"></i> Finance</a>
          <a href="#sectionResearch" class="subnav-pill"><i class="bi bi-journal-text"></i> Research</a>
          <a href="#sectionStudents" class="subnav-pill"><i class="bi bi-people"></i> Students</a>
          <a href="#sectionFaculty" class="subnav-pill"><i class="bi bi-person-workspace"></i> Faculty</a>
          <a href="#sectionAttendance" class="subnav-pill"><i class="bi bi-calendar-check"></i> Attendance</a>
          <a href="#sectionPlacements" class="subnav-pill"><i class="bi bi-briefcase"></i> Placements</a>
          <a href="#sectionInsights" class="subnav-pill"><i class="bi bi-shield-exclamation"></i> Matrix &amp; Alerts</a>
          <a href="javascript:void(0)" onclick="openCollegeDrilldownModal(1)" class="subnav-pill text-primary fw-bold">
            <i class="bi bi-box-arrow-up-right"></i> Faculty Dossier
          </a>
        </div>

        <!-- Flash News Ribbon -->
        <div class="flash-news-wrapper d-none d-md-flex">
          <div class="flash-news-badge">
            <span>Flash News</span>
          </div>
          <div class="flash-news-content">
            <marquee behavior="scroll" direction="left" scrollamount="4">
              IQAC NIRF 2026 Institutional Audit Active &bull; Odd Semester Exam Results Consolidated &bull; All 10 Constituent Faculties Online &bull; Placement Drive: 89.28% Realized
            </marquee>
          </div>
        </div>
      </nav>
