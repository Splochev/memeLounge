import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";
import { request } from "./httpRequest.js";

const memesPage = (memes) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length > 0 ? repeat(memes, meme => showMeme(meme)) : showNoMemes()}
    </div>
</section>
${footer()}
`;

const showMeme = (meme) => html`
<div class="meme" id=${meme._id}>
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a @click=${showDetailsPage} class="button" href="#">Details</a>
        </div>
    </div>
</div>
`

const showNoMemes = () => html`<p class="no-memes">No memes in database.</p>`;

export async function showMemePage() {
    const data = await request("http://localhost:3030/data/memes?sortBy=_createdOn%20desc", "get");
    render(memesPage(data), document.getElementById("main"));
}

function showDetailsPage(event) {
    event.preventDefault();
    const elementId = event.target.parentElement.parentElement.parentElement.id;
    page(`/details/${elementId}`);
}