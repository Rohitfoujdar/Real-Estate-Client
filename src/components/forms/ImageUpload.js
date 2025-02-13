import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });
        files.map((file) => {
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
                  console.log("--------->", data)
                  setAd((prev) => ({
                    ...prev,
                    photos: [data, ...prev.photos],
                    uploading: false,
                  }));
                } catch (error) {
                  console.log(error);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (error) {
      console.log(error);
      setAd({ ...ad, uploading: false });
    }
  };


  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?")
    console.log("_____>", file)
    if(!answer) return;
    setAd({ ...ad, uploading: false });
    try {
      const {data} = await axios.post("remove-image", file)
      if(data?.ok){
        setAd((prev)=>({
          ...prev, photos: prev.photos.filter((p)=>p.Key !== file.Key),
          uploading: false
        }))
      }
    } catch (error) {
      console.log(error);
      setAd({ ...ad, uploading: false });
    }
  };

  return (
    <>
      <label className="btn btn-secondary mb-2 mt-4">
        {ad.uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
      </label>
      {ad.photos?.map((file, index) => (
        <Avatar
          key={index}
          src={file?.Location}
          shape="square"
          size="46"
          className="ml-2 mt-3"
          onClick={() => handleDelete(file)}
        />
      ))}
    </>
  );
}
