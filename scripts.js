$(document).ready(function() {
  // Skill Progress Animation
  $('.progress-bar .progress').each(function() {
      var width = $(this).css('width');
      $(this).css('width', '0');
      $(this).animate({ width: width }, 2000);
  });

  // Experience Gallery Slider
  var exSlides = $('.experience-gallery .exp-slide');
  var currentExpIndex = 0;

  function showExpSlide(index) {
    exSlides.removeClass('active');
    exSlides.eq(index).addClass('active');
  }

  $('.exp-next').click(function() {
      currentExpIndex = (currentExpIndex + 1) % exSlides.length;
      showExpSlide(currentExpIndex);
  });

  $('.exp-prev').click(function() {
      currentExpIndex = (currentExpIndex - 1 + exSlides.length) % exSlides.length;
      showExpSlide(currentExpIndex);
  });

  // Project Gallery Slider
  var slides = $('.project-gallery .slide');
  var currentIndex = 0;

  function showSlide(index) {
      slides.removeClass('active');
      slides.eq(index).addClass('active');
  }

  $('.next').click(function() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
  });

  $('.prev').click(function() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
  });

  // Initial display
  showSlide(currentIndex);

  // Skills Hover Effect
  $('.skill').hover(
      function() {
          var description = $(this).data('description');
          $('#skill-description').text(description).show();
      },
      function() {
          $('#skill-description').hide();
      }
  );

  // Skills Chart
  // var ctx = document.getElementById('skillsChart').getContext('2d');
  // var skillsChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: ['Java', 'Ruby', 'Python', 'JavaScript', 'C++'],
  //         datasets: [{
  //             label: 'Proficiency',
  //             data: [90, 85, 80, 75, 70],
  //             backgroundColor: [
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });

  // Skill Rings
  $('.skill-ring').each(function() {
      var skill = $(this).data('skill');
      var level = $(this).data('level');
      var ring = $('<div class="ring"></div>');
      var label = $('<div class="label" style="color: #4caf50"></div>').text(skill);
      var levelText = $('<div class="level-text"></div>').text(level + '%');

      ring.append(levelText).append(label);
      $(this).append(ring);

      var circle = new ProgressBar.Circle(ring[0], {
          strokeWidth: 6,
          color: '#4caf50',
          trailColor: '#eee',
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 1400,
          from: { color: '#FFEA82', width: 1 },
          to: { color: '#ED6A5A', width: 6 },
          // Set default step function for all animate calls
          step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              // var value = Math.round(circle.value() * 100);
              // if (value === 0) {
              //     circle.setText('');
              // } else {
              //     circle.setText(value + '%');
              // }

          }
      });

      circle.animate(level / 100);
  });
});
