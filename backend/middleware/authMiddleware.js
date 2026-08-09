const { readLocalDb } = require('../db');
const User = require('../models/User');

function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

/**
 * requireAuth — Validates session cookie.
 * Attaches req.user to the request. Returns 401 if invalid.
 */
async function requireAuth(req, res, next) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionId = cookies.velora_refresh_token;

    if (!sessionId) {
      return res.status(401).json({ error: 'Authentication required. Please login.' });
    }

    const db = readLocalDb();
    const session = (db.sessions || []).find(s => s.sessionId === sessionId && !s.isRevoked);

    if (!session) {
      return res.status(401).json({ error: 'Invalid or revoked session. Please login again.' });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({ error: 'Session expired. Please login again.' });
    }

    let user;
    try {
      user = await User.findOne({ id: session.userId }).select('-password');
    } catch (e) {
      const localUser = (db.users || []).find(u => u.id === session.userId);
      if (localUser) {
        const { password, ...safe } = localUser;
        user = safe;
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'User account not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Authentication error.' });
  }
}

/**
 * requireAdmin — Ensures the request comes from a logged-in admin or superadmin.
 * Returns 401 if not authenticated, 403 if authenticated but not admin.
 */
async function requireAdmin(req, res, next) {
  // First run requireAuth inline (no nested wrapping)
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies.velora_refresh_token;

  if (!sessionId) {
    return res.status(401).json({ error: 'Authentication required. Please login.' });
  }

  try {
    const db = readLocalDb();
    const session = (db.sessions || []).find(s => s.sessionId === sessionId && !s.isRevoked);

    if (!session) {
      return res.status(401).json({ error: 'Invalid or revoked session.' });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.status(401).json({ error: 'Session expired. Please login again.' });
    }

    let user;
    try {
      user = await User.findOne({ id: session.userId }).select('-password');
    } catch (e) {
      const localUser = (db.users || []).find(u => u.id === session.userId);
      if (localUser) {
        const { password, ...safe } = localUser;
        user = safe;
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'User account not found.' });
    }

    // Check admin role
    if (user.userType !== 'superadmin' && user.userType !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Authentication error.' });
  }
}

module.exports = { requireAuth, requireAdmin };
