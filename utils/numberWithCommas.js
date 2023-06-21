const numberWithCommas = (num) => {
    let numValue = num == undefined ? 0 : num;
    return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { numberWithCommas }