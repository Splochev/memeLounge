import { html, render } from "../node_modules/lit-html/lit-html.js";
import { footer } from "./footer.js";
import { guestNavBar, userNavBar } from "./navBar.js";
import page from "../node_modules/page/page.mjs";
import { request } from "./httpRequest.js";


const edit = (meme) => html`
${sessionStorage.getItem("logged") ? userNavBar() : guestNavBar()}
<section id="edit-meme">
    <form id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
            <input @click=${onClickSubmit} type="submit" class="registerbtn button" value="Edit Meme" id=${meme._id}>
        </div>
    </form>
</section>
${footer()}
`;

export async function showMemeEdit(ctx) {
    const id = ctx.params.id;
    const data = await request(`http://localhost:3030/data/memes/${id}`, "get");
    render(edit(data), document.getElementById("main"));
};

async function onClickSubmit(e) {
    e.preventDefault();
    const id = e.target.id
    const form = [...new FormData(document.getElementById("edit-form")).entries()];
    const title = form[0][1];
    const description = form[1][1];
    const url = form[2][1];
    if (title && description && url) {
        const body = {
            title: title,
            description: description,
            imageUrl: url
        }
        try {
            await request(`http://localhost:3030/data/memes/${id}`, "put", body, sessionStorage.getItem("token"));
            page(`/memes`);
        } catch (err) {
            console.log(err);
        }
    } else {
        alert("All fields are mandatory!");
        return;
    }

}