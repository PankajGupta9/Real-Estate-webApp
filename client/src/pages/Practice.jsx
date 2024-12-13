import React from 'react'

const Practice = () => {
  return (
    <div>
      <h1>practice</h1>
    </div>
  )
}

export default Practice




















// import { useState } from "react"

// const CreateListing = () => {
//   const [files, setFiles] = useState([]);

//   const handleImageSubmit = (e) => {
//      if (files.length > 0 && files.length < 7){
//       const promises = [];

//       for  (let i=0; i <files.length; i++){
//         promises.push(storeImage(files[i]));
//       }
//      }
//   }
//   return (
//     <main className='p-3 max-w-4xl mx-auto'>
//     <h1 className='text-3xl font-semibold text-center my-7'>Create listing</h1>
//     <form className='flex flex-col sm:flex-row gap-4'>
//      <div className='flex flex-col gap-4 flex-1'>
//       <input type="text" placeholder='Name' className='border p-3 
//       rounded-lg' id='name' maxLength='62' minLength='10' required />
//       <textarea type="text" placeholder='Description' className='border 
//       p-3 rounded-lg' id='description'  required />
//       <input type="text" placeholder='Address' className='border p-3 
//       rounded-lg' id='address' required />

//       <div className='flex gap-6 flex-wrap'>
//         <div className='flex gap-2'>
//           <input type="checkbox" id='sale' className='w-5'/>
//           <span>Sell</span>
//         </div>
//         <div className='flex gap-2'>
//           <input type="checkbox" id='rent' className='w-5'/>
//           <span>Rent</span>
//         </div>
//         <div className='flex gap-2'>
//           <input type="checkbox" id='parking' className='w-5'/>
//           <span>Parking spot</span>
//         </div>
//         <div className='flex gap-2'>
//           <input type="checkbox" id='furnished' className='w-5'/>
//           <span>Furnished</span>
//         </div>
//         <div className='flex gap-2'>
//           <input type="checkbox" id='offer' className='w-5'/>
//           <span>Offer</span>
//         </div>
//       </div>
//       <div className='flex flex-wrap gap-6'>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='bedrooms' 
//              min='1' 
//              max='10' 
//              required
//              className='p-3 border border-gray-300 rounded-lg' 
//              />
//              <p>Beds</p>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='bathrooms' 
//              min='1' 
//              max='10' 
//              required
//             className='p-3 border border-gray-300 rounded-lg' 
//             />
//              <p>Bath</p>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='regularPrice' 
//              min='1' max='10' 
//              required
//             className='p-3 border border-gray-300 rounded-lg' 
//             />
//               <div className='flex flex-col intems-center'>
//                    <p>Regular Price</p>
//                    <span className='text-xs'>($ / month)</span>
//               </div>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='discountPrice' 
//              min='1' 
//              max='10' 
//              required
//              className='p-3 border border-gray-300 rounded-lg' 
//              />
//               <div className='flex flex-col intems-center'>
//                   <p>Discounted Price</p>
//                   <span className='text-xs'>($ / month)</span>
//               </div>

//          </div>

//       </div>
//      </div>

//      <div className='flex flex-col  flex-1  gap-4'>
//         <p className='font-semibold'>Images:
//         <span className='font-normal text-gray-600 ml-2'>
//         The first image will be the cover (max 6)</span>
//         </p>
//         <div className='flex gap-4'>
//           <input 
//           onChange={(e)=>setFiles(e.target.files)} 
//           className='p-3 border border-gray-300 rouded w-fll' 
//           type="file" 
//           id='images' 
//           accept='image/*' 
//           multiple/>
//           <button onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700
//           rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
//         </div>
//         <button type='button' className='p-3 bg-slate-700 text-white rounded-lg uppercase
//       hover:opacity-95 disabled:'>Create Listing</button> 
//      </div>
//     </form>
//     </main>
//   )
// }

// export default CreateListing







































// import { useState } from "react";
// import axios from "axios";

// const CreateListing = () => {
//   const [files, setFiles] = useState([]);
//   const [imageUploadError, setImageUploadError] = useState(false);

//   // Cloudinary configuration
//   const cloudName = import.meta.env.VITE_CLOUD_NAME;
//   const uploadPreset = "IBM_Project";

//   const handleImageSubmit = async (e) => {
//     e.preventDefault();

//     if (files.length === 0) {
//       alert("Please select some images.");
//       setImageUploadError('You have to add atleast one image!')

//       return;
//     }

//     if (files.length > 6) {
//       alert("You can only upload up to 6 images.");
//       setImageUploadError('You can only upload 6 images per listing!')

//       return;
//     }

//     const promises = [];

//     // Upload images to Cloudinary
//     for (let i = 0; i < files.length; i++) {
//       const formData = new FormData();
//       formData.append("file", files[i]);
//       formData.append("upload_preset", uploadPreset);

