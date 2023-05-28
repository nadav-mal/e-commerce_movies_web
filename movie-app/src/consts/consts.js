//Search Component
export const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
export const apiKey = 'b91b712834ebca8f1c0c1e009c6276b6';
export const urlPrefix = 'https://api.themoviedb.org/3/';
export const urlSearchPostfix = 'search/movie';
export const urlDiscoverPostfix = 'discover/movie';
export const errorMessagePrefix = "Error fetching ";
export const genresErrorMessagePostfix = 'genres:';
export const moviesErrorMessagePostfix = 'movies:';

//Cart
export const baseImageUrl = 'https://image.tmdb.org/t/p/';
export const serverCartAPI = '/cart'

//Purchase
export  const addPurchaseUrl = '/purchase/purchases'
export const successMessage = 'Purchase was successful. Navigating to homepage.'
export const failureMessage = 'Failed to purchase, please try again later. Error code: '
export const serverUnreachableMessage = "No response from the server. Please try again later.";

//Search Res
export const addToCart = '/add'
export const addErrMsg= "Error when adding to cart"