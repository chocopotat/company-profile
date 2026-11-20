# PROMPT LENGKAP PEMBUATAN WEBSITE COMPANY PROFILE + RECRUITMENT SYSTEM + ADMIN PANEL

Buat sebuah aplikasi web **Company Profile + Recruitment Management System** menggunakan:

* **Backend:** Laravel
* **Database:** MySQL
* **Authentication:** Laravel Sanctum
* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Chart:** Recharts
* **HTTP Client:** Axios
* **Icons:** Lucide React
* **File Storage:** Laravel Storage
* **Email:** Laravel Mail
* **WhatsApp:** WhatsApp API/provider
* **Queue:** Laravel Queue
* **Validation:** Laravel Form Request
* **Authorization:** Role-Based Access Control

Aplikasi harus responsive, modern, user-friendly, estetik, cepat, aman, dan memiliki transisi yang smooth.

---

# 1. KONSEP UTAMA APLIKASI

Aplikasi memiliki **3 area utama**:

```text
PUBLIC WEBSITE
        │
        ├── Home
        ├── About
        ├── Contact
        └── Recruitment
                │
                ▼
        RECRUITMENT LOGIN
                │
        ┌───────┼────────┐
        │       │        │
       USER     HR      ADMIN
        │       │        │
        │       │        └── SUPER ADMIN
        │       │
        ▼       ▼        ▼
 User Dashboard     Admin Dashboard
```

Gunakan **satu authentication system**.

Jangan membuat login admin terpisah.

Semua role login melalui:

```text
/recruitment/login
```

Role ditentukan berdasarkan:

```text
users.role
```

Role:

```text
user
hr
admin
super_admin
```

---

# 2. PUBLIC WEBSITE

Buat halaman:

```text
/
 /about
 /contact
 /recruitment
```

Navbar selalu tersedia di seluruh public page.

Desktop:

```text
┌─────────────────────────────────────────────┐
│ LOGO     Home About Contact Recruitment     │
└─────────────────────────────────────────────┘
```

Mobile menggunakan modern bottom navbar:

```text
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ 🏠     ℹ️      ✉️      👤                  │
│ Home   About   Contact  Recruit              │
└─────────────────────────────────────────────┘
```

Bottom navbar:

* fixed
* glassmorphism
* backdrop blur
* rounded
* smooth active indicator
* icon animation
* page transition

---

# 3. LOADING SCREEN

Tambahkan global loading screen.

Setiap perpindahan halaman memiliki:

```text
Logo
Loading animation
Progress indicator
```

Gunakan:

```text
Fade In
Scale
Blur
Fade Out
```

Loading screen muncul ketika:

* pertama kali website dibuka
* berpindah page
* login
* register
* submit recruitment
* upload file
* update profile
* admin CRUD
* logout

Jangan menggunakan loading yang terlalu lama.

---

# 4. PAGE HOME

Route:

```text
/
```

Home harus memiliki Hero Slider full screen.

Gunakan company images.

Hero:

```text
┌───────────────────────────────────────────────┐
│                                               │
│       BACKGROUND COMPANY IMAGE                │
│                                               │
│     ┌─────────────────────────────┐           │
│     │  Welcome To Our Company     │           │
│     │                             │           │
│     │  Modern Company             │           │
│     │  Professional Solution      │           │
│     │                             │           │
│     │  [ Learn More ]             │           │
│     └─────────────────────────────┘           │
│                                               │
└───────────────────────────────────────────────┘
```

Glassmorphism:

* backdrop blur
* translucent background
* border
* soft shadow
* rounded corners

Slider:

* autoplay
* arrows
* indicators
* swipe mobile
* infinite loop
* smooth transition

Gunakan Framer Motion.

---

# 5. HOME SCROLL EXPERIENCE

Ketika user scroll ke bawah:

```text
Hero
 ↓
About Preview
 ↓
Vision Mission
 ↓
Company Highlight
 ↓
Recruitment CTA
 ↓
Contact CTA
 ↓
Footer
```

Gunakan:

* scroll reveal
* fade
* slide
* scale
* parallax ringan

Jangan menggunakan animasi berlebihan.

---

# 6. PAGE ABOUT

Route:

```text
/about
```

About berisi:

* Company Introduction
* Company History
* Vision
* Mission
* Values
* Company Culture
* Company Images

