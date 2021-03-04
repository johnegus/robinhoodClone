// export const imageUrl = process.env.NODE_ENV ===  'development' ? 'http://localhost:8000' : process.env.REACT_APP_IMAGE_URL;
// export const baseUrl = process.env.NODE_ENV ===  'development' ?  `${imageUrl}/api`: `/api`;
// baseUrl = heroku.com/api

// export const imageUrl = process.env.REACT_APP_IMAGE_URL || '';
// export const baseUrl = `${imageUrl}/api`;

export const imageUrl = process.env.REACT_APP_IMAGE_URL || 'http://localhost:8000' ;
export const baseUrl = process.env.REACT_APP_BASEURL || `${imageUrl}/api`;
