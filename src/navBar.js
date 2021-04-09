import { request } from "./httpRequest.js";
import { html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

export const guestNavBar = () => html`
<nav id="navBar">
    <a @click=${showHomePage} class="active" href="#">Home Page</a>
    <a @click=${showAllMemesPage} href="#">All Memes</a>
    <!-- Guest users -->
    <div class="guest">
        <div class="profile">
            <a @click=${showLoginPage}href="#">Login</a>
            <a @click=${showRegPage} href="#">Register</a>
        </div>
    </div>
</nav>
`;

export const userNavBar = () => html`
<nav id="navBar">
    <a @click=${showAllMemesPage} href="#">All Memes</a>
    <!-- Logged users -->
    <div class="user">
        <a @click=${showCreateMemePage} href="#">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${sessionStorage.getItem("user")}</span>
            <a @click=${showMyProfilePage} href="#">My Profile</a>
            <a @click=${showLogoutPage} href="#">Logout</a>
        </div>
    </div>
</nav>`

function showAllMemesPage(e) {
    e.preventDefault();
    page("/memes")
}

function showLoginPage(e) {
    e.preventDefault();
    page("/login")
}

function showRegPage(e) {
    e.preventDefault();
    page("/register")
}

function showHomePage(e) {
    e.preventDefault();
    page("/home");
}

function showMyProfilePage(e) {
    e.preventDefault();
    page("/myprofile")
}

async function showLogoutPage(e) {
    e.preventDefault();
    try {
        request("http://localhost:3030/users/logout", "get", "", sessionStorage.getItem("token"));
        sessionStorage.removeItem("logged")
        sessionStorage.removeItem("owner")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
        page("/home");
    } catch (err) {
        return;
    }
}

function showCreateMemePage(e) {
    e.preventDefault();
    page("/creatememe")
}


