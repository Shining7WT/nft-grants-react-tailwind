// export const API_ENDPOINT_URL = 'http://localhost:8000'
let API_ENDPOINT_URL;
if (window.location.origin == "https://stacks-grant.netlify.app") {
    API_ENDPOINT_URL = "https://stacks-grant-api.herokuapp.com";
} else if (window.location.origin == "https://stx-staging.netlify.app") {
    API_ENDPOINT_URL = "https://staging-stx-api.herokuapp.com";
} else {
    // API_ENDPOINT_URL = 'http://localhost:8000';
    API_ENDPOINT_URL = "https://staging-stx-api.herokuapp.com";
    // API_ENDPOINT_URL = "https://stacks-grant-api.herokuapp.com";
}
export { API_ENDPOINT_URL };
