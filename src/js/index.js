import Search from './models/Search';                                           // Step 11
import Recipe from './models/Recipe';                                           // Step 105
import List from './models/List';                                               // Step 242
import Likes from './models/Likes';                                             // Step 298
import * as searchView from './views/searchView';                               // Step 26
import * as recipeView from './views/recipeView';                               // Step 174
import * as listView from './views/listView';                                   // Step 260
import * as likesView from './views/likesView';                                 // Step 303
import { elements, renderLoader, clearLoader } from './views/base';             // Step 25 ('elements' (DOM)); 57 ('renderLoader' (AJAX preloader)); 66 ('clearLoader' added)

/** Global state of the app
 * - Search Object (search query and search results)
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {};                                                               // Step 12
window.state = state;                                                           // Step 267

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {                                             // Step 15 (no 'async'); 21 ('async' added)
    // 1) Get the query from the View
    const query = searchView.getInput();                                        // Step 17 ('pizza'); 30 ('searchView.getInput()');

    if (query) {                                                                // Step 18
        // 2) New search object and add it to state
        state.search = new Search(query);                                       // Step 19

        // 3) Prepare UI for the results
        searchView.clearInput();                                                // Step 39 (clearing the recipes search input field (copied from SearchView.js))
        searchView.clearResults();                                              // Step 42 (clearing the found recipes list (otherwise new ones will be attached at the bottom))
        renderLoader(elements.searchRes);                                       // Step 59 (this renders the loader)

        try {                                                                   // Step 132    
            // 4) Search for recipes
            await state.search.getResults();                                    // Step 20. 'getResults' function is located in Search.js. This returns a promise

            // 5) Render results on UI
            clearLoader();                                                      // Step 67
            searchView.renderResults(state.search.result);                      // Step 36
        } catch (err) {                                                         // Step 133
            alert('Something wrong with the search...');                        // Step 134
            clearLoader();                                                      // Step 135
        }
    }
}

elements.searchForm.addEventListener('submit', e => {                           // Step 13 ('document.querySelector('.search)'); 27 ('elements.searchForm')
    e.preventDefault();                                                         // Step 14
    controlSearch();                                                            // Step 16. Called whenever form is submitted
})

elements.searchResPages.addEventListener('click', e=> {                         // Step 89. Event delegation is used
    const btn = e.target.closest('.btn-inline');                                // Step 90. Closest ancestor of the current element which matches 'btn-inline' selector.                                                                                        We get button no matter where we click
    if (btn) {                                                                  // Step 91
        const goToPage = parseInt(btn.dataset.goto, 10);                        // Step 92
        searchView.clearResults();                                              // Step 94. Clearing search results from another page
        searchView.renderResults(state.search.result, goToPage);                // Step 93
    }
})

/**
 * RECIPE CONTROLLER
 *
 */
const controlRecipe = async () => {                                             // Step 119; 124 ('async' added)
    // Get ID from url
    const id = window.location.hash.replace('#', '');                           // Step 120
    if (id) {                                                                   // Step 121
        // Prepare UI for changes
        recipeView.clearRecipe();                                               // Step 187
        renderLoader(elements.recipe);                                          // Step 184

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);                     // Step 204

        // Create new recipe object
        state.recipe = new Recipe(id);                                          // Step 122. 'state' is 1 central place where all the data is stored

        try {                                                                   // Step 129
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();         // Step 123. The rest of the code will be executed only after we go back with the data. Loading recipe data in the background
            state.recipe.parseIngredients();                                    // Step 173

            // Calculate time and servings
            state.recipe.calcTime();                                            // Step 125
            state.recipe.calcServings();                                        // Step 126

            // Render recipe
            clearLoader();                                                      // Step 182
            recipeView.renderRecipe(                                            // Step 183    
                state.recipe,                                                   // Step 308
                state.likes.isLiked(id),                                        // Step 309
                );                                       

        } catch (err) {                                                         // Step 130
            alert('Error processing recipe!');                                  // Step 131
        }
        
    }
};

// window.addEventListener('hashchange', controlRecipe);                        // Step 118
// window.addEventListener('load', controlRecipe);                              // Step 127
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));     // Step 128. Adding 1 event listener to multiple events

/**
 * SHOPPING LIST CONTROLLER
 *
 */

const controlList = () => {                                                     // Step 256
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List();                                   // Step 257
    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {                                    // Step 258
        const item = state.list.addItem(el.count, el.unit, el.ingredient);      // Step 259. addItem function is located in List.js
        listView.renderItem(item);                                              // Step 261. renderItem function is located in listView.js
    });
}

// Handling delete and update list item events
elements.shopping.addEventListener('click', e => {                              // Step 262
    const id = e.target.closest('.shopping__item').dataset.itemid;              // Step 263
    // Handling the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {           // Step 264
        // Delete from state
        state.list.deleteItem(id);                                              // Step 265
        // Delete from UI
        listView.deleteItem(id);                                                // Step 266
        // Handle the count update
    } else if (e.target.matches(".shopping__count-value")) {                    // Step 268
        const val = parseFloat(e.target.value, 10);                             // Step 270
        state.list.updateCount(id, val);                                        // Step 271
    }
});

/**
 * LIKES CONTROLLER
 *
 */
// TESTING
state.likes = new Likes();

const controlLike = () => {                                                     // Step 287
    if (!state.likes) state.likes = new Likes();                                // Step 288
    const currentID = state.recipe.id;                                          // Step 289
    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {                                      // Step 290
        // Add like to the state
        const newLike = state.likes.addLike(                                    // Step 292
            currentID,                                                          // Step 293
            state.recipe.title,                                                 // Step 294    
            state.recipe.author,                                                // Step 295
            state.recipe.img                                                    // Step 296
        );
        // Toggle the like button
        likesView.toggleLikeBtn(true);                                          // Step 304
        
        // Add like to UI list
        console.log(state.likes);

    // User HAS liked current recipe
    } else {                                                                    // Step 291
        // Remove like from the state                                                  
        state.likes.deleteLike(currentID);                                      // Step 297
        // Toggle the like button
        likesView.toggleLikeBtn(false);                                          // Step 305
        // Remove like from UI list
        console.log(state.likes);
    }                                      
}

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {                                // Step 213
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {                   // Step 215 (* - any child element of this button)
        // Decrease button is clicked
        if (state.recipe.servings > 1) {                                        // Step 219. Avoiding negative servings
            state.recipe.updateServings('dec');                                 // Step 217
            recipeView.updateServingsIngredients(state.recipe);                 // Step 225
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {            // Step 216
        // Increase button is clicked
        state.recipe.updateServings('inc');                                     // Step 218
        recipeView.updateServingsIngredients(state.recipe);                     // Step 226
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {    // Step 254
        // Add ingredients to the shopping list
        controlList();                                                          // Step 255
    } else if (e.target.matches(".recipe__love, recipe__love *")) {             // Step 285
        // Like controller
        controlLike();                                                          // Step 286
    }
})