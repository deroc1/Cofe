// Get slider elements
const sliderDots = document.querySelectorAll('.slider-dot');
const prevArrow = document.querySelector('.slider-arrows .arrow:first-child');
const nextArrow = document.querySelector('.slider-arrows .arrow:last-child');
const sliderContent = document.querySelector('.hero-container');
const slideImages = ['img/Slider Image Flat White.png']; // Add more image paths for additional slides

// Create additional slide data (for demonstration)
const slides = [
  {
    title: "Декаф Флет Уайт",
    description: "Свіжозварена кава без кофеїну з Ефіопії з натуральним фермерським молоком - те, що потрібно для розслаблення після важкого робочого дня",
    price: "225грн",
    image: "img/Slider Image Flat White.png"
  },
  {
    title: "Лате Макіато",
    description: "Ніжна молочна пінка, еспресо та трохи терпкості шоколаду - ідеальна комбінація для гарного настрою",
    price: "270грн",
    image: "img/Slider Image Flat White.png" // Use same image for demo
  },
  {
    title: "Еспресо Роман'єр",
    description: "Класичний еспресо з додаванням карамельного сиропу - солодка насолода для справжніх поціновувачів кави",
    price: "195грн",
    image: "img/Slider Image Flat White.png" // Use same image for demo
  }
];

// Variable to track current active dot index
let currentDotIndex = 0;

// Function to update active dot with animation
function updateActiveDot(index) {
  // Remove active class from all dots
  sliderDots.forEach(dot => {
    dot.classList.remove('active');
    // Reset transition for non-active dots
    dot.style.transition = 'width 0.3s ease, background-color 0.3s ease';
  });
  
  // Add active class to the current dot with animation
  const activeDot = sliderDots[index];
  activeDot.classList.add('active');
  
  // Enhance animation for active dot
  activeDot.style.transition = 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease';
  
  // Update current index
  currentDotIndex = index;
  
  // Update slide content with animation
  updateSlideContent(index);
}

// Function to update slide content
function updateSlideContent(index) {
  // Fade out current content
  sliderContent.style.opacity = 0;
  sliderContent.style.transform = 'translateX(-20px)';
  
  // After fade out, update content and fade in
  setTimeout(() => {
    // Update content (title, description, price, image)
    const slide = slides[index];
    const titleElement = document.querySelector('.hero-content h1');
    const descriptionElement = document.querySelector('.hero-content p');
    const priceElement = document.querySelector('.price');
    const imageElement = document.querySelector('.hero-image img');
    
    titleElement.textContent = slide.title;
    descriptionElement.textContent = slide.description;
    priceElement.textContent = slide.price;
    imageElement.src = slide.image;
    
    // Animation for image
    imageElement.style.transform = 'scale(0.95)';
    imageElement.style.opacity = 0;
    
    setTimeout(() => {
      // Fade in content
      sliderContent.style.opacity = 1;
      sliderContent.style.transform = 'translateX(0)';
      
      // Animate image
      imageElement.style.transform = 'scale(1)';
      imageElement.style.opacity = 1;
    }, 50);
  }, 300);
}

