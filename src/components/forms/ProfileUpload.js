import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ProfileUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
}) {
  const [auth, setAuth] = useAuth();

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];
      if (file) {
        setUploading(true);
        new Promise(() => {
          Resizer.imageFileResizer(
            file,
            1080,
            720,
            "JPEG",
            100,
            0,
            async (uri) => {
              try {
                const { data } = await axios.post("upload-image", {
                  image: uri,
                });
                setPhoto( data );
                setUploading(false);
              } catch (error) {
                console.log(error);
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleDelete = async (photo) => {
    const answer = window.confirm("Delete image?");
    console.log("_____>", photo);
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <label className="btn btn-secondary mb-2 mt-4">
        {uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
      </label>
      {photo?.Location ? (
        <Avatar
          src={photo?.Location}
          shape="square"
          size="46"
          className="ml-2 mt-3"
          onClick={() => handleDelete(photo)}
        />
      ) : (
        " "
      )}
    </>
  );
}
