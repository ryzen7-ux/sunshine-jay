import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

export interface UploadCredentials {
  uploadUrl: string;
  gcsPath: string;
  gcsUri: string;
  bucketName: string;
  fileId: string;
}

export const generateUploadCredentials = async (
  userId: string,
  fileName?: string
): Promise<UploadCredentials> => {
  try {
    console.log(
      "[Generate Upload URLs] Starting credential generation for userId:",
      userId
    );

    // Generate unique file identifier
    const fileId = uuidv4();
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // Create organized file path: user_[userId]/[date]/[fileId].[extension]
    const fileExtension = fileName ? fileName.split(".").pop() : "bin";
    const gcsPath = `user_${userId}/${today}/${fileId}.${fileExtension}`;

    // Create file reference in bucket
    const file = bucket.file(gcsPath);

    // Generate pre-signed URL for upload (valid for 15 minutes)
    const [uploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "application/octet-stream",
    });
    const storageUrl = "https://storage.googleapis.com";
    const credentials: UploadCredentials = {
      uploadUrl,
      gcsPath,
      gcsUri: `${storageUrl}/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${gcsPath}`,
      bucketName: process.env.GOOGLE_CLOUD_STORAGE_BUCKET!,
      fileId,
    };

    console.log("[Generate Upload URLs] Generated credentials successfully");

    return credentials;
  } catch (error) {
    console.error(
      "[Generate Upload URLs] Error generating credentials:",
      error
    );
    throw new Error("Failed to generate upload credentials");
  }
};

// Decode the Base64 service account key
const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64!, "base64").toString()
);

// Initialize Google Cloud Storage client
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET!);

export { storage, bucket };
