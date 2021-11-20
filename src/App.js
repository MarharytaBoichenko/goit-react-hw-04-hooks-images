import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import s from "./components/Loader/Loader.module.css";
// import Loader from "./components/Loader/Loader.module.css";

import Searchbar from "./components/SearchBar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Button } from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { mapper } from "./helpers/mapper";
import api from "./helpers/images-api";

export default function App() {
  const [query, setQuery] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleModal = (largeImageURL) => {
    console.log("click  on list", largeImageURL);
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const handleSearchSubmit = (searchData) => {
    setQuery(searchData);
    console.log(searchData);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    console.log(query);
    // if (prevQuery !== newQuery) {
    console.log("запрос ізменілся");
    fetchImgOnQuery();
  }, [query]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.query;
  //   const newQuery = this.state.query;
  //   const queryPage = this.state.page;

  //   if (prevQuery !== newQuery) {
  //     console.log("запрос ізменілся");
  //     this.fetchImgOnQuery();
  //   }
  // }

  const fetchImgOnQuery = () => {
    // const { query, page } = this.state;
    const { fetchImages } = api;

    if (!query) {
      return;
    }
    setLoading(true);
    fetchImages(query, page)
      .then((data) => {
        console.log(data);
        if (data.hits.length === 0) {
          toast("No  images  found");
          return;
        }
        setImages([...images, ...mapper(data.hits)]);
        setPage(page + 1);
        setLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => setError(error));
  };

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99",
  };

  return (
    <div className="container">
      <ToastContainer />
      <Searchbar onSubmit={handleSearchSubmit} />

      {loading && (
        <div style={style}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      )}

      {images.length > 0 && (
        <ImageGallery images={images} query={query} onImgClick={toggleModal} />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
      )}
      {images.length > 11 && !loading && <Button onClick={fetchImgOnQuery} />}
    </div>
  );
}
