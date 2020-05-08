import axios from 'axios';                                                                                          // Step 8

export default class Search {                                                                                       // Step 1
    constructor(query) {                                                                                            // Step 2
        this.query = query;                                                                                         // Step 3
    }

    async getResults() {                                                                                            // Step 9
        try {                                                                                                       // Step 4
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);               // Step 5
            this.result = res.data.recipes;                                                                         // Step 10
        } catch (error) {                                                                                           // Step 6
            alert(error);                                                                                           // Step 7
        }
    }
}