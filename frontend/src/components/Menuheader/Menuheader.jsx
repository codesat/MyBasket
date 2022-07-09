import React, { useEffect } from 'react'
import './menuheader.css'
import {useDispatch,useSelector} from 'react-redux'
import { getallcategory } from '../../actions/category.action';


const Menuheader = (props) => {

  const category=useSelector(state=>state.category);
  const dispatch=useDispatch();

  // console.log(category);


  useEffect(()=>{
    dispatch(getallcategory());
  },[]);


  const rendercategories=(categories)=>{
    let mycategories=[];
    for(let category of categories){
        //pushing li tag in mycategories
        mycategories.push(
            <li key={category.name}>
              {
                category.parentid ? <a
                href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a>:
                <span>{category.name}</span>
              }

                {
                    category.children.length>0 ? (<ul>{rendercategories(category.children)}</ul>) : null
                }
            </li>
        );
    }

    return mycategories;
}




  return (
    <div className='menuheader'>
      <ul>
        {
          category.categories.length > 0 ? rendercategories(category.categories):null
        }
      </ul>
    </div>
  )
}

export default Menuheader
