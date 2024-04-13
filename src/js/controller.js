import 'core-js/stable';
import 'core-js/actual';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import {bookmark, search, hideResults} from './views/menu.js';
import { MODAL_CLOSE_SEC } from './config.js';


if(module.hot){
  module.hot.accept();
};

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);
    if(!id)  return;
    recipeView.renderSpinner();
    //update results view to mark selected recipe
    resultsView.update(model.getSearchResultPage());
    //updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    //loading recipe
    await model.loadRecipe(id);
    //rendering recipe
    recipeView.render(model.state.recipe)


  } catch(err){
    console.log(err);
    recipeView.renderError();
  } 
}

const controlSearchResults = async function(){
  try{
    resultsView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if(!query) return;
    //load search results
    await model.loadSearchResult(query);
    //render results
    resultsView.render(model.getSearchResultPage());

    //render pagination buttons
    paginationView.render(model.state.search) 

  } catch(err){
    console.log(err);
    throw err;
  }
};

const controlPagination = (goToPage) => {
  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search) 
};

const controlServings = function(newServings) {
  //update the recipe servings(in state)
  model.updateServings(newServings);

  //update the recipe view
 
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  //add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try{
    addRecipeView.renderSpinner();
    //upload recipe
    await model.uploadRecipe(newRecipe);
    //render recipe
    recipeView.render(model.state.recipe);
    //close form window
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change id in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);


    setTimeout(function(){
      addRecipeView.toggleWindow();
    },MODAL_CLOSE_SEC * 1000);

  } catch(err){
    console.log(err);
    addRecipeView.renderError(err.message)
  }

  //upload new recipe data
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  hideResults(model.state.search);
};
init();
