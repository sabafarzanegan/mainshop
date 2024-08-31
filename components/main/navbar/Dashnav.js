"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion"

function Dashnav({ allLinks }) {
  const path = usePathname();

  return (
    <nav>
      <ul className="flex items-center justify-center gap-x-10 ">
        {allLinks.map((link, index) => (
          <motion.li whileTap={{scale:0.95}}
            key={index}
            className={`${
              path === link.path ? " bg-primary  px-3 py-1 text-white" : ""
            }  rounded-md`}>
            <Link href={link.path}>
              <div className="flex flex-wrap items-center justify-center gap-x-2">
                <p>{link.name}</p>
                <span>{link.icons}</span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}

export default Dashnav;
