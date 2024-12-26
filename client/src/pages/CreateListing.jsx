import { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
   imageUrls: [],
   name: '',
   description: '',
   address: '',
   type: 'rent',
   bedrooms: 1,
   bathrooms: 1,
   regularPrice: 100,
   discountPrice: 0,
   offer: false,
   parking: false,
   furnished: false,

  })
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(formData);

  // Cloudinary configuration
  const uploadPreset = "IBM_Project";
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (files.length > 0 && files.length < 6) {
      setUploading(true);
      setImageUploadError(false);


    const promises = [];

    // Upload images to Cloudinary
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);

      promises.push(axios.post(uploadUrl, formData)
      );
    }

    try {
      const responses = await Promise.all(promises);
      const imageUrls = responses.map((res) => res.data.secure_url);

      setUploadedImages([...uploadedImages, ...imageUrls]);
      setFiles([]); // Clear the file input
      setImageUploadError(false);
      setUploading(false);
      alert("Images uploaded successfully!");

    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images. Please try again.");
      setUploading(false);
    }
  }else{
    setImageUploadError("You have to upload more than 1 image &  not more than 6 images per listing!");
    setUploading(false);
  }
  };

  const handleDeleteImage = (url) => {
    setUploadedImages(uploadedImages.filter((image) => image !== url));
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({
        ...formData,
        type:e.target.id,
      });
    }

    if(
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if(
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const listingData = {
        ...formData,
        imageUrls: [...uploadedImages], // Combine uploaded images
        userRef: currentUser?.rest._id,
      };
      
      if (listingData.imageUrls.length < 1) {
        return setError('You must upload at least one image');
      }
            if (Number(listingData.regularPrice) < Number(listingData.discountPrice)) {
        return setError('Discount price must be lower than regular price');
      }
      setLoading(true);
      setError(false);
      const res = await axios.post('http://localhost:3000/api/listing/create',listingData,{
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });
      alert("Product created successfully");
      setLoading(false);
      window.location.reload(); // Refresh the page

      if (!res.data.success) {
        return setError(res.data.message);
      }
  
    }catch (error){
      setError(error.message);
      setLoading(false);
    }

  }




  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}

          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}

          />

       <div className='flex gap-6 flex-wrap'>
         <div className='flex gap-2'>
           <input 
           type="checkbox" 
           id='sale' 
           className='w-5'
           onChange={handleChange}
           checked={formData.type === 'sale'}
           />
           <span>Sale</span>
         </div>
         <div className='flex gap-2 '>
           <input 
           type="checkbox" 
           id='rent'
            className="w-5"
            onChange={handleChange}
           checked={formData.type === 'rent'}
           />
           <span>Rent</span>
         </div>
         <div className='flex gap-2'>
           <input 
           type="checkbox" 
           id='parking' 
           className='w-5'
           onChange={handleChange}
           checked={formData.parking}
           />
           <span>Parking spot</span>
         </div>
         <div className='flex gap-2'>
           <input 
           type="checkbox" 
           id='furnished' 
           className='w-5'
           onChange={handleChange}
           checked={formData.furnished}
           />
           <span>Furnished</span>
         </div>
         <div className='flex gap-2'>
           <input 
           type="checkbox" 
           id='offer' 
           className='w-5'
           onChange={handleChange}
           checked={formData.offer}
           />
           <span>Offer</span>
         </div>
       </div>
       <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
              <input            
             type="number" 
             id='bedrooms' 
             min='1' 
             max='10' 
             required
             className='p-3 border border-gray-300 rounded-lg' 
             onChange={handleChange}
             value={formData.bedrooms}
             />
             <p>Beds</p>
         </div>
         <div className='flex items-center gap-2'>
             <input 
             type="number" 
             id='bathrooms' 
             min='1' 
             max='10' 
             required
             className='p-3 border border-gray-300 rounded-lg' 
             onChange={handleChange}
             value={formData.bathrooms}
            />
             <p>Bath</p>
         </div>
         <div className='flex items-center gap-2'>
             <input 
             type="number" 
             id='regularPrice' 
             min='100' 
             max='100000'
             required
            className='p-3 border border-gray-300 rounded-lg'
            onChange={handleChange}
            value={formData.regularPrice} 
            />
              <div className='flex flex-col intems-center'>
                   <p>Regular Price</p>
                   <span className='text-xs'>($ / month)</span>
              </div>
         </div>
         {formData.offer && (
          <div className='flex items-center gap-2'>
             <input 
             type="number" 
             id='discountPrice' 
             min='0' 
             max='10000' 
             required
             className='p-3 border border-gray-300 rounded-lg' 
             onChange={handleChange}
             value={formData.discountPrice}
             />
              <div className='flex flex-col intems-center'>
                  <p>Discounted Price</p>
                  <span className='text-xs'>($ / month)</span>
              </div>

         </div>

         )}

      </div>
     </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
            {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>

          <div className="flex flex-col gap-2 mt-4">
            {uploadedImages.length > 0 ? (
                uploadedImages.map((url, index) => (
              <div key={url}  className="flex justify-between items-center border p-3 rounded-lg">
                <img
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  onClick={() => handleDeleteImage(url)}
                  className="p-1 text-red-600 border border-red-600 uppercase rounded hover:opacity-95"
                >
                  Delete
                </button>
              </div>
            ))
            ):(
                <p className="text-gray-500">No images uploaded.</p>
            )
            }

            <button
                disabled={loading || uploading}
                type="submit"
                className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75"
                >
                {loading ? 'Creating...' : 'Create listing'}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;




























