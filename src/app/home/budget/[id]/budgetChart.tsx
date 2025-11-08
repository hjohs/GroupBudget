'use client'

import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts"

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

interface PieDataEntry {
  name: string;
  value: number;
  fill?: string; 
  [key: string]: unknown;
}

const colors = ["#F54927","#F5C827","#58A63C","#27C2F5","#7927F5","#F5279C"]

// TODO: Add <OnMouseEnter> property for each slice if possible, or provide legend
// TODO: Route each slice to the respective category page
export function BudgetChart({categories}: Props) {
    const data: PieDataEntry[] = categories.map(category => ({name: category.name, value: category.current_spend}));
    return (
        <div className="w-[260px] h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        fill="#8884d8"
                        label>
                            {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
        ))}
                        </Pie>
                         
                <Legend/>
                </PieChart>
                
            </ResponsiveContainer>  
        </div>
    )
}

// export function BudgetChart() {
//     const data = [
//         { name: "Food", value: 10 }
//     ];

//     return (
//         <div style={{ width: '100%', maxWidth: '500px', height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                     <Pie
//                         data={data}
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