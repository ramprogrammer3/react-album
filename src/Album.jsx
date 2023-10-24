import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import nextId from "react-id-generator";
import { Link } from "react-router-dom";

// api url
let url = `https://jsonplaceholder.typicode.com/albums`;

const Album = () => {
  // hook for store data
  const [albumData, setAlbumData] = useState([]);

  // loading state for loding
  const [loading, setLoading] = useState(false);

  // hook for text , that text is added
  const [title, setTitle] = useState("");

  // api call for fetch datda
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        toast.success("Data fetched successfully");
      }
      setAlbumData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Unable to fatched data");
    }

    setLoading(false);
  };

  // api call for delete item by id
  const deletItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      if (response) {
        toast.success("Item deleted successfully");
      }
    } catch (error) {
      toast.error("Unable to delete item ");
    }
  };

  // post call for adding data

  const addItem = async (data) => {
    try {
      const response = await axios.post(url, data);

      if (response) {
        toast.success("Item added successfully, please check in console");
      }

      console.log(response);
    } catch (error) {
      toast.error("Unable to Add item");
    }
  };

  // handle submit function to addd text in colleciton
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      id: nextId(),
    };

    addItem(data);

    setTitle("");
  };

  // hook for fetch data in first rendfer
  useEffect(() => {
    getData();
  }, []);

  // spinner when api call is not complete
  if (albumData.length < 0 || loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-slate-500">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto my-10">
      {/* heading  */}
      <h1 className="text-center text-2xl font-semibold lead mb-2">
        React Album App by ram kumar{" "}
      </h1>

      <hr />

      {/* secciton for adding datda  */}
      <div className="w-full">
        <form
          action=""
          className="w-full py-5 flex justify-center items-center border
         border-black px-5 gap-x-2"
          onSubmit={handleSubmit}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter item title"
            className="w-[90%] text-center border border-blue-300 rounded-md py-1
             focus:outline-blue-400"
          />
          <button
            className="w-[10%] border border-blue-300 py-1 transition-all duration-200
          rounded-md hover:bg-blue-500 hover:text-white"
          >
            Add{" "}
          </button>
        </form>
      </div>

      {/* populating albut data  */}

      <table className="my-10">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Edit</th>
            <th> Delete </th>
          </tr>
          {albumData.map((item) => (
            <tr key={item.id}>
              <td> {item.id} </td>
              <td> {item.title} </td>
              <td className="editbtn">
                <Link to={`/editpage/${item.id}`}>
                  <MdModeEdit className="text-2xl text-blue-600 cursor-pointer" />
                </Link>
              </td>
              <td className="deletbtn">
                <AiFillDelete
                  onClick={() => deletItem(item.id)}
                  className="text-2xl text-red-700 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Album;
