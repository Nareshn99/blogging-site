import AWS from "aws-sdk";
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey ,
    region: process.env.region
});

const uploadFile = async function (file) {
  return new Promise(function (resolve, reject) {
    let s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "blogImages/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, result) {
      if (err) return reject({ error: err });
      return resolve(result.Location);
    });
  });
};

export default uploadFile;
