
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const loader = document.getElementById('loader');
const app_id = 'e0ed37d9';
const app_key = '2a62125fd735df1c21128e751cbff1a7';

searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput').value;

  if (searchInput) {
    showLoader(); // Show the loader
    fetchRecipes(searchInput);
  }
});

async function fetchRecipes(searchTerm) {
  try {
    const endpoint = generateEndpoint(searchTerm);
    const response = await fetch(endpoint);
    const data = await response.json();

    displayRecipes(data.hits);
    hideLoader(); // Hide the loader
  } catch (error) {
    console.error('Error:', error);
    hideLoader(); // Hide the loader on error
  }
}

function generateEndpoint(searchString) {
  return `https://api.edamam.com/search?q=${searchString}&app_id=${app_id}&app_key=${app_key}`;
}

function displayRecipes(recipes) {
  searchResults.innerHTML = '';

  recipes.forEach(recipe => {
    const resultCard = document.createElement('div');
    resultCard.className = 'flex items-center border-b border-gray-300 py-2';
    resultCard.innerHTML = `
      <img src="${recipe.recipe.image}" alt="Recipe" class="w-16 h-16 object-cover rounded">
      <div class="ml-4">
        <div class="text-lg font-semibold">${recipe.recipe.label}</div>
        <div class="text-gray-600">Ingredients: ${recipe.recipe.ingredientLines.join(', ')}</div>
      </div>
    `;

    searchResults.appendChild(resultCard);
  });
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
