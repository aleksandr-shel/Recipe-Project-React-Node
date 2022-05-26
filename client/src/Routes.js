import { Route, Routes } from "react-router-dom"
import Test from './pages/TestPage/Test';
import { Todos } from './pages/TestPage/ReducerExample';
import Layout from './pages/Layout/Layout';
import RecipesPage from './pages/Recipes/RecipesPage';
import Login from './pages/LoginRegisterPages/Login';
import Register from './pages/LoginRegisterPages/Register';
import AddRecipePage from "./pages/Recipes/AddRecipePage";
import { useLoggedInContext } from "./Context/LoggedInContext";
import AccountInfo from "./pages/AcountInfo";
import RecipeDetails from "./pages/Recipes/RecipeDetailsPage";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { usersSelector } from "./slice/usersReducer";
// import { useLocation } from "react-router-dom";

export default function Routing(){

    const loggedInContext = useLoggedInContext()
    // const location = useLocation();
    const {user} = useSelector(usersSelector)

    return (
            <Routes>
                <Route exact path="/" element={<Layout/>}>
                    <Route path="add-recipe-page" element={user !== null ? <AddRecipePage/> : <Login link="/add-recipe-page"/>}/>
                    <Route exact index element={<RecipesPage/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='account-info' element={<AccountInfo/>}/>
                    <Route exact path='recipes/:recipeId' element={<RecipeDetails/>}/>
                    <Route path='testpage' element={<Test/>}/>
                    <Route path='test-reducer-example' element={<Todos/>}/>
                    <Route element={<NotFound/>}/>
                </Route>
            </Routes>
    )
}