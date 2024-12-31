import { getAccessToken } from "./auth.js";

function uploadFiles(files) {
    const token = getAccessToken();

    if (!token) {
        console.error("No access token available.");
        return;
    }

    Array.from(files).forEach(file => {
        const metadata = {
            name: file.name,
        };

        const form = new FormData();
        form.append(
            "metadata",
            new Blob([JSON.stringify(metadata)], { type: "application/json" })
        );
        form.append("file", file);

        fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: form,
        })
            .then(response => response.json())
            .then(data => {
                console.log("Uploaded file:", data);
            })
            .catch(err => console.error("Upload error:", err));
    });
}

export { uploadFiles };
