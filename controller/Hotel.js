const kamar = require('../model/Hotel')
const  response = require('../config/response.js')
const { updateOne } = require('../model/Hotel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputKamar = (data, gambar) =>
  new Promise(async (resolve, reject) => {
    
    const kamarBaru = new kamar({
      nomorKamar: data.nomorKamar,
      tipeKamar: data.tipeKamar,
      deskripsi: data.deskripsi,
      hargaKamar: data.hargaKamar,
      gambar: gambar
    })

    await kamar.findOne({nomorKamar: data.nomorKamar})
      .then(kamar => {
        if (kamar) {
          reject(response.commonErrorMsg('Nama kamar Sudah Digunakan'))
        } else {
          kamarBaru.save()
            .then(r => {
              resolve(response.commonSuccessMsg('Berhasil Input Data'))
            }).catch(err => {
              reject(response.commonErrorMsg('Maaf Input Data Gagal'))
            })
        }
      }).catch(err => {
        reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami'))
    })

  })

exports.dataKamar = () =>
  new Promise(async (resolve, reject) => {
    await kamar.find({})
      .then(result => {
        resolve(response.commonResult(result))
      }).catch(() => reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami')))
  })

exports.detailDataKamar= (nomorKamar) =>
  new Promise(async (resolve, reject) => {
    await kamar.findOne({nomorKamar: nomorKamar})
      .then(result => {
        resolve(response.commonResult(result))
      }).catch(() => reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami')))
  })

exports.updateKamar = (id, data, gambar) =>
  new Promise(async (resolve, reject) => {
    await kamar.updateOne(
      {_id : ObjectId(id)},
      {
        $set: {
          nomorKamar: data.nomorKamar,
          tipeKamar: data.tipeKamar,
          deskripsi: data.deskripsi,
          hargaKamar: data.hargaKamar,
          gambar: gambar
        }
      }
    ).then(kamar => {
      resolve(response.commonSuccessMsg('Berhasil Update Data'))
    }).catch(err => {
      reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami'))
    })
  })

exports.hapusKamar = (_id) =>
  new Promise(async (resolve, reject) => {
    await kamar.remove({_id: ObjectId(_id)})
      .then(() => {
        resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
      }).catch(() => {
        reject(response.commonErrorMsg('Maaf Sedang Terjadi Kesalahan Pada Server Kami'))
      })
  })