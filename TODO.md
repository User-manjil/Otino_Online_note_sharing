# Otino Full Web App

## Completed
- Implemented auth-aware UserContext + token handling.
- Added Login + Register pages.
- Updated Navbar to show login/logout.
- Implemented real API-driven Home (featured notes), BrowseNote (search + list), NoteDetail (full note description + listings + buy flow), Profile (my orders + create listings).
- Added frontend API helper `frontend/src/lib/api.js`.
- Build succeeds: `frontend`.

## Remaining (backend)
- Payment gateway placeholder UI is implemented as “pending order created”.
- Implement payment simulation (optional): update `orders.update_status.php` from frontend after a fake “payment success” step.

## Remaining (frontend)
- Add a proper “Sell” note picker UI (currently requires note_id input).
- Add order status actions for seller/buyer (fulfilled/cancelled) using backend `orders/update_status.php` (not wired yet).

