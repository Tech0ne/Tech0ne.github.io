function openNewTab(url) {
    window.open(url, '_blank').focus();
}

function redirect_to(v)
{
    switch (v) {
        case 'instagram':
            openNewTab('https://www.instagram.com/_fox.one_/');
            break;
        case 'github':
            openNewTab('https://github.com/Tech0ne/');
            break;
        case 'linkedin':
            openNewTab('https://www.linkedin.com/in/clément-piasco');
            break;
        default:
            location.href = '/404.html';
            break;
    }
}

function scrolto(id)
{
    const e = document.getElementById(id);
    e.scrollIntoView({behavior: 'smooth'});
}
