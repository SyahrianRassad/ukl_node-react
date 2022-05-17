const db = require("../db");

module.exports={
    getSiswa : (req,res)=>{
        db.query(`select * from siswa`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'Tampil',
                        siswa: result
                    })
                }
            }
        })
    },
    postSiswa : (req,res)=>{
        const datanew = {
            nisn : req.body.nisn,
            nis : req.body.nis,
            nama: req.body.nama,
            id_kelas : req.body.id_kelas,
            alamat : req.body.alamat,
            tlp : req.body.tlp,
            id_spp : req.body.id_spp
        }
        db.query(`insert into siswa set ?`,datanew,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                res.status(201).json({
                    message: 'Data baru di tambahkan',
                    siswa: {
                        ...datanew
                    }
                })
            }
        })
    },
    putSiswa : (req,res)=>{
        const{
            nisn,
            nis,
            nama,
            id_kelas,
            alamat,
            tlp,
            id_spp
        } = req.body
        let sql = `update siswa set nis = '${nis}', nama = '${nama}', id_kelas = '${id_kelas}', alamat = '${alamat}', tlp = '${tlp}', id_spp = '${id_spp}' where nisn = '${nisn}'` 
        db.query(sql,(err,result)=>{
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'siswa has been updated',
                    siswa: {
                        nisn,
                        nis,
                        nama,
                        id_kelas,
                        alamat,
                        tlp
                    }
                })
            }
        })
    },

    deleteSiswa : (req,res)=>{
        const nisn = req.params.nisn

        db.query(`delete from siswa where nisn = '${nisn}'`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                res.json({
                    message: 'ID '+nisn+' telah terhapus'
                }) 
            }
        })
    }
}