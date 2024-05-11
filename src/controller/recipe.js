import RecipeModel from '../model/recipe.js'

const getAllRecipe = async(req,res)=>{
    try {
        let recipe = await RecipeModel.find({})
        res.status(200).send({
            message:"Recipe Details Fetched Successfully",
            recipe
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const getRecipeById = async(req,res)=>{
    try {
        let recipe = await RecipeModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:`${recipe.title} Details Fetched Successfully`,
            recipe
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const createRecipe = async(req,res)=>{
    try {
        let data = req.body
        const recipe = await RecipeModel.create(data);
        res.status(201).send({
            message:`${req.body.title} Added to Your List Successfully`,
            recipe
        })
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error"
        })
    }
}

const editRecipe = async(req,res)=>{
    try {
        let data = req.body
        let recipe = await RecipeModel.findOne({_id:req.params.id})
        if(recipe){
            await RecipeModel.findByIdAndUpdate({_id:req.params.id},data,{new:true})
            res.status(200).send({
                message:`${recipe.title} data edited successfully`,
                recipe
            })
        }else{
            res.status(404).send({
                message:"Invalid Recipe "
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error",
        })
    }
}

const deleteRecipe = async(req,res)=>{
    try {
        let recipe = await RecipeModel.findOne({_id:req.params.id})
        if(recipe){
             let deleted = await RecipeModel.findByIdAndDelete({_id:req.params.id})
             res.status(200).send({
                message:`${recipe.title} data deleted from your Collection`,
                deleted
             })
        }else{
            res.status(404).send({
                message:"Invalid Recipe "
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message||"Internal Server Error",
        })
    }
}


    const searchByRecipeTitle = async (req, res) => {
        try {
            const { title } = req.params;

            if (!title) {
                return res.status(400).json({
                    success: false,
                    message: "Search term is required"
                });
            }
            let recipes = await RecipeModel.find({ title: { $regex: new RegExp(title, 'i') } });


            if (recipes.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Search Results Found",
                    recipes: recipes
                });
            } else {
                let allRecipes = await RecipeModel.find({});
                res.status(404).json({
                    success: false,
                    message: "No Results Found",
                    recipes: allRecipes
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    };




export default {
    getAllRecipe,
    getRecipeById,
    createRecipe,
    editRecipe,
    deleteRecipe,
    searchByRecipeTitle
}