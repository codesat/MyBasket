const createcategorieslist=(categories, options=[])=>{
    for(let category of categories){
        options.push({
            value:category._id,
             name:category.name,
            parentid:category.parentid,
            type:category.type

        });

        if(category.children.length>0){
            createcategorieslist(category.children,options);
        }
    }

    return options;
}

export default createcategorieslist;