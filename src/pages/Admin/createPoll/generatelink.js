
function generateLink(key) {

    const baseUrl = 'https://www.example.com';
    const linkContainer = document.getElementById('show');
    let uniqueLink = '';

    const uniqueId = key;
    uniqueLink = `${baseUrl}?id=${uniqueId}`;

    const linkElement = document.createElement('div');
    linkElement.classList.add('link-box');
    linkElement.innerHTML = `
        <a href="${uniqueLink}" target="_blank" style="color:white">${uniqueLink}</a>
    `;
    // linkContainer.value = linkElement

    linkContainer.appendChild(linkElement);


    // function generateUniqueId() {
    //     return Math.random().toString(36).substr(2,9); // Generates a random unique ID
    // }

    const copyButton = document.getElementById('copy-button');

    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(uniqueLink)
            .then(() => {
                alert('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });

}


let generatedLink = '';

function generateLink2() {

    const button = document.getElementById('linkButton');

    if (generatedLink) {
        copyToClipboard(generatedLink);
        return;
    }

    button.innerHTML = '<div class="loader"></div>';

    // Simulate link generation
    setTimeout(() => {
        generatedLink = "https://example.com/generated-link"; // Generate link
        button.innerHTML = `
            <span class="copy-icon">📋</span>
            <span class="vertical-line"></span>
            ${generatedLink}
        `;

        // Show copy icon and vertical line
        const copyIcon = button.querySelector('.copy-icon');
        const verticalLine = button.querySelector('.vertical-line');

        copyIcon.style.display = 'inline';
        verticalLine.style.display = 'inline';

        // Trigger reflow to apply transition
        void copyIcon.offsetWidth; // Trigger reflow
        void verticalLine.offsetWidth; // Trigger reflow
        copyIcon.style.opacity = '1';
        verticalLine.style.opacity = '1';
    }, 2000); // Simulate 2 seconds for link generation
}

function copyToClipboard(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!');
    });
}

// export { generateLink }