document.addEventListener("DOMContentLoaded", () => {
    UI.setDates({start: new Date(), end: new Date(Date.now() + 2*24*60*60*1000), days: 2});
});

UI.onUpdateDate = (value, key) => console.log(value, key);
