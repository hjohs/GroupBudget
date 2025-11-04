'use client'

import { PieChart, Pie, ResponsiveContainer } from "recharts"

type Category = {
  category_id: string;
  name: string;
  max_spend: number;
  current_spend: number;
  budget_id: string;
};

type Props = {
    categories: Category[];
}


// TODO: Add <OnMouseEnter> property for each slice if possible, or provide legend
// TODO: Route each slice to the respective category page
export function BudgetChart({categories}: Props) {
    const categoryData = categories.map(category => ({name: category.name, value: category.current_spend}));
    return (
        <div className="w-[220px] h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="100%"
                        fill="#8884d8" />
                </PieChart>
            </ResponsiveContainer>  
        </div>
    )
}

// export function BudgetChart() {
//     const categoryData = [
//         { name: "Food", value: 10 }
//     ];

//     return (
//         <div style={{ width: '100%', maxWidth: '500px', height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                     <Pie
//                         data={categoryData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         fill="#8884d8"
//                     />
//                 </PieChart>
//             </ResponsiveContainer>
//             <p>Cudm</p>
//         </div>
//     );
// }