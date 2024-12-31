import { CLIENT_ID, API_SCOPES } from "./config.js";

let accessToken = null;

function initializeAuth() {
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleSignIn,
    });

    google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }
    );
}

function handleSignIn(response) {
    const credential = response.credential;
    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`)
        .then(res => res.json())
        .then(data => {
            console.log("User Info:", data);
            accessToken = data.access_token;
            enableUI();
        })
        .catch(err => console.error("Authentication error:", err));
}

function getAccessToken() {
    return accessToken;
}

export { initializeAuth, getAccessToken };