Background menggunakan foto company:

```text
background-image
opacity: 0.1–0.2
```

Foto hampir transparan sehingga text tetap mudah dibaca.

Saat About dibuka:

```text
Background → Fade In
Title → Slide Up
Description → Fade In
Vision → Slide Left
Mission → Slide Right
Image → Scale In
```

---

# 7. VISION & MISSION

Gunakan card:

```text
┌─────────────────────────────┐
│           VISION            │
│                             │
│ Become the leading company  │
│ in innovation...            │
└─────────────────────────────┘
```

Mission:

```text
┌─────────────────────────────┐
│           MISSION           │
│                             │
│ • Professional              │
│ • Innovative                │
│ • Customer Focused          │
└─────────────────────────────┘
```

---

# 8. PAGE CONTACT

Route:

```text
/contact
```

Layout:

```text
┌───────────────────────┬───────────────────────┐
│ COMPANY CONTACT       │ CONTACT / ORDER FORM  │
│                       │                       │
│ Email                 │ Name                  │
│ Phone                 │ Email                 │
│ WhatsApp              │ Phone                 │
│ Address               │ Subject               │
│                       │ Message               │
│ Social Media          │                       │
│                       │ [ SEND MESSAGE ]      │
└───────────────────────┴───────────────────────┘
```

Input harus:

* modern
* clean
* clear
* animated focus
* icon
* validation
* error state
* success state

---

# 9. CONTACT FORM

Fields:

```text
name
email
phone
subject
message
```

Endpoint:

```http
POST /api/contact
```

Setelah submit:

```text
Submitting
 ↓
Success Page
 ↓
"Message Sent Successfully"
```

Jangan gunakan alert.

Email otomatis dikirim ke email company.

---

# 10. FOOTER

Footer berada di bagian bawah Contact dan dapat digunakan secara global.

Isi:

```text
Company Name
Description

Contact
Email
Phone
WhatsApp
Address

Quick Links
Home
About
Contact
Recruitment

Social Media

© 2026 Company Name
All Rights Reserved
```

---

# 11. RECRUITMENT PAGE

Route:

```text
/recruitment
```

Jika belum login:

```text
/recruitment/login
```

Jika sudah login:

```text
user → /recruitment/dashboard

hr/admin/super_admin
→ /recruitment/admin/dashboard
```

---

# 12. RECRUITMENT LOGIN

Gunakan satu login untuk semua role.

Route:

```text
/recruitment/login
```

Form:

```text
Username / Email
Password

[ SIGN IN ]

Forgot Password?

Don't have an account?
Register
```

Jangan ada:

```text
Login as Admin
Login as User
```

Backend menentukan role otomatis.

---

# 13. LOGIN FLOW

```text
/recruitment/login
       ↓
POST /api/auth/login
       ↓
Laravel Sanctum
       ↓
Check credentials
       ↓
Check role
       ↓
Login Success Page
       ↓
Redirect
```

Role redirect:

```text
user
 ↓
/recruitment/dashboard
```

```text
hr
 ↓
/recruitment/admin/dashboard
```

```text
admin
 ↓
/recruitment/admin/dashboard
```

```text
super_admin
 ↓
/recruitment/admin/dashboard
```

---

# 14. REGISTER

Route:

```text
/recruitment/register
```

Fields:

```text
Full Name
Username
Email
Password
Confirm Password
```

Role default:

```text
user
```

User tidak dapat memilih:

```text
admin
hr
super_admin
```

Setelah register:

```text
Register
 ↓
Success Page
 ↓
"Registration Successful"
 ↓
/recruitment/login
```

---

# 15. USER DASHBOARD

Route:

```text
/recruitment/dashboard
```

Dashboard:

```text
Welcome, John Doe

Profile
Application Status

Application:
Submitted

Documents:
CV ✓
Cover Letter ✓
Photo ✓
```

Status timeline:

```text
Submitted
   ↓
Under Review
   ↓
Interview
   ↓
Accepted / Rejected
```

---

# 16. USER RECRUITMENT FORM

Fields:

```text
Nama Lengkap
NIK
Email
No HP / WhatsApp
Alamat
CV
Surat Lamaran
Foto
```

Validasi:

```text
Nama → required
NIK → required
Email → valid email
Phone → valid phone
Address → required
CV → PDF
Cover Letter → PDF
Photo → JPG/PNG
```

