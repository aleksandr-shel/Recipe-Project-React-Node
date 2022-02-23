import React from "react"


export function RecipeItem(recipe, index){

    return(
        <tr key={index} className="recipe-item">
            <td>
                {recipe.recipeName}
            </td>
            <td className="recipe-desc">
                {recipe.description}
            </td>
            <td>
                {recipe.timeToCook}
            </td>
            <td>
                <img alt={recipe.recipeName} src={recipe.imageUrl}/>
            </td>
        </tr>
    )
}