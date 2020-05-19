import { elements } from './base';                                                      // Step 178
import { Fraction } from 'fractional';                                                  // Step 190

export const clearRecipe = () => {                                                      // Step 185
    elements.recipe.innerHTML = '';                                                     // Step 186
};
                                                                                        
const formatCount = count => {                                                          // Step 191
    if (count) {                                                                        // Step 193
        // count = 2.5 --> 2 1/2
        // count = 0.5 --> 1/2
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));     // Step 194 (int - integer, dec - decimal)

        if (!dec) return count;                                                         // Step 195
        if (int === 0) {                                                                // Step 196
            const fr = new Fraction(count);                                             // Step 197
            return `${fr.numerator}/${fr.denominator}`;                                 // Step 198
        } else {                                                                        // Step 199
            const fr = new Fraction(count - int);                                       // Step 200
            return `${int} ${fr.numerator}/${fr.denominator}`;                          // Step 201
        }
    }
    return '?';                                                                         // Step 194
};
                                                                                        // Step 180; 192 ('formatCount' added)
const createIngredient = ingredient => `                                                
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {                                      // Step 175; 306 ('isLiked' added); 307 ${isLiked ? '' : '-outlined'} added
                                                                                        // Step 176; 181 ('map' added); 
                                                                                        // 214 ('btn-decrease' and 'btn-increase' classes are added to servings buttons),
                                                                                        // 254 ("recipe__btn--add" class added)
    const markup = `                                                                    
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);                       // Step 179
};    
    
export const updateServingsIngredients = recipe => {                                // Step 220
    // Update the servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;     // Step 221
    // Update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));  // Step 222
    countElements.forEach((el, i) => {                                              // Step 223
        el.textContent = formatCount(recipe.ingredients[i].count);                  // Step 224
    });
};