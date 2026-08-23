---
name: verify-certificate
description: Verify student internship certificates and completion credentials with tamper-proof cryptographic signatures from Velora Global.
---

# Verify Certificate Skill

Use this skill to verify the authenticity, recipient details, domain specialization, grade, and signature validity of any Velora Global credential.

## Endpoint
- **URL**: `https://velora-global.online/api/certificates/:certificateId`
- **Method**: `GET`
- **Headers**: `Accept: application/json`

## Example Request
```http
GET /api/certificates/VG-2026-88491 HTTP/1.1
Host: velora-global.online
Accept: application/json
```

## Response Schema
```json
{
  "valid": true,
  "certificateId": "VG-2026-88491",
  "studentName": "Aarav Sharma",
  "programTitle": "Full Stack Development Internship",
  "domain": "Full Stack Development",
  "issueDate": "2026-08-05",
  "duration": "8 Weeks",
  "grade": "A+",
  "founderSignature": "Ram Sah",
  "founderTitle": "Founder & CEO"
}
```
