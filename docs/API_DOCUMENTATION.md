# NOVAPORTAL Super Admin Dashboard - REST API Specification

## Overview
The Dashboard REST API provides high-performance, aggregated analytical endpoints powering the NOVAPORTAL Super Admin Institutional Analytics Dashboard. All endpoints adhere to CodeIgniter 4 MVC principles, enforce strict Super Admin role authorization, return consistent JSON response envelopes, and support multi-college selection.

---

## Standard JSON Response Envelope
All API endpoints return responses in the uniform format below:

```json
{
  "success": true,
  "status": 200,
  "message": "Analytics data retrieved successfully",
  "meta": {
    "timestamp": "2026-11-18T10:30:00Z",
    "academic_year": "2026-2027",
    "campus": "all",
    "selected_colleges_count": 10,
    "cached": true
  },
  "data": { ... }
}
```

---

## Global Filter Parameters
All endpoints accept the following query parameters:

| Parameter | Type | Default | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `academic_year` | String | `2026-2027` | Academic Year filter | `2026-2027`, `2025-2026` |
| `semester` | String | `all` | Semester filter | `all`, `odd`, `even`, `SEM-1`, `SEM-7` |
| `campus` | String | `all` | Campus filter | `all`, `BLR`, `KOCHI` |
| `colleges` | String | `all` | Comma-separated College IDs or Codes, or `all` | `all`, `1,2,3`, `FET-BLR,FMS-BLR` |
| `date_from` | Date | null | Start date for date-bounded aggregates | `2026-06-01` |
| `date_to` | Date | null | End date for date-bounded aggregates | `2027-03-31` |

---

