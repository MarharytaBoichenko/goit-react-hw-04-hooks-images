import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import s from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast("Enter your  query");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onFormSubmitHandler}>
        <button type="submit" className={s.searchForm__button}>
          <span className={s.searchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={s.searchForm__input}
          type="text"
          onChange={onChangeHandler}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
        />
      </form>
    </header>
  );
}

// export default class Searchbar extends Component {
//   state = {
//     query: '',
//   };
//   onChangeHandler = e => {
//     console.log(e.target.value);
//     this.setState({
//       query: e.target.value,
//     });
//   };
//   onFormSubmitHandler = e => {
//     e.preventDefault();
//     if (this.state.query.trim() === '') {
//       toast('Enter your  query');
//       // this.reset();
//       return;
//     }
//     this.props.onSubmit(this.state);
//     this.setState({
//       query: '',
//     });
//   };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form className={s.searchForm} onSubmit={this.onFormSubmitHandler}>
//           <button type="submit" className={s.searchForm__button}>
//             <span className={s.searchForm__buttonLabel}>Search</span>
//           </button>

//           <input
//             className={s.searchForm__input}
//             type="text"
//             onChange={this.onChangeHandler}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//           />
//         </form>
//       </header>
//     );
//   }
// }
