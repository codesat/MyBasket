import { categoryconstants } from "../actions/constants";

const initstate={
    categories:[],
    laoding:false,
    error:null
};

const buildnewcategories=(parentid,categories,category)=>{

    let mycategories=[];


    //if we are adding parentcategory itself then return previous categories a as it is and add new ones into that
    if(parentid==undefined){
        return [
            ...categories,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                children:[]
            }
        ];
    }


    for(let cat of categories){

        if( cat._id==parentid){
            mycategories.push(
                {

                    ...cat,
                    children:cat.children ? buildnewcategories(parentid,[...cat.children,{
                        _id:category._id,
                        name:category.name,
                        slug:category.slug,
                        parentid:category.parentid,
                        children:category.children,
                    }],category):[]

                }

        )
    }else{
        mycategories.push(
            {
                ...cat,
                children:cat.children  ? buildnewcategories(parentid,cat.children,category):[]

            }
        )

    }
    }

    return mycategories;

}

export default (state=initstate,action)=>{
    switch(action.type){
        case categoryconstants.GETALLCATEGORYSUCCESS:
            state={
                ...state,
                categories:action.payload.categories
            }
            break;

        case categoryconstants.ADDNEWCATEGORYREQUEST:
            state={
                    ...state,
                    loading:true
                }
                break;

         case categoryconstants.ADDNEWCATEGORYSUCCESS:
        const category=action.payload.category;
         const updatedcategories=buildnewcategories(category.parentid,state.categories,category);

        //  console.log(updatedcategories);

                    state={
                        ...state,
                        loading:false,
                        categories:updatedcategories
                    }
                    break;

        case categoryconstants.ADDNEWCATEGORYFAILURE:
                state={
                       ...initstate
                    }

                    break;


    }

    return state;
}