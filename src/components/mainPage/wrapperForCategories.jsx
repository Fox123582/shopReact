
import SectionGood from "./sectionGood";
import {nanoid} from "nanoid";

function WrapperForCategories({styles,products,elem,...props}) {
    let productsFromCategory = []
    selectCategory()
    function selectCategory(){
        products.forEach(el => {
            if (el.category === elem){
                productsFromCategory.push(el)
            }

        })
    }


    return (
        <div {...props}>
            <h2>{elem}</h2>
            {productsFromCategory.map(elem => <SectionGood  styles ={styles} elem={elem} data-name={elem.id} key={nanoid()}></SectionGood>)}
        </div>
    );
}

export default WrapperForCategories;