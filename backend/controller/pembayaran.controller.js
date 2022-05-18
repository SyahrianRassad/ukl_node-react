const db = require("../db");

module.exports={
    getPembayaran : (req,res)=>{
        let url = `select p.id, p.tgl_bayar, s.nama, s.nisn, s.id_spp, a.nominal, t.nama as nama_petugas
                    from pembayaran p join siswa s on s.nisn = p.nisn
                    join petugas t on p.id_petugas = t.id
                    join spp a on s.id_spp = a.id`
        db.query(url,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'Tampil',
                        pembayaran: result
                    })
                }
            }
        })
    },
    getOnePembayaran : (req,res)=>{
        let nama = req.params.nama
        let url = `select p.id, p.tgl_bayar, s.nama, s.nisn, s.id_spp, a.nominal, t.nama as nama_petugas
                    from pembayaran p join siswa s on s.nisn = p.nisn
                    join petugas t on p.id_petugas = t.id
                    join spp a on s.id_spp = a.id where s.nama = '${nama}'`
        db.query(url,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'Tampil',
                        pembayaran: result
                    })
                }
            }
        })
    },
    postPembayaran : (req,res)=>{
        const datanew = {
            id_petugas : req.body.id_petugas,
            nisn : req.body.nisn,
            tgl_bayar: req.body.tgl_bayar
        }
        db.query(`insert into pembayaran set ?`,datanew,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                res.status(201).json({
                    message: 'Data baru di tambahkan',
                    pembayaran: {
                        ...datanew
                    }
                })
            }
        })
    },
    putPembayaran : (req,res)=>{
        const{
            id,
            id_petugas,
            nisn,
            tgl_bayar
        } = req.body
        let sql = `update pembayaran set id_petugas = '${id_petugas}', nisn = '${nisn}', tgl_bayar = '${tgl_bayar}' where id = '${id}'` 
        db.query(sql,(err,result)=>{
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'pembayaran has been updated',
                })
            }
        })
    },

    deletePembayaran : (req,res)=>{
        const id = req.params.id

        db.query(`delete from pembayaran where id = '${id}'`,(err,result)=>{
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