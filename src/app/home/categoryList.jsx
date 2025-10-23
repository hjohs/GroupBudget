
// Page flow:
//  1) Dynamic budget page is loaded
//  2) On load in budget GET route fetched, budget is returned along with all categories
//  3) These categories are passed into CategoryList component as prop
export default async function CategoryList({categories,id}) {


    //TODO: Clean up formatting: each category should display name along with how much spent, make each category clickable and routes to category page
    //TODO: Use <a> tag to make list item clickable, should take to transation page
    const listCategories = categories.map(category => <li key={category.category_id} className="hover:bg-gray-200"><a href={`/home/budget/${id}/category/${category.category_id}`}><div className=""><h2>{category.name}:</h2> {category.current_spend}/{category.max_spend}<hr></hr></div></a></li>);

    return (
        <div className="flex flex-col border-2  text-center">
            <h2 className="text-xl pb-1 pt-1">Categories</h2>
            <hr className="border-2"></hr>
            <ul className="pb-2 pt-2">{listCategories}</ul>
        </div>
    )
}