Ukuran file dapat dikonfigurasi dari admin.

---

# 17. SUBMIT RECRUITMENT

Flow:

```text
Fill Form
 ↓
Validate
 ↓
Upload Files
 ↓
Save Applicant
 ↓
Create Recruitment Status
 ↓
Send Email
 ↓
Send WhatsApp
 ↓
Create Notification
 ↓
Success Page
 ↓
Dashboard
```

Setelah berhasil dashboard otomatis menampilkan data terbaru.

Foto profile juga otomatis berubah menjadi foto recruitment user.

---

# 18. WHATSAPP NOTIFICATION

Setelah recruitment berhasil:

```text
Halo John Doe,

Terima kasih telah mengirimkan lamaran
ke Company Name.

Data recruitment Anda telah berhasil
diterima.

Silakan menunggu informasi selanjutnya.
```

Nomor WhatsApp company dikonfigurasi dari:

```text
Admin → Settings → WhatsApp
```

Gunakan WhatsApp API/provider.

Jangan hardcode API token.

---

# 19. RECRUITMENT STATUS

Status:

```text
Submitted
Under Review
Interview
Accepted
Rejected
```

Setiap perubahan status:

```text
Admin/HR
 ↓
Update Status
 ↓
Database
 ↓
History
 ↓
Email
 ↓
WhatsApp
 ↓
User Notification
```

---

# 20. ADMIN/HR LOGIN

Tidak ada halaman login admin terpisah.

Admin/HR menggunakan:

```text
/recruitment/login
```

Setelah login:

```text
role=user
→ user dashboard

role=hr
→ admin dashboard

role=admin
→ admin dashboard

role=super_admin
→ admin dashboard
```

---

# 21. ADMIN DASHBOARD

Route:

```text
/recruitment/admin/dashboard
```

Tampilkan:

```text
Total Users
Total Applicants
Pending Review
Interview
Accepted
Rejected
Contact Messages
```

Tambahkan:

* Line chart
* Bar chart
* Donut chart
* Recent applicants
* Recent contact messages
* Recent notifications

Gunakan Recharts.

---

# 22. ADMIN SIDEBAR

```text
Dashboard

WEBSITE
├── Company Profile
├── Home
├── About
└── Contact

RECRUITMENT
├── Applicants
├── Applications
└── Recruitment Status

MANAGEMENT
├── Users
├── HR
└── Admin

COMMUNICATION
├── Notifications
├── Email
└── WhatsApp

SYSTEM
├── Activity Logs
├── Settings
└── Profile

Logout
```

Menu harus berubah sesuai role.

---

# 23. HR ACCESS

HR dapat:

```text
Dashboard
Applicants
Applications
Recruitment Status
Notifications
Profile
Logout
```

HR tidak dapat:

```text
Company Settings
Website Management
User Management
Admin Management
System Settings
```

---

# 24. ADMIN ACCESS

Admin dapat:

```text
Dashboard
Company
Home
About
Contact
Applicants
Recruitment
Users
HR
Notifications
Activity Logs
Profile
Logout
```

---

# 25. SUPER ADMIN ACCESS

Super Admin dapat semuanya:

```text
Dashboard
Company
Home
About
Contact
Applicants
Recruitment
Users
HR
Admin
Notifications
Email
WhatsApp
Activity Logs
Settings
Security
Profile
Logout
```

---

# 26. COMPANY MANAGEMENT

Route:

```text
/recruitment/admin/company
```

Admin dapat mengubah:

```text
Company Name
Tagline
Description
Email
Phone
WhatsApp
Address
Working Hours
Logo
Social Media
```

---

# 27. HOME MANAGEMENT

Route:

```text
/recruitment/admin/home
```

Admin dapat:

```text
Add Hero
Edit Hero
Delete Hero
Enable / Disable
Reorder
Upload Image
Edit CTA
```

Hero fields:

```text
title
subtitle
description
image
button_text
button_url
sort_order
is_active
```

Gunakan drag & drop untuk reorder.

---

# 28. ABOUT MANAGEMENT

Admin dapat mengubah:

```text
Introduction
History
Vision
Mission
Values
Culture
Background Image
About Images
```

---

# 29. CONTACT MANAGEMENT

Admin dapat mengubah:

```text
Email
Phone
WhatsApp
Address
Working Hours
Google Maps
Social Media
```

