const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    const Bucket = event.Records[0].s3.bucket.name; // kfunny-image-s3
    const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/123123123.png
    console.log(Bucket, Key);
    const filename = Key.split('/')[Key.split('/').length - 1]; // 123123123.png
    const ext = Key.split('.')[Key.split('/').length - 1].toLowerCase(); // png
    const requiredFormat = ext === 'jpg' || 'JPG' ? 'jpeg' : ext;
    console.log('filename', filename, 'ext', ext);

    try {
        const s3Object = await s3.getObject({ Bucket, Key }).promise;
        // console.log('original', s3Object.Body.length);
        let resizedImage = await sharp(s3Object.Body)
                .resize({ fit : 'inside', width: 480 })
                .toFormat(requiredFormat)
                .toBuffer();
        const qualityNum = 70;
        if(requiredFormat === 'jpeg') {
            let resizedImage = resizedImage
                .jpeg({ quality: qualityNum });
        } else if (requiredFormat === 'png' || 'PNG') {
            let resizedImage = resizedImage
                .png({ quality: qualityNum });
        } else if (requiredFormat === 'webp') {
            let resizedImage = resizedImage
                .webp({ quality: qualityNum });
        }
        await s3.putObject({
            Bucket,
            Key: `resized/${filename}}`,
            Body: resizedImage,
        }).promise();
        console.log('put', resizedImage.length);
        return callback(null, `resized/${filename}}`);
    } catch (error) {
        console.log('lambda', error);
        return callback(error);
    };
};