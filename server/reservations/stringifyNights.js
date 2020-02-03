module.exports = (start, end) => {
    const oneDay = 1000 * 60 * 60 * 24;
    let visitingTime = end.getTime() - start.getTime();
    visitingTime = visitingTime / oneDay;
    visitingTime = visitingTime - (visitingTime % 1);

    return visitingTime + " ночей";
};