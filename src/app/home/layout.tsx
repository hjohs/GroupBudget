import { Children } from "react";
import HomeSidebar from "./homeSidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
        <aside className="w-1/5">
            <HomeSidebar></HomeSidebar>
        </aside>
        <div className="flex flex-col w-3/5">
            {children}
        </div>      
    </div>
  )
}