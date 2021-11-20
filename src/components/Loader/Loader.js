import Loader from "react-loader-spinner";
import s from "./components/Loader/Loader.module.css";
export default function Loader() {
  return (
    <div>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        className={s.loader}
        timeout={3000} //3 secs
      />
    </div>
  );
}