// Add CSS for transitions
function addTransitionStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .hero-container {
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .slider-dot {
      transition: width 0.3s ease, background-color 0.3s ease;
      cursor: pointer;
    }
    .hero-image img {
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
    .hero-content h1, 
    .hero-content p, 
    .price-buy {
      transition: transform 0.4s ease, opacity 0.4s ease;
      transition-delay: 0.1s;
    }
    .arrow {
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .arrow:hover {
      transform: scale(1.2);
      color: #5b3da8;
    }
  `;
  document.head.appendChild(styleSheet);
}

// Handle previous arrow click
prevArrow.addEventListener('click', () => {
  // Add click effect
  prevArrow.style.transform = 'scale(0.9)';
  setTimeout(() => {
    prevArrow.style.transform = '';
  }, 150);
  
  // Calculate previous index with cycling
  let prevIndex;
  if (currentDotIndex === 0) {
    prevIndex = sliderDots.length - 1; // Go to last dot if on first
  } else {
    prevIndex = currentDotIndex - 1;
  }
  
  updateActiveDot(prevIndex);
});

// Handle next arrow click
nextArrow.addEventListener('click', () => {
  // Add click effect
  nextArrow.style.transform = 'scale(0.9)';
  setTimeout(() => {
    nextArrow.style.transform = '';
  }, 150);
  
  // Calculate next index with cycling
  let nextIndex;
  if (currentDotIndex === sliderDots.length - 1) {
    nextIndex = 0; // Go to first dot if on last
  } else {
    nextIndex = currentDotIndex + 1;
  }
  
  updateActiveDot(nextIndex);
});

// Add click functionality to dots themselves
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateActiveDot(index);
  });
});

// Auto-rotate slider (optional)
function startAutoRotation(interval = 5000) {
  return setInterval(() => {
    const nextIndex = (currentDotIndex + 1) % sliderDots.length;
    updateActiveDot(nextIndex);
  }, interval);
}

// Initialize slider
function initSlider() {
  addTransitionStyles();
  // Set the first dot as active
  updateActiveDot(0);
  
  // Optional: Start auto-rotation (uncomment to enable)
  // const autoRotationTimer = startAutoRotation();
  
  // Optional: Pause auto-rotation on hover
  // sliderContent.addEventListener('mouseenter', () => clearInterval(autoRotationTimer));
  // sliderContent.addEventListener('mouseleave', () => autoRotationTimer = startAutoRotation());
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSlider);
// Get the price filter elements
const priceRange = document.querySelector('.price-range');
const minPriceInput = document.querySelector('.price-inputs input:first-child');
const maxPriceInput = document.querySelector('.price-inputs input:last-child');
const priceFilterSection = document.querySelector('.price-filter');

// Create and replace with dual range slider
function createDualRangeSlider() {
  // Remove the existing single slider
  priceRange.remove();
  
  // Create the dual range slider container
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'dual-slider-container';
  
  // Create the track and active range
  const sliderTrack = document.createElement('div');
  sliderTrack.className = 'slider-track';
  
  const sliderRange = document.createElement('div');
  sliderRange.className = 'slider-range';
  
  // Create min and max thumbs
  const minThumb = document.createElement('input');
  minThumb.type = 'range';
  minThumb.className = 'range-input min-range';
  minThumb.min = 0;
  minThumb.max = 900;
  minThumb.value = 0;
  
  const maxThumb = document.createElement('input');
  maxThumb.type = 'range';
  maxThumb.className = 'range-input max-range';
  maxThumb.min = 0;
  maxThumb.max = 900;
  maxThumb.value = 900;
  
  // Append elements to the container
  sliderContainer.appendChild(sliderTrack);
  sliderContainer.appendChild(sliderRange);
  sliderContainer.appendChild(minThumb);
  sliderContainer.appendChild(maxThumb);
  
  // Insert the new slider after the filter title
  const filterTitle = document.querySelector('.filter-title');
  filterTitle.after(sliderContainer);
  
  // Add styles
  addDualSliderStyles();
  
  return { minThumb, maxThumb, sliderRange };
}

// Add required CSS styles for the dual slider
function addDualSliderStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .dual-slider-container {
      position: relative;
      width: 100%;
      height: 4px;
      margin: 30px 0;
    }
    
    .slider-track {
      position: absolute;
      width: 100%;
      height: 4px;
      background-color: #E6E6E6;
      border-radius: 2px;
    }
    
    .slider-range {
      position: absolute;
      height: 4px;
      background-color: #7859CF;
      border-radius: 2px;
    }
    
    .range-input {
      position: absolute;
      top: -8px;
      width: 100%;
      -webkit-appearance: none;
      pointer-events: none;
      background: none;
      outline: none;
      height: 20px;
    }
    
    .range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #7859CF;
      border-radius: 50%;
      pointer-events: auto;
      cursor: pointer;
    }
    
    .range-input::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: white;
      border: 2px solid #7859CF;
      border-radius: 50%;
      pointer-events: auto;
      cursor: pointer;
    }
    
    .price-inputs {
      display: flex;
      justify-content: space-between;
      margin-top: 28px;
      align-items: center;
    }
    
    .price-inputs input {
      width: 45%;
      padding: 8px;
      border: 2px solid #7859CF;
      border-radius: 4px;
      text-align: center;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
    
    .price-inputs::between{
      content: "—";
      color: #7859CF;
      font-weight: 300;
    }
  `;
  document.head.appendChild(styleSheet);
}

// Initialize the dual range slider
function initDualRangeSlider() {
  const { minThumb, maxThumb, sliderRange } = createDualRangeSlider();
  
  // Set initial input values
  minPriceInput.value = minThumb.value;
  maxPriceInput.value = maxThumb.value;
  
  // Function to update the slider range and position
  function updateSlider() {
    // Calculate percentage position for UI updates
    const minPercent = (parseInt(minThumb.value) / parseInt(minThumb.max)) * 100;
    const maxPercent = (parseInt(maxThumb.value) / parseInt(maxThumb.max)) * 100;
    
    // Update the slider range appearance
    sliderRange.style.left = minPercent + '%';
    sliderRange.style.width = (maxPercent - minPercent) + '%';
  }
  
  // Update text inputs when sliders move
  minThumb.addEventListener('input', function() {
    // Prevent min thumb from crossing over max thumb
    if (parseInt(minThumb.value) > parseInt(maxThumb.value)) {
      minThumb.value = maxThumb.value;
    }
    minPriceInput.value = minThumb.value;
    updateSlider();
  });
  
  maxThumb.addEventListener('input', function() {
    // Prevent max thumb from crossing over min thumb
    if (parseInt(maxThumb.value) < parseInt(minThumb.value)) {
      maxThumb.value = minThumb.value;
    }
    maxPriceInput.value = maxThumb.value;
    updateSlider();
  });
  
  // Update sliders when text inputs change
  minPriceInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    
    // Validate input values
    if (isNaN(value)) {
      value = 0;
    } else if (value > parseInt(maxThumb.value)) {
      value = parseInt(maxThumb.value);
    }
    
    this.value = value;
    minThumb.value = value;
    updateSlider();
  });
  
  maxPriceInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    
    // Validate input values
    if (isNaN(value) || value > 900) {
      value = 900;
    } else if (value < parseInt(minThumb.value)) {
      value = parseInt(minThumb.value);
    }
    
    this.value = value;
    maxThumb.value = value;
    updateSlider();
  });
  
  // Initial call to set slider appearance
  updateSlider();
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initDualRangeSlider);
// PRODUCT DATA
// Sample product data with all necessary properties for filtering
const products = [
    {
      id: 1,
      title: "Декаф Флет Уайт",
      description: "Кава без кофеїну з Ефіопії з натуральним фермерським молоком",
      price: 225,
      image: "img/good-six.webp",
      milk: "animal", // animal, plant, none
      country: "ethiopia",
      popularity: 87
    },
    {
      id: 2,
      title: "Лате Макіато",
      description: "Ніжна кава з Колумбії з рослинним молоком та карамельним сиропом",
      price: 285,
      image: "img/good-six.webp",
      milk: "plant",
      country: "colombia",
      popularity: 95
    },
    {
      id: 3,
      title: "Капучіно",
      description: "Класичний капучіно з бразильської арабіки з молоком тваринного походження",
      price: 175,
      image: "img/good-six.webp",
      milk: "animal",
      country: "brazil",
      popularity: 92
    },
    {
      id: 4,
      title: "Чорна кава",
      description: "Міцна чорна кава з Перу без додавання молока",
      price: 150,
      image: "img/good-six.webp",
      milk: "none",
      country: "peru",
      popularity: 78
    },
    {
      id: 5,
      title: "Коста-Рика Спешл",
      description: "Органічна кава середнього обсмаження з Коста-Ріки з рослинним молоком",
      price: 320,
      image: "img/good-six.webp",
      milk: "plant",
      country: "costa-rica",
      popularity: 85
    },
    {
      id: 6,
      title: "Бразильський еспресо",
      description: "Насичений еспресо з бразильського зерна преміум класу без молока",
      price: 190,
      image: "img/good-six.webp",
      milk: "none",
      country: "brazil",
      popularity: 89
    }
  ];
  
  // DOM ELEMENTS
  // Get all filter elements
  const milkRadios = document.querySelectorAll('input[name="milk"]');
  const countryCheckboxes = document.querySelectorAll('.country-filter input[type="checkbox"]');
  const sortingSelect = document.querySelector('.sorting-select');
  const applyButton = document.querySelector('.apply-button');
  const resetButton = document.querySelector('.reset-button');
  const productsContainer = document.querySelector('.products');
  
  // FILTER STATE
  // Object to track current filter state
