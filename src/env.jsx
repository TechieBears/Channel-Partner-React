export const environment = {
    // --------------------Local Server Api URL--------------------
    // baseUrl: 'http://192.168.0.151:8005/',
    // baseUrl: 'http://127.0.0.1:8000/',
    // baseUrl:'https://8191-103-172-226-7.ngrok-free.app/',


    // --------------------Live Server Api URL--------------------
    baseUrl: 'https://cpapi.techiebears.com/',
}

// ====================== AWS S3 Image/File Upload =========================

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIAYS2NVFY7SU7M2KHX',
        secretAccessKey: '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'
    }
});


export const ImageUpload = async (data, folder, imgname, name) => {
    const command = new PutObjectCommand({
        Bucket: "channel-partner-media",
        Key: `${folder}/${name}_${imgname}_${data?.name}`,
        Body: data,
    });
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};


//  ----------------------- S3 Bucket Links --------------------------
export const categoryLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/category/'
export const restaurantcategoryLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/restaurantcategory/'
export const subcategoryLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/subcategory/'
export const restaurantsubcatLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/restaurantsubcategory/'
export const productLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/shopProduct/'
export const profileImageLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/profileimg/'
export const bannerLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/banner/'
export const promotionLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/promotion/'
export const mediaGalleryLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/mediagallery/'


// ---- Franchisee Links ----
export const franchiselink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/franchisee/'
export const deliveryBoylink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/deliveryboy/'
export const vendorlink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/vendor/'
export const restaurantLink = 'https://channel-partner-media.s3.ap-south-1.amazonaws.com/restaurant/'
