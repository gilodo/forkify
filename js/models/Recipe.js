import axios from 'axios';                                                                      // Step 96

export default class Recipe {                                                                   // Step 97. Will hold all the data for 1 recipe object
   constructor(id) {                                                                            // Step 98
   this.id = id;    // Step 99. Each recipe is identified by id and when we create a new recipe object we'll pass id. Based on that id we can ask for the rest data in AJAX call
 }

   async getRecipe() {                                                                          // Step 100
      try {                                                                                     // Step 101
         const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);   // Step 104
         this.title = res.data.recipe.title;                                                    // Step 106 (recipe title)
         this.author = res.data.recipe.publisher;                                               // Step 107 (recipe author)
         this.img = res.data.recipe.image_url;                                                  // Step 108 (recipe image)
         this.url = res.data.recipe.source_url;                                                 // Step 109 (recipe URL)
         this.ingredients = res.data.recipe.ingredients;                                        // Step 110 (recipe ingridients)
   }  catch (error) {                                                                           // Step 102
      console.log(error);                                                                       // Step 103
      alert('Something went wrong :(');                                                         // Step 117
      }                                              
   }

   calcTime() {
   // Assuming that we need 15 min for each 3 ingredients                                       // Step 111
      const numIng = this.ingredients.length;                                                   // Step 112
      const periods = Math.ceil(numIng / 3);                                                    // Step 113
      this.time = periods * 15;                                                                 // Step 114
   }

   calcServings() {                                                                             // Step 115
      this.servings = 4;                                                                        // Step 116
   }

   parseIngredients() {                                                                         // Step 136
      const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];    // Step 139
      const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];            // Step 140
      const units = [...unitsShort, 'kg', 'g'];                                                 // Step 188

      const newIngredients = this.ingredients.map(el => {                                       // Step 137
         // 1) Uniform units
         let ingredient = el.toLowerCase();                                                     // Step 141
         unitsLong.forEach((unit, i) => {                                                       // Step 142
            ingredient = ingredient.replace(unit, unitsShort[i]);                               // Step 143
         });
         // 2) Remove parentheses
         ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');                                // Step 144; 146 (space added)
         // 3) Parse ingredients into count, unit and ingredient
         const arrIng = ingredient.split(' ');                                                  // Step 147. Ingredients
         const unitIndex = arrIng.findIndex(el2 => units.includes(el2));                        // Step 148. Units in ingredients; 189 ('unitsShort' changed to 'units')

         let objIng;                                                                            // Step 152
         if (unitIndex > - 1) {                                                                 // Step 149
            // There is a unit next to ingredient
            // Ex. 4 1 / 2 cups, arrCount is [4, 1 / 2]
            // Ex. 4 cups, arrCount is [4]
            const arrCount = arrIng.slice(0, unitIndex);                                        // Step 162. Everything before the unit i.e. number

            let count;                                                                          // Step 165
            if (arrCount.length === 1) {                                                        // Step 163
               count = eval(arrIng[0].replace('-', '+'));                                       // Step 164; 168 ('eval' and 'replace' added)
            } else {                                                                            // Step 166
               count = eval(arrIng.slice(0, unitIndex).join('+'));                              // Step 167. eval("4+1/2") --> 4.5
            }

            objIng = {                                                                          // Step 169
               count,                                                                           // Step 170
               unit: arrIng[unitIndex],                                                         // Step 171
               ingredient: arrIng.slice(unitIndex + 1).join(' ')                                // Step 172
            };

         } else if (parseInt(arrIng[0], 10)) {                                                  // Step 151
            // There is NO unit next to ingredient, but the 1st element is a number
            objIng = {                                                                          // Step 157
               count: parseInt(arrIng[0], 10),                                                  // Step 158
               unit: '',                                                                        // Step 159
               ingredient: arrIng.slice(1).join(' ')                                            // Step 160
            }
         } else if (unitIndex === -1) {                                                         // Step 150
            // There is NO unit and NO number next to ingredient
            objIng = {                                                                          // Step 153
               count: 1,                                                                        // Step 154
               unit: '',                                                                        // Step 155
               ingredient                                                                       // Step 156. Will create the key with the same name automatically
            }
         }
         return objIng;                                                                         // Step 145; 161 ('ingredient' replaced by 'objIng')
      })
      this.ingredients = newIngredients;                                                        // Step 138
   }

   updateServings(type) {                                                                       // Step 208
      // Servings
      const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;               // Step 209

      // Ingredients
      this.ingredients.forEach(ing => {                                                         // Step 211
         ing.count *= (newServings / this.servings);                                            // Step 212
      });
      this.servings = newServings;                                                              // Step 210
   }
}