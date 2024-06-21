import Pagelayout from "./pagelayout";
import { useSelector } from "react-redux";
import Navbar from "./navbar";


export default function Category()
{
    const articles = useSelector((state) => state.article.articles);
    const category= useSelector((state) => state.article.category);
    return(
        <div className="categorycontainer">
           <Navbar></Navbar>
           <br></br><br></br>
           <div className="categorycontent"> 
                    <h1><i>{category}</i></h1>
                    <Pagelayout data={articles}></Pagelayout>
           </div>
          
        </div>
           
    )
}