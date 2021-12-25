## Dcard Assignment: Completed by William Lin

### How to start

1. Run _server/index.js_ on localhost: 3000 to initialize a proxy server for further applications.
2. Run the app in development mode with _npm start_ on a port other than 3000 (e.g. 3001).

### Design Structure

- #### Solution for CORS issue
  - Created a proxy server through Express.js and enabled CORS by a node.js package.
  - Fetched the Dcard Posts List API with relative URL based on the current paging (first page or not).
- #### Infinite Scroll

  - Used ref attribute to get access to the last element of the posts list.
  - Detected the appearance of the last element through Intersection Observer API and triggered further posts data fetching

- #### Component Design
  - Created a posts list container to nest all the posts.
  - Created an individual post component to share all the UI and logics for every post.
