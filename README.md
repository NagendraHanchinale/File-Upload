# Intermediate File Upload Project

This project is a Node.js/Express backend for uploading files locally and to Cloudinary, with MongoDB for storage and email notifications on upload.

## Features

- Upload images and videos to Cloudinary
- Local file upload support
- Image compression before upload
- MongoDB integration for file metadata
- Email notification sent to user on successful upload

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas (or local MongoDB)
- Cloudinary account
- Gmail account for email notifications

### Installation

1. Clone the repository.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=4000
   DATABASE_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_gmail_address
   MAIL_PASS=your_gmail_app_password
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

## API Routes

All routes are prefixed with `/api/v1/upload`.

### 1. `POST /api/v1/upload/localFileUpload`

**Description:** Uploads a file to the local server filesystem.

**Form Data:**
- `file`: File to upload

**Response:**
- `success`: Boolean
- `message`: Status message
- `path`: Path to the uploaded file

---

### 2. `POST /api/v1/upload/imageUpload`

**Description:** Uploads an image to Cloudinary and saves metadata to MongoDB. Sends an email notification to the provided email.

**Form Data:**
- `imageFile`: Image file (`jpg`, `jpeg`, `png`)
- `name`: Name of the file
- `tags`: Tags for the file
- `email`: Email address to notify

**Response:**
- `success`: Boolean
- `message`: Status message
- `url`: Cloudinary URL of the uploaded image

---

### 3. `POST /api/v1/upload/videoUpload`

**Description:** Uploads a video to Cloudinary and saves metadata to MongoDB. Sends an email notification to the provided email.

**Form Data:**
- `videoFile`: Video file (`mp4`, `mov`)
- `name`: Name of the file
- `tags`: Tags for the file
- `email`: Email address to notify

**Response:**
- `success`: Boolean
- `message`: Status message
- `url`: Cloudinary URL of the uploaded video

---

### 4. `POST /api/v1/upload/imageSizeReducer`

**Description:** Compresses an image and uploads it to Cloudinary with reduced quality. Saves metadata to MongoDB and sends an email notification.

**Form Data:**
- `imageFile`: Image file (`jpg`, `jpeg`, `png`)
- `name`: Name of the file
- `tags`: Tags for the file
- `email`: Email address to notify

**Response:**
- `success`: Boolean
- `message`: Status message
- `url`: Cloudinary URL of the compressed image

---

## Project Structure

- `index.js`: Entry point, sets up Express and routes
- `config/`: Configuration files for database and Cloudinary
- `controller/fileUpload.js`: Route handlers for file uploads
- `models/File.js`: Mongoose schema for file metadata and email notification logic
- `routes/FileUpload.js`: Express router for upload endpoints

## Email Notification

After a successful upload to Cloudinary, an email is sent to the provided email address with a notification about the upload.

---

**Author:**  
Nagendra Hanchinale