---

# 30. CONTACT MESSAGE MANAGEMENT

Route:

```text
/recruitment/admin/contact-messages
```

Tabel:

```text
Name
Email
Phone
Subject
Date
Status
Action
```

Status:

```text
Unread
Read
Replied
Archived
```

Admin dapat:

```text
View
Reply
Mark Read
Archive
Delete
```

---

# 31. APPLICANT MANAGEMENT

Route:

```text
/recruitment/admin/applicants
```

Tabel:

```text
Photo
Name
Email
Phone
Submitted
Status
Action
```

Fitur:

```text
Search
Filter
Sort
Pagination
Export CSV
Export Excel
```

---

# 32. APPLICANT DETAIL

Route:

```text
/recruitment/admin/applicants/:id
```

Tampilkan:

```text
Profile Photo
Full Name
NIK
Email
Phone
Address

CV
Cover Letter

Recruitment Status
Recruitment History
Admin Notes
```

File:

```text
[ View ]
[ Download ]
```

File applicant harus private.

Jangan membuat:

```text
/storage/app/public/applicant/*
```

dapat diakses langsung tanpa authorization.

Gunakan protected Laravel route.

---

# 33. RECRUITMENT HISTORY

Table:

```text
recruitment_statuses
```

Fields:

```text
id
applicant_id
status
note
changed_by
created_at
updated_at
```

Contoh:

```text
Submitted
11 Aug 2026

Under Review
12 Aug 2026

Interview
15 Aug 2026
```

---

# 34. UPDATE STATUS ADMIN

Form:

```text
Current Status:
Under Review

New Status:
[ Interview ]

Note:
[ Candidate invited for interview ]

[ UPDATE STATUS ]
```

Setelah berhasil:

```text
Status Updated
```

Kemudian otomatis:

```text
Email
WhatsApp
Notification
History
```

---

# 35. USER MANAGEMENT

Route:

```text
/recruitment/admin/users
```

Tampilkan:

```text
Name
Username
Email
Role
Status
Created Date
```

Fitur:

```text
Search
Filter
Edit
Change Role
Deactivate
Delete
```

Admin tidak boleh memberikan role `super_admin`.

Hanya `super_admin` yang dapat mengubah role menjadi:

```text
super_admin
```

---

# 36. HR MANAGEMENT

Route:

```text
/recruitment/admin/hr
```

Super Admin dapat:

```text
Add HR
Edit HR
Disable HR
Delete HR
Reset Password
View Activity
```

---

# 37. ADMIN MANAGEMENT

Route:

```text
/recruitment/admin/admin
```

Hanya Super Admin.

Dapat:

```text
Create Admin
Edit Admin
Disable Admin
Delete Admin
Reset Password
```

---

# 38. NOTIFICATION CENTER

Admin notification:

```text
New Applicant
New Contact Message
Recruitment Status Changed
System Notification
```

Gunakan:

```text
Unread Count
Mark as Read
Mark All as Read
```

---

# 39. ACTIVITY LOG

Route:

```text
/recruitment/admin/activity-logs
```

Catat:

```text
LOGIN
LOGOUT
CREATE
UPDATE
DELETE
UPLOAD
STATUS_UPDATE
EMAIL_SENT
WHATSAPP_SENT
```

Fields:

```text
user_id
action
module
description
ip_address
user_agent
created_at
```

---

# 40. SETTINGS

Route:

```text
/recruitment/admin/settings
```

Tabs:

### General

```text
Site Name
Description
Logo
Favicon
```

### Email

```text
SMTP Host
SMTP Port
SMTP Username
From Email
```

### WhatsApp

```text
Provider
API URL
Phone
API Token
```

API token harus masked dan tidak pernah dikirim ke React frontend.

### Recruitment

```text
Recruitment Enabled
Max CV Size
Max Photo Size
Allowed File Types
```

---

# 41. DATABASE MIGRATIONS

Buat migration berikut:

```text
users
company_profiles
hero_slides
contact_messages
applicants
recruitment_statuses
notifications
activity_logs
settings
password_reset_tokens
jobs
```

---

# 42. USERS TABLE

```text
users

id
name
username
email
password
role
phone
profile_photo
is_active
email_verified_at
remember_token
created_at
updated_at
```

Role:

```text
user
hr
admin
super_admin
```

