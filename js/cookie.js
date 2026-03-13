function setCookie(name, value, days, path = '/') {
    try {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=' + path;
    } catch (error) {
        console.error('Ошибка при установке cookie:', error);
    }
}

function getCookie(name) {
    try {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    } catch (error) {
        console.error('Ошибка при получении cookie:', error);
        return null;
    }
}

function deleteCookie(name, path = '/') {
    setCookie(name, '', -1, path);
}

function hasCookie(name) {
    return getCookie(name) !== null;
}

function getAllCookies() {
    const cookies = {};
    try {
        document.cookie.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name && value) {
                cookies[name] = decodeURIComponent(value);
            }
        });
    } catch (error) {
        console.error('Ошибка при получении всех cookie:', error);
    }
    return cookies;
}

window.cookieModule = {
    set: setCookie,
    get: getCookie,
    delete: deleteCookie,
    has: hasCookie,
    getAll: getAllCookies
};