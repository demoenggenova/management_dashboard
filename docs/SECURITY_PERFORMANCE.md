# NOVAPORTAL Super Admin Dashboard - Security & Performance Architecture

## 1. Security Architecture & Controls

### 1.1 Role-Based Access Control (RBAC)
- The institutional analytics dashboard is restricted strictly to users possessing the **Super Admin** role (`hierarchy_level = 99` in `erp_roles`).
- The `SuperAdminAuthFilter` intercepts every request to `/superadmin/*` and `/api/dashboard/*`.
- Requests lacking a valid session or JWT token are rejected immediately with HTTP 401 Unauthorized. Non-Super Admin sessions receive HTTP 403 Forbidden.

### 1.2 SQL Injection Prevention
- All database operations utilize CodeIgniter 4's Query Builder with parameterized bindings.
- No raw string concatenation is permitted in WHERE or JOIN clauses.
- Array parameters (such as multi-selected college IDs) are validated as integers using `array_filter($ids, 'is_numeric')` prior to being bound via `whereIn()`.

### 1.3 Cross-Site Scripting (XSS) & Header Protection
- All dynamic data rendered into HTML views is sanitized using CodeIgniter's `esc()` helper (`esc($value, 'html')`).
- Modern security response headers are enforced via CI4 filters:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy`: Disallowing inline dangerous scripts while permitting Apache ECharts and Bootstrap resources.

### 1.4 CSRF Protection
- CI4 CSRF token validation is active for all state-mutating requests (`POST`, `PUT`, `DELETE`).
- GET analytical endpoints are read-only and idempotent.

### 1.5 Privacy & Confidentiality
- Endpoints return **aggregated statistics only** (counts, sums, averages, ratios).
- No individual student identifying data (names, register numbers, phone numbers, individual marks, parental income) is exposed through these analytics APIs.

---

## 2. Performance Engineering & Optimization

### 2.1 Server-Side Aggregation Queries
- The backend never fetches raw transactional rows into PHP memory.
- All aggregations (`SUM`, `AVG`, `COUNT`, `ROUND`) are computed directly in the MySQL database engine utilizing pre-aggregated summary tables and indexed views.

### 2.2 Intelligent Query Caching
- Aggregate metric payloads are cached using CodeIgniter 4 Cache Service (Redis / File cache) with cache keys reflecting current active filters:
  ```php
  $cacheKey = "dash_kpis_" . md5($academicYear . '_' . $campus . '_' . $collegesHash);
  ```
- Cache Time-To-Live (TTL): 300 seconds (5 minutes) during standard operation.
- Cache Invalidation: Automatic invalidation triggers on mark freeze or end-of-day financial reconciliation.

### 2.3 Optimized Database Indexing
The following indexes ensure sub-50ms query execution across millions of ERP records:
- `erp_colleges`: Index on `(campus_code)`, `(faculty_category)`
- `student_analytics_summary`: Unique index on `(college_id, academic_year_id)`
- `academic_exam_summary`: Composite index on `(college_id, academic_year_id, term_type, degree_level)`
- `finance_fee_summary`: Unique index on `(college_id, academic_year_id)`
- `finance_monthly_collections`: Composite index on `(college_id, academic_year_id, month_index)`
- `research_publications_summary`: Unique index on `(college_id, academic_year_id)`
- `faculty_analytics_summary`: Unique index on `(college_id, academic_year_id)`
- `attendance_summary`: Unique index on `(college_id, academic_year_id)`
- `placement_summary`: Unique index on `(college_id, academic_year_id)`

### 2.4 Frontend Performance & Rendering
- **Asynchronous Staggered Fetching**: Global filters trigger debounced, parallel fetch requests with skeleton loading states to maintain 60 FPS UI responsiveness.
- **Apache ECharts Instance Management**: Charts are lazily initialized and automatically debounced on window resize (`ResizeObserver`).
- **Debounced Filter Changes**: Rapid multiselect changes are debounced by 300ms using `AbortController` to cancel in-flight duplicate requests.

