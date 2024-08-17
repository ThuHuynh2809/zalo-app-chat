const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const serviceAccount = require("../config/firebase-sdk.json");

const BUCKET = "gs://chatappzalo-cbb3f.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
  databaseURL: "https://chatappzalo-cbb3f-default-rtdb.firebaseio.com",
});

const bucket = admin.storage().bucket();

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4();
    const fileName = image.originalname || uuidv4(); // Use originalname or fallback to a unique name
    const file = bucket.file(fileName);
    
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      },
      contentType: image.mimetype,
    };

    const blobStream = file.createWriteStream({
      metadata: metadata,
      gzip: true,
    });

    blobStream.on("error", (error) => {
      reject("Something is wrong! Unable to upload at the moment.");
    });

    blobStream.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;
      resolve(publicUrl);
    });

    blobStream.end(image.buffer);
  });
};

module.exports = {
  uploadImage,
};
