const db = require("../db");

module.exports={
    getKelas : (req,res)=>{
        db.query(`select * from kelas`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'Tampil',
                        kelas: result
                    })
                }
            }
        })
    },
    postKelas : (req,res)=>{
        const datanew = {
            angkatan: req.body.angkatan,
            nama: req.body.nama,
            jurusan: req.body.jurusan
        }
        db.query(`insert into kelas set ?`,datanew,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                res.status(201).json({
                    message: 'Data baru di tambahkan',
                    kelas: {
                        ...datanew
                    }
                })
            }
        })
    },
    putKelas : (req,res)=>{
        const{
            id,
            angkatan,
            nama,
            jurusan
        } = req.body
        let sql = `update kelas set angkatan = '${angkatan}', jurusan = '${jurusan}', nama = '${nama}' where id = '${id}'` 
        db.query(sql,(err,result)=>{
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'kelas has been updated',
                    kelas: {
                        id,
                        angkatan,
                        nama,
                        jurusan
                    }
                })
            }
        })
    },

    deleteKelas : (req,res)=>{
        const id = req.params.id

        db.query(`delete from kelas where id = '${id}'`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                res.json({
                    message: 'ID '+id+' telah terhapus'
                }) 
            }
        })
    }
}