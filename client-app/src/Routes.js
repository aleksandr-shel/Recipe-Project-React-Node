
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Test from './pages/TestPage/Test';
import { Todos } from './pages/TestPage/ReducerExample';
import Layout from './pages/Layout/Layout';
import RandomRecipe from './pages/Recipes/RandomRecipe';
import Recipes from './pages/Recipes/RecipesPage';
import Login from './pages/LoginRegisterPages/Login';
import Register from './pages/LoginRegisterPages/Register';
import AddRecipePage from "./pages/Recipes/AddRecipePage";
import { useLoggedInContext } from "./Context/LoggedInContext";

export default function Routing(){

    const loggedInContext = useLoggedInContext()

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="add-recipe-page" element={<AddRecipePage/>}/>
                    <Route index element={<Recipes/>}/>
                    <Route path="random-recipe" element={<RandomRecipe/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='testpage' element={<Test/>}/>
                    <Route path='test-reducer-example' element={<Todos/>}/>
                </Route>
            </Routes>
      </BrowserRouter>
    )
}