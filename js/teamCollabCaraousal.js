fetch('./json/collaboration.json')
  .then(response => response.json())
  .then(data => {
    const scrollContainer = document.querySelector('.home-highlight');

    data.forEach((item, index) => {
      const link = document.createElement('a');
      link.href = item.link;
      link.target = '_blank';
      link.style.textAlign = 'center'; // Align text for name below the image

      // Create the image element
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = `Image ${index + 1}`;
      img.dataset.description = item.description;

      // Create the name element
      const name = document.createElement('div');
      name.textContent = item.name;
      name.style.marginTop = '10px'; // Add spacing between the image and the name
      name.style.fontSize = '18px'; // Set a font size for the name
      name.style.fontWeight = 'bold'; // Make the name bold

      // Append the image and name to the link
      link.appendChild(img);
      link.appendChild(name);
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
