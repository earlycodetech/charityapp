const toDateTime = (stamp) => {
    const date = new Date(stamp);
    const dateObj = date.toDateString();
    const timeObj = date.toLocaleTimeString();

    return `${timeObj}, ${dateObj}`
}

export { toDateTime }