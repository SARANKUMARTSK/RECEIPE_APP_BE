import mongoose from "./index.js";


const recipeSchema = new mongoose.Schema(
    {
    title:{
        type:String , 
        required:[true,"Title is Required"]
    },
    category:{
        type:String , 
        required:[true ,"Category is Required"]
    },
    type:{
        type:String , 
        required:[true ,"Type Of Food is Required"]
    },
    description:{
        type:String , 
        default:[true , "Description is Required"]
    },
    ingredientsCount:{
        type:String,
        required:[true , "Ingredients Count is Required"]
    },
    ingredients:{
        type:Array ,
        required:[true,"Ingredients are Required"]
    },
    timeRequired:{
        type:String , 
        required:[true , "Time Taken is Required"]
    },
    calouries:{
        type:String , 
        required:[true, "Calouries Count is Required"]
    },
    guide:{
        type:String , 
        required:[true , "Guide is Required"]
    },
    memberCount:{
        type:String , 
        default:"4"
    },
    recipeImage :{
        type:"String", 
        required:[true , "Recipe Image is Required"]
    }

    },
    {
        collection:"recipe",
        versionKey:false
    }
)


const recipeModel = mongoose.model('recipe',recipeSchema)

export default recipeModel