import { elements } from './base';                                                                          // Step 299

export const toggleLikeBtn = isLiked => {                                                                   // Step 300
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';                                      // Step 301
    // icons.svg#icon-heart-outlined
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)         // Step 302
};