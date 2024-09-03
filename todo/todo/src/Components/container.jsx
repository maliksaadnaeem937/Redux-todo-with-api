import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function Container({ children }) {
  return (
    <div className="max-w-[700px] border  pt-[100px] mx-auto  flex flex-col align-center justify-center">
      <h2 className="text-3xl text-white text-center pb-[10px]">Add Your Tasks Here</h2>
      {children}
    </div>
  );
}
