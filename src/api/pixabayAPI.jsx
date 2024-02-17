import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34554984-68074c5646cb7a45ce2c04cbc';

export const getCollection = async (query, page) => {
  const data = await axios(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

getCollection.propType = {
  query: PropTypes.string.isRequired, 
  page: PropTypes.number.isRequired
}