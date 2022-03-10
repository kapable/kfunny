export let backUrl;

if(process.env.NODE_ENV === 'development') {
    backUrl = 'http://localhost:80';
} else {
    backUrl = 'https://13.209.4.3';
}