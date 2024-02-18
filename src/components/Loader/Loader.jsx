import { Watch } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrapper>
      <Watch
        visible={true}
        height="280"
        width="280"
        radius="48"
        color="#333"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Wrapper>
  );
};
