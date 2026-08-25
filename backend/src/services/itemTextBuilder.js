function buildItemText(item) {
    const name = item.name?.trim() || "";
    const category = item.category?.trim() || "";
    const location = item.location?.trim() || "";

    return [
        name,
        category ? `Category: ${category}` : "",
        location ? `Location: ${location}` : ""
    ]
        .filter(Boolean)
        .join(". ");
}

module.exports = {
    buildItemText
};