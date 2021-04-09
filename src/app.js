import page from "../node_modules/page/page.mjs";
import {showHomeScreen} from "./homeScreen.js";
import {showLoginPage} from "./login.js";
import {showRegPage} from "./register.js";
import {showMemePage} from "./allMemes.js";
import {showMemeDetails} from "./details.js";
import {showMemeEdit} from "./edit.js";
import {showProfilePage} from "./profile.js";
import {showCreateMeme} from "./createMeme.js"

page.redirect("/","/home");
page.redirect("/details","/home")
page("/home",clear,showHomeScreen);
page("/login",clear,showLoginPage)
page("/register",clear,showRegPage);
page("/memes",clear,showMemePage)
page("/details/:id",clear,showMemeDetails)
page("/edit/:id",clear,showMemeEdit)
page("/myprofile",clear,showProfilePage)
page("/creatememe",clear,showCreateMeme);
page.start();


function clear(ctx,next){
    document.getElementById("container").innerHTML ='<main id="main"></main>';
    next(ctx);
}
function notFound(ctx,next){
    alert("Page not found");
    page("/home")
}



