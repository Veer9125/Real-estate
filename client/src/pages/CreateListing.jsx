import { useState } from "react";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log("all imageUrls", formData);

  const [imageUploadError, SetImageUploadError] = useState(false);
  const [uploading, setUpLoading] = useState(false);

  //------------------------------------------------------------------------------------------------------------

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUpLoading(true);
      SetImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUpLoading(false);
          SetImageUploadError(false);
        })
        .catch((err) => {
          SetImageUploadError("Image upload failed (2mb max per image)!");
          setUpLoading(true);
        });
    } else {
      SetImageUploadError("You can upload only 6 images per listing!");
      setUpLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "First_time_using_cloudinary");
        data.append("cloud_name", "dh6gqc9xj");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dh6gqc9xj/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const uploadImageUrl = await res.json();
        resolve(uploadImageUrl.url);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  console.log(files);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg focus:outline-none"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg focus:outline-none"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg focus:outline-none"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="Number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border rounded-lg border-gray-300"
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="Number"
                id="bathrooms"
                min="1"
                max="10"
                className="p-3 border rounded-lg border-gray-300"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="Number"
                id="reqularPrice"
                min="1"
                max="10"
                className="p-3 border rounded-lg border-gray-300"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="Number"
                id="discountPrice"
                min="1"
                max="10"
                className="p-3 border rounded-lg border-gray-300"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover the max(6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-500 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing name"
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 disabled:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
