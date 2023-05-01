function redirect_to(v)
{
    switch (v) {
        case 'instagram':
            location.href = 'https://www.instagram.com/_fox.one_/';
            break;
        case 'github':
            location.href = 'https://github.com/Tech0ne/';
            break;
        case 'linkedin':
            location.href = 'https://www.linkedin.com/in/cl%C3%A9ment-piasco-7362b3258';
            break;
        default:
            location.href = '/404.html';
            break;
    }
}