// Add sort direction to filter state
let filterState = {
    minPrice: 0,
    maxPrice: 900,
    milk: "any", // any, animal, plant, none
    countries: ["brazil", "ethiopia", "colombia", "costa-rica", "peru"],
    sortBy: "popularity", // popularity, price, alphabet
    sortDirection: "desc" // desc (descending) or asc (ascending)
  };
  // FILTER FUNCTIONS
  // Function to apply all filters and update product display
  function applyFilters() {
    // Get current filter values
    updateFilterState();
    
    // Filter products based on current filter state
    const filteredProducts = products.filter(product => {
      // Price filter
      const matchesPrice = product.price >= filterState.minPrice && 
                           product.price <= filterState.maxPrice;
      
      // Milk filter
      const matchesMilk = filterState.milk === "any" || 
                         product.milk === filterState.milk;
      
      // Country filter
      const matchesCountry = filterState.countries.includes(product.country);
      
      return matchesPrice && matchesMilk && matchesCountry;
    });
    
    // Sort filtered products
    sortProducts(filteredProducts);
    
    // Display filtered and sorted products
    displayProducts(filteredProducts);
  }
  
  // Function to update filter state from UI elements
  function updateFilterState() {
    // Update price range
    filterState.minPrice = parseInt(minPriceInput.value) || 0;
    filterState.maxPrice = parseInt(maxPriceInput.value) || 900;
    
    // Update milk selection
    const selectedMilk = document.querySelector('input[name="milk"]:checked');
    if (selectedMilk) {
      switch (selectedMilk.id) {
        case 'milk-any':
          filterState.milk = "any";
          break;
        case 'milk-animal':
          filterState.milk = "animal";
          break;
        case 'milk-plant':
          filterState.milk = "plant";
          break;
        case 'milk-no':
          filterState.milk = "none";
          break;
      }
    }
    
    // Update countries selection
    filterState.countries = [];
    countryCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const country = checkbox.id.replace('country-', '');
        filterState.countries.push(country);
      }
    });
    
    // Update sorting option
    filterState.sortBy = sortingSelect.value;
  }
  
  // Function to sort products based on selected criteria
