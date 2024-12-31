function initializeGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: '
147934510488-2eeg7uct5hl78a29igth97057perrg3f.apps.googleusercontent.com', // Ensure this is your correct client ID
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }  // Customize button appearance
    );
}

function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    console.log("ID Token: " + responsePayload);
    // Proceed with further actions, such as checking authentication status
}

function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
