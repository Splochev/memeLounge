import { request } from "./httpRequest.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";

const register = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="register">
    <form id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input @click=${reg} type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
${footer()}
`

export function showRegPage(){
    render(register(),document.getElementById("main"));
}

async function reg(e){
    e.preventDefault();
    const form = [...new FormData(document.getElementById("register-form")).entries()];
    const username = form[0][1];
    const email = form [1][1];
    const pass = form[2][1];
    const repeatPass = form[3][1];
    const gender = form[4][1];
    if(username && email && pass && repeatPass && gender){

        const body = {
            username:username,
            email:email,
            password:pass,
            gender:gender
        };


        if(pass === repeatPass){
            try{
            const data = await request("http://localhost:3030/users/register","post",body);
            sessionStorage.setItem("logged",true);
            sessionStorage.setItem("owner",data._id);
            sessionStorage.setItem("token",data.accessToken);
            sessionStorage.setItem("user",data.username);
            sessionStorage.setItem("email",data.email);
            page("/memes");
            } catch (err){
                return;
            }
        } else{
            alert("Passwords must match");
            return;
        }
    } else{
        alert("All fields are mandatory!");
        return;
    }
}