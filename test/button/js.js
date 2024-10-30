function generateLink() {
    const buttonContainer = document.querySelector('.button-container');
    
    // Show loading animation
    buttonContainer.classList.add('loading');
  
    // Simulate a delay for the link generation (e.g., 2 seconds)
    setTimeout(() => {
      // Hide loading and show copy icon
      buttonContainer.classList.remove('loading');
      buttonContainer.classList.add('loaded');
    }, 2000);
  }
  