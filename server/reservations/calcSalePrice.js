module.exports = (price, nights, apartment) => {
    return price * nights - (200 * nights);
};