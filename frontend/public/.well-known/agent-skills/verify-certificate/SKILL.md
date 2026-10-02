---
name: verify-certificate
description: Verify a Velora Global internship or training certificate by checking its ID against the company's public verification endpoint.
---

# Verify Certificate Skill

Use this skill to confirm whether a certificate ID was issued by Velora Global, and to read the record held against it: recipient, program, issue date and duration.

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
  "success": true,
  "verified": true,
  "certificate": {
    "certificateId": "VG-2026-88491",
    "name": "Certificate Recipient",
    "program": "Full Stack Development Internship",
    "duration": "8 Weeks",
    "issuedDate": "2026-08-05",
    "organization": "Velora Global"
  }
}
```
An ID with no record returns `404` with `{"success": true, "verified": false, "message": "Certificate not found"}`, and an address that is not a certificate ID returns `400` with `{"success": true, "verified": false, "message": "Not a valid certificate ID"}`.

Recipients and employers can read the same record in a browser at `https://velora-global.online/verify/:certificateId` — that is the URL printed as the certificate QR code.
