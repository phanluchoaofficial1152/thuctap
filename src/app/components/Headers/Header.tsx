import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaSearch, FaCartPlus, FaBars } from "react-icons/fa";
import Image from "next/image";
import { Dropdown, Menu } from "antd";
import { useAuthStore } from "@/app/store/auth/authSlice";
import LoginModal from "../Login/LoginModal";
import { CircularProgress } from "@mui/material";
import { useCartStore } from "@/app/store/cart/cartStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { isAuthenticated, logout, getDisplayName } = useAuthStore();
  const displayName = getDisplayName() || "";
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { key: "all-brands", label: "All Brands", href: "#" },
    { key: "skincare", label: "Skincare", href: "/pages/danhmuc/skincare" },
    { key: "makeup", label: "Makeup", href: "/pages/danhmuc/makeup" },
    { key: "hair-care", label: "Hair Care", href: "/pages/danhmuc/hair-care" },
    {
      key: "bath-body",
      label: "Bath & Body",
      href: "/pages/danhmuc/bath-body",
    },
    {
      key: "beauty-supplements",
      label: "Beauty Supplements",
      href: "/pages/danhmuc/beauty-supplements",
    },
    { key: "promos", label: "Promos", href: "/pages/danhmuc/promos" },
    {
      key: "sell-with-us",
      label: "Sell With Us",
      href: "/pages/danhmuc/sell-with-us",
    },
  ]);

  const [cartLength, setCartLength] = useState(0);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setCartLength(cart.length);
  }, [cart]);

  const fetchClassData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://api-pro.teklearner.com/class/v1/get-list-class?class_code=&skip=0&limit=16"
      );

      const data = await response.json();

      const updatedMenuItems = menuItems.map((item, index) => {
        if (item.key === "all-brands") {
          return item;
        }

        const classData = data.data[index];

        return classData
          ? { ...item, href: `/pages/danhmuc/${classData.class_slug}` }
          : item;
      });

      setMenuItems(updatedMenuItems);

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch class data", error);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, []);

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/pages/taikhoan/capnhattaikhoan">Update Account</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
    </Menu>
  );

  const truncateName = (fullName: string, maxLength: number) => {
    if (fullName.length <= maxLength) return fullName;
    return `${fullName.slice(0, maxLength)}...`;
  };

  const filteredMenuItems = menuItems.filter(
    (item) => item.key !== "all-brands" && item.key !== "sell-with-us"
  );

  return (
    <header className="bg-gray-100 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-[6rem]">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
              alt="Logo"
              width={130}
              height={80}
            />
          </Link>
        </div>

        <div className="w-1/3 hidden relative md:hidden lg:flex items-center justify-center">
          <Input
            type="text"
            placeholder="Type in and hit Enter"
            className="border border-gray-300 px-4 py-2 rounded-full w-full"
          />
          <Button
            variant="ghost"
            className="absolute top-[40%] right-3 transform -translate-y-1/2 p-2 flex items-center justify-center"
          >
            <FaSearch className="text-gray-600" />
          </Button>
        </div>

        <div className="hidden md:hidden lg:flex items-center space-x-2">
          <Link
            href="/pages/giohang"
            className="flex items-center space-x-2 relative"
          >
            <FaCartPlus className="text-xl" />
            <span>Cart</span>
            <span className="absolute top-0 left-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartLength}
            </span>
          </Link>
          <span>|</span>
          <Link href="#" className="flex items-center space-x-2">
            {isLoading ? (
              <CircularProgress style={{ width: 20, height: 20 }} />
            ) : isAuthenticated ? (
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <div className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
                  <Image
                    src="https://files.fullstack.edu.vn/f8-prod/avatars/EYI0ooSfnavZu3jDqtuGgZqWq0uCYVs0mwbpbgHy.png"
                    alt={displayName ? displayName : "Avatar"}
                    width={30}
                    height={30}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    className="rounded-full"
                  />
                  <span>Chào, {truncateName(displayName, 12)}</span>
                </div>
              </Dropdown>
            ) : (
              <LoginModal />
            )}
          </Link>
          <span>|</span>
          <Link href="#" className="text-lg mb-2">
            عربى
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="flex md:flex sm:flex lg:hidden items-center text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:flex lg:hidden flex inset-0 bg-white shadow-lg z-50 mt-2">
          <div className="container mx-auto px-4 py-1">
            <div className="relative items-center mt-3 flex justify-center">
              <Input
                type="text"
                placeholder="Type in and hit Enter"
                className="border border-gray-300 px-4 py-2 rounded-full w-full"
              />
              <Button
                variant="ghost"
                className="absolute top-[40%] right-3 transform -translate-y-1/2 p-2 flex items-center justify-center"
              >
                <FaSearch className="text-gray-500" />
              </Button>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              {filteredMenuItems.map((item) => (
                <Link key={item.key} href={item.href} className="font-medium">
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-4 justify-center items-center">
                <Link
                  href="/pages/giohang"
                  className="flex items-center space-x-2 relative"
                >
                  <FaCartPlus className="text-xl" />
                  <span>Cart</span>
                  <span className="absolute top-0 left-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartLength}
                  </span>
                </Link>
                <span>|</span>
                <Link href="#" className="flex items-center space-x-2">
                  {isLoading ? (
                    <CircularProgress style={{ width: 20, height: 20 }} />
                  ) : isAuthenticated ? (
                    <Dropdown overlay={userMenu} trigger={["click"]}>
                      <div className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
                        <Image
                          src="https://files.fullstack.edu.vn/f8-prod/avatars/EYI0ooSfnavZu3jDqtuGgZqWq0uCYVs0mwbpbgHy.png"
                          alt={displayName ? displayName : "Avatar"}
                          width={30}
                          height={30}
                          style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          className="rounded-full"
                        />
                        <span style={{ marginRight: "30px" }}>
                          Chào, {truncateName(displayName, 12)}
                        </span>
                      </div>
                    </Dropdown>
                  ) : (
                    <LoginModal />
                  )}
                </Link>
                <span>|</span>
                <Link href="#" className="text-lg mb-2">
                  عربى
                </Link>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full text-left">ALL BRANDS</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/brand1">Brand 1</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/brand2">Brand 2</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/brand3">Brand 3</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/sell">
                <Button className="bg-black text-white w-full py-2 mb-3">
                  SELL WITH US
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <nav className="hidden md:hidden lg:flex md:bg-white md:py-3 md:mt-2 md:shadow-sm lg:bg-white lg:py-3 lg:mt-2 lg:shadow-sm">
        <div className="container mx-auto flex justify-between px-[6rem]">
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="px-4 py-2 font-medium">ALL BRANDS</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/brand1">Brand 1</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/brand2">Brand 2</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/brand3">Brand 3</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex justify-center items-center space-x-8">
            {filteredMenuItems.map((item) => (
              <Link key={item.key} href={item.href} className="font-medium">
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="/sell">
            <Button className="hidden md:block bg-black text-white px-6 py-2">
              SELL WITH US
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
