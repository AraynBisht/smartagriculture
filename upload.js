AWS.config.update({
    accessKeyId: '', // Replace with your access key
    secretAccessKey: 'BsZF36xD713MbV4iH1+qYDPjBRkHIrYtSiiZU6cF', // Replace with your secret key
    region: 'ap-south-1' // Replace with your S3 bucket region
});
const s3 = new AWS.S3();
async function uploadFile() {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }
    const params = {
        Bucket: 'agri-03', // Replace with your S3 bucket name
        Key: file.name, // The file name you want to save in S3
        Body: file,
        ACL: 'public-read' // Optional: Set file access control
    };
    try {
        const response = await s3.upload(params).promise();
        alert('File uploaded successfully at ' + response.Location);
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file: ' + error.message);
    }
}