// Updated sort function that considers direction
function sortProducts(productList) {
    switch (filterState.sortBy) {
      case 'за популярністю':
        if (filterState.sortDirection === 'desc') {
          productList.sort((a, b) => b.popularity - a.popularity); // Most popular first
        } else {
          productList.sort((a, b) => a.popularity - b.popularity); // Least popular first
        }
        break;
      case 'за ціною':
        if (filterState.sortDirection === 'desc') {
          productList.sort((a, b) => b.price - a.price); // Highest price first
        } else {
          productList.sort((a, b) => a.price - b.price); // Lowest price first
        }
        break;
      case 'за алфавітом':
        if (filterState.sortDirection === 'desc') {
          productList.sort((a, b) => b.title.localeCompare(a.title)); // Z to A
        } else {
          productList.sort((a, b) => a.title.localeCompare(b.title)); // A to Z
        }
        break;
    }
  }
  
  // Function to display products in the container
  function displayProducts(productList) {
    // Clear products container
    productsContainer.innerHTML = '';
    
    if (productList.length === 0) {
      // Display message if no products match filters
      productsContainer.innerHTML = `
        <div class="no-products-message">
          <h3>Товари не знайдено</h3>
          <p>Спробуйте змінити параметри фільтрації</p>
        </div>
      `;
      return;
    }
    
    // Loop through products and create HTML for each
    productList.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      
      // Create random background color for product image
      const colors = ['#F3EBE1', '#E5E6F8', '#F0EBE5', '#F3EAE8', '#EAE7E7', '#E6E6E6'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      productElement.innerHTML = `
        <div class="product-image" style="background-color: ${randomColor};">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
            <span class="product-price">${product.price}грн</span>
            <button class="add-to-cart">
              В кошик
            </button>
          </div>
        </div>
      `;
      
      productsContainer.appendChild(productElement);
    });
  }
  
  // Function to reset all filters to default values
  function resetFilters() {
    // Reset price inputs
    minPriceInput.value = 0;
    maxPriceInput.value = 900;
    
    // Reset range sliders if they exist
    const minThumb = document.querySelector('.min-range');
    const maxThumb = document.querySelector('.max-range');
    if (minThumb && maxThumb) {
      minThumb.value = 0;
      maxThumb.value = 900;
      
      // Update slider range visual
      const sliderRange = document.querySelector('.slider-range');
      if (sliderRange) {
        sliderRange.style.left = '0%';
        sliderRange.style.width = '100%';
      }
    }
    
    // Reset milk radio buttons
    document.getElementById('milk-any').checked = true;
    
    // Reset country checkboxes
    countryCheckboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
    
    // Reset sorting
    sortingSelect.value = 'за популярністю';
    
    // Apply reset filters
    applyFilters();
  }
  
  // EVENT LISTENERS
  // Apply filters when button is clicked
  applyButton.addEventListener('click', applyFilters);
  
  // Reset filters when button is clicked
  resetButton.addEventListener('click', resetFilters);
  
  // Apply filters when sorting option changes
  sortingSelect.addEventListener('change', applyFilters);
  
  // Initialize the page with default filters
  document.addEventListener('DOMContentLoaded', function() {
    // Make sure dual slider is initialized first if it exists
    if (typeof initDualRangeSlider === 'function') {
      setTimeout(() => {
        // Generate initial products display
        applyFilters();
      }, 100);
    } else {
      // Generate initial products display
      applyFilters();
    }
  });
  // Make sure all country checkboxes are checked on page load
