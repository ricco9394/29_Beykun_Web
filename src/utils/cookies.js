const COOKIE_PATH = '/';

export function setCookie(name, value, days, path = COOKIE_PATH) {
  try {
    let expires = '';
    if (days > 0) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}${expires}; path=${path}`;
  } catch {
    /* ignore */
  }
}

export function getCookie(name) {
  try {
    const nameEq = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEq)) {
        return decodeURIComponent(cookie.slice(nameEq.length));
      }
    }
    return null;
  } catch {
    return null;
  }
}
