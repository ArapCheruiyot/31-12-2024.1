const CLIENT_ID = "958416089916-1embl17stmkectofeqb74c54ccs38rb5.apps.googleusercontent.com";
const API_SCOPES = "https://www.googleapis.com/auth/drive.file";

function initializeGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" } // Customize button appearance
    );
}

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID Token: " + responsePayload);
    // Store access token and proceed with other actions like enabling file upload
    const accessToken = responsePayload.access_token;
    localStorage.setItem("access_token", accessToken);
    enableUI();
}

function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function getAccessToken() {
    return localStorage.getItem("access_token");
}
