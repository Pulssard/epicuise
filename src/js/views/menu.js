const menu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav-el');
const results = document.querySelector('.search-results');
const bookmarks = document.querySelector('.bookmark-btn');
const searchBtn = document.querySelector('.search__btn');
const pagination = results.querySelector('.pagination');

export const menuActivation = menu.addEventListener('click', function(e) {
    nav.classList.toggle('flex-menu');
    if(!nav.classList.contains('flex-menu')){
        results.style.display ='none';
        menu.style.position = 'absolute';
    }else{
        results.style.display ='flex';
        menu.style.position = 'fixed';
    } 
});

export const bookmark = bookmarks.addEventListener('click', function(e) {
    results.style.zIndex = '0';
});
export const search = searchBtn.addEventListener('click', function(e) {
    results.style.zIndex = '1';
});

export const hideResults = function(pages){
    const manageResults = function(entries){
        const windowWidth = entries[0].target.offsetWidth;
        pages.resultsPerPage = 10;
        if (windowWidth < 800) {
            results.style.zIndex = '-1';
            pages.resultsPerPage = 5;
        } 
    }

    const observer = new ResizeObserver(manageResults);
    observer.observe(document.documentElement);
};
