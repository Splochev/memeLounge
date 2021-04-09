import { request } from "./httpRequest.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";

const loginPage = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="login">
    <form id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input @click=${login} type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a @click=${showRegPage} href="#">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
${footer()}
`

export function showLoginPage(){
    render(loginPage(),document.getElementById("main"));
}

function showRegPage(e){
    e.preventDefault();
    page("/register")
}

async function login(e){
    e.preventDefault();
    const form = [...new FormData(document.getElementById("login-form")).entries()];
    const email = form[0][1];
    const pass = form [1][1]
    if(pass && email){
        const body = {email:email,password:pass};
        const data = await request("http://localhost:3030/users/login","post",body);
        sessionStorage.setItem("logged",true);
        sessionStorage.setItem("owner",data._id);
        sessionStorage.setItem("token",data.accessToken);
        sessionStorage.setItem("user",data.username);
        sessionStorage.setItem("email",data.email);
        page("/memes");


    }else{
        alert("All fields are mandatory");
    }

}