export default class Likes {                                                            // Step 271
    constructor() {                                                                     // Step 272
        this.likes = [];                                                                // Step 273
    }

    addLike(id, title, author, img) {                                                   // Step 274
        const like = { id, title, author, img };                                        // Step 275
        this.likes.push(like);                                                          // Step 276
        return like;                                                                    // Step 277
    }

    deleteLike(id) {                                                                    // Step 278
        const index = this.likes.findIndex(el => el.id === id);                         // Step 279
        this.likes.splice(index, 1);                                                    // Step 280
    }

    isLiked(id) {                                                                       // Step 281
        return this.likes.findIndex(el => el.id === id) !== -1;                         // Step 282
    }

    getNumLikes() {                                                                     // Step 283
        return this.likes.length;                                                       // Step 284
    }
}