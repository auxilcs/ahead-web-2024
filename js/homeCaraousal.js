fetch('./json/homecaraousalData.json')
  .then(response => response.json())
  .then(data => {
    const scrollContainer = document.querySelector('.home-highlight');

    data.forEach((image, index) => {
      const link = document.createElement('a');
      link.href = image.link;
      link.target = '_blank';

      const img = document.createElement('img');
      img.src = image.image;
      img.alt = `Image ${index + 1}`;
      img.dataset.description = image.description;

      link.appendChild(img);
      scrollContainer.appendChild(link);
    });

    const images = scrollContainer.children;
    let currentImage = 0;
    let imageWidth = images[0].offsetWidth + 20; // + 20 for 10px padding on each side

    // Flag to prevent scroll interruptions during animation
    let isAnimating = false;

    function updateScrollPosition(targetImage) {
      if (isAnimating) return; // Prevent interrupting current animation

      isAnimating = true; // Set flag to indicate animation in progress

      const containerWidth = scrollContainer.offsetWidth;
      const targetScroll = targetImage * imageWidth - (containerWidth - imageWidth) / 2;

      // Use smooth scrolling with CSS transitions
      scrollContainer.style.scrollBehavior = 'smooth';
      scrollContainer.scrollLeft = targetScroll;

      // Reset flag after animation completes (adjust duration as needed)
      setTimeout(() => {
        isAnimating = false;
        scrollContainer.style.scrollBehavior = 'auto'; // Reset scroll behavior
      }, 500); // Assume 0.5s transition duration
    }

    updateScrollPosition(currentImage);

    setInterval(() => {
      currentImage = (currentImage + 1) % images.length;
      updateScrollPosition(currentImage);
    }, 3000);
  });