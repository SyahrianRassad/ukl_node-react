const express = require('express')
const router = express.Router()

const{
    getPetugas,
    registrasi,
    login,
    putPetugas,
    deletePetugas
} = require("./controller/petugas.controller")

router.route('/petugas').get(getPetugas).put(putPetugas)
router.route('/petugas/:id').delete(deletePetugas)
router.route('/registrasi').post(registrasi)
router.route('/login').post(login)

const{
    getSpp,
    postSpp,
    putSpp,
    deleteSpp
} = require('./controller/spp.controller')

router.route('/spp').get(getSpp).post(postSpp).put(putSpp)
router.route('/spp/:id').delete(deleteSpp)

const{
    getKelas,
    postKelas,
    putKelas,
    deleteKelas
} = require('./controller/kelas.controller')

router.route('/kelas').get(getKelas).post(postKelas).put(putKelas)
router.route('/kelas/:id').delete(deleteKelas)

const{
    getSiswa,
    getOneSiswa,
    postSiswa,
    putSiswa,
    deleteSiswa
} = require('./controller/siswa.controller')

router.route('/siswa').get(getSiswa).post(postSiswa).put(putSiswa)
router.route('/siswa/:nisn').delete(deleteSiswa).get(getOneSiswa)

const{
    getPembayaran,
    getOnePembayaran,
    postPembayaran,
    putPembayaran,
    deletePembayaran
} = require('./controller/pembayaran.controller')

router.route('/pembayaran').get(getPembayaran).post(postPembayaran).put(putPembayaran)
router.route('/pembayaran/:id').delete(deletePembayaran)
router.route('/pembayaran/:nama').get(getOnePembayaran)

module.exports = router;