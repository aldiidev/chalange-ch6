const router = require('express').Router()
const { createPost, getAllPost, getDetailPost, updatePost, deletePost } = require('../controllers/galery.controllers')
const { picture } = require('../libs/multer')

router.post('/', picture.single('image'), createPost)
router.get('/', getAllPost)
router.get('/:id', getDetailPost)
router.put('/:id', picture.single('image'), updatePost)
router.delete('/:id', deletePost)

module.exports = router