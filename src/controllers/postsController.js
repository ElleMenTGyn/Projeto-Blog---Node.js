
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../models/postModel.js";

const successMessages = {
  created: "Post criado com sucesso.",
  updated: "Post atualizado com sucesso.",
  deleted: "Post excluído com sucesso.",
};


export function listPosts(req, res) {
    const posts = getAllPosts();
    const success = successMessages[req.query.success];
    res.render("index", { posts, success });
}

export function showNewForm(req, res) {
    res.render("new", { values: { author: "", title: "", content: "" }, errors: [] });
}

export function createPostCtrl(req, res) {
    const values = {
      title:   (req.body?.title   ?? "").trim(),
      content: (req.body?.content ?? "").trim(),
      author:  (req.body?.author  ?? "").trim(),
    };

    const errors = [];
    if (values.title.length   < 3)  errors.push("Título deve ter pelo menos 3 caracteres.");
    if (values.content.length < 10) errors.push("Conteúdo deve ter pelo menos 10 caracteres.");
    if (values.author.length  < 2)  errors.push("Autor deve ter pelo menos 2 caracteres.");

    if (errors.length) {
     return res.status(400).render("new", { errors, values });
   }

   const post = createPost(values);
   return res.redirect(`/posts/${post.id}?success=created`);
   }

export function showPost(req, res) {
    const { id } = req.params;
    const post = getPostById(id);
    if (!post) return res.status(404).send("Post não encontrado.");
    const success = successMessages[req.query.success];
    return res.render("show", { post, success });
}

export function showEditForm(req, res) {
    const { id } = req.params;
    const post = getPostById(id);
    if (!post) return res.status(404).send("Post não encontrado.");
    return res.render("edit", { post, errors: [] });
}   

export function updatePostCtrl(req, res) {
    const { id } = req.params;

    const post = getPostById(id);
    if (!post) return res.status(404).send("Post não encontrado.");

    const values = {
      author:  (req.body?.author  ?? "").trim(),
      title:   (req.body?.title   ?? "").trim(),
      content: (req.body?.content ?? "").trim(),
    };

    const errors = [];
    if (values.author.length  < 2)  errors.push("Autor deve ter pelo menos 2 caracteres.");
    if (values.title.length   < 3)  errors.push("Título deve ter pelo menos 3 caracteres.");
    if (values.content.length < 10) errors.push("Conteúdo deve ter pelo menos 10 caracteres.");

    if (errors.length) {
     return res.redirect(`/posts/${id}?success=updated`);
    }

  updatePost(id, values);
  return res.redirect(`/posts/${id}`)
    
}


export function deletePostCtrl(req, res) {
    const { id } = req.params;
    const deleted = deletePost(id); // boolean
    if (!deleted) return res.status(404).send("Post não encontrado.");
    return res.redirect("/?success=deleted");
}