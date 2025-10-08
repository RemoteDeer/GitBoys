document.addEventListener('DOMContentLoaded', () => {
    // Logic for passing search from main page to search page
    const mainSearchForm = document.getElementById('main-search-form');
    if (mainSearchForm) {
        mainSearchForm.addEventListener('submit', (e) => {
            // Stop the form from submitting through the browser's default behavior
            e.preventDefault(); 
            
            const searchInput = document.getElementById('hero-search-input');
            const query = searchInput.value.trim();

            if (query) {
                // If there is a search term, redirect to the /search route with a query parameter
                window.location.href = `/search?query=${encodeURIComponent(query)}`;
            } else {
                // If the search is empty, just go to the /search route
                window.location.href = '/search';
            }
        });
    }

    // Logic for pre-filling the search bar on the results page when it loads
    const searchPageInput = document.getElementById('search-input');
    if (searchPageInput) {
        // Create a URLSearchParams object from the current URL's query string
        const urlParams = new URLSearchParams(window.location.search);
        // Get the value of the 'query' parameter
        const query = urlParams.get('query');

        if (query) {
            // If a query exists in the URL, set the search input's value to it
            searchPageInput.value = query;
        }
    }
});

