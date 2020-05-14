export default class Likes {                                                            // Step 272
    constructor() {                                                                     // Step 273
        this.Likes = [];                                                                // Step 274
    }

    addLike(id, title, author, img) {                                                   // Step 275
        const like = { id, title, author, img };                                        // Step 276
        this.Likes.push(like);                                                          // Step 277
        return like;                                                                    // Step 288
    }

    deleteLike(id) {                                                                    // Step 289
        const index = this.likes.findIndex(el => el.id === id);                         // Step 290
        this.likes.splice(index, 1);                                                    // Step 291
    }

    isLiked(id) {                                                                       // Step 292
        return this.likes.findIndex(el => el.id === id) !== -1;                         // Step 293
    }

    getNumLikes() {                                                                     // Step 294
        return this.likes.length;                                                       // Step 295
    }
}