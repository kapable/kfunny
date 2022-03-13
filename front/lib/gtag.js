// lib/gtag.js

export const GA_TRACKING_ID = "G-L6J2W308LR";


// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label }) => {
    window.gtag("event", action, {
        event_category: category,
        event_label: label,
    });
};