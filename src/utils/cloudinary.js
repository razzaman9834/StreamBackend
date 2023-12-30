import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: "dn7gfuosj",
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

const uploadOnCloudinary = async (localFilePath) =>{
    try {
      if (!localFilePath) return null 
        
      const response = await cloudinary.uploader.upload(localFilePath ,{
        resource_type:"auto"
      })
     // console.log("File uploaded successfully",response.url)
   //  fs.unlinkSync(localFilePath)
      return response;
    } catch (error) {

      fs.unlinkSync(localFilePath) //remove the locally saved temp files as the upload operation got failed
      return null;
      
    }
}

export {uploadOnCloudinary}
