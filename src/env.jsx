export const environment = {
    // --------------------Local Server Api URL--------------------
    // baseUrl: 'http://192.168.0.171:8001/',
    baseUrl: 'http://127.0.0.1:8000/',


    // --------------------Live Server Api URL--------------------
    // baseUrl: 'https://ref.techiebears.com/',
}

// ====================== AWS S3 Image/File Upload =========================

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: 'AKIA3UY6PSUDMRLGKBP7',
        secretAccessKey: '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'
    }
});

export const ImageUpload = async (data, folder, imgname, name) => {
    const command = new PutObjectCommand({
        Bucket: "reeferon-media",
        Key: `${folder}/${name}_${imgname}_${data.name}`,
        Body: data,
    });
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};
export const profileUpload = async (data, name) => {
    const timestamp = Date.now();
    const command = new PutObjectCommand({
        Bucket: "reeferon-media",
        Key: `profile/${name}_${data?.name}`,
        Body: data,
    });
    try {
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};


// == LINK == 
export const link = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/storage/'
// == LINK == 
export const profileLink = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/profile/'
export const demovideoLink = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/demovideo/'
export const storeproductLink = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/storeproduct/'
export const bannerLink = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/banner/'
export const movableCatLink = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/movablecategory/'
export const movableproductLink = 'https://reeferon-media.s3.ap-south-1.amazonaws.com/movableproduct/'