//       promises.push(
//         axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
//       );
//     }

//     try {
//       const responses = await Promise.all(promises);
//       const imageUrls = responses.map((res) => res.data.secure_url);

//       console.log("Uploaded image URLs:", imageUrls);
//       alert("Images uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       alert("Error uploading images. Please try again.");
//     }
//   };

//   return (
//     <main className="p-3 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Create listing</h1>
//       <form className="flex flex-col sm:flex-row gap-4">
//         <div className="flex flex-col gap-4 flex-1">
//           <input
//             type="text"
//             placeholder="Name"
//             className="border p-3 rounded-lg"
//             id="name"
//             maxLength="62"
//             minLength="10"
//             required
//           />
//           <textarea
//             type="text"
//             placeholder="Description"
//             className="border p-3 rounded-lg"
//             id="description"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             className="border p-3 rounded-lg"
//             id="address"
//             required
//           />
//           {/* Existing fields remain unchanged */}
        
//             <div className='flex gap-6 flex-wrap'>
//               <div className='flex gap-2'>
//                 <input type="checkbox" id='sale' className='w-5'/>
//                 <span>Sell</span>
//               </div>
//               <div className='flex gap-2'>
//                 <input type="checkbox" id='rent' className='w-5'/>
//                 <span>Rent</span>
//               </div>
//               <div className='flex gap-2'>
//                 <input type="checkbox" id='parking' className='w-5'/>
//                 <span>Parking spot</span>
//               </div>
//               <div className='flex gap-2'>
//                 <input type="checkbox" id='furnished' className='w-5'/>
//                 <span>Furnished</span>
//               </div>
//               <div className='flex gap-2'>
//                 <input type="checkbox" id='offer' className='w-5'/>
//                 <span>Offer</span>
//               </div>
//             </div>
//             <div className='flex flex-wrap gap-6'>
//                <div className='flex items-center gap-2'>
//                    <input                 type="number" 
//              id='bedrooms' 
//              min='1' 
//              max='10' 
//              required
//              className='p-3 border border-gray-300 rounded-lg' 
//              />
//              <p>Beds</p>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='bathrooms' 
//              min='1' 
//              max='10' 
//              required
//             className='p-3 border border-gray-300 rounded-lg' 
//             />
//              <p>Bath</p>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='regularPrice' 
//              min='1' max='10' 
//              required
//             className='p-3 border border-gray-300 rounded-lg' 
//             />
//               <div className='flex flex-col intems-center'>
//                    <p>Regular Price</p>
//                    <span className='text-xs'>($ / month)</span>
//               </div>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='discountPrice' 
//              min='1' 
//              max='10' 
//              required
//              className='p-3 border border-gray-300 rounded-lg' 
//              />
//               <div className='flex flex-col intems-center'>
//                   <p>Discounted Price</p>
//                   <span className='text-xs'>($ / month)</span>
//               </div>

//          </div>

//       </div>
//       </div>

//         <div className="flex flex-col flex-1 gap-4">
//           <p className="font-semibold">
//             Images:
//             <span className="font-normal text-gray-600 ml-2">
//               The first image will be the cover (max 6)
//             </span>
//           </p>
//           <div className="flex gap-4">
//             <input
//               onChange={(e) => setFiles(Array.from(e.target.files))}
//               className="p-3 border border-gray-300 rounded w-full"
//               type="file"
//               id="images"
//               accept="image/*"
//               multiple
//             />
//             <button
//               onClick={handleImageSubmit}
//               className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
//             >
//               Upload
//             </button>
//           </div>
//           <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
//           {
//             formData.imageUrls.lentgh > 0 && formData.imageUrls.map((url) =>(
//               <div className="flex justify-between p-3 border items-center">
//               <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />

//               </div>
//             ))
//           }
//           <button
//             type="button"
//             className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:"
//           >
//             Create Listing
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default CreateListing;




































// import { useState } from "react";
// import { useState } from "react";
// import axios from "axios";

// const CreateListing = () => {
//   const [files, setFiles] = useState([]);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // Cloudinary configuration
//   const cloudName = import.meta.env.VITE_CLOUD_NAME;
//   const uploadPreset = "IBM_Project";

//   const handleImageSubmit = async (e) => {
//     e.preventDefault();

//     // if (files.length === 0 ) {
//     //   setImageUploadError("You have to add at least one image!");
//     //   return;
//     // }

//     // if (files.length > 6) {
//     //   setUploading(true);
//     //   setImageUploadError("You can only upload up to 6 images per listing!");
//     //   return;
//     // }


//     if (files.length > 0 && files.length < 6) {
//       setUploading(true);
//       setImageUploadError(false);


//     const promises = [];

//     // Upload images to Cloudinary
//     for (let i = 0; i < files.length; i++) {
//       const formData = new FormData();
//       formData.append("file", files[i]);
//       formData.append("upload_preset", uploadPreset);