---

# 43. COMPANY PROFILES

```text
company_profiles

id
name
tagline
description
email
phone
whatsapp
address
working_hours
logo
favicon
google_maps
instagram
facebook
linkedin
youtube
created_at
updated_at
```

---

# 44. HERO SLIDES

```text
hero_slides

id
title
subtitle
description
image
button_text
button_url
sort_order
is_active
created_at
updated_at
```

---

# 45. APPLICANTS

```text
applicants

id
user_id
full_name
nik
email
phone
address
cv_path
cover_letter_path
photo_path
current_status
submitted_at
created_at
updated_at
```

---

# 46. CONTACT MESSAGES

```text
contact_messages

id
name
email
phone
subject
message
status
created_at
updated_at
```

---

# 47. RECRUITMENT STATUSES

```text
recruitment_statuses

id
applicant_id
status
note
changed_by
created_at
updated_at
```

---

# 48. NOTIFICATIONS

```text
notifications

id
user_id
type
title
message
data
read_at
created_at
updated_at
```

---

# 49. ACTIVITY LOGS

```text
activity_logs

id
user_id
action
module
description
ip_address
user_agent
created_at
updated_at
```

---

# 50. SETTINGS

```text
settings

id
key
value
type
created_at
updated_at
```

---

# 51. API AUTHENTICATION

Gunakan:

```text
Laravel Sanctum
```

Endpoint:

```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

---

# 52. PUBLIC API

```http
GET /api/company
GET /api/hero-slides
GET /api/about
GET /api/contact
POST /api/contact
```

Public endpoint hanya mengembalikan data yang aman untuk publik.

---

# 53. USER API

```http
GET  /api/recruitment/profile
PUT  /api/recruitment/profile

GET  /api/recruitment/application
POST /api/recruitment/application
PUT  /api/recruitment/application

GET  /api/recruitment/application/status
GET  /api/recruitment/notifications
PUT  /api/recruitment/notifications/{id}/read
```

---

# 54. ADMIN API

```http
GET /api/recruitment/admin/dashboard

GET /api/recruitment/admin/company
PUT /api/recruitment/admin/company

GET /api/recruitment/admin/hero-slides
POST /api/recruitment/admin/hero-slides
PUT /api/recruitment/admin/hero-slides/{id}
DELETE /api/recruitment/admin/hero-slides/{id}
PUT /api/recruitment/admin/hero-slides/reorder

GET /api/recruitment/admin/about
PUT /api/recruitment/admin/about

GET /api/recruitment/admin/contact
PUT /api/recruitment/admin/contact

GET /api/recruitment/admin/contact-messages
GET /api/recruitment/admin/contact-messages/{id}
PUT /api/recruitment/admin/contact-messages/{id}
DELETE /api/recruitment/admin/contact-messages/{id}

GET /api/recruitment/admin/applicants
GET /api/recruitment/admin/applicants/{id}
PUT /api/recruitment/admin/applicants/{id}
DELETE /api/recruitment/admin/applicants/{id}
PUT /api/recruitment/admin/applicants/{id}/status

GET /api/recruitment/admin/users
GET /api/recruitment/admin/users/{id}
PUT /api/recruitment/admin/users/{id}
DELETE /api/recruitment/admin/users/{id}

GET /api/recruitment/admin/hr
POST /api/recruitment/admin/hr
PUT /api/recruitment/admin/hr/{id}
DELETE /api/recruitment/admin/hr/{id}

GET /api/recruitment/admin/activity-logs
GET /api/recruitment/admin/settings
PUT /api/recruitment/admin/settings
```

---

# 55. AUTHORIZATION

Semua admin API:

```text
auth:sanctum
```

Kemudian:

```text
role middleware
```

Contoh:

```text
user
→ tidak boleh admin API

hr
→ recruitment management

admin
→ website + recruitment

