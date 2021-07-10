const mongoose = require('mongoose');

const hotelScema = mongoose.Schema({
    nomorKamar: {
        type: String
    },
    tipeKamar: {
        type: String
    },
    deskripsi: {
        type: String
    },
    hargaKamar: {
        type: String
    },
    gambar: {
        type: String
    }
})

module.exports = mongoose.model( 'hotel', hotelScema)