import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";
import { request } from "./httpRequest.js";
import {repeat} from "../node_modules/lit-html/directives/repeat.js";

const profile = (memes) => html`        
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${sessionStorage.getItem("user")}</p>
            <p>Email: ${sessionStorage.getItem("email")}</p>
            <p>My memes count: ${memes.length} </p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length > 0 ? showMemes(memes) : noMemes()}
    </div>
</section>
${footer()}
`;

export async function showProfilePage() {
    const data = await request(`http://localhost:3030/data/memes?where=_ownerId%3D%22${sessionStorage.getItem("owner")}%22&sortBy=_createdOn%20desc`,"get");
    render(profile(Array.from(data)), document.getElementById("main"));
}


const noMemes = ()=>html`<p class="no-memes">No memes in database.</p>`;

const showMemes = (memes) => repeat(memes,meme=>html`
<div class="user-meme" id=${meme._id}>
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a @click=${showDetails} class="button" href="#">Details</a>
</div>
`);


function showDetails(event) {
    event.preventDefault();
    const elementId = event.target.parentElement.id;
    page(`/details/${elementId}`);
}
