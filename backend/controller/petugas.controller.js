const db = require("../db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = '#$*&%^&@#($(@'

function hasPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports={
    getPetugas : (req,res)=>{
        db.query(`select * from petugas`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: "Internal error"
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'Tampil petugas',
                        petugas: result
                    })
                }
            }
        })
    },
    putPetugas : (req,res)=>{
        const{
            id,
            username,
            nama,
            level
        } = req.body
        let sql = `update petugas set username = '${username}', level = '${level}', nama = '${nama}' where id = '${id}'` 
        db.query(sql,(err,result)=>{
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'kelas has been updated',
                    petugas: {
                        id,
                        username,
                        nama,
                        level
                    }
                })
            }
        })
    },

    deletePetugas : (req,res)=>{
        const id = req.params.id

        db.query(`delete from petugas where id = '${id}'`,(err,result)=>{
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
    },

    registrasi : (req,res)=>{
        const{
            username,
            password,
            nama,
            level
        } = req.body
            if(!nama, !username, !level || !password) res.status(402).json({message: 'nama,username,password harus diisi'})
            return db.query(`insert into petugas set ?`, {username, nama, level, password:hasPassword(password)}, (err,result)=>{
                if(err)return res.status(500).json({err})
                return res.json({message:'registrasi berhasil',data:result})
            })
    },

    login: (req,res)=>{
        const{
            username,
            password
        } = req.body

        if(!username || !password) res.status(402).json({message:"Username, Password harus diisi"})

        return db.query('select * from petugas where username = ?', username, (err,result)=>{
            if(err) return res.status(500).json({err})
            
            const user = result[0]
            
            if(typeof user === 'undefined') return res.status(401).json({message:'user tidak ditemukan'})
            if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message:'email atau password tidak sesuai'})

            const token = jwt.sign({data:user}, secret)
            return res.json({
                message: 'login berhasil silahkan menggunakan token dibawah ini untuk mengakses', 
                token,
                data : result
            })
        })
    }
}