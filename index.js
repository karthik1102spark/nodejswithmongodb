var app = require('express')();
var server = require('http').Server(app);
const { Product } = require('./modal/Product')
// const { ProductDetails } = require('./modal/ProductDetails')

var port = process.env.PORT || '3004';
var mongoose = require('mongoose')
var multipart = require('connect-multiparty');
app.use(multipart());

server.listen(port);

app.get('/', (req, res) => res.send('Hello World.'));

mongoose.connect('mongodb://127.0.0.1:27017/firstnode');
mongoose.connection.once('open',function(){
  console.log('DB connected');
}).on('error',function(error){
  console.log('error is:',error)
})

app.post('/createProduct',async(req,res)=>{
    
var getFormData = {
    productName : req.body.productName,
    price : req.body.price,
}
const listProduct = await Product.find()

const getProduct = await Product.findOne({_id: req.body.id}).exec()
// console.log(getProduct);
const multiParams = await Product.findOne({_id: req.body.id,price: req.body.price}).exec()
if(req.body.id){
    const deleteProduct = await Product.findByIdAndRemove({_id: req.body.id}).exec()

    const condition ={_id: req.body.id} //your condition here
    const option = {new: true} //will return updated document 
    const updateProduct = await Product.findOneAndUpdate(condition,getFormData, option).exec()

    // Product.findByIdAndUpdate(req.body.id, getFormData,
    //                         function (err, docs) {
    // if (err){
    //     console.log(err)
    // }
    // else{
    //     console.log("Updated User : ", docs);
    // }
// });


    // console.log({
    //     success: 1,
    //     msg: "updated Product Successfully",
    // })
    return res.json({success: true})


}else{

        const providers = new Product(getFormData)    

        // await providers.save(function (err, response) {
        //     if (err) {
        //         console.log({err: err})
        //         return
        //     }
        //     console.log({
        //         success: 1,
        //         msg: "Created Successfully",
        //         data: response
        //     })
            
        // })

        await providers.save(function (err, response) {
            console.log('response.id',response.id);
            if (err) {
                console.log({err: err})
                return
            }
            console.log({
                success: 1,
                msg: "Created Successfully",
                data: response
            })
            
        })
    
        return res.json({success: true})
    
}
  
});

