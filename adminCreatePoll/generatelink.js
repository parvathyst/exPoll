const baseUrl = 'https://www.example.com'; 
const generateButton = document.getElementById('generate-button');
const linkContainer = document.getElementById('show');
let uniqueLink = ''; 


generateButton.addEventListener('click', () => {
    // const uniqueId = generateUniqueId();
    const uniqueId = 2;
    uniqueLink = `${baseUrl}?id=${uniqueId}`;

    const linkElement = document.createElement('div');
    linkElement.classList.add('link-box'); 
    linkElement.innerHTML =`
        <a href="${uniqueLink}" target="_blank" style="color:white">${uniqueLink}</a>
    `;
    // linkContainer.value = linkElement
    
    linkContainer.appendChild(linkElement);
});

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