//       promises.push(
//         axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
//       );
//     }

//     try {
//       const responses = await Promise.all(promises);
//       const imageUrls = responses.map((res) => res.data.secure_url);

//       setUploadedImages([...uploadedImages, ...imageUrls]);
//       setFiles([]); // Clear the file input
//       setImageUploadError(false);
//       setUploading(false);
//       alert("Images uploaded successfully!");

//     } catch (error) {
//       console.error("Error uploading images:", error);
//       alert("Error uploading images. Please try again.");
//       setUploading(false);
//     }
//   }else{
//     setImageUploadError("You have to upload more than 1 image &  not more than 6 images per listing!");
//     setUploading(false);
//   }
//   };

//   const handleDeleteImage = (url) => {
//     setUploadedImages(uploadedImages.filter((image) => image !== url));
//   };

//   return (
//     <main className="p-3 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
//       <form className="flex flex-col sm:flex-row gap-4">
//         <div className="flex flex-col gap-4 flex-1">
//           <input
//             type="text"
//             placeholder="Name"
//             className="border p-3 rounded-lg"
//             id="name"
//             maxLength="62"
//             minLength="10"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             className="border p-3 rounded-lg"
//             id="description"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             className="border p-3 rounded-lg"
//             id="address"
//             required
//           />

//        <div className='flex gap-6 flex-wrap'>
//          <div className='flex gap-2'>
//            <input type="checkbox" id='sale' className='w-5'/>
//            <span>Sell</span>
//          </div>
//          <div className='flex gap-2'>
//            <input type="checkbox" id='rent' className='w-5'/>
//            <span>Rent</span>
//          </div>
//          <div className='flex gap-2'>
//            <input type="checkbox" id='parking' className='w-5'/>
//            <span>Parking spot</span>
//          </div>
//          <div className='flex gap-2'>
//            <input type="checkbox" id='furnished' className='w-5'/>
//            <span>Furnished</span>
//          </div>
//          <div className='flex gap-2'>
//            <input type="checkbox" id='offer' className='w-5'/>
//            <span>Offer</span>
//          </div>
//        </div>
//        <div className='flex flex-wrap gap-6'>
//           <div className='flex items-center gap-2'>
//               <input            type="number" 
//              id='bedrooms' 
//              min='1' 
//              max='10' 
//              required
//              className='p-3 border border-gray-300 rounded-lg' 
//              />
//              <p>Beds</p>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='bathrooms' 
//              min='1' 
//              max='10' 
//              required
//             className='p-3 border border-gray-300 rounded-lg' 
//             />
//              <p>Bath</p>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='regularPrice' 
//              min='1' max='10' 
//              required
//             className='p-3 border border-gray-300 rounded-lg' 
//             />
//               <div className='flex flex-col intems-center'>
//                    <p>Regular Price</p>
//                    <span className='text-xs'>($ / month)</span>
//               </div>
//          </div>
//          <div className='flex items-center gap-2'>
//              <input 
//              type="number" 
//              id='discountPrice' 
//              min='1' 
//              max='10' 
//              required
//              className='p-3 border border-gray-300 rounded-lg' 
//              />
//               <div className='flex flex-col intems-center'>
//                   <p>Discounted Price</p>
//                   <span className='text-xs'>($ / month)</span>
//               </div>

//          </div>

//       </div>
//      </div>

//         <div className="flex flex-col flex-1 gap-4">
//           <p className="font-semibold">
//             Images:
//             <span className="font-normal text-gray-600 ml-2">
//               The first image will be the cover (max 6)
//             </span>
//           </p>
//           <div className="flex gap-4">
//             <input
//               onChange={(e) => setFiles(Array.from(e.target.files))}
//               className="p-3 border border-gray-300 rounded w-full"
//               type="file"
//               id="images"
//               accept="image/*"
//               multiple
//             />
//             <button
//               onClick={handleImageSubmit}
//               disabled={uploading}
//               className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
//             >
//             {uploading ? 'Uploading...' : 'Upload'}
//             </button>
//           </div>
//           <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>

//           <div className="flex flex-col gap-2 mt-4">
//             {uploadedImages.map((url, index) => (
//               <div className="flex justify-between items-center border p-3 rounded-lg">
//                 <img
//                   src={url}
//                   alt={`Uploaded ${index + 1}`}
//                   className="w-20 h-20 object-contain rounded-lg"
//                 />
//                 <button
//                   onClick={() => handleDeleteImage(url)}
//                   className="p-1 text-red-600 border border-red-600 uppercase rounded hover:opacity-95"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//             <button
//                 type="submit"
//                 className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75"
//                 >
//                 Create Listing
//             </button>

//           </div>
//         </div>
//       </form>
//     </main>
//   );
// };

// export default CreateListing;
