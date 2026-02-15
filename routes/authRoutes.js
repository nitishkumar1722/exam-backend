const API = "https://exam-backend-production-407b.up.railway.app/api";

// --- CORE NAVIGATION ---
function handleLocation() {
    const path = window.location.hash || "#dashboard";
    const token = localStorage.getItem("token");

    // Hide all sections
    document.querySelectorAll('.container, .page-section, #dashboard, #teacherAuth, #teacherPanel').forEach(el => {
        el.style.display = "none";
    });

    if (path === "#teacherAuth") {
        document.getElementById("teacherAuth").style.display = "block";
    } else if (token) {
        document.getElementById("teacherPanel").style.display = "block";
        const targetId = path.replace("#", "");
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.style.display = "block";
        else document.getElementById("welcomeNote").style.display = "block";
        
        if (path === "#myExams") loadMyExams();
    } else {
        document.getElementById("dashboard").style.display = "flex";
    }
}

window.addEventListener("hashchange", handleLocation);
window.addEventListener("load", handleLocation);

window.navigateTo = (hash) => {
    window.location.hash = hash;
    const sb = document.getElementById("sidebar");
    if(sb) sb.style.width = "0";
};

window.goBack = () => window.history.back();

// --- TEACHER AUTH (GET METHODS) ---

window.loginTeacher = async function() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // URL mein data joda
    const url = `${API}/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.hash = "#welcomeNote";
        } else { alert(data.msg); }
    } catch (err) { alert("Server Error"); }
};

window.registerTeacher = async function() {
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const url = `${API}/auth/register?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    try {
        const res = await fetch(url, { method: "GET" });
        const data = await res.json();
        alert(data.message);
        if (res.ok) showLogin();
    } catch (err) { alert("Registration Failed"); }
};

window.logout = () => {
    localStorage.clear();
    window.location.hash = "#dashboard";
    location.reload();
};

// --- SIDEBAR & UI ---
window.toggleSidebar = () => {
    const sb = document.getElementById("sidebar");
    sb.style.width = sb.style.width === "250px" ? "0" : "250px";
};

window.showRegister = () => {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
};

window.showLogin = () => {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
};

window.togglePass = (id) => {
    const x = document.getElementById(id);
    x.type = x.type === "password" ? "text" : "password";
};
