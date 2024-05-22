document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('projects-container')) {
      fetchGitHubRepos('your-username');
  }

  const searchInput = document.getElementById('search');
  if (searchInput) {
      searchInput.addEventListener('input', handleSearch);
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', handleContactFormSubmit);
  }
});

function fetchGitHubRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(repos => {
          const container = document.getElementById('projects-container');
          repos.forEach(repo => {
              const projectCard = document.createElement('div');
              projectCard.className = 'card';
              projectCard.innerHTML = `
                  <h3>${repo.name}</h3>
                  <p>${repo.description || 'No description available'}</p>
                  <a href="${repo.html_url}" target="_blank">View on GitHub</a>
              `;
              container.appendChild(projectCard);
          });
      })
      .catch(error => console.error('Error fetching repos:', error));
}

function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? 'block' : 'none';
  });
}

function handleContactFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  // Implement the functionality to send form data to your server or email service
  console.log('Contact Form Data:', data);

  // Clear the form after submission
  event.target.reset();

  alert('Thank you for your message!');
}