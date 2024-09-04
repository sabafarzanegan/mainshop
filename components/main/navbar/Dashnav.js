"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../ui/card";

function Dashnav({ allLinks }) {
  const path = usePathname();

  return (
    <section className="min-h-screen w-60">
      <Card className="h-full ">
        <CardContent>
          <ul className="w-full flex flex-col items-center justify-between py-6 gap-y-6">
            {allLinks.map((link, index) => (
              <li
                key={index}
                className={`w-full px-3 py-2 border-primary-foreground ${
                  path === link.path ? "bg-primary text-white rounded-md " : ""
                } `}>
                <Link
                  href={link.path}
                  className="flex items-center justify-between  ">
                  <span className="text-lg">{link.icons}</span>
                  <span className="text-base">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
    // <nav className="mb-6">
    //   <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 ">
    //     {allLinks.map((link, index) => (
    //       <motion.li
    //         whileTap={{ scale: 0.95 }}
    //         key={index}
    //         className={`${
    //           path === link.path ? " bg-primary  text-white" : ""
    //         }  rounded-md border border-primary px-3 py-1`}>
    //         <Link href={link.path}>
    //           <div className="flex items-center justify-center gap-x-2">
    //             <p>{link.name}</p>
    //             <span>{link.icons}</span>
    //           </div>
    //         </Link>
    //       </motion.li>
    //     ))}
    //   </ul>
    // </nav>
  );
}

export default Dashnav;
