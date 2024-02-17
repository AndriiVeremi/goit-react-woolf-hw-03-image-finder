export const Button = ({ children, loadMore }) => {
  return (
    <button onClick={() => loadMore()} type="button">
      {children}
    </button>
  );
};
