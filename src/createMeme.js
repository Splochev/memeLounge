import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";
import { request } from "./httpRequest.js";

const createMeme = () => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="create-meme">
    <form id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input @click=${onSubmit} type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
</section>
${footer()}
`;


export function showCreateMeme() {
    render(createMeme(), document.getElementById("main"))
}

async function onSubmit(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("create-form")).entries()];
    const title = form[0][1];
    const description = form[1][1];
    const url = form[2][1];
    if (title && description && url) {
        const body = {
            title: title,
            description: description,
            imageUrl: url
        }
        try{
            await request(`http://localhost:3030/data/memes`, "post", body, sessionStorage.getItem("token"));
            page(`/memes`);
        } catch (err){
            return;
        }

    } else {
        alert("All fields are mandatory!");
        return;
    }



}