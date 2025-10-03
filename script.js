/**
 * Tab navigation functionality
 * Opens the selected tab and hides others
 */
function openTab(event, tabName) {
    // Get all tab content elements
    const tabContents = document.getElementsByClassName('tab-content');
    
    // Hide all tab contents
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Get all tab buttons
    const tabButtons = document.getElementsByClassName('tab-button');
    
    // Remove active class from all buttons
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to the clicked button
    event.currentTarget.classList.add('active');
}

// Optional: Add keyboard navigation for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let newIndex;
            
            // Arrow key navigation
            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }
        });
    });
});
