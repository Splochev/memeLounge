import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";
import { request } from "./httpRequest.js";


const memeDetails = (meme) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description" id=${meme._id}>
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${sessionStorage.getItem("owner") === meme._ownerId ? editAndDelete() : ""}
        </div>
    </div>
</section>
${footer()}
`;

export async function showMemeDetails(ctx) {
    console.log(ctx);
    const id = ctx.params.id;
    const data = await request(`http://localhost:3030/data/memes/${id}`, "get");
    render(memeDetails(data), document.getElementById("main"));
};


const editAndDelete = () => html`
<a @click=${editMeme} class="button warning" href="#">Edit</a>
<button @click=${deleteMeme} class="button danger">Delete</button>
`;

async function deleteMeme(e) {
    e.preventDefault();
    const id = e.target.parentElement.id;
    try {
        request(`http://localhost:3030/data/memes/${id}`, 'delete', "", sessionStorage.getItem("token"));
        page("/memes");
    } catch (err) {
        return;
    }
}

function editMeme(e) {
    e.preventDefault();
    const id = e.target.parentElement.id;
    page(`/edit/${id}`);
}

