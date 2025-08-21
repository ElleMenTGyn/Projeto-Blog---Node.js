import { Router } from 'express';
import {
    listPosts,
    showNewForm,
    createPostCtrl,
    showPost,
    showEditForm,
    updatePostCtrl,
    deletePostCtrl
} from '../controllers/postsController.js';

const hero = (opts = {}) => (req, res, next) => {
  if (opts.title)    res.locals.heroTitle    = opts.title;
  if (opts.subtitle) res.locals.heroSubtitle = opts.subtitle;
  if (opts.image)    res.locals.heroImage    = opts.image;
  next();
};

const router = Router();

router.get('/',
  hero({ title: 'Últimos Posts', subtitle: 'Novidades do projeto', image: '/assets/img/home-bg.jpg' }),
  listPosts
);

router.get('/posts/new',
  hero({ title: 'Criar post', subtitle: 'Compartilhe suas ideias', image: '/assets/img/new-bg.jpg' }),
  showNewForm
);

router.post('/posts',
  hero({ title: 'Criar post' }), // opcional manter o mesmo do form
  createPostCtrl
);

router.get('/posts/:id',
  hero({ title: 'Lendo post…', image: '/assets/img/post-bg.jpg' }),
  showPost
);

router.get('/posts/:id/edit',
  hero({ title: 'Editar post', image: '/assets/img/edit-bg.jpg' }),
  showEditForm
);

// updates/deletes (opcional)
router.post('/posts/:id/update',
  hero({ title: 'Editar post' }),
  updatePostCtrl
);

router.post('/posts/:id/delete',
  hero({ title: 'Posts' }),
  deletePostCtrl
);

export default router;