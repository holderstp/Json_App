///
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { slice } from "lodash";
const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(12);
  const initialPosts = slice(photos, 0, index);
  const [searchValue, setSearchValue] = useState(""); // Add searchValue state
  // funtion loadmore
  const loadMore = () => {
    setIndex(index + 12);
    console.log(index);
    if (index >= photos.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  // funtion filter
  const filter = (e: any) => {
    e.preventDefault();
    //fetch data
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        const customAlbum = data.filter(
          (i: any) => i.albumId.toString() === searchValue
        );
        setPhotos(customAlbum);
      })
      .catch((error) => console.log(error));
  };
  //function search
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  // fetch data using axios
  useEffect(() => {
    axios({
      url: "https://jsonplaceholder.typicode.com/photos",
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      setPhotos(response.data);
    });
  }, []);
  // render
  return (
    <div className="py-2 container">
      <div className="row">
        <div className="col-12">
          <h2 className="h2 font-bold text-3xl">Photos</h2>
        </div>
      </div>
      <div className="my-4 row">
        <div className="col-12">
          <form
            action="#"
            className="flex items-center gap-2"
            onSubmit={filter}
          >
            <div className="">
              <select name="filter" className="form-select">
                <option value="albumId">Album Id</option>
              </select>
            </div>
            <div className="">
              <input
                name="search"
                className="form-control"
                placeholder="Search by album id"
                value={searchValue}
                onChange={handleSearchChange}
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-white bg-blue-500 border-solid h-10 w-[100px] rounded-md border-blue-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-wrap">
        {initialPosts.map((item: any) => {
          return (
            <div className="mb-4 col-3 w-3/12" key={item.id}>
              <div className="w-100 card">
                <img src={item.url} alt="" width="100%" />

                <div className="card-body">
                  <div className="w-full text-truncate card-title h5">
                    {item.title}
                  </div>
                  <p className="mb-1 card-text">Id: #{item.id}</p>
                  <p className="card-text">Album Id: #{item.albumId}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-grid mt-3 mb-5">
        {isCompleted ? (
          <button
            onClick={loadMore}
            type="button"
            className="btn btn-danger disabled"
          >
            That's It
          </button>
        ) : (
          <div className="w-100 text-center ">
            <button
              type="button"
              className="btn btn-primary text-white bg-blue-500 border-solid h-10 w-[100px] rounded-md border-blue-500"
              onClick={loadMore}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photos;
