import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import logo from '/public/images/vegetables.png'
import HamburgerMenu from "./MenuButton";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";

export default function Layout({
  meta,
  children,
  userRole,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
  userRole?: string; // Add userRole prop
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src={logo}
              alt="Logo image"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Vegitrace</p>
          </Link>
          <div className="flex items-center space-x-4">
            <HamburgerMenu />
          </div>
        </div>

      
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        {children}
      </main>

      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
        &copy; Copyright 2023, Vegitrace Corporation
        </p>
      </div>
    </>
  );
}
