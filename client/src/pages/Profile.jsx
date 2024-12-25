import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileUploadError1, setFileUploadError1] = useState(false);
  const [fileUploadsuccess, setFileUploadsuccess] = useState(false);

  // -------------------------------------------------------------------------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // -------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // -------------------------------------------------------------------------------------------------

  const handleFileUpload = async (file) => {
    if (!file) return;
    const max_file_size = 2 * 1024 * 1024;
    if (file.size > max_file_size) {
      setFileUploadError1(true);
      setFileUploadsuccess(false);
      return;
    }
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
      setFormData({ ...formData, avatar: uploadImageUrl.url });
      setFileUploadsuccess(true);
      setFileUploadError1(false);
    } catch (error) {
      console.log(error.message);
      setFileUploadsuccess(false);
    }
  };

  // -------------------------------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser._id);

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // -------------------------------------------------------------------------------------------------

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // -------------------------------------------------------------------------------------------------

  const handleSignOut = async (e) => {
    try {
      dispatch(signOutStart());
      const res = await fetch("api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className=" text-red-500 text-sm self-center">
          {fileUploadError1 ? (
            <span>
              Error Occured During Image Upload!(Image size must be less than
              2mb)
            </span>
          ) : (
            ""
          )}
        </p>
        <p className=" text-green-500 text-sm self-center">
          {fileUploadsuccess ? <span>Image Uploaded Successfully!</span> : ""}
        </p>
        <input
          type="text"
          onChange={handleChange}
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          onChange={handleChange}
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 duration-500 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95 duration-500 disabled:opacity-80"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 hover:text-red-500 duration-500 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 hover:text-red-500 duration-500 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User updated successfuly" : ""}
      </p>
    </div>
  );
}

export default Profile;
