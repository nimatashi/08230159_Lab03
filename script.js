/**
 * NimTash Personal Portfolio - Lab 03 Enhancements (script.js)
 * * Contains JavaScript logic for:
 * 1. Dynamic Greeting (Home Page)
 * 2. Theme Toggle (AboutMe Page)
 * 3. Read More/Less (Education Page)
 * 4. Skill Description on Click/Hover (Skills Page)
 * 5. Contact Form Submission Feedback (Contact Page)
 */

// Function to handle the Dynamic Greeting on the Home Page
const setGreeting = () => {
    const greetingElement = document.getElementById('greeting-message');
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning! ☀️ Ready for a productive day.";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon! ☕ Hope you're having a great day.";
    } else {
        greeting = "Good evening! 🌙 Thanks for visiting my portfolio.";
    }

    greetingElement.textContent = greeting;
};

// Function to handle the Theme Toggle (Dark/Light Mode)
const setupThemeToggle = () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleButton) toggleButton.textContent = 'Light Mode 💡';
    } else {
        if (toggleButton) toggleButton.textContent = 'Dark Mode 🌙';
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            const newTheme = isDarkMode ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            toggleButton.textContent = isDarkMode ? 'Light Mode 💡' : 'Dark Mode 🌙';
        });
    }
};

// Function to handle Read More/Less feature for Education descriptions
const setupReadMore = () => {
    const descriptions = document.querySelectorAll('.edu-text p');

    descriptions.forEach(p => {
        // Only apply if the content is long enough (simple check)
        if (p.textContent.length > 200) {
            // 1. Wrap content in a truncated class
            p.classList.add('truncated');
            
            // 2. Create the button
            const button = document.createElement('button');
            button.className = 'read-more-btn';
            button.textContent = 'Read More';
            
            // 3. Insert button after the paragraph
            p.parentNode.insertBefore(button, p.nextSibling);

            // 4. Add event listener
            button.addEventListener('click', () => {
                const isExpanded = p.classList.toggle('expanded');
                button.textContent = isExpanded ? 'Read Less' : 'Read More';
            });
        }
    });
};

// Function to handle Skill Descriptions on the Skills Page
const setupSkillDescriptions = () => {
    const skills = document.querySelectorAll('.skill');
    const descriptionBox = document.getElementById('skill-description');
    
    if (!descriptionBox) return;

    const descriptions = {
        'HTML': 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It forms the structure of a webpage.',
        'CSS': 'CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. It handles the look and feel.',
        'JavaScript': 'JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It is used to make web pages interactive and dynamic.',
    };

    descriptionBox.textContent = 'Click on a skill to see a brief description.'; // Default message

    skills.forEach(skill => {
        const skillName = skill.textContent.trim();
        const description = descriptions[skillName] || `Description for ${skillName} is not available.`;

        // Event listener for click (as per requirement, click is often better for mobile)
        skill.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default link behavior
            descriptionBox.textContent = description;
        });

        // Event listener for mouseover (optional, for desktop hover effect)
        skill.addEventListener('mouseover', () => {
            descriptionBox.textContent = description;
        });
        
        // Reset on mouseout
        skill.addEventListener('mouseout', () => {
            descriptionBox.textContent = 'Click on a skill to see a brief description.';
        });
    });
};

// Function to handle Contact Form Submission Feedback
const setupContactForm = () => {
    const form = document.querySelector('.contact-card form');
    const feedback = document.getElementById('form-feedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        feedback.style.display = 'none';

        try {
            // Using a simple fetch to the formspree endpoint
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                feedback.textContent = 'Message sent successfully! Thank you. 😊';
                feedback.style.color = '#00796b';
                form.reset();
            } else {
                feedback.textContent = 'Oops! There was an error sending your message. 😔';
                feedback.style.color = '#d32f2f';
            }
        } catch (error) {
            feedback.textContent = 'Network error. Please try again later.';
            feedback.style.color = '#d32f2f';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            feedback.style.display = 'block';
        }
    });
};

// Main function to run all scripts
const initPortfolio = () => {
    // Check the current page and run relevant functions
    const currentPage = document.body.className;

    setupThemeToggle(); // Runs on all pages (to apply theme) but toggle button is only on AboutMe

    if (currentPage.includes('home')) {
        setGreeting();
    }
    
    // The education fade-in script is in education.html, we just need to set up read more
    if (currentPage.includes('education')) {
        setupReadMore();
    }

    if (currentPage.includes('skills')) {
        setupSkillDescriptions();
    }

    if (currentPage.includes('contact')) {
        setupContactForm();
    }
};

// Run the initialization function when the page loads
document.addEventListener('DOMContentLoaded', initPortfolio);