const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../helpers");

const imageKit = require("../libs/imagekit");
const path = require("path");

module.exports = {
	createPost: async (req, res, next) => {
		try {
			let { judul, deskripsi } = req.body;
			let strFile = req.file.buffer.toString("base64");

			let judulexist = await prisma.galeri.findUnique({ where: { judul } });
			if (judulexist) {
				return res.status(400).json({
					status: false,
					message: "Bad Request",
					err: "Judul has been used!",
					data: null,
				});
			}

			let { url } = await imageKit.upload({
				fileName: Date.now() + path.extname(req.file.originalname),
				file: strFile,
			});

			let post = await prisma.galeri.create({
				data: {
					judul,
					deskripsi,
					urlPic: url,
				},
			});

			return res.status(201).json({
				status: true,
				message: "galery post success created!",
				err: null,
				data: { post },
			});
		} catch (err) {
			next(err);
		}
	},
	getAllPost: async (req, res, next) => {
		try {
			let { limit = 10, page = 1 } = req.query;
			limit = Number(limit);
			page = Number(page);

			let posts = await prisma.galeri.findMany({
				skip: (page - 1) * limit,
				take: limit,
			});
			const { _count } = await prisma.galeri.aggregate({
				_count: { id: true },
			});
			let pagination = getPagination(req, _count.id, page, limit);

			res.status(200).json({
				status: true,
				message: "success get all data galery",
				err: null,
				data: { pagination, posts },
			});
		} catch (err) {
			next(err);
		}
	},
	getDetailPost: async (req, res, next) => {
		try {
			let { id } = req.params
			id = Number(id)

			let posts = await prisma.galeri.findUnique({ where: { id } })

			if (!posts) {
				return res.status(400).json({
					status: false,
					message: 'Bad Request',
					err: `id ${id} not found!`,
					data: null
				})
			}
			res.status(200).json({
				status: true,
				message: 'success get data',
				err: null,
				data: posts
			})
		} catch (err) {
			next(err)
		}
	},
	updatePost: async (req, res, next) => {
		try {
			let { id } = req.params
			id = Number(id)
			let { judul, deskripsi } = req.body;
			let strFile = req.file.buffer.toString("base64");

			try {
				let idexist = await prisma.galeri.findUnique({ where: { id } });
				if (!idexist) {
					return res.status(400).json({
						status: false,
						message: "Bad Request",
						err: `id ${id} not found!`,
						data: null,
					});
				}

				let { url } = await imageKit.upload({
					fileName: Date.now() + path.extname(req.file.originalname),
					file: strFile,
				});

				let newPost = await prisma.galeri.update({
					where: { id },
					data: { judul, deskripsi, urlPic: url }
				})
				res.status(200).json({
					status: true,
					message: 'Post Has Been Updated!',
					err: null,
					data: { newPost }
				})

			} catch (err) {
				return res.status(400).json({
					status: false,
					message: 'operation update failed!',
					err: 'Judul has been used!',
					data: null
				})
			}

		} catch (err) {
			console.log(err)
			next(err)
		}
	},
	deletePost: async (req, res, next) => {
		try {
			let { id } = req.params
			id = Number(id)
			let idexist = await prisma.galeri.findUnique({ where: { id } });
			if (!idexist) {
				return res.status(400).json({
					status: false,
					message: "Bad Request",
					err: `id ${id} not found!`,
					data: null,
				});
			}
			let deletePost = await prisma.galeri.delete({ where: { id } })
			res.status(200).json({
				status: true,
				message: 'Delete Post Successfull!',
				err: null,
				data: deletePost
			})
		} catch (err) {
			err
		}
	},
};