## Endpoints Summary

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/dashboard/bootstrap` | Initial metadata: colleges list, campuses, academic years, semesters, filter presets |
| `GET` | `/api/dashboard/kpis` | 8 Executive KPI Cards with current values, previous AY comparisons, and trends |
| `GET` | `/api/dashboard/academic` | College-wise pass %, UG vs PG, appeared/passed/failed/arrears, current vs prev semester |
| `GET` | `/api/dashboard/academic/departments` | Drill-down department performance for a specific college (`college_id`) |
| `GET` | `/api/dashboard/financial` | Fee demand vs collection vs outstanding, monthly trend, BLR vs KOCHI, payment modes |
| `GET` | `/api/dashboard/research` | Unique publications, Scopus/WoS/Scholar breakdown, patents, citations, papers/faculty |
| `GET` | `/api/dashboard/students` | Student strength, UG/PG/PhD proportion, admissions conversion, dropouts, YoY growth |
| `GET` | `/api/dashboard/faculty` | Faculty strength, cadre distribution, PhD %, Student-to-Faculty Ratio (SFR) |
| `GET` | `/api/dashboard/attendance-exams` | Attendance %, attendance < 75%, condonation/detention, distinctions, first class |
| `GET` | `/api/dashboard/placements` | Placement %, highest/average/median CTC (LPA), companies visited, total offers |
| `GET` | `/api/dashboard/insights` | Top 5 & Bottom 5 faculties, fee risks, research rankings, placement rankings, targets |

---

## Sample Request & Response Structures

### 1. GET `/api/dashboard/kpis`
**Request:**
`GET /api/dashboard/kpis?academic_year=2026-2027&campus=all&colleges=all`

**Response:**
```json
{
  "success": true,
  "status": 200,
  "message": "KPI cards loaded",
  "data": {
    "student_strength": {
      "current": 22690,
      "previous": 21540,
      "change_pct": 5.34,
      "trend": "up",
      "label": "Total Students Enrolled"
    },
    "faculty_strength": {
      "current": 1434,
      "previous": 1363,
      "change_pct": 5.21,
      "trend": "up",
      "label": "Total Faculty Members"
    },
    "fee_demand": {
      "current": 4278000000.00,
      "formatted": "₹427.80 Cr",
      "previous": 3950000000.00,
      "change_pct": 8.30,
      "trend": "up"
    },
    "fee_collection": {
      "current": 3858000000.00,
      "formatted": "₹385.80 Cr",
      "collection_pct": 90.18,
      "previous": 3490000000.00,
      "change_pct": 10.54,
      "trend": "up"
    },
    "pass_percentage": {
      "current": 90.25,
      "previous": 88.42,
      "change_pct": 1.83,
      "trend": "up",
      "formula": "Passed (20,725) / Appeared (22,960) * 100"
    },
    "research_publications": {
      "current": 1452,
      "previous": 1270,
      "change_pct": 14.33,
      "trend": "up",
      "unique_papers": 1452,
      "scopus_indexed": 1084
    },
    "placement_percentage": {
      "current": 89.28,
      "previous": 86.85,
      "change_pct": 2.43,
      "trend": "up",
      "formula": "Placed (4,957) / Eligible (5,552) * 100"
    },
    "attendance_percentage": {
      "current": 85.92,
      "previous": 84.78,
      "change_pct": 1.14,
      "trend": "up",
      "students_below_75_pct": 2245
    }
  }
}
```

---

### 2. GET `/api/dashboard/academic`
**Response:**
```json
{
  "success": true,
  "data": {
    "college_comparison": [
      { "college_id": 1, "code": "FET-BLR", "name": "Faculty of Engineering - BLR", "campus": "BLR", "appeared": 4720, "passed": 4310, "failed": 410, "arrears": 365, "pass_pct": 91.31, "prev_pct": 89.80 },
      { "college_id": 2, "code": "FCOM-BLR", "name": "Faculty of Commerce - BLR", "campus": "BLR", "appeared": 3080, "passed": 2815, "failed": 265, "arrears": 210, "pass_pct": 91.40, "prev_pct": 89.40 },
      { "college_id": 3, "code": "FMS-BLR", "name": "Faculty of Management - BLR", "campus": "BLR", "appeared": 2210, "passed": 2085, "failed": 125, "arrears": 95, "pass_pct": 94.34, "prev_pct": 92.50 }
    ],
    "ug_vs_pg": {
      "ug_pass_pct": 89.45,
      "ug_appeared": 18560,
      "ug_passed": 16600,
      "pg_pass_pct": 92.65,
      "pg_appeared": 4400,
      "pg_passed": 4077
    },
    "current_vs_previous_semester": {
      "categories": ["FET-BLR", "FCOM-BLR", "FMS-BLR", "FAC-KOC", "FAHSS-KOC", "FCD-KOC", "FMS-KOC", "FCOM-KOC", "FET-KOC", "FBAS-KOC"],
      "current_semester": [91.31, 91.40, 94.34, 90.98, 85.97, 93.53, 93.44, 88.59, 87.57, 86.18],
      "previous_semester": [89.80, 89.40, 92.50, 88.50, 84.10, 91.80, 91.20, 86.80, 85.90, 84.20]
    }
  }
}
```

---

### 3. GET `/api/dashboard/financial`
**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_demand": 4278000000.00,
      "total_collected": 3858000000.00,
      "total_outstanding": 420000000.00,
      "collection_pct": 90.18
    },
    "college_fee_breakdown": [
      { "code": "FET-BLR", "name": "FET - BLR", "demand": 895000000, "collected": 828000000, "outstanding": 67000000, "collection_pct": 92.51 },
      { "code": "FCOM-BLR", "name": "FCOM - BLR", "demand": 395000000, "collected": 362000000, "outstanding": 33000000, "collection_pct": 91.65 }
    ],
    "monthly_trend": {
      "months": ["Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026", "Jan 2027", "Feb 2027", "Mar 2027"],
      "blr_campus": [92000000, 129000000, 357000000, 421000000, 197000000, 98000000, 82000000, 90000000, 162000000, 71000000, 41000000, 29000000],
      "kochi_campus": [89800000, 137800000, 368200000, 443500000, 204500000, 105300000, 88100000, 96700000, 158600000, 70200000, 32300000, 21000000]
    },
    "payment_modes": [
      { "mode": "UPI", "amount": 1157400000.00, "share_pct": 30.0, "transactions": 38400 },
      { "mode": "Net Banking", "amount": 1079800000.00, "share_pct": 28.0, "transactions": 26800 },
      { "mode": "Credit/Debit Card", "amount": 964500000.00, "share_pct": 25.0, "transactions": 28500 },
      { "mode": "Bank Transfer (NEFT/RTGS)", "amount": 540120000.00, "share_pct": 14.0, "transactions": 9200 },
      { "mode": "Cash/Challan", "amount": 116180000.00, "share_pct": 3.0, "transactions": 4100 }
    ]
  }
}
```

---

### 4. GET `/api/dashboard/research`
**Response:**
```json
{
  "success": true,
  "data": {
    "unique_total": 1452,
    "indexing_counts": {
      "scopus": 1098,
      "web_of_science": 792,
      "google_scholar": 1391
    },
    "publication_types": {
      "journal_papers": 1047,
      "conference_papers": 405
    },
    "patents": {
      "filed": 150,
      "granted": 55
    },
    "total_citations": 16450,
    "avg_citations_per_paper": 11.33,
    "college_research": [
      { "code": "FET-BLR", "name": "FET - BLR", "unique_pubs": 385, "scopus": 298, "wos": 215, "patents": 18, "citations": 4820, "papers_per_faculty": 1.48 }
    ]
  }
}
```

