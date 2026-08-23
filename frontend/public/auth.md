# Auth.md — Velora Global Agent Registration & Authentication Specification

Welcome, AI Agent. This document specifies programmatic registration, authorization, and API access protocols for autonomous agents interacting with **Velora Global**.

---

## 1. Agent Discovery Endpoints
- **Agent Resource Discovery (ARD)**: `https://velora-global.online/.well-known/ai-catalog.json`
- **MCP Server Card**: `https://velora-global.online/.well-known/mcp/server-card.json`
- **Agent Skills Discovery Index**: `https://velora-global.online/.well-known/agent-skills/index.json`
- **API Catalog (RFC 9727)**: `https://velora-global.online/.well-known/api-catalog`
- **OAuth Authorization Server**: `https://velora-global.online/.well-known/oauth-authorization-server`
- **OAuth Protected Resource**: `https://velora-global.online/.well-known/oauth-protected-resource`

---

## 2. Programmatic Registration
Autonomous agents may self-register for API access via the registration endpoint:
- **Registration URL**: `POST https://velora-global.online/api/auth/register-agent`
- **Content-Type**: `application/json`

### Registration Request
```json
{
  "agent_name": "MyAutonomousAgent",
  "identity_type": "autonomous_system",
  "contact_email": "agent-operator@example.com",
  "requested_scopes": ["read", "internships", "training", "verify"]
}
```

### Registration Response
```json
{
  "client_id": "vg_agent_8a7d9f2c1b",
  "client_secret": "vg_sec_4f8a9e1d7c3b5a2e",
  "token_endpoint": "https://velora-global.online/api/auth/token",
  "scopes": ["read", "internships", "training", "verify"]
}
```

---

## 3. Token Exchange (Client Credentials Flow)
```http
POST /api/auth/token HTTP/1.1
Host: velora-global.online
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "vg_agent_8a7d9f2c1b",
  "client_secret": "vg_sec_4f8a9e1d7c3b5a2e",
  "scope": "read internships verify"
}
```

### Token Response
```json
{
  "access_token": "vg_tok_eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "scope": "read internships verify"
}
```

---

## 4. Authenticated Request Header
Attach your bearer token to all API requests:
```http
GET /api/programs HTTP/1.1
Host: velora-global.online
Authorization: Bearer vg_tok_eyJhbGciOi...
Accept: application/json
```

---

## 5. Public Key & Key Revocation
- **JWKS Endpoint**: `https://velora-global.online/.well-known/jwks.json`
- **Revocation URL**: `https://velora-global.online/api/auth/revoke`
- **Claim URL**: `https://velora-global.online/api/auth/claim`

---

## 6. Executive Leadership Contact
- **Founder & CEO**: Ram Sah (`ram@veloraglobal.com`)
- **Co-Founder & CTO**: Krishna Sah (`krishna@veloraglobal.com`)
- **Co-Founder & COO**: Rohit Sah (`rohit@veloraglobal.com`)
- **Contracts & Operations Director**: Shivshankar Sah (`shivshankar@veloraglobal.com`)
