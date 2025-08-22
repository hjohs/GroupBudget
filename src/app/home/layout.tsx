import { Children } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    //TODO: add side nav bar
  return (
    <div>
        {children}
    </div>
  )
}