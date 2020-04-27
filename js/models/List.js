import uniqid from 'uniqid';                                                    // Step 235

export default class List {                                                     // Step 227
    constructor() {                                                             // Step 228
        this.items = [];                                                        // Step 229
    }

    addItem(count, unit, ingredient) {                                          // Step 230. Adding an item to the shopping list
        const item = {                                                          // Step 231
            id: uniqid(),                                                       // Step 236
            count,                                                              // Step 232
            unit,                                                               // Step 233
            ingredient                                                          // Step 234
        }
        this.items.push(item);                                                  // Step 243
        return item;                                                            // Step 244
    }

    deleteItem(id) {                                                            // Step 237. Deleting an item from the shopping list
        const index = this.items.findIndex(el => el.id === id);                 // Step 238
        // [2, 4, 8] splice(1, 2) -> returns [4, 8], original array is [2] - mutates the original array
        // [2, 4, 8] slice(1, 2) -> returns 4, original array is [2, 4, 8] - does not mutate the original array
        this.items.splice(index, 1);                                            // Step 239
    }

    updateCount(id, newCount) {                                                 // Step 240. Updating the amount of ingredient in the shopping list
        this.items.find(el => el.id === id).count = newCount;                   // Step 241
    }
}