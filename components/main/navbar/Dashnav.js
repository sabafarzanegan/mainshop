"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function Dashnav({ allLinks }) {
  const path = usePathname();

  return (
    <nav className="mb-6">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 ">
        {allLinks.map((link, index) => (
          <motion.li
            whileTap={{ scale: 0.95 }}
            key={index}
            className={`${
              path === link.path ? " bg-primary  text-white" : ""
            }  rounded-md border border-primary px-3 py-1`}>
            <Link href={link.path}>
              <div className="flex items-center justify-center gap-x-2">
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
