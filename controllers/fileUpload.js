const File = require('../models/File'); 
const cloudinary = require("cloudinary").v2;
exports.localFileUpload = async (req, res) => {
    try{
        const file=req.files.file;
        console.log(file);
        let path = __dirname+"/files/"+Date.now()+ `.${file.name.split(".")[1]}`;

        console.log("Path->"+  path);

        file.mv(path,(err)=>{
            console.log(err)
        });
        res.json({
            success:true,
            message:"File uploaded successfully",
        });
    }
    catch(error){
        console.log(error);
    }
}
function isValidFileType(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"; 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}   

exports.imageUpload= async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file=req.files.imageFile;
        console.log(file);
        
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isValidFileType(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "Unsupported file type."
            });
        }
        
        const response = await uploadFileToCloudinary(file, "folder");
        console.log(response);
        
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });   
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        })
    }
    catch(error){
        console.error("Error uploading image:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload image.",
            error: error.message, 
        });
        
    }
}

exports.videoUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file=req.files.videoFile; 
        
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isValidFileType(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "Unsupported file type."
            });
        }
        const response=await uploadFileToCloudinary(file,"folder")
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });   
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully",
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"Something went weong"
        })
    }
}
exports.imageSizeReduer= async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file=req.files.imageFile;
        console.log(file);
        
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split(".")[1].toLowerCase();
        if(!isValidFileType(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "Unsupported file type."
            });
        }
        
        const response = await uploadFileToCloudinary(file, "folder",30);
        console.log(response);
        
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });   
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully",
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"Something went weong"
        })

    }
}