super_admin
→ semua
```

Authorization harus dilakukan di backend Laravel.

Jangan hanya mengandalkan React.

---

# 56. LARAVEL STRUCTURE

Gunakan struktur:

```text
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   ├── Public/
│   │   │   ├── Recruitment/
│   │   │   └── Admin/
│   │   │
│   │   ├── Middleware/
│   │   └── Requests/
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── CompanyProfile.php
│   │   ├── HeroSlide.php
│   │   ├── Applicant.php
│   │   ├── RecruitmentStatus.php
│   │   ├── ContactMessage.php
│   │   ├── ActivityLog.php
│   │   └── Setting.php
│   │
│   ├── Services/
│   │   ├── RecruitmentService.php
│   │   ├── NotificationService.php
│   │   ├── WhatsAppService.php
│   │   └── ActivityLogService.php
│   │
│   ├── Jobs/
│   │   ├── SendRecruitmentEmail.php
│   │   └── SendWhatsAppNotification.php
│   │
│   └── Notifications/
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── routes/
│   └── api.php
│
└── storage/
    └── app/
        └── private/
            └── applicants/
```

---

# 57. REACT STRUCTURE

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── BottomNavbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── PageTransition.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   │
│   │   └── recruitment/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Success.jsx
│   │       ├── Dashboard.jsx
│   │       └── Profile.jsx
│   │
│   ├── pages/admin/
│   │   ├── Dashboard.jsx
│   │   ├── Company.jsx
│   │   ├── HomeManagement.jsx
│   │   ├── AboutManagement.jsx
│   │   ├── ContactManagement.jsx
│   │   ├── ContactMessages.jsx
│   │   ├── Applicants.jsx
│   │   ├── ApplicantDetail.jsx
│   │   ├── Users.jsx
│   │   ├── HRManagement.jsx
│   │   ├── AdminManagement.jsx
│   │   ├── Notifications.jsx
│   │   ├── ActivityLogs.jsx
│   │   ├── Settings.jsx
│   │   └── Profile.jsx
│   │
│   ├── components/admin/
│   │   ├── AdminSidebar.jsx
│   │   ├── AdminTopbar.jsx
│   │   ├── StatCard.jsx
│   │   ├── ApplicantTable.jsx
│   │   ├── UserTable.jsx
│   │   ├── ContactTable.jsx
│   │   ├── RecruitmentChart.jsx
│   │   ├── StatusChart.jsx
│   │   ├── NotificationPanel.jsx
│   │   ├── FilePreview.jsx
│   │   └── ConfirmModal.jsx
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── RecruitmentLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── recruitmentService.js
│   │   └── adminService.js
│   │
│   └── utils/
│       ├── permissions.js
│       └── validation.js
```

---

# 58. PAGE TRANSITIONS

Gunakan Framer Motion.

Setiap page:

```text
Initial:
opacity: 0
y: 20
filter: blur(5px)

Animate:
opacity: 1
y: 0
filter: blur(0)

Exit:
opacity: 0
y: -10
```

Durasi:

```text
0.4–0.7 seconds
```

Gunakan transition yang natural.

---

# 59. MOBILE RESPONSIVE

Semua halaman harus responsive.

Breakpoint:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Public mobile:

```text
Bottom Navbar
```

Admin mobile:

```text
Hamburger
↓
Side Drawer
```

Table:

```text
Desktop → Table
Mobile → Card
```

Form:

```text
Desktop → 2 Column
Mobile → 1 Column
```

---

# 60. DESIGN SYSTEM

Gunakan:

```text
Modern
Minimal
Professional
Premium
Glassmorphism
Clean
Elegant
```

Warna dapat menggunakan:

```text
Primary
Secondary
Background
Surface
Text
Muted
Success
Warning
Danger
```

Jangan hardcode warna terlalu banyak.

Gunakan Tailwind theme.

---

# 61. ERROR HANDLING

Semua API harus memiliki format:

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {}
}
```

Frontend harus menampilkan:

```text
Error Message
```

dengan UI yang jelas.

Tidak boleh menggunakan:

```javascript
alert()
```

---

# 62. SUCCESS UI

Setiap aksi sukses menggunakan:

```text
Success Modal
atau
Success Page
atau
Toast
```

Contoh:

```text
✓ Success

Your application has been submitted successfully.

[ Go To Dashboard ]
```

---

# 63. SECURITY

Implementasikan:

```text
Laravel Sanctum
CSRF protection
Rate limiting
Password hashing
Request validation
Role middleware
Permission middleware
Private file storage
Protected document route
Activity logging
API authorization
SQL injection protection
XSS protection
```

Jangan menyimpan:

```text
password plain text
API token di frontend
WhatsApp token di frontend
SMTP password di frontend
```

---

# 64. EMAIL SYSTEM

Gunakan Laravel Mail + Queue.

Email dikirim untuk:

```text
Registration
Recruitment Submitted
Status Updated
Interview
Accepted
Rejected
Password Reset
Contact Message
```

Gunakan email template HTML yang profesional.

---

# 65. WHATSAPP SYSTEM

Gunakan service:

```text
WhatsAppService.php
```

Jangan menghubungkan WhatsApp API langsung dari React.

Flow:

```text
React
 ↓
