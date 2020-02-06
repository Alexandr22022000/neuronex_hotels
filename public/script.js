document.addEventListener("DOMContentLoaded", () => {
});

UI.addOnLoadListener(() => {
    UI.setDates({start: new Date(), end: new Date(Date.now() + 2*24*60*60*1000), nights: 2});
    UI.setGuests(2, 0);
    UI.setLink("/");
});

UI.onUpdateDate = (value, key) => console.log(value, key);
