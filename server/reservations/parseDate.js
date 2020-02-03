module.exports = dateString => {
    if (!dateString) return null;

    try {
        dateString = dateString.match(/([0-9]+).([0-9]+).([0-9]+)/);
        if (!dateString || dateString.length !== 4) return null;

        return new Date(Date.UTC(+dateString[1], +dateString[2], +dateString[3], 10, 0, 0));
    }
    catch (e) {
        return null;
    }
};