Laravel
 ↓
WhatsAppService
 ↓
WhatsApp Provider
```

---

# 66. QUEUE

Email dan WhatsApp harus menggunakan queue agar UI tidak menunggu terlalu lama.

Contoh:

```text
Submit Application
 ↓
Save Database
 ↓
Dispatch Email Job
 ↓
Dispatch WhatsApp Job
 ↓
Return Success
```

---

# 67. FINAL USER EXPERIENCE

Public:

```text
Home
 ↓
About
 ↓
Contact
 ↓
Recruitment
```

Recruitment:

```text
Recruitment
 ↓
Login/Register
 ↓
User Dashboard
 ↓
Fill Recruitment
 ↓
Success
 ↓
Dashboard
 ↓
Status Tracking
```

Admin:

```text
Recruitment
 ↓
Login
 ↓
Role Detection
 ↓
Admin Dashboard
 ↓
Manage Website
 ↓
Manage Recruitment
 ↓
Manage Users
 ↓
Manage Notifications
 ↓
View Analytics
```

---

# 68. FINAL SYSTEM FLOW

```text
                         COMPANY WEBSITE
                               │
              ┌────────────────┼────────────────┐
              │                │                │
             HOME             ABOUT           CONTACT
              │                │                │
              └────────────────┼────────────────┘
                               │
                         RECRUITMENT
                               │
                               ▼
                         LOGIN / REGISTER
                               │
                               ▼
                         AUTHENTICATION
                               │
                 ┌─────────────┼──────────────┐
                 │             │              │
                USER           HR           ADMIN
                 │             │              │
                 │             │        SUPER ADMIN
                 │             │              │
                 ▼             ▼              ▼
             USER PANEL    ADMIN PANEL    ADMIN PANEL
                 │             │              │
                 │             └──────┬───────┘
                 │                    │
                 │              ADMIN MANAGEMENT
                 │                    │
                 │       ┌────────────┼────────────┐
                 │       │            │            │
                 │    WEBSITE     RECRUITMENT    USERS
                 │       │            │            │
                 │    Home/About   Applicants    HR
                 │    Contact      Status        Admin
                 │       │            │
                 │       └────────────┼────────────┘
                 │                    │
                 └────────────┬───────┘
                              │
                         NOTIFICATIONS
                         ┌────┴────┐
                         │         │
                       EMAIL    WHATSAPP
```

---

# 69. HASIL AKHIR YANG DIHARAPKAN

Hasil akhir harus berupa aplikasi yang:

* Responsive
* Modern
* Professional
* User friendly
* Estetik
* Smooth animation
* Mobile friendly
* Glassmorphism
* Fast loading
* Secure
* SEO friendly untuk public page
* Accessible
* Memiliki loading screen
* Memiliki success page
* Tidak menggunakan alert browser
* Memiliki authentication
* Memiliki role-based access
* Memiliki recruitment system
* Memiliki user dashboard
* Memiliki HR dashboard
* Memiliki Admin dashboard
* Memiliki Super Admin
* Memiliki CMS company profile
* Memiliki contact/order management
* Memiliki recruitment management
* Memiliki applicant tracking
* Memiliki document management
* Memiliki email notification
* Memiliki WhatsApp notification
* Memiliki activity log
* Memiliki analytics
* Memiliki export data
* Memiliki protected private documents

Yang paling penting:

**Jangan membuat Admin Panel sebagai sistem terpisah.**

Gunakan:

```text
Satu database
Satu Laravel backend
Satu authentication
Satu tabel users
Satu halaman login recruitment
```

dengan:

```text
user
hr
admin
super_admin
```

sebagai role.

Sehingga admin login melalui:

```text
/recruitment/login
```

dan setelah berhasil login otomatis diarahkan ke:

```text
/recruitment/admin/dashboard
```

sedangkan applicant diarahkan ke:

```text
/recruitment/dashboard
```
