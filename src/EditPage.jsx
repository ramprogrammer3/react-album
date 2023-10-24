import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const EditPage = () => {
  // use location look to fetch id from url
  const location = useLocation();
  const fetchid = location.pathname.split("/");
  const id = fetchid[fetchid.length - 1];

  // use navigate hook to navigate home page
  const navigate = useNavigate();

  //
  const [loading, setLoading] = useState(false);

  // api url
  let url = `https://jsonplaceholder.typicode.com/albums`;

  // edit text set in state hook
  const [editableItem, setEditableItem] = useState("");

  // api call for fetching data by id
  const fetchItem = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}?id=${id}`);
      setEditableItem(response.data[0].title);
      setLoading(false);
    } catch (error) {
      toast.error("Unable to fetched item ");
    }
    setLoading(false);
  };

  // api call for update data by id
  const updateData = async (id, data) => {
    try {
      const response = await axios.put(`${url}/${id}`, data);
      if (response) {
        toast.success("Update successfully,check in console");
      }
      console.log(response);

      navigate("/");
    } catch (error) {
      toast.error("Error while updating");
    }
  };

  // handle function after click on it item update
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: editableItem,
    };

    updateData(id, data);

    setEditableItem("");
  };

  // fetch data on first rendfer
  useEffect(() => {
    fetchItem(id);
  }, []);

  // loading div while fetching data
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-slate-500">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-[1200px] mx-auto my-10">
      {/* sub heading  */}
      <h3 className="text-center text-2xl font-semibold mb-5">
        Update page : update and check in console{" "}
      </h3>

      {/* form for update item  */}
      <form
        onSubmit={handleSubmit}
        action=""
        className="w-full py-5 flex justify-center items-center border
         border-black px-5 gap-x-2"
      >
        <input
          value={editableItem}
          onChange={(e) => setEditableItem(e.target.value)}
          type="text"
          placeholder="write editable text like ram kumar "
          className="w-[90%] text-center border border-blue-300 rounded-md py-1
             focus:outline-blue-400"
        />
        <button
          className="w-[10%] border border-blue-300 py-1 transition-all duration-400
          rounded-md hover:bg-blue-500 hover:text-white"
        >
          update
        </button>
      </form>
    </div>
  );
};

export default EditPage;
