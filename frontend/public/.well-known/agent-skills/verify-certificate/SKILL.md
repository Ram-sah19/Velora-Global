---
name: verify-certificate
description: Verify a Velora Global internship or training certificate by checking its ID against the company's public verification endpoint.
---

# Verify Certificate Skill

Use this skill to confirm whether a certificate ID was issued by Velora Global, and to read the record held against it: recipient, program, domain, issue date, duration and grade.

The endpoint is a lookup service. It returns the record on file; it does not return a cryptographic signature or proof of authenticity beyond that record.

## Endpoint
- **URL**: `https://velora-global.online/api/certificates/verify/:certificateId`
- **Method**: `GET`
- **Headers**: `Accept: application/json`

## Example Request
```http
GET /api/certificates/verify/VG-2026-88491 HTTP/1.1
Host: velora-global.online
Accept: application/json
```

## Response Schema
Field names and nesting match the live payload; the values below are illustrative placeholders, not a real recipient's record.
```json
{
  "valid": true,
  "certificate": {
    "certificateId": "VG-2026-88491",
    "studentName": "Certificate Recipient",
    "programTitle": "Full Stack Development Internship",
    "domain": "Full Stack Development",
    "issueDate": "2026-08-05T00:00:00.000Z",
    "duration": "8 Weeks",
    "grade": "A+",
    "founderSignature": "<signatory name>",
    "founderTitle": "Founder & CEO",
    "coFounders": ["<co-founder name>", "<co-founder name>"],
    "verificationUrl": "https://velora-global.online/api/certificates/verify/VG-2026-88491"
  },
  "issuer": "Velora Global",
  "verifiedAt": "2026-09-28T09:49:02.921Z"
}
```
An ID with no record returns `404` with `{"valid": false, "message": "Certificate ID not found in Velora Global records"}`.
