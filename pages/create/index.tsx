import React, { useState, useEffect } from "react";
import { BiImage } from "react-icons/bi";
import Header from "../../components/common/Header";

type Props = {};
const styles = {
  label:
    "block uppercase tracking-wide text-white text-sm font-bold mb-[4px] font-sans text-[#e5e8eb]",
  input:
    "text-white bg-transparent block w-full bg-gray-200 border-2 border-[#4c505c] rounded-[10px] py-3 px-4 mb-3 leading-tight bg-transparent text-white ",
  inputBox:
    "bg-transparent block w-full bg-gray-200 border-2 border-[#4c505c] rounded-[10px] py-3 px-4 mb-3 leading-tight h-32",
};

const index = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<string | undefined>();
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <Header />
      <div className="w-[600px] flex flex-col space-y-10 mx-auto mt-20">
        <div className="text-[40px] font-bold text-white">Create New Item</div>
        <form>
          <div className="flex flex-col space-y-6">
            <div className="w-full px-3">
              <label className={styles.label}>
                Image, Video, Audio or 3D Model{" "}
                <span className="text-red-600">*</span>
              </label>
              <div className="text-xs mb-2 text-[#8A939B]">
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </div>
              {/* <input
                type="file"
                style={"display:none;"}
                className={styles.input}
                placeholder="Image, Video, Audio or 3D Model"
                id="grid-first-name"
                // style="display:none;"
              /> */}
              <div className="flex items-center justify-center w-[50%] relative">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent  hover:bg-black hover:opacity-70">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {/* <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg> */}
                    <BiImage className=" text-white w-20 h-20" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={onSelectFile}
                  />
                  {selectedFile && (
                    <img
                      src={preview}
                      className="absolute top-0 right-0 w-fit"
                    />
                  )}
                </label>
              </div>

              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full px-3">
              <label className={styles.label}>
                Name <span className="text-red-600">*</span>
              </label>
              <input
                className={styles.input}
                id="grid-first-name"
                type="text"
                placeholder="Item Name"
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full px-3">
              <label className={styles.label}>Description</label>
              <div className="text-xs mb-2 text-[#8A939B]">
                The description will be included on the item's detail page
                underneath its image. Markdown syntax is supported.
              </div>
              <textarea
                className={styles.inputBox}
                id="grid-last-name"
                placeholder="Provide a detailed description of your item."
              />
            </div>
            <div className="w-full px-3">
              <label className={styles.label}>Collection</label>
              <div className="text-xs mb-2 text-[#8A939B]">
                This is the collection where your item will appear.
              </div>
              <div className="relative">
                <select className={styles.input} id="grid-state">
                  <option>NFT's Collection</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
              </div>
            </div>
            {/* <div className="w-full px-4">
              <hr className="px-3 border-[#8A939B]" />
            </div> */}
            <div className="w-full px-3">
              <button
                // blue background and white text
                className="
                bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-4 px-7 rounded-xl mt-10 mb-20"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
