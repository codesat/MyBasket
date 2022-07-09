 let imageurl;
 export const uploadimg=async(filename)=>{

    const data=new FormData();
    data.append("file",filename);
    data.append("upload_preset","categoryimg");
    data.append("cloud_name","codercloud");

    //upload
    await fetch("https://api.cloudinary.com/v1_1/codercloud/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
    .then(data=>{
       imageurl=data.url
    });
    console.log(imageurl)
    return imageurl;
}