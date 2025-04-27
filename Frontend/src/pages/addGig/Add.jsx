import React, { useState } from "react";
import axios from "axios";

const Add = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("design");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [revisions, setRevisions] = useState("");
  const [gigExtraName, setGigExtraName] = useState("");
  const [gigExtraPrice, setGigExtraPrice] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCoverImageChange = (e) => {
    if (e.target.files[0]) {
      setCoverImage(`/img/${e.target.files[0].name}`);
    }
  };

  const handleImagesChange = (e) => {
    if (e.target.files.length) {
      const fileNames = Array.from(e.target.files).map(
        (file) => `/img/${file.name}`
      );
      setImages(fileNames);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const currentUser =
    localStorage.getItem("currentUser") && JSON.parse(localStorage.getItem("currentUser"));
  const freelancer_id = currentUser ? currentUser.id : null;

  const validateForm = () => {
    if (
      !title ||
      !category ||
      !coverImage ||
      images.length === 0 ||
      !description ||
      !serviceTitle ||
      tags.length === 0 ||
      !deliveryTime ||
      !revisions ||
      !price
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const gigData = {
      freelancer_id,
      title,
      description,
      price,
      revision: revisions,
      category,
      delivery_time: deliveryTime,
      images,
      coverimage: coverImage,
      gig_extras: gigExtraName ? [{ title: gigExtraName, price: gigExtraPrice }] : [],
      gig_tags: tags,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/auth/create/gig", gigData);
      console.log("Gig created successfully:", res.data);
      setSuccess("Gig created successfully!");
      setTitle("");
      setCategory("design");
      setCoverImage("");
      setImages([]);
      setDescription("");
      setServiceTitle("");
      setTags([]);
      setTagInput("");
      setDeliveryTime("");
      setRevisions("");
      setGigExtraName("");
      setGigExtraPrice("");
      setPrice("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 pt-6 pb-20 min-h-screen">
      <div className="w-full max-w-5xl bg-white shadow-lg p-10 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">
          Add New Gig
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-gray-600 font-medium">Title</label>
                <input
                  type="text"
                  placeholder="e.g. I will create an amazing website"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="design">Design</option>
                  <option value="web">Web Development</option>
                  <option value="animation">Animation</option>
                  <option value="music">Music</option>
                </select>
              </div>
              <div>
                <label className="text-gray-600 font-medium">Cover Image</label>
                <input
                  type="file"
                  onChange={handleCoverImageChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImagesChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Description</label>
                <textarea
                  placeholder="Brief description of your service"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="8"
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  required
                ></textarea>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-gray-600 font-medium">Service Title</label>
                <input
                  type="text"
                  placeholder="e.g. One-page web design"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium">Gig Tags</label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    className="flex-1 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Add Tag
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-md">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-600 font-medium">Delivery Time</label>
                  <input
                    type="number"
                    placeholder="e.g. 3 days"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-medium">Revisions</label>
                  <input
                    type="number"
                    placeholder="e.g. 2"
                    value={revisions}
                    onChange={(e) => setRevisions(e.target.value)}
                    className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-600 font-medium">Gig Extra</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="e.g. Extra fast delivery (1 day)"
                    value={gigExtraName}
                    onChange={(e) => setGigExtraName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="number"
                    placeholder="Price ($)"
                    value={gigExtraPrice}
                    onChange={(e) => setGigExtraPrice(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-600 font-medium">Price</label>
                <input
                  type="number"
                  placeholder="e.g. $50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="w-full max-w-md bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition text-lg font-semibold"
            >
              Create Gig
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;

