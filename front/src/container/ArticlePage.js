import Article from "../components/Article/Article"
import ArticleList from "../components/Article/ArticleList"
import Header from "../components/header/Header"
function ArticlePage(){
    return(
        <div className="comp">
            <Header/>
            <div className="comp-ver">
                <Article/>
                <ArticleList/>
            </div>
        </div>
    )
}

export default ArticlePage