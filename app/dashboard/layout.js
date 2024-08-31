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
    { name: "سفارشات", path: "/dashboard/orders", icons: <FiShoppingBag /> },
    { name: "تنظیمات", path: "/dashboard/settings", icons: <CiSettings /> },
  ];

  //   const adnminLinks = session?.user.roles === "admin" &&
  const adminLinks = [
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
  ];
  const allLinks = [...adminLinks, ...userLinks];
  return (
    <div>
      <Dashnav allLinks={allLinks}/>
      <h1>layout</h1>
      {children}
    </div>
  );
}

export default Dashboardlayout;
