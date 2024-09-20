"use client";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../lib/client-store";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../../ui/drawer";
import Cartitems from "../cart/Cartitems";
import { Button } from "../../ui/button";
import { AnimatePresence, motion } from "framer-motion";
function CartDrawer() {
  const { cart } = useCartStore();

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex items-center justify-center -top-0.5 right-0 w-4 h-4 dark:bg-primary bg-primary/50 text-xs font-bold rounded-full">
                {cart.length.toLocaleString("fa")}
              </motion.span>
            )}
          </AnimatePresence>
          <ShoppingCart />
        </div>
      </DrawerTrigger>
      <DrawerContent className="py-4">
        <DrawerHeader>
          <DrawerTitle className="text-center">سبد خرید</DrawerTitle>
        </DrawerHeader>
        <Cartitems />
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
