const {Router} = require('express');
const { postPage, deletePage, putPage ,getPage,getMyPage} = require('../controlles/pageController');
const { requireAuth } = require('../middleware/authMiddleware');

const pageRouter = new Router();

pageRouter.get("/pages/all",getPage)

pageRouter.get("/pages/my",requireAuth,getMyPage)

pageRouter.post("/page/add",requireAuth,postPage)


pageRouter.delete("/page/delete/:id",requireAuth,deletePage)


pageRouter.put("/page/update/:id",requireAuth,putPage)

module.exports = pageRouter