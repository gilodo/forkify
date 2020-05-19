import { elements } from './base';                                                      // Step 245

export const renderItem = item => {                                                     // Step 247
                                                                                        // Step 248; 250 ('data-itemid=${item.id}' added and static data replaced by dynamic one and
                                                                                        // class="shopping__count-value" added to input)
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);                          // Step 251
};

export const deleteItem = id => {                                                       // Step 246
    const item = document.querySelector(`[data-itemid="${id}"]`);                       // Step 252
    if (item) item.parentElement.removeChild(item);                                     // Step 253; 268 ('if (item)' added)
};