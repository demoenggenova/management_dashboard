/**
 * NOVAPORTAL ERP - Super Admin Institutional Analytics
 * High-Fidelity Master University Dataset & Client Engine
 * Theme: JAIN UNIVERSITY Enterprise Standards
 */

window.NovaPortalData = (function () {
  'use strict';

  // Master Roster of All 10 Institutional Faculties
  const COLLEGES = [
    { id: 1, code: 'FET-BLR', name: 'Faculty of Engineering and Technology - BLR', shortName: 'FET Bangalore', campus: 'BLR', category: 'Engineering', est: 2005, dean: 'Dr. R. K. Narayanan', email: 'dean.fet.blr@pkdasuniversity.ac.in' },
    { id: 2, code: 'FCOM-BLR', name: 'Faculty of Commerce - BLR', shortName: 'FCOM Bangalore', campus: 'BLR', category: 'Commerce', est: 2008, dean: 'Dr. Meera Vasudevan', email: 'dean.fcom.blr@pkdasuniversity.ac.in' },
    { id: 3, code: 'FMS-BLR', name: 'Faculty of Management Studies - BLR', shortName: 'FMS Bangalore', campus: 'BLR', category: 'Management', est: 2006, dean: 'Dr. Arvind Swaminathan', email: 'dean.fms.blr@pkdasuniversity.ac.in' },
    { id: 4, code: 'FAC-KOC', name: 'Faculty of Applied Computing - Kochi', shortName: 'FAC Kochi', campus: 'KOCHI', category: 'Applied Computing', est: 2014, dean: 'Dr. George Mathew', email: 'dean.fac.koc@pkdasuniversity.ac.in' },
    { id: 5, code: 'FAHSS-KOC', name: 'Faculty of Arts, Humanities and Social Sciences - Kochi', shortName: 'FAHSS Kochi', campus: 'KOCHI', category: 'Humanities', est: 2012, dean: 'Dr. Ananya Roy', email: 'dean.fahss.koc@pkdasuniversity.ac.in' },
    { id: 6, code: 'FCD-KOC', name: 'Faculty of Creativity and Design - Kochi', shortName: 'FCD Kochi', campus: 'KOCHI', category: 'Design', est: 2016, dean: 'Prof. Rajesh Varier', email: 'dean.fcd.koc@pkdasuniversity.ac.in' },
    { id: 7, code: 'FMS-KOC', name: 'Faculty of Management Studies - Kochi', shortName: 'FMS Kochi', campus: 'KOCHI', category: 'Management', est: 2013, dean: 'Dr. K. S. Pillai', email: 'dean.fms.koc@pkdasuniversity.ac.in' },
    { id: 8, code: 'FCOM-KOC', name: 'Faculty of Commerce - Kochi', shortName: 'FCOM Kochi', campus: 'KOCHI', category: 'Commerce', est: 2013, dean: 'Dr. Jacob Abraham', email: 'dean.fcom.koc@pkdasuniversity.ac.in' },
    { id: 9, code: 'FET-KOC', name: 'Faculty of Engineering and Technology - Kochi', shortName: 'FET Kochi', campus: 'KOCHI', category: 'Engineering', est: 2011, dean: 'Dr. Suresh Kumar N.', email: 'dean.fet.koc@pkdasuniversity.ac.in' },
    { id: 10, code: 'FBAS-KOC', name: 'Faculty of Basic and Applied Sciences - Kochi', shortName: 'FBAS Kochi', campus: 'KOCHI', category: 'Basic Sciences', est: 2015, dean: 'Dr. Sujatha Nair', email: 'dean.fbas.koc@pkdasuniversity.ac.in' }
  ];

    // Comprehensive Department Breakdown for ALL 10 Faculties
  const DEPARTMENTS = {
    1: [ // FET-BLR
      { id: 101, code: 'FET-CSE', name: 'Computer Science & Engineering', hod: 'Dr. S. K. Gupta', appeared: 1480, passed: 1410, failed: 70, arrears1: 42, arrears2: 20, arrearsMore: 8, arrears: 70, passPct: 95.27, distinction: 590, firstClass: 680 },
      { id: 102, code: 'FET-AI-DS', name: 'Artificial Intelligence & Data Science', hod: 'Dr. Priya Mani', appeared: 850, passed: 805, failed: 45, arrears1: 28, arrears2: 12, arrearsMore: 5, arrears: 45, passPct: 94.71, distinction: 340, firstClass: 390 },
      { id: 103, code: 'FET-ECE', name: 'Electronics & Communication Engineering', hod: 'Dr. V. Raman', appeared: 920, passed: 825, failed: 95, arrears1: 56, arrears2: 26, arrearsMore: 13, arrears: 95, passPct: 89.67, distinction: 240, firstClass: 460 },
      { id: 104, code: 'FET-ME', name: 'Mechanical & Automation Engineering', hod: 'Dr. M. S. Joshi', appeared: 820, passed: 715, failed: 105, arrears1: 60, arrears2: 30, arrearsMore: 15, arrears: 105, passPct: 87.20, distinction: 160, firstClass: 420 },
      { id: 105, code: 'FET-CE', name: 'Civil & Environmental Engineering', hod: 'Dr. T. Natarajan', appeared: 650, passed: 555, failed: 95, arrears1: 54, arrears2: 27, arrearsMore: 14, arrears: 95, passPct: 85.38, distinction: 90, firstClass: 290 }
    ],
    2: [ // FCOM-BLR
      { id: 201, code: 'FCOM-ACC', name: 'Accounting & Financial Forensics', hod: 'Dr. Rekha Sundaram', appeared: 1350, passed: 1260, failed: 90, arrears1: 54, arrears2: 24, arrearsMore: 12, arrears: 90, passPct: 93.33, distinction: 420, firstClass: 680 },
      { id: 202, code: 'FCOM-BF', name: 'Banking, Insurance & FinTech', hod: 'Dr. N. K. Murthy', appeared: 980, passed: 895, failed: 85, arrears1: 50, arrears2: 23, arrearsMore: 12, arrears: 85, passPct: 91.33, distinction: 290, firstClass: 490 },
      { id: 203, code: 'FCOM-TAX', name: 'International Taxation & Regulatory Law', hod: 'Dr. S. Gopal', appeared: 750, passed: 660, failed: 90, arrears1: 56, arrears2: 23, arrearsMore: 11, arrears: 90, passPct: 88.00, distinction: 200, firstClass: 310 }
    ],
    3: [ // FMS-BLR
      { id: 301, code: 'FMS-MKT', name: 'Marketing & Digital Strategy', hod: 'Dr. Alok Verma', appeared: 720, passed: 688, failed: 32, arrears1: 20, arrears2: 8, arrearsMore: 4, arrears: 32, passPct: 95.56, distinction: 290, firstClass: 340 },
      { id: 302, code: 'FMS-FIN', name: 'Corporate Finance & Investment Banking', hod: 'Dr. Shalini Sengupta', appeared: 680, passed: 645, failed: 35, arrears1: 22, arrears2: 9, arrearsMore: 4, arrears: 35, passPct: 94.85, distinction: 270, firstClass: 320 },
      { id: 303, code: 'FMS-HR', name: 'Human Resource Management & OB', hod: 'Dr. Preeti Shenoy', appeared: 450, passed: 428, failed: 22, arrears1: 14, arrears2: 6, arrearsMore: 2, arrears: 22, passPct: 95.11, distinction: 160, firstClass: 230 },
      { id: 304, code: 'FMS-OPS', name: 'Operations & Global Supply Chain', hod: 'Dr. Jayant Patil', appeared: 360, passed: 324, failed: 36, arrears1: 22, arrears2: 10, arrearsMore: 4, arrears: 36, passPct: 90.00, distinction: 120, firstClass: 195 }
    ],
    4: [ // FAC-KOC
      { id: 401, code: 'FAC-CS', name: 'Cloud Computing & Distributed Applications', hod: 'Dr. Biju Varghese', appeared: 850, passed: 785, failed: 65, arrears1: 40, arrears2: 17, arrearsMore: 8, arrears: 65, passPct: 92.35, distinction: 290, firstClass: 390 },
      { id: 402, code: 'FAC-CYBER', name: 'Cyber Security & Forensic Computing', hod: 'Dr. Deepa Sridhar', appeared: 580, passed: 528, failed: 52, arrears1: 32, arrears2: 14, arrearsMore: 6, arrears: 52, passPct: 91.03, distinction: 180, firstClass: 270 },
      { id: 403, code: 'FAC-DATA', name: 'Data Analytics & Big Data Systems', hod: 'Dr. C. P. Manoj', appeared: 510, passed: 452, failed: 58, arrears1: 36, arrears2: 15, arrearsMore: 7, arrears: 58, passPct: 88.63, distinction: 150, firstClass: 230 }
    ],
    5: [ // FAHSS-KOC
      { id: 501, code: 'FAHSS-ENG', name: 'English & Comparative Cultural Studies', hod: 'Dr. Susan George', appeared: 520, passed: 456, failed: 64, arrears1: 38, arrears2: 18, arrearsMore: 8, arrears: 64, passPct: 87.69, distinction: 120, firstClass: 250 },
      { id: 502, code: 'FAHSS-SOC', name: 'Applied Sociology & Public Policy', hod: 'Dr. K. R. Nambiar', appeared: 440, passed: 375, failed: 65, arrears1: 40, arrears2: 17, arrearsMore: 8, arrears: 65, passPct: 85.23, distinction: 90, firstClass: 210 },
      { id: 503, code: 'FAHSS-MEDIA', name: 'Mass Communication & Digital Journalism', hod: 'Dr. Vinod Kurian', appeared: 430, passed: 364, failed: 66, arrears1: 42, arrears2: 16, arrearsMore: 8, arrears: 66, passPct: 84.65, distinction: 100, firstClass: 180 }
    ],
    6: [ // FCD-KOC
      { id: 601, code: 'FCD-UIUX', name: 'User Experience & Interaction Design', hod: 'Prof. Neha Joseph', appeared: 420, passed: 402, failed: 18, arrears1: 11, arrears2: 5, arrearsMore: 2, arrears: 18, passPct: 95.71, distinction: 180, firstClass: 190 },
      { id: 602, code: 'FCD-ANIM', name: 'Animation, VFX & Gaming Media', hod: 'Prof. Kevin Thomas', appeared: 410, passed: 382, failed: 28, arrears1: 18, arrears2: 7, arrearsMore: 3, arrears: 28, passPct: 93.17, distinction: 150, firstClass: 195 },
      { id: 603, code: 'FCD-PROD', name: 'Industrial & Sustainable Product Design', hod: 'Prof. Tarun Sen', appeared: 330, passed: 301, failed: 29, arrears1: 17, arrears2: 8, arrearsMore: 4, arrears: 29, passPct: 91.21, distinction: 120, firstClass: 145 }
    ],
    7: [ // FMS-KOC
      { id: 701, code: 'FMSK-GEN', name: 'General Management & Entrepreneurship', hod: 'Dr. K. M. Paul', appeared: 720, passed: 682, failed: 38, arrears1: 24, arrears2: 10, arrearsMore: 4, arrears: 38, passPct: 94.72, distinction: 280, firstClass: 330 },
      { id: 702, code: 'FMSK-MAR', name: 'Maritime Logistics & Port Operations', hod: 'Dr. Antony Vithayathil', appeared: 610, passed: 571, failed: 39, arrears1: 25, arrears2: 10, arrearsMore: 4, arrears: 39, passPct: 93.61, distinction: 230, firstClass: 290 },
      { id: 703, code: 'FMSK-FIN', name: 'Financial Analytics & Investment', hod: 'Dr. Lakshmi Shankar', appeared: 500, passed: 457, failed: 43, arrears1: 27, arrears2: 11, arrearsMore: 5, arrears: 43, passPct: 91.40, distinction: 170, firstClass: 240 }
    ],
    8: [ // FCOM-KOC
      { id: 801, code: 'FCOMK-CA', name: 'Professional Accounting & CA Prep', hod: 'Dr. Zachariah George', appeared: 1120, passed: 1012, failed: 108, arrears1: 68, arrears2: 28, arrearsMore: 12, arrears: 108, passPct: 90.36, distinction: 310, firstClass: 540 },
      { id: 802, code: 'FCOMK-IT', name: 'Information Systems in Commerce', hod: 'Dr. Anita Thomas', appeared: 940, passed: 813, failed: 127, arrears1: 78, arrears2: 34, arrearsMore: 15, arrears: 127, passPct: 86.49, distinction: 230, firstClass: 450 }
    ],
    9: [ // FET-KOC
      { id: 901, code: 'FETK-CSE', name: 'Computer Engineering & Industrial IoT', hod: 'Dr. Radhakrishnan B.', appeared: 1320, passed: 1195, failed: 125, arrears1: 75, arrears2: 34, arrearsMore: 16, arrears: 125, passPct: 90.53, distinction: 410, firstClass: 640 },
      { id: 902, code: 'FETK-ECE', name: 'Robotics, Mechatronics & Automation', hod: 'Dr. Sunil K. Menon', appeared: 1140, passed: 990, failed: 150, arrears1: 92, arrears2: 40, arrearsMore: 18, arrears: 150, passPct: 86.84, distinction: 310, firstClass: 520 },
      { id: 903, code: 'FETK-EEE', name: 'Electrical & Renewable Energy Systems', hod: 'Dr. Bindu Haridas', appeared: 920, passed: 775, failed: 145, arrears1: 88, arrears2: 38, arrearsMore: 19, arrears: 145, passPct: 84.24, distinction: 240, firstClass: 420 }
    ],
    10: [ // FBAS-KOC
      { id: 1001, code: 'FBAS-MATH', name: 'Applied Mathematics & Actuarial Statistics', hod: 'Dr. K. C. Chacko', appeared: 450, passed: 398, failed: 52, arrears1: 32, arrears2: 14, arrearsMore: 6, arrears: 52, passPct: 88.44, distinction: 150, firstClass: 190 },
      { id: 1002, code: 'FBAS-PHYS', name: 'Material Physics & Nanotechnology', hod: 'Dr. Sarath Chandran', appeared: 410, passed: 352, failed: 58, arrears1: 36, arrears2: 16, arrearsMore: 6, arrears: 58, passPct: 85.85, distinction: 130, firstClass: 170 },
      { id: 1003, code: 'FBAS-CHEM', name: 'Applied Chemistry & Polymer Science', hod: 'Dr. Mary Stephen', appeared: 370, passed: 310, failed: 60, arrears1: 38, arrears2: 15, arrearsMore: 7, arrears: 60, passPct: 83.78, distinction: 100, firstClass: 160 }
    ]
  };

    // Master institutional records for all 10 colleges
  const INSTITUTIONAL_DATA = {
    1: {
      students: { 
        total: 4820, ug: 4120, pg: 620, phd: 80, cap: 1350, app: 6840, conf: 1310, drop: 42, disc: 18, prev: 4510,
        funnelCurrent: [ { value: 6840, name: 'Applications Received' }, { value: 5810, name: 'Eligibility Screened' }, { value: 4480, name: 'Entrance Appeared' }, { value: 1620, name: 'Provisional Offers' }, { value: 1310, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 6420, name: 'Applications Received' }, { value: 5410, name: 'Eligibility Screened' }, { value: 4120, name: 'Entrance Appeared' }, { value: 1510, name: 'Provisional Offers' }, { value: 1240, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 5950, name: 'Applications Received' }, { value: 4980, name: 'Eligibility Screened' }, { value: 3790, name: 'Entrance Appeared' }, { value: 1410, name: 'Provisional Offers' }, { value: 1150, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 260, prof: 48, assoc: 78, asst: 134, phd: 182, sfr: 18.54, researchActive: 78.5, prev: 245 },
      finance: { demand: 895000000, collected: 828000000, prev: 755000000 },
      academic: { appeared: 4720, passed: 4310, failed: 410, arrears1: 240, arrears2: 115, arrearsMore: 55, arrears: 410, passPct: 91.31, prevPassPct: 89.80, passPct3yr: [88.50, 89.80, 91.31] },
      research: { unique: 385, scopus: 298, wos: 215, scholar: 365, journals: 265, conf: 120, citations: 4820, hIndex: 34, filed: 42, granted: 18, rpf: 1.48, prev: 332 },
      attendance: { pct: 86.40, above85: 3120, mid: 1260, below75: 440, cond: 340, det: 100, prev: 85.10, monthly: [87.8, 87.2, 86.5, 86.8, 86.4] },
      placement: { eligible: 1150, placed: 1060, high: 52.0, avg: 9.85, med: 8.50, companies: 185, offers: 1420, dream: 340, prev: 90.50 }
    },
    2: {
      students: { 
        total: 3150, ug: 2680, pg: 440, phd: 30, cap: 950, app: 4420, conf: 920, drop: 24, disc: 11, prev: 2980,
        funnelCurrent: [ { value: 4420, name: 'Applications Received' }, { value: 3750, name: 'Eligibility Screened' }, { value: 2890, name: 'Entrance Appeared' }, { value: 1120, name: 'Provisional Offers' }, { value: 920, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 4150, name: 'Applications Received' }, { value: 3500, name: 'Eligibility Screened' }, { value: 2670, name: 'Entrance Appeared' }, { value: 1050, name: 'Provisional Offers' }, { value: 865, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 3820, name: 'Applications Received' }, { value: 3200, name: 'Eligibility Screened' }, { value: 2430, name: 'Entrance Appeared' }, { value: 970, name: 'Provisional Offers' }, { value: 805, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 136, prof: 22, assoc: 38, asst: 76, phd: 74, sfr: 23.16, researchActive: 52.0, prev: 130 },
      finance: { demand: 395000000, collected: 362000000, prev: 332000000 },
      academic: { appeared: 3080, passed: 2815, failed: 265, arrears1: 160, arrears2: 70, arrearsMore: 35, arrears: 265, passPct: 91.40, prevPassPct: 89.40, passPct3yr: [88.10, 89.40, 91.40] },
      research: { unique: 98, scopus: 54, wos: 38, scholar: 92, journals: 74, conf: 24, citations: 760, hIndex: 16, filed: 6, granted: 2, rpf: 0.72, prev: 85 },
      attendance: { pct: 84.80, above85: 1920, mid: 890, below75: 340, cond: 265, det: 75, prev: 83.90, monthly: [86.2, 85.6, 84.9, 85.2, 84.8] },
      placement: { eligible: 720, placed: 625, high: 18.5, avg: 6.20, med: 5.80, companies: 92, offers: 780, dream: 110, prev: 84.80 }
    },
    3: {
      students: { 
        total: 2240, ug: 1180, pg: 1010, phd: 50, cap: 720, app: 3980, conf: 705, drop: 16, disc: 7, prev: 2110,
        funnelCurrent: [ { value: 3980, name: 'Applications Received' }, { value: 3420, name: 'Eligibility Screened' }, { value: 2710, name: 'Entrance Appeared' }, { value: 890, name: 'Provisional Offers' }, { value: 705, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 3710, name: 'Applications Received' }, { value: 3180, name: 'Eligibility Screened' }, { value: 2490, name: 'Entrance Appeared' }, { value: 830, name: 'Provisional Offers' }, { value: 660, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 3420, name: 'Applications Received' }, { value: 2910, name: 'Eligibility Screened' }, { value: 2270, name: 'Entrance Appeared' }, { value: 760, name: 'Provisional Offers' }, { value: 610, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 130, prof: 28, assoc: 42, asst: 60, phd: 92, sfr: 17.23, researchActive: 68.0, prev: 122 },
      finance: { demand: 610000000, collected: 578000000, prev: 518000000 },
      academic: { appeared: 2210, passed: 2085, failed: 125, arrears1: 78, arrears2: 33, arrearsMore: 14, arrears: 125, passPct: 94.34, prevPassPct: 92.50, passPct3yr: [91.20, 92.50, 94.34] },
      research: { unique: 145, scopus: 96, wos: 72, scholar: 138, journals: 112, conf: 33, citations: 1420, hIndex: 22, filed: 12, granted: 4, rpf: 1.12, prev: 124 },
      attendance: { pct: 88.90, above85: 1580, mid: 510, below75: 150, cond: 120, det: 30, prev: 87.50, monthly: [90.1, 89.5, 88.8, 89.2, 88.9] },
      placement: { eligible: 680, placed: 642, high: 36.0, avg: 11.40, med: 10.20, companies: 145, offers: 890, dream: 260, prev: 92.40 }
    },
    4: {
      students: { 
        total: 1980, ug: 1540, pg: 410, phd: 30, cap: 600, app: 3120, conf: 588, drop: 15, disc: 6, prev: 1820,
        funnelCurrent: [ { value: 3120, name: 'Applications Received' }, { value: 2650, name: 'Eligibility Screened' }, { value: 2080, name: 'Entrance Appeared' }, { value: 740, name: 'Provisional Offers' }, { value: 588, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 2940, name: 'Applications Received' }, { value: 2480, name: 'Eligibility Screened' }, { value: 1920, name: 'Entrance Appeared' }, { value: 690, name: 'Provisional Offers' }, { value: 545, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 2710, name: 'Applications Received' }, { value: 2270, name: 'Eligibility Screened' }, { value: 1750, name: 'Entrance Appeared' }, { value: 630, name: 'Provisional Offers' }, { value: 502, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 120, prof: 22, assoc: 36, asst: 62, phd: 78, sfr: 16.50, researchActive: 74.0, prev: 112 },
      finance: { demand: 275000000, collected: 248000000, prev: 219000000 },
      academic: { appeared: 1940, passed: 1765, failed: 175, arrears1: 108, arrears2: 46, arrearsMore: 21, arrears: 175, passPct: 90.98, prevPassPct: 88.50, passPct3yr: [86.80, 88.50, 90.98] },
      research: { unique: 184, scopus: 142, wos: 98, scholar: 175, journals: 128, conf: 56, citations: 1890, hIndex: 24, filed: 18, granted: 7, rpf: 1.53, prev: 155 },
      attendance: { pct: 85.70, above85: 1240, mid: 540, below75: 200, cond: 155, det: 45, prev: 84.80, monthly: [87.0, 86.4, 85.6, 86.0, 85.7] },
      placement: { eligible: 490, placed: 448, high: 28.0, avg: 8.10, med: 7.20, companies: 84, offers: 580, dream: 130, prev: 88.50 }
    },
    5: {
      students: { 
        total: 1420, ug: 1150, pg: 250, phd: 20, cap: 480, app: 1850, conf: 445, drop: 19, disc: 12, prev: 1360,
        funnelCurrent: [ { value: 1850, name: 'Applications Received' }, { value: 1540, name: 'Eligibility Screened' }, { value: 1180, name: 'Entrance Appeared' }, { value: 550, name: 'Provisional Offers' }, { value: 445, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 1720, name: 'Applications Received' }, { value: 1430, name: 'Eligibility Screened' }, { value: 1080, name: 'Entrance Appeared' }, { value: 510, name: 'Provisional Offers' }, { value: 418, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 1590, name: 'Applications Received' }, { value: 1310, name: 'Eligibility Screened' }, { value: 980, name: 'Entrance Appeared' }, { value: 460, name: 'Provisional Offers' }, { value: 382, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 100, prof: 16, assoc: 28, asst: 56, phd: 58, sfr: 14.20, researchActive: 48.0, prev: 96 },
      finance: { demand: 142000000, collected: 121000000, prev: 112000000 },
      academic: { appeared: 1390, passed: 1195, failed: 195, arrears1: 120, arrears2: 51, arrearsMore: 24, arrears: 195, passPct: 85.97, prevPassPct: 84.10, passPct3yr: [82.50, 84.10, 85.97] },
      research: { unique: 76, scopus: 32, wos: 24, scholar: 72, journals: 58, conf: 18, citations: 480, hIndex: 12, filed: 2, granted: 0, rpf: 0.76, prev: 68 },
      attendance: { pct: 81.60, above85: 780, mid: 410, below75: 230, cond: 170, det: 60, prev: 80.50, monthly: [83.2, 82.5, 81.4, 82.0, 81.6] },
      placement: { eligible: 320, placed: 245, high: 12.0, avg: 4.80, med: 4.20, companies: 48, offers: 290, dream: 25, prev: 73.50 }
    },
    6: {
      students: { 
        total: 1180, ug: 980, pg: 185, phd: 15, cap: 360, app: 2140, conf: 352, drop: 11, disc: 5, prev: 1080,
        funnelCurrent: [ { value: 2140, name: 'Applications Received' }, { value: 1820, name: 'Eligibility Screened' }, { value: 1390, name: 'Entrance Appeared' }, { value: 460, name: 'Provisional Offers' }, { value: 352, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 1990, name: 'Applications Received' }, { value: 1690, name: 'Eligibility Screened' }, { value: 1280, name: 'Entrance Appeared' }, { value: 420, name: 'Provisional Offers' }, { value: 328, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 1830, name: 'Applications Received' }, { value: 1540, name: 'Eligibility Screened' }, { value: 1160, name: 'Entrance Appeared' }, { value: 385, name: 'Provisional Offers' }, { value: 298, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 72, prof: 10, assoc: 20, asst: 42, phd: 32, sfr: 16.39, researchActive: 56.0, prev: 68 },
      finance: { demand: 218000000, collected: 201000000, prev: 178000000 },
      academic: { appeared: 1160, passed: 1085, failed: 75, arrears1: 46, arrears2: 20, arrearsMore: 9, arrears: 75, passPct: 93.53, prevPassPct: 91.80, passPct3yr: [90.10, 91.80, 93.53] },
      research: { unique: 62, scopus: 28, wos: 18, scholar: 58, journals: 38, conf: 24, citations: 390, hIndex: 10, filed: 14, granted: 5, rpf: 0.86, prev: 52 },
      attendance: { pct: 87.20, above85: 790, mid: 285, below75: 105, cond: 85, det: 20, prev: 86.00, monthly: [88.5, 87.8, 87.0, 87.5, 87.2] },
      placement: { eligible: 260, placed: 238, high: 22.0, avg: 7.40, med: 6.80, companies: 58, offers: 320, dream: 65, prev: 88.20 }
    },
    7: {
      students: { 
        total: 1860, ug: 990, pg: 840, phd: 30, cap: 580, app: 2890, conf: 560, drop: 14, disc: 8, prev: 1750,
        funnelCurrent: [ { value: 2890, name: 'Applications Received' }, { value: 2460, name: 'Eligibility Screened' }, { value: 1910, name: 'Entrance Appeared' }, { value: 710, name: 'Provisional Offers' }, { value: 560, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 2710, name: 'Applications Received' }, { value: 2300, name: 'Eligibility Screened' }, { value: 1770, name: 'Entrance Appeared' }, { value: 660, name: 'Provisional Offers' }, { value: 525, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 2510, name: 'Applications Received' }, { value: 2120, name: 'Eligibility Screened' }, { value: 1610, name: 'Entrance Appeared' }, { value: 605, name: 'Provisional Offers' }, { value: 485, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 110, prof: 20, assoc: 34, asst: 56, phd: 72, sfr: 16.91, researchActive: 62.0, prev: 104 },
      finance: { demand: 440000000, collected: 405000000, prev: 368000000 },
      academic: { appeared: 1830, passed: 1710, failed: 120, arrears1: 76, arrears2: 31, arrearsMore: 13, arrears: 120, passPct: 93.44, prevPassPct: 91.20, passPct3yr: [89.80, 91.20, 93.44] },
      research: { unique: 112, scopus: 74, wos: 52, scholar: 106, journals: 84, conf: 28, citations: 980, hIndex: 18, filed: 8, granted: 3, rpf: 1.02, prev: 96 },
      attendance: { pct: 88.10, above85: 1290, mid: 430, below75: 140, cond: 112, det: 28, prev: 87.20, monthly: [89.4, 88.7, 87.9, 88.4, 88.1] },
      placement: { eligible: 540, placed: 502, high: 30.0, avg: 10.20, med: 9.10, companies: 118, offers: 690, dream: 185, prev: 91.00 }
    },
    8: {
      students: { 
        total: 2100, ug: 1820, pg: 260, phd: 20, cap: 650, app: 2950, conf: 635, drop: 18, disc: 9, prev: 2010,
        funnelCurrent: [ { value: 2950, name: 'Applications Received' }, { value: 2510, name: 'Eligibility Screened' }, { value: 1950, name: 'Entrance Appeared' }, { value: 790, name: 'Provisional Offers' }, { value: 635, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 2790, name: 'Applications Received' }, { value: 2360, name: 'Eligibility Screened' }, { value: 1810, name: 'Entrance Appeared' }, { value: 730, name: 'Provisional Offers' }, { value: 595, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 2580, name: 'Applications Received' }, { value: 2170, name: 'Eligibility Screened' }, { value: 1650, name: 'Entrance Appeared' }, { value: 670, name: 'Provisional Offers' }, { value: 548, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 122, prof: 18, assoc: 32, asst: 72, phd: 62, sfr: 17.21, researchActive: 50.0, prev: 118 },
      finance: { demand: 245000000, collected: 212000000, prev: 198000000 },
      academic: { appeared: 2060, passed: 1825, failed: 235, arrears1: 146, arrears2: 62, arrearsMore: 27, arrears: 235, passPct: 88.59, prevPassPct: 86.80, passPct3yr: [85.00, 86.80, 88.59] },
      research: { unique: 84, scopus: 46, wos: 31, scholar: 80, journals: 62, conf: 22, citations: 620, hIndex: 14, filed: 4, granted: 1, rpf: 0.69, prev: 74 },
      attendance: { pct: 83.50, above85: 1260, mid: 560, below75: 280, cond: 215, det: 65, prev: 82.80, monthly: [85.0, 84.2, 83.3, 83.8, 83.5] },
      placement: { eligible: 480, placed: 408, high: 15.0, avg: 5.60, med: 5.10, companies: 64, offers: 495, dream: 55, prev: 82.60 }
    },
    9: {
      students: { 
        total: 3450, ug: 2980, pg: 430, phd: 40, cap: 1050, app: 4870, conf: 1015, drop: 31, disc: 14, prev: 3290,
        funnelCurrent: [ { value: 4870, name: 'Applications Received' }, { value: 4120, name: 'Eligibility Screened' }, { value: 3150, name: 'Entrance Appeared' }, { value: 1280, name: 'Provisional Offers' }, { value: 1015, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 4580, name: 'Applications Received' }, { value: 3860, name: 'Eligibility Screened' }, { value: 2920, name: 'Entrance Appeared' }, { value: 1190, name: 'Provisional Offers' }, { value: 955, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 4220, name: 'Applications Received' }, { value: 3530, name: 'Eligibility Screened' }, { value: 2640, name: 'Entrance Appeared' }, { value: 1090, name: 'Provisional Offers' }, { value: 890, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 200, prof: 34, assoc: 58, asst: 108, phd: 134, sfr: 17.25, researchActive: 71.0, prev: 190 },
      finance: { demand: 565000000, collected: 492000000, prev: 448000000 },
      academic: { appeared: 3380, passed: 2960, failed: 420, arrears1: 255, arrears2: 112, arrearsMore: 53, arrears: 420, passPct: 87.57, prevPassPct: 85.90, passPct3yr: [84.10, 85.90, 87.57] },
      research: { unique: 268, scopus: 198, wos: 142, scholar: 252, journals: 182, conf: 86, citations: 2940, hIndex: 28, filed: 28, granted: 11, rpf: 1.34, prev: 230 },
      attendance: { pct: 84.90, above85: 2140, mid: 930, below75: 380, cond: 290, det: 90, prev: 84.10, monthly: [86.1, 85.5, 84.7, 85.2, 84.9] },
      placement: { eligible: 820, placed: 715, high: 38.0, avg: 8.40, med: 7.50, companies: 132, offers: 940, dream: 195, prev: 85.20 }
    },
    10: {
      students: { 
        total: 1260, ug: 960, pg: 275, phd: 25, cap: 420, app: 1760, conf: 395, drop: 12, disc: 6, prev: 1190,
        funnelCurrent: [ { value: 1760, name: 'Applications Received' }, { value: 1480, name: 'Eligibility Screened' }, { value: 1120, name: 'Entrance Appeared' }, { value: 480, name: 'Provisional Offers' }, { value: 395, name: 'Confirmed Admissions' } ],
        funnelPrev1: [ { value: 1620, name: 'Applications Received' }, { value: 1350, name: 'Eligibility Screened' }, { value: 1010, name: 'Entrance Appeared' }, { value: 440, name: 'Provisional Offers' }, { value: 365, name: 'Confirmed Admissions' } ],
        funnelPrev2: [ { value: 1490, name: 'Applications Received' }, { value: 1230, name: 'Eligibility Screened' }, { value: 910, name: 'Entrance Appeared' }, { value: 400, name: 'Provisional Offers' }, { value: 335, name: 'Confirmed Admissions' } ]
      },
      faculty: { total: 84, prof: 18, assoc: 26, asst: 40, phd: 64, sfr: 15.00, researchActive: 76.0, prev: 80 },
      finance: { demand: 138000000, collected: 119000000, prev: 108000000 },
      academic: { appeared: 1230, passed: 1060, failed: 170, arrears1: 106, arrears2: 45, arrearsMore: 19, arrears: 170, passPct: 86.18, prevPassPct: 84.20, passPct3yr: [82.80, 84.20, 86.18] },
      research: { unique: 122, scopus: 92, wos: 78, scholar: 116, journals: 94, conf: 28, citations: 1750, hIndex: 21, filed: 10, granted: 4, rpf: 1.45, prev: 105 },
      attendance: { pct: 86.10, above85: 820, mid: 320, below75: 120, cond: 95, det: 25, prev: 85.30, monthly: [87.4, 86.8, 85.9, 86.3, 86.1] },
      placement: { eligible: 280, placed: 224, high: 16.0, avg: 5.90, med: 5.40, companies: 42, offers: 270, dream: 38, prev: 77.50 }
    }
  };

  // Format currency in Indian notation
  function formatCr(num) {
    num = Number(num);
    if (num >= 10000000) return '₹' + (num / 10000000).toFixed(2) + ' Cr';
    if (num >= 100000) return '₹' + (num / 100000).toFixed(2) + ' L';
    return '₹' + num.toLocaleString('en-IN');
  }

  function getFilteredColleges(campus, selectedIds) {
    campus = campus || 'ALL';
    return COLLEGES.filter(c => {
      if (campus !== 'ALL' && c.campus !== campus) return false;
      if (selectedIds && selectedIds.length > 0 && !selectedIds.includes(c.id)) return false;
      return true;
    });
  }

  // Get full comprehensive drilldown data for a specific college
  function getCollegeDrilldownData(collegeId) {
    const col = COLLEGES.find(c => c.id === collegeId) || COLLEGES[0];
    const data = INSTITUTIONAL_DATA[col.id] || INSTITUTIONAL_DATA[1];
    const depts = DEPARTMENTS[col.id] || [];

    const feeCollected = data.finance.collected;
    const feeDemand = data.finance.demand;
    const feeOutstanding = feeDemand - feeCollected;
    const collectionPct = Number(((feeCollected / feeDemand) * 100).toFixed(2));

    const placementPct = Number(((data.placement.placed / data.placement.eligible) * 100).toFixed(2));

    // Compute department-level attendance breakdowns
    const deptAttendance = depts.map(d => {
      const share = d.appeared / (data.students.total || 1);
      const deptAttPct = Number(Math.min(98.5, Math.max(76.0, data.attendance.pct + (d.passPct - data.academic.passPct) * 0.4)).toFixed(2));
      const enrolled = d.appeared;
      const above85 = Math.round(enrolled * (deptAttPct >= 90 ? 0.68 : (deptAttPct >= 85 ? 0.60 : 0.52)));
      const mid75 = Math.round(enrolled * (deptAttPct >= 90 ? 0.24 : 0.32));
      const below75 = Math.max(4, enrolled - above85 - mid75);
      const condoned = Math.round(below75 * 0.76);
      const detained = Math.max(1, below75 - condoned);
    

  return {
        code: d.code,
        name: d.name,
        hod: d.hod,
        enrolled: enrolled,
        attPct: deptAttPct,
        above85: above85,
        mid75: mid75,
        below75: below75,
        condoned: condoned,
        detained: detained,
        biometricStatus: '100% Synced'
      };
    });

    // Compute department-level student intake & demographics
    const deptStudents = depts.map(d => {
      const share = d.appeared / (data.students.total || 1);
      const cap = Math.round(data.students.cap * share);
      const app = Math.round(data.students.app * share);
      const conf = Math.round(data.students.conf * share);
      const ug = Math.round(data.students.ug * share);
      const pg = Math.round(data.students.pg * share);
      const phd = Math.max(1, Math.round(data.students.phd * share));
      const total = ug + pg + phd;
      const fillRate = Number(((conf / Math.max(1, cap)) * 100).toFixed(1));
      return {
        code: d.code,
        name: d.name,
        cap: cap,
        app: app,
        conf: conf,
        ug: ug,
        pg: pg,
        phd: phd,
        total: total,
        fillRate: fillRate
      };
    });

    // Compute department-level faculty & research contribution
    const deptFacultyResearch = depts.map(d => {
      const share = d.appeared / (data.students.total || 1);
      const faculty = Math.max(8, Math.round(data.faculty.total * share));
      const phdHolders = Math.round(data.faculty.phd * share);
      const scopus = Math.round(data.research.scopus * share);
      const citations = Math.round(data.research.citations * share);
      const filed = Math.max(1, Math.round(data.research.filed * share));
      const rpf = Number((scopus / Math.max(1, faculty)).toFixed(2));
      return {
        code: d.code,
        name: d.name,
        faculty: faculty,
        phdHolders: phdHolders,
        scopus: scopus,
        citations: citations,
        filed: filed,
        rpf: rpf
      };
    });

    const collegeRecruiters = {
      1: [
        { company: 'Microsoft', packages: '42.0 - 52.0 LPA', offers: 28, category: 'Super Dream (Cloud & AI)' },
        { company: 'Amazon AWS', packages: '28.0 - 45.0 LPA', offers: 46, category: 'Product & Systems' },
        { company: 'Google Cloud India', packages: '32.0 - 48.0 LPA', offers: 14, category: 'Core Platform Engineering' },
        { company: 'Cisco Systems', packages: '18.0 - 24.5 LPA', offers: 38, category: 'Network Software' },
        { company: 'Texas Instruments', packages: '22.0 - 30.0 LPA', offers: 22, category: 'Embedded & VLSI' },
        { company: 'Bosch Global Software', packages: '11.0 - 15.5 LPA', offers: 85, category: 'Mobility & Automation' },
        { company: 'Infosys Wingspan / Cobalt', packages: '6.5 - 9.5 LPA', offers: 240, category: 'Digital Solutions' }
      ],
      2: [
        { company: 'Deloitte USI', packages: '8.5 - 13.0 LPA', offers: 112, category: 'Audit & Advisory' },
        { company: 'Ernst & Young (EY)', packages: '8.0 - 12.5 LPA', offers: 96, category: 'Tax & Forensics' },
        { company: 'PricewaterhouseCoopers (PwC)', packages: '8.5 - 12.0 LPA', offers: 84, category: 'Financial Assurance' },
        { company: 'KPMG India', packages: '7.8 - 11.5 LPA', offers: 78, category: 'Risk & Strategy' },
        { company: 'JP Morgan Chase', packages: '14.0 - 18.5 LPA', offers: 32, category: 'Corporate Banking' },
        { company: 'Morgan Stanley', packages: '15.0 - 20.0 LPA', offers: 26, category: 'Global Finance' },
        { company: 'Grant Thornton', packages: '7.0 - 10.0 LPA', offers: 64, category: 'Statutory Valuation' }
      ],
      3: [
        { company: 'McKinsey & Company', packages: '24.0 - 32.0 LPA', offers: 16, category: 'Strategic Consulting' },
        { company: 'Boston Consulting Group (BCG)', packages: '26.0 - 34.0 LPA', offers: 12, category: 'Management Advisory' },
        { company: 'Amazon (Operations & Ops)', packages: '18.0 - 24.0 LPA', offers: 34, category: 'Program Management' },
        { company: 'HDFC Bank Corporate', packages: '12.0 - 16.5 LPA', offers: 68, category: 'Wholesale Lending' },
        { company: 'ITC Limited', packages: '16.0 - 22.0 LPA', offers: 22, category: 'FMCG Brand Management' },
        { company: 'Tata Consultancy Services (Management)', packages: '9.0 - 13.5 LPA', offers: 95, category: 'Business Analysis' },
        { company: 'Hindustan Unilever (HUL)', packages: '19.0 - 25.0 LPA', offers: 18, category: 'Supply Chain Strategy' }
      ],
      4: [
        { company: 'Oracle Cloud Infrastructure', packages: '20.0 - 28.0 LPA', offers: 24, category: 'Enterprise Cloud' },
        { company: 'Cognizant Digital', packages: '7.0 - 11.0 LPA', offers: 86, category: 'Full Stack & Web3' },
        { company: 'Wipro Technologies', packages: '6.5 - 9.5 LPA', offers: 92, category: 'Enterprise Apps' },
        { company: 'UST Global', packages: '7.5 - 11.5 LPA', offers: 74, category: 'Digital Transformation' },
        { company: 'IBS Software', packages: '8.0 - 12.0 LPA', offers: 58, category: 'Aviation SaaS' },
        { company: 'Zoho Corporation', packages: '9.0 - 14.0 LPA', offers: 42, category: 'Product Engineering' }
      ],
      5: [
        { company: 'Oxford University Press', packages: '7.5 - 10.5 LPA', offers: 28, category: 'Academic Publishing & Editorial' },
        { company: 'Times Internet Digital Media', packages: '8.0 - 11.5 LPA', offers: 36, category: 'Digital Journalism & Content' },
        { company: 'BBC World Service India', packages: '9.5 - 13.0 LPA', offers: 16, category: 'Broadcasting & Research' },
        { company: 'Teach For India / Azim Premji Org', packages: '6.5 - 9.0 LPA', offers: 44, category: 'Public Policy & Outreach' },
        { company: 'Edelman Communications', packages: '8.5 - 12.0 LPA', offers: 24, category: 'Public Relations & Strategic Comm' },
        { company: 'Amnesty International India', packages: '7.0 - 9.5 LPA', offers: 18, category: 'Development & Social Advocacy' }
      ],
      6: [
        { company: 'Tata Elxsi Design Studio', packages: '12.0 - 18.5 LPA', offers: 38, category: 'Industrial & UX Design' },
        { company: 'Adobe Systems Design Lab', packages: '22.0 - 32.0 LPA', offers: 14, category: 'Creative Technologies' },
        { company: 'Ogilvy & Mather Global', packages: '9.5 - 14.0 LPA', offers: 42, category: 'Brand Architecture & Visual Comm' },
        { company: 'IKEA Design & Retail India', packages: '10.5 - 15.0 LPA', offers: 26, category: 'Spatial & Product Styling' },
        { company: 'UX Mint Digital Labs', packages: '8.5 - 12.5 LPA', offers: 54, category: 'Interaction & Mobile UI/UX' },
        { company: 'DDB Mudra Group', packages: '8.0 - 11.5 LPA', offers: 32, category: 'Advertising & Creative Direction' },
        { company: 'Cognizant Interactive Studio', packages: '9.0 - 13.0 LPA', offers: 46, category: 'Human-Centered Experience Design' }
      ],
      7: [
        { company: 'KPMG Advisory Kochi', packages: '8.0 - 12.0 LPA', offers: 48, category: 'Risk & Strategy' },
        { company: 'Federal Bank Officers Cadre', packages: '10.5 - 14.0 LPA', offers: 56, category: 'Commercial Banking' },
        { company: 'Ernst & Young GDS Kochi', packages: '8.5 - 12.5 LPA', offers: 72, category: 'Operations Consulting' },
        { company: 'Muthoot Finance Corporate', packages: '7.5 - 10.5 LPA', offers: 64, category: 'Financial Services' },
        { company: 'Lulu Group International', packages: '9.0 - 13.5 LPA', offers: 44, category: 'Retail Operations & Supply Chain' },
        { company: 'Asian Paints Marketing', packages: '11.0 - 15.0 LPA', offers: 22, category: 'Brand Territory Management' }
      ],
      8: [
        { company: 'Deloitte USI Kochi Hub', packages: '8.0 - 11.5 LPA', offers: 68, category: 'Audit & Financial Assurance' },
        { company: 'PwC Acceleration Centre', packages: '7.8 - 11.0 LPA', offers: 62, category: 'Corporate Tax Services' },
        { company: 'South Indian Bank', packages: '8.5 - 11.0 LPA', offers: 45, category: 'Probationary Banking' },
        { company: 'BDO India', packages: '7.0 - 9.8 LPA', offers: 38, category: 'Corporate Accounting' },
        { company: 'Geojit Financial Services', packages: '6.5 - 9.2 LPA', offers: 52, category: 'Wealth & Equity Advisory' }
      ],
      9: [
        { company: 'Cochin Shipyard Engineering', packages: '10.0 - 14.5 LPA', offers: 34, category: 'Marine & Structural Design' },
        { company: 'Tata Consultancy Services', packages: '7.0 - 10.5 LPA', offers: 110, category: 'Engineering Systems' },
        { company: 'Larsen & Toubro (L&T)', packages: '8.5 - 12.5 LPA', offers: 42, category: 'Smart Infrastructure' },
        { company: 'Quest Global', packages: '8.0 - 11.5 LPA', offers: 56, category: 'Aero & Industrial Eng.' },
        { company: 'Infosys BPM & Tech', packages: '6.5 - 9.0 LPA', offers: 94, category: 'Enterprise Technology' }
      ],
      10: [
        { company: 'Biocon Biologics', packages: '8.5 - 12.5 LPA', offers: 36, category: 'Bio-Pharmaceutical R&D' },
        { company: 'Syngene International', packages: '8.0 - 11.8 LPA', offers: 32, category: 'Analytical Chemistry' },
        { company: 'Dr. Reddy’s Laboratories', packages: '7.5 - 11.0 LPA', offers: 28, category: 'Quality Assurance & Testing' },
        { company: 'Serum Institute of India', packages: '9.0 - 13.0 LPA', offers: 18, category: 'Immunological Formulation' },
        { company: 'CSIR Laboratories Research Fellow', packages: '6.0 - 8.5 LPA', offers: 24, category: 'National Scientific Fellowships' },
        { company: 'Eurofins Scientific', packages: '7.0 - 10.0 LPA', offers: 40, category: 'Environmental & Food Diagnostics' }
      ]
    };

    return {
      college: col,
      departments: depts,
      deptAttendance: deptAttendance,
      deptStudents: deptStudents,
      deptFacultyResearch: deptFacultyResearch,
      students: data.students,
      faculty: data.faculty,
      finance: {
        ...data.finance,
        outstanding: feeOutstanding,
        collectionPct: collectionPct,
        breakdown: [
          { item: 'Tuition Fee (Core Academic)', demand: feeDemand * 0.70, collected: feeCollected * 0.72, outstanding: (feeDemand * 0.70) - (feeCollected * 0.72) },
          { item: 'Examination & Evaluation Fee', demand: feeDemand * 0.12, collected: feeCollected * 0.12, outstanding: (feeDemand * 0.12) - (feeCollected * 0.12) },
          { item: 'Hostel & Residential Rent', demand: feeDemand * 0.10, collected: feeCollected * 0.09, outstanding: (feeDemand * 0.10) - (feeCollected * 0.09) },
          { item: 'Transport & Facilities Service', demand: feeDemand * 0.05, collected: feeCollected * 0.045, outstanding: (feeDemand * 0.05) - (feeCollected * 0.045) },
          { item: 'Specialized Lab & Software Fee', demand: feeDemand * 0.03, collected: feeCollected * 0.025, outstanding: (feeDemand * 0.03) - (feeCollected * 0.025) }
        ]
      },
      academic: data.academic,
      research: data.research,
      attendance: data.attendance,
      placement: {
        ...data.placement,
        rate: placementPct,
        placementPct: placementPct,
        topRecruiters: collegeRecruiters[col.id] || collegeRecruiters[1]
      }
    };
  }

  function aggregateData(colleges) {
    const ids = colleges.map(c => c.id);
    let sTot = 0, sPrev = 0, fTot = 0, fPrev = 0;
    let dTot = 0, cTot = 0, finPrev = 0;
    let appTot = 0, pasTot = 0, failTot = 0, arrTot = 0, arr1Tot = 0, arr2Tot = 0, arrMoreTot = 0;
    let uPubTot = 0, scopusTot = 0, wosTot = 0, scholarTot = 0, jTot = 0, confTot = 0;
    let patFiled = 0, patGranted = 0, citTot = 0, pubPrev = 0;
    let eligTot = 0, plcTot = 0, offTot = 0, dreamTot = 0, highMax = 0;
    let attWeightedSum = 0, below75Tot = 0;

    const collegeAcademic = [];
    const collegeFinance = [];
    const collegeResearch = [];
    const collegeStudents = [];
    const collegeFaculty = [];
    const collegeAttendance = [];
    const collegePlacement = [];

    ids.forEach(id => {
      const d = INSTITUTIONAL_DATA[id];
      const col = COLLEGES.find(c => c.id === id);
      if (!d) return;

      sTot += d.students.total;
      sPrev += d.students.prev;
      collegeStudents.push({ ...col, ...d.students });

      fTot += d.faculty.total;
      fPrev += d.faculty.prev;
      collegeFaculty.push({ ...col, ...d.faculty });

      dTot += d.finance.demand;
      cTot += d.finance.collected;
      finPrev += d.finance.prev;
      const fOut = d.finance.demand - d.finance.collected;
      const fPct = Number(((d.finance.collected / d.finance.demand) * 100).toFixed(2));
      collegeFinance.push({ ...col, ...d.finance, outstanding: fOut, collectionPct: fPct });

      appTot += d.academic.appeared;
      pasTot += d.academic.passed;
      failTot += d.academic.failed;
      arrTot += d.academic.arrears;
      arr1Tot += (d.academic.arrears1 || 0);
      arr2Tot += (d.academic.arrears2 || 0);
      arrMoreTot += (d.academic.arrearsMore || 0);
      collegeAcademic.push({ ...col, ...d.academic });

      uPubTot += d.research.unique;
      scopusTot += d.research.scopus;
      wosTot += d.research.wos;
      scholarTot += d.research.scholar;
      jTot += d.research.journals;
      confTot += d.research.conf;
      patFiled += d.research.filed;
      patGranted += d.research.granted;
      citTot += d.research.citations;
      pubPrev += d.research.prev;
      collegeResearch.push({ ...col, ...d.research });

      attWeightedSum += (d.attendance.pct * d.students.total);
      below75Tot += d.attendance.below75;
      collegeAttendance.push({ ...col, ...d.attendance });

      eligTot += d.placement.eligible;
      plcTot += d.placement.placed;
      offTot += d.placement.offers;
      dreamTot += d.placement.dream;
      if (d.placement.high > highMax) highMax = d.placement.high;
      collegePlacement.push({ ...col, ...d.placement, pct: Number(((d.placement.placed / d.placement.eligible) * 100).toFixed(2)) });
    });

    const overallPassPct = appTot > 0 ? Number(((pasTot / appTot) * 100).toFixed(2)) : 0;
    const overallCollectionPct = dTot > 0 ? Number(((cTot / dTot) * 100).toFixed(2)) : 0;
    const overallPlacementPct = eligTot > 0 ? Number(((plcTot / eligTot) * 100).toFixed(2)) : 0;
    const overallAttPct = sTot > 0 ? Number((attWeightedSum / sTot).toFixed(2)) : 85.92;

    // Previous baseline rates for percentage-point comparisons
    const prevOverallPassPct = Number((overallPassPct - 1.83).toFixed(2));
    const prevOverallCollectionPct = Number((overallCollectionPct - 2.14).toFixed(2));
    const prevOverallPlacementPct = Number((overallPlacementPct - 2.43).toFixed(2));
    const prevOverallAttPct = Number((overallAttPct - 1.14).toFixed(2));

    // Absolute growth and percentage growth for volumes
    const sAbsDiff = sTot - sPrev;
    const sGrowthPct = sPrev > 0 ? Number(((sAbsDiff / sPrev) * 100).toFixed(2)) : 6.15;

    const fAbsDiff = fTot - fPrev;
    const fGrowthPct = fPrev > 0 ? Number(((fAbsDiff / fPrev) * 100).toFixed(2)) : 5.45;

    const dAbsDiff = dTot - Math.round(dTot * 0.9213);
    const dGrowthPct = 8.55;

    const finAbsDiff = cTot - finPrev;
    const finGrowthPct = finPrev > 0 ? Number(((finAbsDiff / finPrev) * 100).toFixed(2)) : 9.86;

    const resAbsDiff = uPubTot - pubPrev;
    const resGrowthPct = pubPrev > 0 ? Number(((resAbsDiff / pubPrev) * 100).toFixed(2)) : 14.32;

    // Percentage-point (pp) differences for rates
    const passPpDiff = 1.83;
    const collectionPpDiff = 2.14;
    const placementPpDiff = 2.43;
    const attendancePpDiff = 1.14;

    return {
      kpis: {
        student_strength: {
          current: sTot,
          previous: sPrev,
          abs_diff: sAbsDiff,
          change_pct: sGrowthPct,
          is_rate: false,
          unit: 'Students',
          trend: sGrowthPct >= 0 ? 'up' : 'down',
          label: `+${sAbsDiff.toLocaleString('en-IN')} (+${sGrowthPct}% YoY)`,
          badge: 'Total Enrolled'
        },
        faculty_strength: {
          current: fTot,
          previous: fPrev,
          abs_diff: fAbsDiff,
          change_pct: fGrowthPct,
          is_rate: false,
          unit: 'Faculty',
          trend: fGrowthPct >= 0 ? 'up' : 'down',
          label: `+${fAbsDiff.toLocaleString('en-IN')} (+${fGrowthPct}% YoY)`,
          badge: 'Active Faculty'
        },
        fee_demand: {
          current: dTot,
          formatted: formatCr(dTot),
          previous: Math.round(dTot * 0.9213),
          abs_diff: dAbsDiff,
          change_pct: dGrowthPct,
          is_rate: false,
          unit: 'INR',
          trend: 'up',
          label: `+${formatCr(dAbsDiff)} (+${dGrowthPct}% YoY)`,
          badge: 'Gross Demand'
        },
        fee_collection: {
          current: cTot,
          formatted: formatCr(cTot),
          collection_pct: overallCollectionPct,
          previous: finPrev,
          prev_pct: prevOverallCollectionPct,
          abs_diff: finAbsDiff,
          change_pct: finGrowthPct,
          pp_diff: collectionPpDiff,
          is_rate: true,
          trend: 'up',
          label: `+${collectionPpDiff} pp (${overallCollectionPct}% Realized)`,
          badge: 'Realized Amount'
        },
        pass_percentage: {
          current: overallPassPct,
          previous: prevOverallPassPct,
          pp_diff: passPpDiff,
          is_rate: true,
          trend: 'up',
          label: `+${passPpDiff} pp vs Prev Sem`,
          badge: `${pasTot.toLocaleString('en-IN')} Passed / ${appTot.toLocaleString('en-IN')} Appeared`
        },
        research_publications: {
          current: uPubTot,
          previous: pubPrev,
          abs_diff: resAbsDiff,
          change_pct: resGrowthPct,
          is_rate: false,
          unit: 'Papers',
          trend: 'up',
          label: `+${resAbsDiff.toLocaleString('en-IN')} (+${resGrowthPct}% YoY)`,
          badge: `${scopusTot} Scopus Indexed`
        },
        placement_percentage: {
          current: overallPlacementPct,
          previous: prevOverallPlacementPct,
          pp_diff: placementPpDiff,
          is_rate: true,
          trend: 'up',
          label: `+${placementPpDiff} pp vs Last Batch`,
          badge: `${plcTot.toLocaleString('en-IN')} Placed / ${eligTot.toLocaleString('en-IN')} Eligible`
        },
        attendance_percentage: {
          current: overallAttPct,
          previous: prevOverallAttPct,
          pp_diff: attendancePpDiff,
          is_rate: true,
          trend: 'up',
          label: `+${attendancePpDiff} pp vs Prev Term`,
          badge: `${below75Tot.toLocaleString('en-IN')} Below 75% Risk`
        }
      },
      academic: {
        colleges: collegeAcademic.sort((a, b) => b.passPct - a.passPct),
        ugVsPg: {
          ug: { appeared: Math.round(appTot * 0.81), passed: Math.round(pasTot * 0.80), passPct: 89.44 },
          pg: { appeared: Math.round(appTot * 0.19), passed: Math.round(pasTot * 0.20), passPct: 92.66 }
        }
      },
      finance: {
        demandTotal: dTot,
        collectedTotal: cTot,
        outstandingTotal: dTot - cTot,
        collectionPct: overallCollectionPct,
        formattedDemand: formatCr(dTot),
        formattedCollected: formatCr(cTot),
        formattedOutstanding: formatCr(dTot - cTot),
        colleges: collegeFinance.sort((a, b) => b.collectionPct - a.collectionPct),
        monthly: {
          months: ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027'],
          blr: [92000000, 129000000, 357000000, 421000000, 197000000, 98000000, 82000000, 90000000, 162000000, 71000000, 41000000, 29000000],
          kochi: [89800000, 137800000, 368200000, 443500000, 204500000, 105300000, 88100000, 96700000, 158600000, 70200000, 32300000, 21000000]
        },
        paymentModes: [
          { mode: 'UPI', amount: cTot * 0.30, share: 30.0 },
          { mode: 'Net Banking', amount: cTot * 0.28, share: 28.0 },
          { mode: 'Credit/Debit Card', amount: cTot * 0.25, share: 25.0 },
          { mode: 'Bank Transfer (NEFT/RTGS)', amount: cTot * 0.14, share: 14.0 },
          { mode: 'Cash/Challan', amount: cTot * 0.03, share: 3.0 }
        ]
      },
      research: {
        totals: {
          unique: uPubTot, scopus: scopusTot, wos: wosTot, scholar: scholarTot,
          journals: jTot, conf: confTot, filed: patFiled, granted: patGranted,
          citations: citTot, avgCitations: uPubTot > 0 ? Number((citTot / uPubTot).toFixed(2)) : 0
        },
        colleges: collegeResearch.sort((a, b) => b.unique - a.unique)
      },
      students: {
        colleges: collegeStudents.sort((a, b) => b.total - a.total),
        totals: { total: sTot, ug: Math.round(sTot * 0.81), pg: Math.round(sTot * 0.17), phd: Math.round(sTot * 0.02) }
      },
      faculty: {
        colleges: collegeFaculty.sort((a, b) => b.total - a.total),
        totals: { total: fTot, prof: Math.round(fTot * 0.17), assoc: Math.round(fTot * 0.29), asst: Math.round(fTot * 0.54) }
      },
      attendance: {
        colleges: collegeAttendance.sort((a, b) => b.pct - a.pct),
        overallPct: overallAttPct,
        prevOverallPct: prevOverallAttPct,
        ppDiff: attendancePpDiff,
        totalEnrolled: sTot,
        above85Tot: collegeAttendance.reduce((acc, c) => acc + (c.above85 || 0), 0),
        midTot: collegeAttendance.reduce((acc, c) => acc + (c.mid || 0), 0),
        below75Tot: below75Tot,
        condTot: collegeAttendance.reduce((acc, c) => acc + (c.cond || 0), 0),
        detTot: collegeAttendance.reduce((acc, c) => acc + (c.det || 0), 0),
        monthlyTrend: {
          months: ['July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026 (Curr)'],
          blr: [87.40, 86.60, 85.90, 86.20, Number(((collegeAttendance.filter(c => c.campus === 'BLR').reduce((acc, c) => acc + (c.pct * c.total), 0)) / (collegeAttendance.filter(c => c.campus === 'BLR').reduce((acc, c) => acc + c.total, 0) || 1)).toFixed(2))],
          kochi: [86.80, 85.80, 84.70, 85.10, Number(((collegeAttendance.filter(c => c.campus === 'KOCHI').reduce((acc, c) => acc + (c.pct * c.total), 0)) / (collegeAttendance.filter(c => c.campus === 'KOCHI').reduce((acc, c) => acc + c.total, 0) || 1)).toFixed(2))],
          overall: [87.10, 86.20, 85.30, 85.65, overallAttPct],
          threshold: 75.0
        }
      },
      placement: {
        colleges: collegePlacement.sort((a, b) => b.pct - a.pct),
        highMax: highMax
      },
      insights: generateInsights(collegeAcademic, collegeFinance, collegeResearch, collegePlacement, collegeFaculty)
    };
  }

  function generateInsights(ac, fin, res, plc, fac) {
    const scores = ac.map(a => {
      const f = fin.find(x => x.id === a.id);
      const r = res.find(x => x.id === a.id);
      const p = plc.find(x => x.id === a.id);
      const fc = fac.find(x => x.id === a.id);

      const passP = a.passPct || 88.0;
      const feeP = f ? f.collectionPct : 88.0;
      const plcP = p ? p.pct : 86.0;
      const rpf = r ? r.rpf : 1.0;
      const sfr = fc ? fc.sfr : 17.5;

      const academicScore = passP;
      const placementScore = plcP;
      const financialScore = feeP;
      const researchScore = Math.min(100, Number(((rpf / 1.5) * 100).toFixed(2)));
      const sfrCompliance = sfr <= 20 ? 100 : Math.max(50, 100 - ((sfr - 20) * 5));

      const totalScore = Number((
        (academicScore * 0.25) +
        (placementScore * 0.25) +
        (financialScore * 0.20) +
        (researchScore * 0.15) +
        (sfrCompliance * 0.15)
      ).toFixed(2));

      return {
        id: a.id,
        code: a.code,
        name: a.shortName,
        fullName: a.name,
        campus: a.campus,
        passPct: passP,
        feePct: feeP,
        plcPct: plcP,
        rpf: rpf,
        sfr: sfr,
        academicScore: academicScore,
        placementScore: placementScore,
        financialScore: financialScore,
        researchScore: researchScore,
        sfrCompliance: sfrCompliance,
        score: totalScore,
        tier: totalScore >= 92 ? 'Tier 1 (Exemplary)' : (totalScore >= 88 ? 'Tier 2 (High Autonomous)' : 'Tier 3 (Under Watch)'),
        tierBadgeClass: totalScore >= 92 ? 'bg-success' : (totalScore >= 88 ? 'bg-primary' : 'bg-warning text-dark')
      };
    });

    scores.sort((a, b) => b.score - a.score);
    const top5 = scores.slice(0, 5);
    const bottom5 = [...scores].slice(-5).reverse();

    // Composite Institutional Performance Index (IPI)
    const compositeScore = Number((scores.reduce((acc, s) => acc + s.score, 0) / (scores.length || 1)).toFixed(2));
    const ipiIndex = {
      score: compositeScore,
      grade: compositeScore >= 90 ? 'Grade A++ Autonomous Excellence' : (compositeScore >= 85 ? 'Grade A+ High Performance' : 'Grade A Sub-Benchmark'),
      accreditationTier: 'NAAC Autonomous Criterion & NIRF Institutional Rank Band 1-50 Alignment',
      formulaText: 'IPI = (Pass Rate × 25%) + (Placement Rate × 25%) + (Fee Realization × 20%) + (Research Index × 15%) + (SFR Compliance × 15%)',
      components: [
        { name: 'Academic Pass Rate', weight: '25%', raw: '90.25%', weighted: (90.25 * 0.25).toFixed(2), authority: 'NAAC Criterion II', icon: 'bi-book-half', color: 'text-primary' },
        { name: 'Graduate Placement Rate', weight: '25%', raw: '89.28%', weighted: (89.28 * 0.25).toFixed(2), authority: 'NIRF Outreach & Placement', icon: 'bi-briefcase-fill', color: 'text-purple' },
        { name: 'Annual Fee Realization', weight: '20%', raw: '90.18%', weighted: (90.18 * 0.20).toFixed(2), authority: 'Finance Committee Norm', icon: 'bi-cash-coin', color: 'text-success' },
        { name: 'Research Productivity', weight: '15%', raw: '81.33%', weighted: (81.33 * 0.15).toFixed(2), authority: 'NAAC Criterion III / Scopus', icon: 'bi-journal-richtext', color: 'text-info' },
        { name: 'Faculty SFR Governance', weight: '15%', raw: '100.00%', weighted: (100.0 * 0.15).toFixed(2), authority: 'AICTE / UGC Statutory Cap', icon: 'bi-person-workspace', color: 'text-warning' }
      ],
      allRanked: scores
    };

    // Meaningful Management Alerts with reasons, supporting KPI values, and recommended actions
    const alerts = [];

    // 1. Financial Alerts
    fin.forEach(f => {
      if (f.collectionPct < 88.0 || f.outstanding > 40000000) {
        alerts.push({
          id: f.id,
          code: f.code,
          name: f.shortName,
          campus: f.campus,
          category: 'financial',
          categoryLabel: 'Financial Realization',
          title: `Fee Realization Shortfall Against Semester Target`,
          reason: `Uncollected student balance stands at ${formatCr(f.outstanding)}. Hall-ticket generation window opens in 10 working days.`,
          kpis: [
            { label: 'Realized Rate', value: `${f.collectionPct}%`, isRisk: f.collectionPct < 88 },
            { label: 'Gross Demand', value: formatCr(f.demand), isRisk: false },
            { label: 'Realized', value: formatCr(f.collected), isRisk: false },
            { label: 'Outstanding Due', value: formatCr(f.outstanding), isRisk: true }
          ],
          action: 'Initiate automated SMS/email ledger notifications and activate on-campus fee reconciliation helpdesk.',
          severity: f.collectionPct < 86.0 ? 'critical' : 'high',
          badge: `${f.collectionPct}% Realized`
        });
      }
    });

    // 2. Academic Alerts
    ac.forEach(a => {
      if (a.passPct < 88.0 || (a.failed && a.failed > 200)) {
        alerts.push({
          id: a.id,
          code: a.code,
          name: a.shortName,
          campus: a.campus,
          category: 'academic',
          categoryLabel: 'Academic Performance',
          title: `Examination Pass Rate Deficit & Arrear Concentration`,
          reason: `${a.failed || 215} candidates failed semester examinations; ${a.arrears || 140} hold unresolved backlogs in core curriculum.`,
          kpis: [
            { label: 'Pass Rate', value: `${a.passPct}%`, isRisk: true },
            { label: 'Appeared', value: (a.appeared || 0).toLocaleString(), isRisk: false },
            { label: 'Passed', value: (a.passed || 0).toLocaleString(), isRisk: false },
            { label: 'Backlog Arrears', value: (a.arrears || 0).toLocaleString(), isRisk: true }
          ],
          action: 'Mandate HOD-level academic audit and conduct 30-hour remedial tutorial modules before re-evaluations.',
          severity: a.passPct < 86.0 ? 'critical' : 'warning',
          badge: `${a.passPct}% Pass Rate`
        });
      }
    });

    // 3. Attendance Alerts
    const attData = INSTITUTIONAL_DATA;
    ac.forEach(a => {
      const d = attData[a.id];
      if (d && d.attendance && (d.attendance.pct < 85.0 || d.attendance.below75 > 200)) {
        alerts.push({
          id: a.id,
          code: a.code,
          name: a.shortName,
          campus: a.campus,
          category: 'attendance',
          categoryLabel: 'Classroom Attendance',
          title: `Student Biometric Attendance & Detention Threshold Watch`,
          reason: `${d.attendance.below75} students have fallen below the statutory 75% biometric minimum (${d.attendance.det} at acute detention risk).`,
          kpis: [
            { label: 'Attendance Rate', value: `${d.attendance.pct}%`, isRisk: d.attendance.pct < 85 },
            { label: 'Below 75%', value: `${d.attendance.below75} students`, isRisk: true },
            { label: 'Condonable (65-75%)', value: `${d.attendance.cond}`, isRisk: false },
            { label: 'Acute Detention (<65%)', value: `${d.attendance.det}`, isRisk: true }
          ],
          action: 'Issue parent SMS notices and enforce mandatory biometric check-ins for the remaining 4 weeks of instruction.',
          severity: d.attendance.below75 > 300 ? 'critical' : 'high',
          badge: `${d.attendance.below75} Below 75%`
        });
      }
    });

    // 4. Placement Alerts
    plc.forEach(p => {
      if (p.pct < 85.0) {
        alerts.push({
          id: p.id,
          code: p.code,
          name: p.shortName,
          campus: p.campus,
          category: 'placement',
          categoryLabel: 'Career Outcomes',
          title: `Corporate Placement Conversion Trailing Institutional Target`,
          reason: `Placement rate of ${p.pct}% trails the institutional benchmark of 88.00%; ${p.eligible - p.placed} eligible graduates remain unplaced.`,
          kpis: [
            { label: 'Placed Rate', value: `${p.pct}%`, isRisk: true },
            { label: 'Eligible', value: p.eligible.toLocaleString(), isRisk: false },
            { label: 'Placed', value: p.placed.toLocaleString(), isRisk: false },
            { label: 'Unplaced', value: (p.eligible - p.placed).toLocaleString(), isRisk: true }
          ],
          action: 'Organize dedicated pooled placement drive with 14 empaneled Tier-1 recruiters and schedule mock interviews.',
          severity: p.pct < 80.0 ? 'critical' : 'warning',
          badge: `${p.pct}% Placed`
        });
      }
    });

    // 5. Faculty Alerts
    fac.forEach(fc => {
      if (fc.sfr > 18.0) {
        alerts.push({
          id: fc.id,
          code: fc.code,
          name: fc.shortName,
          campus: fc.campus,
          category: 'faculty',
          categoryLabel: 'Faculty Governance',
          title: `Student-to-Faculty Ratio Approaching Statutory Ceiling`,
          reason: `Cadre ratio of ${fc.sfr}:1 is approaching or exceeding statutory 20:1 upper threshold due to accelerated student intake.`,
          kpis: [
            { label: 'Current SFR', value: `${fc.sfr}:1`, isRisk: fc.sfr > 20 },
            { label: 'Statutory Max', value: '20.00:1', isRisk: false },
            { label: 'Faculty Count', value: `${fc.total}`, isRisk: false },
            { label: 'Students', value: (INSTITUTIONAL_DATA[fc.id].students.total).toLocaleString(), isRisk: false }
          ],
          action: 'Issue urgent recruitment sanction for Assistant Professor appointments to restore target 18:1 ratio.',
          severity: fc.sfr > 20.0 ? 'critical' : 'info',
          badge: `SFR ${fc.sfr}:1`
        });
      }
    });

    const targets = [
      { metric: 'Overall Pass Rate', target: '90.00%', actual: '90.25%', status: 'achieved', authority: 'NAAC Criterion II' },
      { metric: 'Annual Fee Realization', target: '92.00%', actual: '90.18%', status: 'under_review', authority: 'Board of Governors' },
      { metric: 'Graduate Placement Rate', target: '88.00%', actual: '89.28%', status: 'achieved', authority: 'AICTE / NIRF Norms' },
      { metric: 'Classroom Attendance Rate', target: '85.00%', actual: '85.92%', status: 'achieved', authority: 'Academic Regulations' },
      { metric: 'Student to Faculty Ratio', target: '18.00 : 1', actual: '17.20 : 1', status: 'achieved', authority: 'UGC / AICTE' }
    ];

    return { top5, bottom5, allRanked: scores, alerts, targets, ipi: ipiIndex };
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE KPI CLICK-TO-COMPARE DATA ENGINE
  // Covers all 8 KPI cards with Current vs Previous details across all 10 faculties
  // --------------------------------------------------------------------------
  function getKpiComparisonData(kpiKey, campus, selectedIds, academicYear, semester) {
    campus = campus || 'ALL';
    const colleges = getFilteredColleges(campus, selectedIds);
    const agg = aggregateData(colleges);
    const cKpis = agg.kpis;

    const currAY = academicYear || '2026-2027';
    const prevAY = '2025-2026';
    const currSem = semester === 'even' ? 'Even Sem 2026-27' : (semester === 'odd' ? 'Odd Sem 2026-27' : 'Odd Sem 2026-27 (Active)');
    const prevSem = 'Even Sem 2025-26';

    const kpiMeta = {
      student_strength: {
        title: 'Total Student Strength',
        icon: 'bi-mortarboard-fill',
        iconBg: '#eff6ff',
        iconColor: '#2563eb',
        unit: 'Students',
        currPeriod: currAY,
        prevPeriod: prevAY,
        currVal: cKpis.student_strength.current,
        prevVal: cKpis.student_strength.previous,
        absChange: cKpis.student_strength.current - cKpis.student_strength.previous,
        pctChange: cKpis.student_strength.change_pct,
        trend: 'up',
        benchmark: 'Capacity: 24,500 (94.2% Filled)',
        benchmarkStatus: 'Optimal Enrollment',
        overviewCards: [
          { label: 'Current Enrolled', val: cKpis.student_strength.current.toLocaleString(), sub: 'AY 2026-2027', color: 'text-primary' },
          { label: 'Previous Enrolled', val: cKpis.student_strength.previous.toLocaleString(), sub: 'AY 2025-2026', color: 'text-muted' },
          { label: 'Absolute Growth', val: '+' + (cKpis.student_strength.current - cKpis.student_strength.previous).toLocaleString(), sub: '+' + cKpis.student_strength.change_pct + '% YoY', color: 'text-success' },
          { label: 'UG Strength', val: Math.round(cKpis.student_strength.current * 0.81).toLocaleString(), sub: '81% of Total', color: 'text-dark' },
          { label: 'PG & Doctoral', val: (Math.round(cKpis.student_strength.current * 0.17) + Math.round(cKpis.student_strength.current * 0.02)).toLocaleString(), sub: '19% Research & Masters', color: 'text-purple' }
        ],
        overviewChart: {
          categories: ['Undergraduate (UG)', 'Postgraduate (PG)', 'Doctoral (Ph.D)', 'Admissions Intake', 'Total Capacity'],
          prev: [
            Math.round(cKpis.student_strength.previous * 0.81),
            Math.round(cKpis.student_strength.previous * 0.17),
            Math.round(cKpis.student_strength.previous * 0.02),
            Math.round(cKpis.student_strength.previous * 0.32),
            23200
          ],
          curr: [
            Math.round(cKpis.student_strength.current * 0.81),
            Math.round(cKpis.student_strength.current * 0.17),
            Math.round(cKpis.student_strength.current * 0.02),
            Math.round(cKpis.student_strength.current * 0.33),
            24500
          ],
          prevName: prevAY,
          currName: currAY,
          unit: 'Students'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].students;
          const diff = d.total - d.prev;
          const pct = Number(((diff / d.prev) * 100).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: d.prev,
            curr: d.total,
            diff: diff,
            pct: pct,
            ug: d.ug,
            pg: d.pg,
            phd: d.phd,
            capacity: d.cap,
            status: pct >= 5 ? 'High Growth' : (pct >= 0 ? 'Steady' : 'Decline'),
            statusClass: pct >= 5 ? 'bg-success' : (pct >= 0 ? 'bg-primary' : 'bg-danger')
          };
        }),
        trend: {
          labels: ['AY 2022-23', 'AY 2023-24', 'AY 2024-25', 'AY 2025-26 (Prev)', 'AY 2026-27 (Curr)'],
          series: [18450, 19820, 20910, cKpis.student_strength.previous, cKpis.student_strength.current],
          unit: 'Enrolled Students'
        }
      },

      faculty_strength: {
        title: 'Total Faculty Strength & Cadre Ratio',
        icon: 'bi-person-workspace',
        iconBg: '#f5f3ff',
        iconColor: '#8b5cf6',
        unit: 'Faculty Members',
        currPeriod: currAY,
        prevPeriod: prevAY,
        currVal: cKpis.faculty_strength.current,
        prevVal: cKpis.faculty_strength.previous,
        absChange: cKpis.faculty_strength.current - cKpis.faculty_strength.previous,
        pctChange: cKpis.faculty_strength.change_pct,
        trend: 'up',
        benchmark: 'SFR Norm: 20:1 (Actual: 17.3:1)',
        benchmarkStatus: 'AICTE & UGC Compliant',
        overviewCards: [
          { label: 'Current Faculty', val: cKpis.faculty_strength.current.toLocaleString(), sub: 'AY 2026-2027', color: 'text-purple' },
          { label: 'Previous Faculty', val: cKpis.faculty_strength.previous.toLocaleString(), sub: 'AY 2025-2026', color: 'text-muted' },
          { label: 'Faculty Net Added', val: '+' + (cKpis.faculty_strength.current - cKpis.faculty_strength.previous), sub: '+' + cKpis.faculty_strength.change_pct + '% Growth', color: 'text-success' },
          { label: 'Ph.D Holders', val: Math.round(cKpis.faculty_strength.current * 0.686).toLocaleString(), sub: '68.6% Doctoral Qualified', color: 'text-primary' },
          { label: 'Student-to-Faculty', val: (cKpis.student_strength.current / cKpis.faculty_strength.current).toFixed(2) + ' : 1', sub: 'Target <= 20:1', color: 'text-success' }
        ],
        overviewChart: {
          categories: ['Professors', 'Associate Professors', 'Assistant Professors', 'Ph.D Holders', 'Research Active'],
          prev: [
            Math.round(cKpis.faculty_strength.previous * 0.17),
            Math.round(cKpis.faculty_strength.previous * 0.29),
            Math.round(cKpis.faculty_strength.previous * 0.54),
            Math.round(cKpis.faculty_strength.previous * 0.65),
            Math.round(cKpis.faculty_strength.previous * 0.60)
          ],
          curr: [
            Math.round(cKpis.faculty_strength.current * 0.17),
            Math.round(cKpis.faculty_strength.current * 0.29),
            Math.round(cKpis.faculty_strength.current * 0.54),
            Math.round(cKpis.faculty_strength.current * 0.686),
            Math.round(cKpis.faculty_strength.current * 0.65)
          ],
          prevName: prevAY,
          currName: currAY,
          unit: 'Faculty'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].faculty;
          const s = INSTITUTIONAL_DATA[c.id].students;
          const diff = d.total - d.prev;
          const pct = Number(((diff / d.prev) * 100).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: d.prev,
            curr: d.total,
            diff: diff,
            pct: pct,
            prof: d.prof,
            assoc: d.assoc,
            asst: d.asst,
            phd: d.phd,
            sfr: d.sfr,
            status: d.sfr <= 18 ? 'Excellent SFR' : (d.sfr <= 20 ? 'Norm Met' : 'Review SFR'),
            statusClass: d.sfr <= 18 ? 'bg-success' : (d.sfr <= 20 ? 'bg-primary' : 'bg-warning text-dark')
          };
        }),
        trend: {
          labels: ['AY 2022-23', 'AY 2023-24', 'AY 2024-25', 'AY 2025-26 (Prev)', 'AY 2026-27 (Curr)'],
          series: [1085, 1150, 1210, cKpis.faculty_strength.previous, cKpis.faculty_strength.current],
          unit: 'Faculty Members'
        }
      },

      fee_demand: {
        title: 'Total Fee Demand & Budget Projections',
        icon: 'bi-receipt-cutoff',
        iconBg: '#fffbeb',
        iconColor: '#d97706',
        unit: '₹ Cr',
        currPeriod: currAY + ' (Approved Budget)',
        prevPeriod: prevAY + ' (Audited Budget)',
        currVal: cKpis.fee_demand.current,
        prevVal: cKpis.fee_demand.previous,
        absChange: cKpis.fee_demand.current - cKpis.fee_demand.previous,
        pctChange: cKpis.fee_demand.change_pct,
        trend: 'up',
        benchmark: 'Projected Budget Realization: 95.0%',
        benchmarkStatus: 'Approved by Finance Committee',
        overviewCards: [
          { label: 'Current Demand', val: formatCr(cKpis.fee_demand.current), sub: 'Approved AY 2026-27', color: 'text-warning' },
          { label: 'Previous Demand', val: formatCr(cKpis.fee_demand.previous), sub: 'Audited AY 2025-26', color: 'text-muted' },
          { label: 'Demand Expansion', val: '+' + formatCr(cKpis.fee_demand.current - cKpis.fee_demand.previous), sub: '+' + cKpis.fee_demand.change_pct + '% YoY Growth', color: 'text-success' },
          { label: 'Tuition Fee Share', val: formatCr(cKpis.fee_demand.current * 0.70), sub: '70% Primary Tuition', color: 'text-dark' },
          { label: 'Auxiliary & Lab Fees', val: formatCr(cKpis.fee_demand.current * 0.30), sub: 'Hostel, Exam & Transport', color: 'text-primary' }
        ],
        overviewChart: {
          categories: ['Tuition Fee', 'Exam Fee', 'Hostel/Residence', 'Transport', 'Labs & Software'],
          prev: [
            Math.round(cKpis.fee_demand.previous * 0.70 / 10000000),
            Math.round(cKpis.fee_demand.previous * 0.12 / 10000000),
            Math.round(cKpis.fee_demand.previous * 0.10 / 10000000),
            Math.round(cKpis.fee_demand.previous * 0.05 / 10000000),
            Math.round(cKpis.fee_demand.previous * 0.03 / 10000000)
          ],
          curr: [
            Math.round(cKpis.fee_demand.current * 0.70 / 10000000),
            Math.round(cKpis.fee_demand.current * 0.12 / 10000000),
            Math.round(cKpis.fee_demand.current * 0.10 / 10000000),
            Math.round(cKpis.fee_demand.current * 0.05 / 10000000),
            Math.round(cKpis.fee_demand.current * 0.03 / 10000000)
          ],
          prevName: prevAY + ' (₹ Cr)',
          currName: currAY + ' (₹ Cr)',
          unit: '₹ Crores'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].finance;
          const prevDemand = d.demand * 0.92;
          const diff = d.demand - prevDemand;
          const pct = Number(((diff / prevDemand) * 100).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: prevDemand,
            curr: d.demand,
            diff: diff,
            pct: pct,
            prevFormatted: formatCr(prevDemand),
            currFormatted: formatCr(d.demand),
            diffFormatted: '+' + formatCr(diff),
            status: pct >= 8 ? 'Strong Expansion' : 'Moderate',
            statusClass: pct >= 8 ? 'bg-success' : 'bg-primary'
          };
        }),
        trend: {
          labels: ['AY 2022-23', 'AY 2023-24', 'AY 2024-25', 'AY 2025-26 (Prev)', 'AY 2026-27 (Curr)'],
          series: [
            Number((cKpis.fee_demand.current * 0.72 / 10000000).toFixed(2)),
            Number((cKpis.fee_demand.current * 0.79 / 10000000).toFixed(2)),
            Number((cKpis.fee_demand.current * 0.85 / 10000000).toFixed(2)),
            Number((cKpis.fee_demand.previous / 10000000).toFixed(2)),
            Number((cKpis.fee_demand.current / 10000000).toFixed(2))
          ],
          unit: '₹ Crores'
        }
      },

      fee_collection: {
        title: 'Total Fee Collection & Realization Ledger',
        icon: 'bi-cash-coin',
        iconBg: '#ecfdf5',
        iconColor: '#10b981',
        unit: '₹ Cr',
        currPeriod: currAY,
        prevPeriod: prevAY,
        currVal: cKpis.fee_collection.current,
        prevVal: cKpis.fee_collection.previous,
        absChange: cKpis.fee_collection.current - cKpis.fee_collection.previous,
        pctChange: cKpis.fee_collection.change_pct,
        trend: 'up',
        benchmark: 'Target Realization: 92.00% (Actual: ' + cKpis.fee_collection.collection_pct + '%)',
        benchmarkStatus: cKpis.fee_collection.collection_pct >= 90 ? 'Healthy Performance' : 'Intervention Needed',
        overviewCards: [
          { label: 'Realized Collection', val: formatCr(cKpis.fee_collection.current), sub: cKpis.fee_collection.collection_pct + '% Realization Rate', color: 'text-success' },
          { label: 'Previous Collection', val: formatCr(cKpis.fee_collection.previous), sub: 'AY 2025-2026 Actual', color: 'text-muted' },
          { label: 'Collection Growth', val: '+' + formatCr(cKpis.fee_collection.current - cKpis.fee_collection.previous), sub: '+' + cKpis.fee_collection.change_pct + '% YoY Growth', color: 'text-success' },
          { label: 'Outstanding Balance', val: formatCr(agg.finance.outstandingTotal), sub: (100 - cKpis.fee_collection.collection_pct).toFixed(2) + '% of Gross Demand', color: 'text-danger' },
          { label: 'Digital Payment Mode', val: '83.0%', sub: 'UPI, Net Banking & Card', color: 'text-primary' }
        ],
        overviewChart: {
          categories: ['Gross Demand', 'Realized Collection', 'Outstanding Due', 'Tuition Realized', 'Hostel/Aux Realized'],
          prev: [
            Math.round(cKpis.fee_demand.previous / 10000000),
            Math.round(cKpis.fee_collection.previous / 10000000),
            Math.round((cKpis.fee_demand.previous - cKpis.fee_collection.previous) / 10000000),
            Math.round((cKpis.fee_collection.previous * 0.72) / 10000000),
            Math.round((cKpis.fee_collection.previous * 0.28) / 10000000)
          ],
          curr: [
            Math.round(cKpis.fee_demand.current / 10000000),
            Math.round(cKpis.fee_collection.current / 10000000),
            Math.round(agg.finance.outstandingTotal / 10000000),
            Math.round((cKpis.fee_collection.current * 0.72) / 10000000),
            Math.round((cKpis.fee_collection.current * 0.28) / 10000000)
          ],
          prevName: prevAY + ' (₹ Cr)',
          currName: currAY + ' (₹ Cr)',
          unit: '₹ Crores'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].finance;
          const prev = d.prev;
          const curr = d.collected;
          const diff = curr - prev;
          const pct = Number(((diff / prev) * 100).toFixed(2));
          const out = d.demand - d.collected;
          const cPct = Number(((curr / d.demand) * 100).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: prev,
            curr: curr,
            diff: diff,
            pct: pct,
            prevFormatted: formatCr(prev),
            currFormatted: formatCr(curr),
            diffFormatted: '+' + formatCr(diff),
            outstandingFormatted: formatCr(out),
            collectionPct: cPct,
            status: cPct >= 92 ? 'Excellent' : (cPct >= 88 ? 'Satisfactory' : 'Action Due'),
            statusClass: cPct >= 92 ? 'bg-success' : (cPct >= 88 ? 'bg-primary' : 'bg-warning text-dark')
          };
        }),
        trend: {
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
          series: [181.8, 266.8, 725.2, 864.5, 401.5, 203.3, 170.1, 186.7, 320.6, 141.2, 73.3, 50.0],
          unit: '₹ Crores Collected'
        }
      },

      pass_percentage: {
        title: 'Overall Pass Percentage & Examination Outcomes',
        icon: 'bi-award-fill',
        iconBg: '#f0fdf4',
        iconColor: '#16a34a',
        unit: '%',
        currPeriod: currSem,
        prevPeriod: prevSem,
        currVal: cKpis.pass_percentage.current,
        prevVal: cKpis.pass_percentage.previous,
        absChange: Number((cKpis.pass_percentage.current - cKpis.pass_percentage.previous).toFixed(2)),
        pctChange: cKpis.pass_percentage.pp_diff !== undefined ? cKpis.pass_percentage.pp_diff : Number((cKpis.pass_percentage.current - cKpis.pass_percentage.previous).toFixed(2)),
        trend: 'up',
        benchmark: 'NAAC Benchmark: 90.00% (Achieved: ' + cKpis.pass_percentage.current + '%)',
        benchmarkStatus: 'NAAC Criterion II Benchmark Met',
        overviewCards: [
          { label: 'Current Pass Rate', val: cKpis.pass_percentage.current + '%', sub: currSem, color: 'text-success' },
          { label: 'Previous Pass Rate', val: cKpis.pass_percentage.previous + '%', sub: prevSem, color: 'text-muted' },
          { label: 'Pass Rate Gain', val: '+' + (cKpis.pass_percentage.current - cKpis.pass_percentage.previous).toFixed(2) + '%', sub: 'Term-on-Term Progress', color: 'text-success' },
          { label: 'Students Appeared', val: agg.academic.colleges.reduce((acc, c) => acc + c.appeared, 0).toLocaleString(), sub: 'Across All Exams', color: 'text-dark' },
          { label: 'Arrear Reductions', val: '-16.4%', sub: 'Arrears cleared this term', color: 'text-primary' }
        ],
        overviewChart: {
          categories: ['Appeared', 'Passed (1st Attempt)', 'Distinction (>75%)', 'First Class (60-74%)', 'Arrear Backlogs'],
          prev: [
            Math.round(agg.academic.colleges.reduce((acc, c) => acc + c.appeared, 0) * 0.95),
            Math.round(agg.academic.colleges.reduce((acc, c) => acc + c.passed, 0) * 0.93),
            2540,
            8120,
            2140
          ],
          curr: [
            agg.academic.colleges.reduce((acc, c) => acc + c.appeared, 0),
            agg.academic.colleges.reduce((acc, c) => acc + c.passed, 0),
            2780,
            8760,
            agg.academic.colleges.reduce((acc, c) => acc + c.arrears, 0)
          ],
          prevName: prevSem,
          currName: currSem,
          unit: 'Students'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].academic;
          const diff = Number((d.passPct - d.prevPassPct).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: d.prevPassPct,
            curr: d.passPct,
            diff: diff,
            pct: diff,
            appeared: d.appeared,
            passed: d.passed,
            failed: d.failed,
            arrears: d.arrears,
            status: d.passPct >= 92 ? 'Distinction' : (d.passPct >= 88 ? 'Commendable' : 'Focus Area'),
            statusClass: d.passPct >= 92 ? 'bg-success' : (d.passPct >= 88 ? 'bg-primary' : 'bg-warning text-dark')
          };
        }),
        trend: {
          labels: ['Odd Sem 2024', 'Even Sem 2024', 'Odd Sem 2025', 'Even Sem 2025', 'Odd Sem 2026 (Curr)'],
          series: [86.50, 87.20, 88.10, 88.42, cKpis.pass_percentage.current],
          unit: 'Pass Percentage %'
        }
      },

      research_publications: {
        title: 'Research Publications & Intellectual Property',
        icon: 'bi-journal-richtext',
        iconBg: '#eff6ff',
        iconColor: '#3b82f6',
        unit: 'Publications',
        currPeriod: currAY,
        prevPeriod: prevAY,
        currVal: cKpis.research_publications.current,
        prevVal: cKpis.research_publications.previous,
        absChange: cKpis.research_publications.current - cKpis.research_publications.previous,
        pctChange: cKpis.research_publications.change_pct,
        trend: 'up',
        benchmark: 'NIRF Target: 1.20 RPF (Actual: 1.22 RPF)',
        benchmarkStatus: 'NIRF Criterion Research Target Met',
        overviewCards: [
          { label: 'Current Unique Papers', val: cKpis.research_publications.current.toLocaleString(), sub: 'AY 2026-2027', color: 'text-primary' },
          { label: 'Previous Unique Papers', val: cKpis.research_publications.previous.toLocaleString(), sub: 'AY 2025-2026', color: 'text-muted' },
          { label: 'Publication Growth', val: '+' + (cKpis.research_publications.current - cKpis.research_publications.previous), sub: '+' + cKpis.research_publications.change_pct + '% YoY Growth', color: 'text-success' },
          { label: 'Scopus Indexed', val: agg.research.totals.scopus.toLocaleString(), sub: '70.8% of Research', color: 'text-purple' },
          { label: 'Patents Portfolio', val: agg.research.totals.filed + ' / ' + agg.research.totals.granted, sub: 'Filed / Granted', color: 'text-warning' }
        ],
        overviewChart: {
          categories: ['Scopus Indexed', 'Web of Science (WoS)', 'Google Scholar', 'Peer Journals', 'Conferences'],
          prev: [
            Math.round(agg.research.totals.scopus * 0.88),
            Math.round(agg.research.totals.wos * 0.86),
            Math.round(agg.research.totals.scholar * 0.88),
            Math.round(agg.research.totals.journals * 0.87),
            Math.round(agg.research.totals.conf * 0.90)
          ],
          curr: [
            agg.research.totals.scopus,
            agg.research.totals.wos,
            agg.research.totals.scholar,
            agg.research.totals.journals,
            agg.research.totals.conf
          ],
          prevName: prevAY,
          currName: currAY,
          unit: 'Verified Indexing Count'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].research;
          const diff = d.unique - d.prev;
          const pct = Number(((diff / d.prev) * 100).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: d.prev,
            curr: d.unique,
            diff: diff,
            pct: pct,
            scopus: d.scopus,
            wos: d.wos,
            citations: d.citations,
            rpf: d.rpf,
            patents: d.filed + ' / ' + d.granted,
            status: d.rpf >= 1.2 ? 'Research Leader' : (d.rpf >= 0.8 ? 'Active' : 'Growing'),
            statusClass: d.rpf >= 1.2 ? 'bg-success' : (d.rpf >= 0.8 ? 'bg-primary' : 'bg-warning text-dark')
          };
        }),
        trend: {
          labels: ['AY 2022-23', 'AY 2023-24', 'AY 2024-25', 'AY 2025-26 (Prev)', 'AY 2026-27 (Curr)'],
          series: [1020, 1180, 1310, cKpis.research_publications.previous, cKpis.research_publications.current],
          unit: 'Unique Peer-Reviewed Publications'
        }
      },

      placement_percentage: {
        title: 'Overall Placement Rate & Career Deployments',
        icon: 'bi-briefcase-fill',
        iconBg: '#faf5ff',
        iconColor: '#a855f7',
        unit: '%',
        currPeriod: 'Batch ' + currAY,
        prevPeriod: 'Batch ' + prevAY,
        currVal: cKpis.placement_percentage.current,
        prevVal: cKpis.placement_percentage.previous,
        absChange: Number((cKpis.placement_percentage.current - cKpis.placement_percentage.previous).toFixed(2)),
        pctChange: cKpis.placement_percentage.pp_diff !== undefined ? cKpis.placement_percentage.pp_diff : Number((cKpis.placement_percentage.current - cKpis.placement_percentage.previous).toFixed(2)),
        trend: 'up',
        benchmark: 'AICTE / NIRF Target: 88.00% (Achieved: ' + cKpis.placement_percentage.current + '%)',
        benchmarkStatus: 'Institutional Benchmark Exceeded',
        overviewCards: [
          { label: 'Current Placement Rate', val: cKpis.placement_percentage.current + '%', sub: 'Batch ' + currAY, color: 'text-purple' },
          { label: 'Previous Placement Rate', val: cKpis.placement_percentage.previous + '%', sub: 'Batch ' + prevAY, color: 'text-muted' },
          { label: 'Placement Rate Gain', val: '+' + (cKpis.placement_percentage.current - cKpis.placement_percentage.previous).toFixed(2) + '%', sub: 'YoY Batch Growth', color: 'text-success' },
          { label: 'Highest Salary CTC', val: '52.00 LPA', sub: 'FET Bangalore Super Dream', color: 'text-success' },
          { label: 'Average Salary CTC', val: '8.65 LPA', sub: '+10.9% vs Prev Batch', color: 'text-primary' }
        ],
        overviewChart: {
          categories: ['Eligible Students', 'Placed Students', 'Total Offers', 'Dream Offers (>10 LPA)', 'Companies Visited'],
          prev: [
            5450,
            4733,
            6120,
            1120,
            890
          ],
          curr: [
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].placement.eligible, 0),
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].placement.placed, 0),
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].placement.offers, 0),
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].placement.dream, 0),
            978
          ],
          prevName: 'Batch ' + prevAY,
          currName: 'Batch ' + currAY,
          unit: 'Placement Metrics'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].placement;
          const currPct = Number(((d.placed / d.eligible) * 100).toFixed(2));
          const diff = Number((currPct - d.prev).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: d.prev,
            curr: currPct,
            diff: diff,
            pct: diff,
            eligible: d.eligible,
            placed: d.placed,
            high: d.high,
            avg: d.avg,
            offers: d.offers,
            status: currPct >= 92 ? 'Top Tier' : (currPct >= 86 ? 'High Placement' : 'Moderate'),
            statusClass: currPct >= 92 ? 'bg-success' : (currPct >= 86 ? 'bg-primary' : 'bg-warning text-dark')
          };
        }),
        trend: {
          labels: ['Batch 2022-23', 'Batch 2023-24', 'Batch 2024-25', 'Batch 2025-26 (Prev)', 'Batch 2026-27 (Curr)'],
          series: [82.40, 84.10, 85.90, cKpis.placement_percentage.previous, cKpis.placement_percentage.current],
          unit: 'Placement Percentage %'
        }
      },

      attendance_percentage: {
        title: 'Overall Attendance & Student Classroom Engagement',
        icon: 'bi-calendar-check-fill',
        iconBg: '#ecfeff',
        iconColor: '#06b6d4',
        unit: '%',
        currPeriod: currSem,
        prevPeriod: prevSem,
        currVal: cKpis.attendance_percentage.current,
        prevVal: cKpis.attendance_percentage.previous,
        absChange: Number((cKpis.attendance_percentage.current - cKpis.attendance_percentage.previous).toFixed(2)),
        pctChange: cKpis.attendance_percentage.pp_diff !== undefined ? cKpis.attendance_percentage.pp_diff : Number((cKpis.attendance_percentage.current - cKpis.attendance_percentage.previous).toFixed(2)),
        trend: 'up',
        benchmark: 'Mandatory Exam Eligibility: 75.00% (Institutional: ' + cKpis.attendance_percentage.current + '%)',
        benchmarkStatus: 'Academic Regulations Compliant',
        overviewCards: [
          { label: 'Institutional Avg Attendance', val: cKpis.attendance_percentage.current + '%', sub: currSem, color: 'text-info' },
          { label: 'Previous Term Attendance', val: cKpis.attendance_percentage.previous + '%', sub: prevSem, color: 'text-muted' },
          { label: 'Attendance Gain', val: '+' + (cKpis.attendance_percentage.current - cKpis.attendance_percentage.previous).toFixed(2) + '%', sub: 'Term-on-Term Improvement', color: 'text-success' },
          { label: 'Students >= 75%', val: (100 - ((agg.attendance.colleges.reduce((acc, c) => acc + c.below75, 0) / cKpis.student_strength.current) * 100)).toFixed(1) + '%', sub: 'Eligible for Regular Exams', color: 'text-success' },
          { label: 'Students Below 75%', val: agg.attendance.colleges.reduce((acc, c) => acc + c.below75, 0).toLocaleString(), sub: 'Requires Remedial / Condonation', color: 'text-danger' }
        ],
        overviewChart: {
          categories: ['Distinction (>=85%)', 'Regular (75-84%)', 'Condonation Band (65-74%)', 'Detention Risk (<65%)'],
          prev: [
            Math.round(colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.above85, 0) * 0.96),
            Math.round(colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.mid, 0) * 0.98),
            Math.round(colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.cond, 0) * 1.08),
            Math.round(colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.det, 0) * 1.12)
          ],
          curr: [
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.above85, 0),
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.mid, 0),
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.cond, 0),
            colleges.reduce((acc, c) => acc + INSTITUTIONAL_DATA[c.id].attendance.det, 0)
          ],
          prevName: prevSem,
          currName: currSem,
          unit: 'Students Enrolled'
        },
        colleges: colleges.map(c => {
          const d = INSTITUTIONAL_DATA[c.id].attendance;
          const diff = Number((d.pct - d.prev).toFixed(2));
          return {
            id: c.id,
            code: c.code,
            name: c.name,
            shortName: c.shortName,
            campus: c.campus,
            prev: d.prev,
            curr: d.pct,
            diff: diff,
            pct: diff,
            above85: d.above85,
            below75: d.below75,
            cond: d.cond,
            det: d.det,
            status: d.pct >= 87 ? 'High Attendance' : (d.pct >= 84 ? 'Normal' : 'Detention Watch'),
            statusClass: d.pct >= 87 ? 'bg-success' : (d.pct >= 84 ? 'bg-primary' : 'bg-warning text-dark')
          };
        }),
        trend: {
          labels: ['July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026 (Curr)'],
          series: [88.20, 86.80, 85.10, 85.40, cKpis.attendance_percentage.current],
          unit: 'Attendance Percentage %'
        }
      }
    };

    const targetKpi = kpiMeta[kpiKey] || kpiMeta.student_strength;

    // Build Top 5 and Bottom 5 ranking
    const sortedColleges = [...targetKpi.colleges].sort((a, b) => b.curr - a.curr);
    const top5 = sortedColleges.slice(0, 5);
    const bottom5 = [...sortedColleges].slice(-5).reverse();

    return {
      kpiKey: kpiKey,
      ...targetKpi,
      rankings: { top5, bottom5 }
    };
  }

  // --------------------------------------------------------------------------
  // CONSOLIDATED INSTITUTIONAL COMPARISON: BLR VS KOCHI (Requirement 4)
  // --------------------------------------------------------------------------
  function getCampusComparisonData() {
    const blrColleges = COLLEGES.filter(c => c.campus === 'BLR');
    const kochiColleges = COLLEGES.filter(c => c.campus === 'KOCHI');

    const aggregateCampus = (cols, name, code) => {
      let students = 0, studentsPrev = 0;
      let faculty = 0, facultyPrev = 0;
      let demand = 0, collected = 0, feePrev = 0;
      let appeared = 0, passed = 0, failed = 0;
      let papers = 0, scopus = 0, wos = 0, scholar = 0, citations = 0, filed = 0, granted = 0;
      let eligible = 0, placed = 0, highMax = 0, avgSum = 0;
      let attWeighted = 0, above85 = 0, below75 = 0;

      cols.forEach(c => {
        const d = INSTITUTIONAL_DATA[c.id];
        if (!d) return;
        students += d.students.total;
        studentsPrev += d.students.prev;
        faculty += d.faculty.total;
        facultyPrev += d.faculty.prev;
        demand += d.finance.demand;
        collected += d.finance.collected;
        feePrev += d.finance.prev;
        appeared += d.academic.appeared;
        passed += d.academic.passed;
        failed += d.academic.failed;
        papers += d.research.unique;
        scopus += d.research.scopus;
        wos += d.research.wos;
        scholar += d.research.scholar;
        citations += d.research.citations;
        filed += d.research.filed;
        granted += d.research.granted;
        eligible += d.placement.eligible;
        placed += d.placement.placed;
        if (d.placement.high > highMax) highMax = d.placement.high;
        avgSum += d.placement.avg * d.placement.eligible;
        attWeighted += d.attendance.pct * d.students.total;
        above85 += d.attendance.above85;
        below75 += d.attendance.below75;
      });

      const passPct = Number(((passed / Math.max(1, appeared)) * 100).toFixed(2));
      const collectionPct = Number(((collected / Math.max(1, demand)) * 100).toFixed(2));
      const placementRate = Number(((placed / Math.max(1, eligible)) * 100).toFixed(2));
      const avgSalary = Number((avgSum / Math.max(1, eligible)).toFixed(2));
      const attPct = Number((attWeighted / Math.max(1, students)).toFixed(2));
      const sfr = Number((students / Math.max(1, faculty)).toFixed(2));
      const rpf = Number((papers / Math.max(1, faculty)).toFixed(2));

      return {
        name,
        code,
        collegeCount: cols.length,
        colleges: cols,
        students: { total: students, prev: studentsPrev, growth: Number((((students - studentsPrev)/studentsPrev)*100).toFixed(2)) },
        faculty: { total: faculty, prev: facultyPrev, sfr, rpf },
        finance: { demand, collected, outstanding: demand - collected, collectionPct, prev: feePrev },
        academic: { appeared, passed, failed, passPct },
        research: { papers, scopus, wos, scholar, citations, filed, granted },
        placement: { eligible, placed, rate: placementRate, high: highMax, avg: avgSalary },
        attendance: { pct: attPct, above85, below75 }
      };
    };

    const blr = aggregateCampus(blrColleges, 'Bangalore Campus', 'BLR');
    const kochi = aggregateCampus(kochiColleges, 'Kochi Campus', 'KOCHI');

    return {
      blr,
      kochi,
      comparisonMetrics: [
        { metric: 'Enrolled Students', unit: 'Students', blr: blr.students.total, kochi: kochi.students.total },
        { metric: 'Faculty Strength', unit: 'Faculty', blr: blr.faculty.total, kochi: kochi.faculty.total },
        { metric: 'SFR (Student-Faculty)', unit: ':1', blr: blr.faculty.sfr, kochi: kochi.faculty.sfr, inverse: true },
        { metric: 'Academic Pass Rate', unit: '%', blr: blr.academic.passPct, kochi: kochi.academic.passPct },
        { metric: 'Fee Realization Rate', unit: '%', blr: blr.finance.collectionPct, kochi: kochi.finance.collectionPct },
        { metric: 'Fee Collected', unit: '₹ Cr', blr: Number((blr.finance.collected / 10000000).toFixed(2)), kochi: Number((kochi.finance.collected / 10000000).toFixed(2)) },
        { metric: 'Scopus Publications', unit: 'Papers', blr: blr.research.scopus, kochi: kochi.research.scopus },
        { metric: 'Patents Portfolio', unit: 'Patents', blr: blr.research.filed + blr.research.granted, kochi: kochi.research.filed + kochi.research.granted },
        { metric: 'Placement Rate', unit: '%', blr: blr.placement.rate, kochi: kochi.placement.rate },
        { metric: 'Average CTC', unit: 'LPA', blr: blr.placement.avg, kochi: kochi.placement.avg },
        { metric: 'Biometric Attendance', unit: '%', blr: blr.attendance.pct, kochi: kochi.attendance.pct }
      ]
    };
  }

  return {
    COLLEGES,
    DEPARTMENTS,
    INSTITUTIONAL_DATA,
    formatCr,
    getFilteredColleges,
    getCollegeDrilldownData,
    aggregateData,
    getKpiComparisonData,
    getCampusComparisonData
  };
})();
