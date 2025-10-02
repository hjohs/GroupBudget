'use client'

import { Sidebar, SidebarItem, SidebarItems, SidebarCollapse, SidebarItemGroup } from "flowbite-react";
import { CiLogout,CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";





export default function HomeSidebar() {
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/logout", {method: 'POST'});
        router.push('/login');
}

    return (
        <div className="border-r-2 border-gray-300 h-screen pt-8">
        <Sidebar>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem href="../home/newBudget" icon={() => <CiCirclePlus className="text-2xl" />} className="pb-4 text-lg">
                        Create New Budget
                    </SidebarItem>
                    <SidebarItem onClick={handleLogout} icon={CiLogout} className="pb-4 text-lg">
                        Logout
                    </SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
        </div>
    )
}