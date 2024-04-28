import { Bars } from "react-loader-spinner";
export default function Loader({ color }) {
  return (
    <Bars
      height={30}
      width={30}
      color={color}
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
