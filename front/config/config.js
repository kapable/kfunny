export let backUrl;

if(process.env.NODE_ENV === 'development') {
    backUrl = 'http://13.209.4.3:80';
} else {
    backUrl = 'https://api.niair.xyz';
}