const db = require("../db");

module.exports={
    getSpp : (req,res)=>{
        db.query(`select * from spp`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'Tampil',
                        spp: result
                    })
                }
            }
        })
    },
    postSpp : (req,res)=>{
        const datanew = {
            angkatan: req.body.angkatan,
            tahun: req.body.tahun,
            nominal: req.body.nominal
        }
        db.query(`insert into spp set ?`,datanew,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                res.status(201).json({
                    message: 'Data baru di tambahkan',
                    spp: {
                        ...datanew
                    }
                })
            }
        })
    },
    putSpp : (req,res)=>{
        const{
            id,
            angkatan,
            tahun,
            nominal
        } = req.body
        let sql = `update spp set angkatan = '${angkatan}', tahun = '${tahun}', nominal = '${nominal}' where id = '${id}'` 
        db.query(sql,(err,result)=>{
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'kelas has been updated',
                    spp: {
                        id,
                        angkatan,
                        tahun,
                        nominal
                    }
                })
            }
        })
    },

    deleteSpp : (req,res)=>{
        const id = req.params.id

        db.query(`delete from spp where id = '${id}'`,(err,result)=>{
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