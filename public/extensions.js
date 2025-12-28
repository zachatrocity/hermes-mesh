function hotsocket() {
    console.log("Initializing hotsocket...");
    try {
        const socket = new WebSocket("ws://localhost:3000/reload_ws");

        socket.onopen = () => console.log("Hotsocket connected!");

        socket.onmessage = (event) => {
            console.log("Message received:", event.data);
            window.location.reload();
        };

        socket.onerror = (error) => {
            console.error("Hotsocket connection error:", error);
        };
    } catch (e) {
        console.error("Failed to create socket:", e);
    }
}

// This function runs the logic immediately
const init = () => {
    if (window.location.href.includes("localhost")) {
        hotsocket();
    }
};

// Check if the document is already ready
if (document.readyState === "loading") {
    // If still loading, wait for the DOM to be ready
    document.addEventListener("DOMContentLoaded", init);
} else {
    // If the script loaded late and the DOM is already ready, run it now
    init();
}