import multer from 'multer';

export const fileValidation = {
    image : ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'],
    pdf : ['application/pdf'],
    excel : ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
}

const fileUpload = (customValidation = []) =>{
    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb){
        if(customValidation.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error('invalid file type'), false);
        }
    }

    const upload = multer({fileFilter, storage});
    return upload;
}

export default fileUpload;