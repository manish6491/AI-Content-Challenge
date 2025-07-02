// FAQ Toggle Functionality
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // If the clicked item wasn't active, open it
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add scroll effect to navigation
  let lastScrollTop = 0;
  const nav = document.querySelector('.nav');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.stat-card, .tool-category, .workflow-step, .trend-card, .practice-item');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
  
  // Add hover effects to interactive elements
  const interactiveCards = document.querySelectorAll('.stat-card, .tool-category, .practice-item, .trend-card');
  
  interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add parallax effect to hero section
  const hero = document.querySelector('.hero');
  const heroBackground = document.querySelector('.hero-background');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });
  
  // Initialize Charts
  initializeCharts();
});

// Chart Initialization
function initializeCharts() {
  // Tool Usage Pie Chart
  const toolCtx = document.getElementById('toolUsageChart');
  if (toolCtx) {
    new Chart(toolCtx, {
      type: 'pie',
      data: {
        labels: ['ChatGPT', 'Grammarly (AI mode)', 'Microsoft Copilot', 'Claude AI', 'GitHub Copilot'],
        datasets: [{
          data: [66, 25, 25, 12, 11],
          backgroundColor: [
            '#4A90E2',
            '#607D8B',
            '#00BCD4',
            '#4CAF50',
            '#FF9800'
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRation: 1,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  // Evolution Histogram
  const evolutionCtx = document.getElementById('evolutionChart');
  if (evolutionCtx) {
    new Chart(evolutionCtx, {
      type: 'bar',
      data: {
        labels: ['2023', '2024', '2025'],
        datasets: [{
          label: '% under-30 adults using ChatGPT',
          data: [33, 43, 58],
          backgroundColor: '#4A90E2',
          borderColor: '#2D6BBF',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.y + '% adoption rate';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 70,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            },
            grid: {
              color: '#E1E8ED'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Academic Integrity Infographic
  const integrityCtx = document.getElementById('integrityChart');
  if (integrityCtx) {
    new Chart(integrityCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Have formal AI policy (28%)',
          'Developing policy (32%)',
          'No policy (40%)'
        ],
        datasets: [{
          data: [28, 32, 40],
          backgroundColor: [
            '#4CAF50',
            '#FF9800',
            '#F44336'
          ],
          borderWidth: 3,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                family: 'Inter',
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label;
              }
            }
          }
        }
      }
    });
  }
}

// Add click ripple effect to buttons and interactive elements
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');
  
  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) {
    ripple.remove();
  }
  
  button.appendChild(circle);
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .faq-question {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Apply ripple effect to FAQ buttons
document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
});
