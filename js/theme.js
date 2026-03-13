document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    const savedTheme = window.cookieModule.get('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        window.cookieModule.set('theme', newTheme, 365);
        updateThemeButton(newTheme);
    });
    
    function updateThemeButton(theme) {
        themeToggle.textContent = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
    }
});