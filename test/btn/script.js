let generatedLink = '';

document.getElementById('linkButton').addEventListener('click', function() {
    const button = this;

    if (generatedLink) {
        copyToClipboard(generatedLink);
        return;
    }

    button.innerHTML = '<div class="loader"></div>';
    
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
});

function copyToClipboard(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Link copied to clipboard!'); 
    });
}
