import { FiShoppingBag } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { auth } from "../../db/auth";
import Dashnav from "../../components/main/navbar/Dashnav";
async function Dashboardlayout({ children }) {
  const session = await auth();

  const userLinks = [
    { name: "تنظیمات", path: "/dashboard/settings", icons: <CiSettings /> },
    { name: "سفارشات", path: "/dashboard/orders", icons: <FiShoppingBag /> },
  ];

  const adminLinks =
    session?.user.role === "admin"
      ? [
          {
            name: "آمار",
            path: "/dashboard/analitycs",
            icons: <FaRegChartBar />,
          },
          {
            name: "اضافه کردن محصول",
            path: "/dashboard/create-product",
            icons: <IoMdAddCircleOutline />,
          },
          {
            name: "محصولات",
            path: "/dashboard/products",
            icons: <MdProductionQuantityLimits />,
          },
        ]
      : [];

  const allLinks = [...userLinks, ...adminLinks];
  return (
    <div className="flex items-start w-full  gap-x-6">
      <Dashnav allLinks={allLinks} />
      <main className=" flex-1">{children}</main>
    </div>
  );
}

export default Dashboardlayout;
