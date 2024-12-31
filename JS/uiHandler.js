function enableUI() {
    document.getElementById("fileInput").disabled = false;
    document.getElementById("uploadBtn").disabled = false;
}

function updateFileList(files) {
    const fileListContainer = document.getElementById("fileList");
    fileListContainer.innerHTML = ""; // Clear existing files

    Array.from(files).forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";
        fileItem.innerText = `${index + 1}. ${file.name}`;
        fileListContainer.appendChild(fileItem);
    });
}

export { enableUI, updateFileList };