document.addEventListener('DOMContentLoaded', function() {
    // Select all country checkboxes and set them as checked
    document.querySelectorAll('.country-filter input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    // Rest of your initialization code...
    // Apply filters to update products with all countries selected
    if (typeof applyFilters === 'function') {
        applyFilters();
    }
});
// Create and add the sorting arrow element
function addSortArrow() {
    const sortingLabel = document.querySelector('.sorting-label');
    if (sortingLabel) {
      // Create the arrow element
      const sortArrow = document.createElement('span');
      sortArrow.className = 'sort-direction';
      sortArrow.innerHTML = '↓'; // Default to descending (down arrow)
      sortArrow.style.marginLeft = '5px';
      sortArrow.style.cursor = 'pointer';
      sortArrow.style.fontSize = '14px';
      sortArrow.style.fontWeight = 'bold';
      sortArrow.style.color = '#7859cf';
      
      // Insert after the sorting select element
      const sortingSelect = document.querySelector('.sorting-select');
      if (sortingSelect && sortingSelect.parentNode) {
        sortingSelect.parentNode.insertBefore(sortArrow, sortingSelect.nextSibling);
      }
    }
  }
  // Handle sort direction toggle
function setupSortDirectionToggle() {
    const sortArrow = document.querySelector('.sort-direction');
    if (sortArrow) {
      sortArrow.addEventListener('click', function() {
        // Toggle direction
        if (filterState.sortDirection === 'desc') {
          filterState.sortDirection = 'asc';
          sortArrow.innerHTML = '↑'; // Up arrow for ascending
        } else {
          filterState.sortDirection = 'desc';
          sortArrow.innerHTML = '↓'; // Down arrow for descending
        }
        
        // Apply the updated sorting
        applyFilters();
      });
    }
  }
  // Add to your document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the sort arrow
    addSortArrow();
    setupSortDirectionToggle();
    
    // Make sure all country checkboxes are checked on page load
    document.querySelectorAll('.country-filter input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = true;
    });
    
    // Rest of your initialization code...
  });