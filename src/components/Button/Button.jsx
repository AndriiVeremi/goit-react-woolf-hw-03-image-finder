import { LoadMore } from "./Button.styled";

export const Button = ({ children, loadMore }) => {
  return (
    <LoadMore onClick={() => loadMore()} type="button">
      {children}
    </LoadMore>
  );
};
