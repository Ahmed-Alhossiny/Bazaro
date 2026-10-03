const KEY = "bazaro_guest_wishlist";

export const GUEST_WISHLIST_EVENT = "guest-wishlist-change";

export function getGuestWishlist(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    const ids: string[] = [];

    for (let i = 0; i < parsed.length; i++) {
      if (typeof parsed[i] === "string") {
        ids.push(parsed[i]);
      }
    }

    return ids;
  } catch (error) {
    return [];
  }
}

export function setGuestWishlist(ids: string[]) {
  if (typeof window === "undefined") return;

  try {
    if (ids.length === 0) {
      window.localStorage.removeItem(KEY);
    } else {
      window.localStorage.setItem(KEY, JSON.stringify(ids));
    }
  } catch (error) {
    return;
  }

  window.dispatchEvent(new Event(GUEST_WISHLIST_EVENT));
}

export function isInGuestWishlist(prodId: string): boolean {
  const ids = getGuestWishlist();

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === prodId) return true;
  }

  return false;
}

export function toggleGuestWishlist(prodId: string): boolean {
  const ids = getGuestWishlist();
  const next: string[] = [];
  let found = false;

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] === prodId) {
      found = true;
    } else {
      next.push(ids[i]);
    }
  }

  if (!found) {
    next.push(prodId);
  }

  setGuestWishlist(next);

  return !found;
}

export function removeFromGuestWishlist(prodId: string) {
  const ids = getGuestWishlist();
  const next: string[] = [];

  for (let i = 0; i < ids.length; i++) {
    if (ids[i] !== prodId) {
      next.push(ids[i]);
    }
  }

  setGuestWishlist(next);
}
