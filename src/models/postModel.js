import { randomUUID } from "crypto";

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} author
 * @property {string} createdAt
 * @property {string} updatedAt
 */
 

const posts = [];

/**
 * Cria um novo post.
 * @param {{title: string, content: string}} data
 * @returns {Post}
 */

export function createPost(data) {
    const now = new Date().toISOString();
    const post = {
        id: randomUUID(),
        title: data.title,
        content: data.content,
        author: data.author,
        createdAt: now,
        updatedAt: now,
    };

    posts.push(post);
    return post;
}

/**
 * Retorna todos os posts (mais recentes primeiro).
 * @returns {Post[]}
 */

export function getAllPosts() {
    return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * Retorna um post por id, ou null.
 * @param {string} id
 * @returns {Post|null}
 */

export function getPostById(id) {
    return posts.find(post => post.id === id) || null;
}

/**
 * Atualiza um post existente.
 * @param {string} id
 * @param {{title?: string, content?: string}} data
 * @returns {Post|null}
 */


export function updatePost(id, data) {
    const idx = posts.findIndex(post => post.id === id);
    if (idx === -1) return null;

    if (typeof data.title === 'string') {
        posts[idx].title = data.title;
    }

    if ( typeof data.content === 'string') {
        posts[idx].content = data.content;
    }

    posts[idx].updatedAt = new Date().toISOString();

    return posts[idx];
}

/**
 * Remove um post por id.
 * @param {string} id
 * @returns {boolean} true se removeu, false se não achou
 */

export function deletePost(id) {
    const idx = posts.findIndex(post => post.id === id);

    if (idx === -1) return false;
    posts.splice(idx, 1);
    return true;
}