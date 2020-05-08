export const elements = {                                                   // Step 22. Object containing all the elements that we select from our DOM
    searchForm: document.querySelector('.search'),                          // Step 24. Form
    searchInput: document.querySelector('.search__field'),                  // Step 23. Search input field
    searchRes: document.querySelector('.results'),                          // Step 58. Results display wrapper (left side of the page)   
    searchResList: document.querySelector('.results__list'),                // Step 34. Results display list (left side of the page)
    searchResPages: document.querySelector('.results__pages'),              // Step 86. Pagination buttons wrapper
    recipe: document.querySelector('.recipe'),                              // Step 177. Single recipe
    shopping: document.querySelector('.shopping__list')                     // Step 249. Shopping list
};

export const elementStrings = {                                             // Step 61
    loader: 'loader'                                                        // Step 62
}

export const renderLoader = parent => {                                     // Step 54. Preloader for AJAX
                                                                            // Step 55, 64 ('${elementStrings.loader' added')
    const loader = `
        <div class = "${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);                        // Step 56
}

export const clearLoader = () => {                                          // Step 60. Preloader removal once AJAX is done
    const loader = document.querySelector(`.${elementStrings.loader}`);     // Step 63,  (template string symbols added)
    if (loader) loader.parentElement.removeChild(loader);                   // Step 65
};