function copyToClipboard(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
    });
}

export { copyToClipboard }