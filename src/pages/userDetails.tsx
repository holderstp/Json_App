import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Ihandle {
  Id: number;
  isEdit: boolean;
  dataUser: any;
}

const UserDetail = () => {
  const [dataUser, setDataUser] = useState<any>([]);
  let [album, setAlbum] = useState<any>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedAlbum, setIsCompletedAlbum] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams<any>();
  const id = Number(params.id);
  let newAlbum = album;

  const [display, setDisplay] = useState(false);
  //get infor

  //update infor
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [albumList, setAlbumList] = useState("");

  const handleUpdateInfor = (e: any) => {
    e.preventDefault();
    axios({
      url: "https://jsonplaceholder.typicode.com/users/" + id,
      method: "PUT",
      params: {
        email: email,
        phone: phone,
        website: website,
      },
    }).then((response) => {
      console.log(response.data);
      setIsEdit(false);
      setDisplay(true);
    });
  };
  // add new photos
  const handleAddNewPhotos = (e: any) => {
    e.preventDefault();

    console.log(albumList);

    newAlbum.push({
      title: albumList,
    });
    console.log(newAlbum.length);
    setAlbumList("");
  };
  // delete albums
  const handleDelete = (e: any) => {
    let data = e.target.value;
    console.log(e.target.value);
    newAlbum = newAlbum.filter((i: any) => i.id != data);
    console.log("aaa", newAlbum);
    setAlbum(newAlbum);
  };

  useEffect(() => {
    getData();
  }, []);

  // get all đata
  const getData = () => {
    axios({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    }).then((response) => {
      // console.log(response.data);
      setDataUser(response.data);
      setIsCompleted(true);
    });
    axios({
      url: "https://jsonplaceholder.typicode.com/users/" + id + "/albums",
      method: "GET",
    }).then((response) => {
      console.log(response.data);
      setAlbum(response.data);
      setIsCompletedAlbum(true);
    });
  };

  return (
    <div>
      {isCompleted ? (
        <div className="py-2 container mx-auto sm:px-4">
          <div className="flex flex-col items-start">
            <h2 className="font-bold text-3xl">{dataUser[id - 1].name}</h2>
            <div className="flex justify-between w-full ">
              <div className="flex flex-col w-1/2">
                <div className="flex flex-col w-full">
                  <h2 className="font-bold flex justify-start text-xl">
                    Personal:
                  </h2>
                  <div className="flex justify-between">
                    <p>ID:</p>
                    <p>{dataUser[id - 1].id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Username:</p>
                    <p>{dataUser[id - 1].username}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <h2 className="font-bold flex justify-start text-xl">
                    Address:
                  </h2>
                  <div className="flex justify-between">
                    <p>Street:</p>
                    <p>{dataUser[id - 1].address.street}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Suit:</p>
                    <p>{dataUser[id - 1].username}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>City:</p>
                    <p>{dataUser[id - 1].address.city}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Zipcode:</p>
                    <p>{dataUser[id - 1].address.zipcode}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <h2 className="font-bold flex justify-start text-xl">
                    Company:
                  </h2>
                  <div className="flex justify-between">
                    <p>Name:</p>
                    <p>{dataUser[id - 1].company.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>CatchPhrase:</p>
                    <p>{dataUser[id - 1].company.catchPhrase}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Bs:</p>
                    <p>{dataUser[id - 1].company.bs}</p>
                  </div>
                </div>
              </div>
              {isEdit ? (
                <div className=" flex-wrap flex flex-col w-1/3">
                  <div className="w-1/2">
                    <div className="flex items-center justify-between">
                      <h4 className="h4 text-teal-500">Contact:</h4>
                    </div>
                  </div>
                  <div className="mb-2 w-full">
                    <form action="#" onSubmit={handleUpdateInfor}>
                      <div className="mb-3 flex flex-wrap  ">
                        <div className="w-full">
                          <div className="flex flex-col items-start">
                            <label htmlFor="email" className="form-label">
                              Email:
                            </label>
                            <input
                              name="email"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              placeholder={dataUser[id - 1].email}
                              defaultValue={dataUser[id - 1].email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 flex flex-wrap ">
                        <div className="w-full">
                          <div className="flex flex-col items-start">
                            <label htmlFor="phone" className="form-label">
                              Phone:
                            </label>
                            <input
                              name="phone"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              placeholder={dataUser[id - 1].phone}
                              defaultValue={dataUser[id - 1].phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 flex flex-wrap ">
                        <div className="w-full">
                          <div className="flex flex-col items-start">
                            <label htmlFor="website" className="form-label">
                              Website:
                            </label>
                            <input
                              name="website"
                              className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                              placeholder={dataUser[id - 1].website}
                              defaultValue={dataUser[id - 1].website}
                              onChange={(e) => setWebsite(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap ">
                        <div className="w-full">
                          <div className="flex items-center gap-3">
                            <button
                              type="submit"
                              className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white hover:bg-red-700"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="w-full" />
                </div>
              ) : (
                <div className="flex flex-col w-1/3">
                  <div className="flex flex-col w-full">
                    <h2 className="font-bold flex justify-start text-xl">
                      Contact:
                    </h2>
                    <div className="flex justify-between">
                      <p>Email:</p>
                      {display ? (
                        <p>{email}</p>
                      ) : (
                        <p>{dataUser[id - 1].email}</p>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <p>Phone:</p>
                      {display ? (
                        <p>{phone}</p>
                      ) : (
                        <p>{dataUser[id - 1].phone}</p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p>Website:</p>
                      {display ? (
                        <p>{website}</p>
                      ) : (
                        <p>{dataUser[id - 1].website}</p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="flex-shrink-0 w-1/4 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-green-500 text-white hover:bg-green-600 py-3 px-4 leading-tight text-xl"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap ">
            <div className="w-full">
              <div className="border-t pt-3 mb-3 flex flex-wrap ">
                <div className="w-2/3 flex justify-start">
                  <h2 className="font-bold flex justify-start text-xl">
                    Photo Albums:
                  </h2>
                </div>
              </div>
              <div className="mb-3 flex flex-wrap ">
                <div className="w-1/2">
                  <form
                    className="flex items-center gap-3"
                    onSubmit={handleAddNewPhotos}
                  >
                    <input
                      type="text"
                      className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                      placeholder="Title of new album"
                      defaultValue={albumList}
                      onChange={(e) => setAlbumList(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 w-1/4 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-green-500 text-white hover:bg-green-600 py-3 px-4 leading-tight text-xl"
                    >
                      New Album
                    </button>
                  </form>
                </div>
              </div>
              {isCompletedAlbum && (
                <div className="flex flex-wrap ">
                  {newAlbum.map((i: any, index: any) => (
                    <div className="mb-3 md:w-1/2 pr-4 pl-4">
                      <div className="flex items-center justify-between border rounded text-decoration-none text-black ">
                        <div className=" py-2 flex-shrink-0 border-end flex items-center justify-center w-10">
                          {index + 1}
                        </div>
                        <div className="py-2 w-full px-4 truncate fw-bold text-start">
                          {i.title}
                        </div>
                        <div className="text-center flex-shrink-0 w-10 py-2">
                          <button
                            value={i.id}
                            key={i.id}
                            type="button"
                            className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline bg-red-600 text-white hover:bg-red-700 py-1 px-2 leading-tight text-xs"
                            onClick={handleDelete}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default UserDetail;
