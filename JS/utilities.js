function logError(error) {
    console.error("Error:", error);
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

export { logError, formatDate };
