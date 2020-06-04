const Carrito = require('../models/carrito.models')

const createData = async (req, res) => {
    // CREAR
    const { name, descripcion, region } = req.body; //parametros que el envian solicitudes
    const carrito = new Carrito({ name, descripcion, region }); // Acceder al modelo de mongoDB y se guarda en un avariable para acceder a cada key del objeto


    carrito.save((err, animalNuevo) => {
        if (err) {
            res.status(500).send({ message: "error en el servidor bitch" });
        } else
            if (!animalNuevo) {
                res.status(200).send({ message: "no fue posible realizar el registro" });
            } else {
                res.status(200).send({
                    status: 'Producto  nuevo',
                    animal: animalNuevo
                });
            }
    })
}
 function getData(req, res){
    Carrito.find((err, animalesEncontrados) => {
        if (err) {
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!animalesEncontrados){
                res.status(200).send({message:"no fue posible ver bitch"});
            }else {res.status(200).send({
                status: 'animales Encontrados',
                producto: animalesEncontrados
            
            });
        }
    }
    })
}

function matarAnimal(req,res){
    let animalid=req.params.id;
    Carrito.findByIdAndDelete(animalid,(err,animalAsesinado)=>{
        if (err){
            res.status(500).send({message:'error al guardar'});
        }else{
            if(!animalAsesinado){
                res.status(404).send({message:'no se pudo asesinar animal'});
            }else{
                res.status(200).send({
                    status:'Animal asesinado',
                    producto: animalAsesinado
                });
            }
        }
    })
}
const aniquilarAnimales=function animalesAniquilados(req,res,next){
    Carrito.purge({},
        (animalesAniquilados)=>{
            if(err){ res.status(500).send({message:'error al matar animales'});

            }else{
                if(!animalesAniquilados){
                    res.status(400).send({message:'no se pudo aniquilar animales'});
                }else{
                    res.status(200).send({message:'animales aniquilidos para hacer salchichas'})
                }
            }
        })
}
module.exports = { createData, getData,matarAnimal,aniquilarAnimales }