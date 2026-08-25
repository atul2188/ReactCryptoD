import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ color = "#58a6ff", size = 4 }) => {
  return (
    <BarLoader
      color={color}
      height={size}
      width={size * 50}
      cssOverride={override}
      aria-label="Loading"
    />
  );
};

export default Spinner;
