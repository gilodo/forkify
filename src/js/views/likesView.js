import { elements } from './base';                                                                          // Step 299
import { limitRecipeTitle } from './searchView';                                                            // Step 326

export const toggleLikeBtn = isLiked => {                                                                   // Step 300
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';                                      // Step 301
    // icons.svg#icon-heart-outlined
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)         // Step 302
};

export const toggleLikeMenu = numLikes => {                                                                 // Step 310
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';                              // Step 312
};

export const renderLike = like => {                                                                         // Step 314; 315 ('markup' added and static data replaced by dynamic);
                                                                                                            // 327 ('limitRecipeTitle' added)
    const markup = `                                                                                        
        <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);                                             // Step 317
}

export const deleteLike = id => {                                                                           // Step 318
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;                        // Step 319; 321 ('.parentElement' added)
    if (el) el.parentElement.removeChild(el);                                                               // Step 322
}