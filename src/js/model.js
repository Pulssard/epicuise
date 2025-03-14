import {async} from 'regenerator-runtime';
import {API_URL, RES_PER_PG} from './config.js'
import {AJAX} from './helpers.js';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY.replaceAll("'","").replace(';','') ;
console.log(apiKey);

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: window.innerWidth < 800 ? 5 : RES_PER_PG,
    },
    bookmarks: [],
};

const createRecipeObject = function(data) {
    const {recipe} = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key})
    };
};

export const loadRecipe = async function(id){
    try{
        
        const data = await AJAX(`${API_URL}/${id}?key=${apiKey}`);
        state.recipe = createRecipeObject(data);
        if(state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (err){
        console.error(err);
        throw err;
    }
};

export const loadSearchResult = async function(query){
    try{
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${apiKey}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key})
            };
        });
        state.search.page = 1;
    }catch(err){
        console.error(err);
        throw err;
    }
};

export const getSearchResultPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page -1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start,end);
};

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => ing.quantity = ing.quantity * newServings / state.recipe.servings);
    state.recipe.servings = newServings;
};

const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
};


export const addBookmark = function(recipe) {
    //add bookmark
    state.bookmarks.push(recipe);

    //mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
};

export const deleteBookmark = function(id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    //mark current recipe as not bookmark
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
};
const clearBookmarks = function() {
    localStorage.clear('bookmarks');
};
const init = function() {
   const storage =  localStorage.getItem('bookmarks');
   if(storage) state.bookmarks = JSON.parse(storage);
   //clearBookmarks()
}

init();

export const uploadRecipe = async function(newRecipe) {
    try{
    const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if(ingArr.length !== 3) throw new Error('Wrong ingredient.Use the correct format!')
       const [quantity, unity, description] = ingArr;
       return {quantity: quantity ? +quantity : null , unity, description};
    });
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher:newRecipe.publisher,
        cooking_time: newRecipe.cookingTime,
        servings: newRecipe.servings,
        ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${apiKey}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
} catch(err){
    throw err;
}
};