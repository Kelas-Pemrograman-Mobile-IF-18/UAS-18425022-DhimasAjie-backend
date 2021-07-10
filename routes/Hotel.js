const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const kamar = require('../controller/Hotel')

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    )
    cb(null, Date.now() + ext);
  },
  destination: function (req, file, cb) {
    cb(null, './gambar')
  }
})

var upload = multer({storage: storage}).single("gambar")


router.post("/inputhotel", upload, (req, res) => {
  kamar.inputKamar(req.body, req.file.filename)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datahotel", (req, res) => {
  kamar.dataKamar()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get("/datahotel/:id", (req, res) => {
  console.log(req.params.id)
  kamar.detailDataKamar(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
  kamar.hapusKamar(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
  let fileName;
  if (req.body.gambar) {
    fileName = req.body.gambar;
  } else {
    fileName = req.file.filename;
  }
  kamar.updateKamar(req.params.id, req.body, fileName)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

module.exports = router