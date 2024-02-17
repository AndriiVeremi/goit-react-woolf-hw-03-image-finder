import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const Button = ({ children, loadMore }) => {
  return (
    <LoadMore onClick={() => loadMore()} type="button">
      {children}
    </LoadMore>
  );
};

Button.propType = {
  children: PropTypes.any,
  loadMore: PropTypes.func.isRequired,
};
