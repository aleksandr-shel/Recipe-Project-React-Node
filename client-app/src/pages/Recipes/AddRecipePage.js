import React from "react"
import { RecipePostForm } from "../../components";
import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

export default function AddRecipePage(){
    return(
        <>
            <Breadcrumb>
                <Breadcrumb.Item href='/'><Link to="/">Recipe List</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Add Recipe Page</Breadcrumb.Item>
            </Breadcrumb>
            <RecipePostForm/>
        </>
    )
}



