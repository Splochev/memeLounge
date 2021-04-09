import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";

const homeScreen = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        ${!sessionStorage.getItem("logged") ? loginLabel() : ""}
    </div>
</section>
${footer()}
`


const loginLabel = () => html`
<h2>Login to see our memes right away!</h2>
<div id="button-div">
    <a @click=${showLoginPage}href="#" class="button">Login</a>
    <a @click=${showRegPage} href="#" class="button">Register</a>
</div>
`

export function showHomeScreen() {
    render(homeScreen(), document.getElementById("main"));
}

function showLoginPage(e) {
    e.preventDefault();
    page("/login")
}

function showRegPage(e) {
    e.preventDefault();
    page("/register")
}