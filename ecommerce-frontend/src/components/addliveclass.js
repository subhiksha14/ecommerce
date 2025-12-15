import React, { useState } from "react";
import axios from "axios";

function AddLiveClass() {
  const [data, setData] = useState({ title: "", description: "", date: "", meetLink: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await axios.post("http://localhost:5000/api/liveclasses", data);

    alert("Class added successfully!");
    setData({ title: "", description: "", date: "", meetLink: "" });
  };

  return (
    <form className="p-6 bg-white rounded-xl shadow-md w-[400px] mx-auto mt-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-3">Upload Live Class 🎥</h2>
      <input name="title" value={data.title} onChange={handleChange} placeholder="Class Title" className="w-full p-2 border mb-2 rounded" required />
      <textarea name="description" value={data.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border mb-2 rounded" required />
      <input type="date" name="date" value={data.date} onChange={handleChange} className="w-full p-2 border mb-2 rounded" required />
      <input name="meetLink" value={data.meetLink} onChange={handleChange} placeholder="Google Meet Link" className="w-full p-2 border mb-2 rounded" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">Add Class</button>
    </form>
  );
}

export default AddLiveClass;
