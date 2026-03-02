document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Project Gallery Slider
    const slides = document.querySelectorAll('.project-gallery .slide');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    }

    // 2. Skill Rings (Using Vanilla JS with ProgressBar.js)
    const skillRings = document.querySelectorAll('.skill-ring');
    
    skillRings.forEach(ringEl => {
        const skill = ringEl.getAttribute('data-skill');
        const level = parseInt(ringEl.getAttribute('data-level'), 10);
        
        // Create inner elements
        const label = document.createElement('div');
        label.className = 'label';
        label.innerText = skill;

        const levelText = document.createElement('div');
        levelText.className = 'level-text';
        levelText.innerText = `${level}%`;

        ringEl.appendChild(levelText);
        ringEl.appendChild(label);

        // Initialize ProgressBar
        const circle = new ProgressBar.Circle(ringEl, {
            strokeWidth: 6,
            color: '#2563eb', // Matches your new primary CSS variable
            trailColor: '#e5e7eb',
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            from: { color: '#93c5fd', width: 6 },
            to: { color: '#2563eb', width: 6 },
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
            }
        });

        // Use IntersectionObserver to animate only when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    circle.animate(level / 100);
                    observer.unobserve(ringEl); // Animate only once
                }
            });
        }, { threshold: 0.5 });

        observer.observe(ringEl);
    });

    // 3. Experience Timeline Accordion
    const timelineHeaders = document.querySelectorAll('.timeline-header');

    timelineHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Optional: Close other open items (uncomment to behave like an exclusive accordion)
            // document.querySelectorAll('.timeline-item').forEach(otherItem => {
            //     if (otherItem !== item) otherItem.classList.remove('active');
            // });

            // Toggle the clicked item
            item.classList.toggle('active');
        });
    });
});
