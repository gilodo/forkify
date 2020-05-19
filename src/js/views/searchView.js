import { elements } from './base';                       // Step 28. All the DOM elements

export const getInput = () => elements.searchInput.value;// Step 29. Recipes search form input field value

export const clearInput = () => {                        // Step 37
    elements.searchInput.value = '';                     // Step 38. Clearing the recipes search input field
};

export const clearResults = () => {                      // Step 40
    elements.searchResList.innerHTML = '';               // Step 41 (clearing the found recipes list (otherwise new ones will be attached at the bottom))
    elements.searchResPages.innerHTML = '';              // Step 95 (clearing of pagination block when going to another page)
};

export const highlightSelected = id => {                 // Step 202. Highlighting the selected recipe with grey color  
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));           // Step 205. Removing grey highlight from non-active search item
    resultsArr.forEach(el => {                           // Step 206   
        el.classList.remove('results__link--active');    // Step 207   
    })  
    document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');    // Step 203; 320 ('results__link' is added)
};

/* How accumulator works
Sentence 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato'] > 17 (see line 23)
acc: 18 / acc + cur.length = 25 / newTitle = ['Pasta', 'with', 'tomato'] > 17 (see line 23)
*/

export const limitRecipeTitle = (title, limit = 17) => { // Step 43 (limiting the title of each recipe down to 1 line); 325 ('export' added)
    const newTitle = [];                                 // Step 49 (title of the recipe kept in 1 line)
    if(title.length > limit) {                           // Step 44
        title.split(' ').reduce((acc, cur) => {          // Step 46 (acc -accumulator (number of letters in recipe title), cur - current (number of letters in the current word))
            if(acc + cur.length <= limit) {              // Step 48
                newTitle.push(cur);                      // Step 50
            }
            return acc + cur.length;                     // Step 51 
        }, 0);                                           // Step 47 (accumulator initial value)
        return `${newTitle.join(' ')} ...`;              // Step 52 (replacing the title > 17 with '...')
    }
    return title;                                        // Step 45 (else statement)
}

const renderRecipe = recipe => {                         // Step 33. Rendering 1 found recipe data onto page left side (will be repeated multiple times)
                                                         // Step 34 (including replacing static data with dynamic one from API (template strings)); 53 ('limitRecipeTitle' added)
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
        `;
        elements.searchResList.insertAdjacentHTML('beforeend', markup); // Step 35
};
                                                                        // Step 81. Pagination buttons. type: 'prev' or 'next' button
const createButton = (page, type) => `                                  
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {               // Step 74. Pagination
    const pages = Math.ceil(numResults / resPerPage);                   // Step 75. Calculating the number of pages for pagination
    let button;                                                         // Step 82
    if (page === 1 && pages > 1) {                                      // Step 76 (page === 1); 79 ('&& pages > 1' added)
        // Only button to go to next page
        button = createButton(page, 'next');                            // Step 83
    } else if (page < pages) {                                          // Step 78
        // Both buttons
                                                                        // Step 85
        button = `                                                      
            ${createButton(page, 'prev')}                                
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {                           // Step 77 (page === pages); 80 ('&& pages > 1' added)
        // Only button to go to previous page
        button = createButton(page, 'prev');                            // Step 84
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);   // Step 87
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {  // Step 31. Rendering list of all found recipes onto page left side; 68 ('page', 'resPerPage' added)
    // Render results of current button
    const start = (page - 1) * resPerPage;                              // Step 69 (0); 72 ('(page-1) * resPerPage' added)
    const end = page * resPerPage;                                      // Step 70 (10); 73 ('page * resPerPage' added')
    recipes.slice(start, end).forEach(renderRecipe);                    // Step 32. Looping through all found recipes and getting them onto page; 71 ('slice' added)
    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);                    // Step 88
};