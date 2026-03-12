"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserMenu } from "./user-menu";

const services: { title: string; href: string; description: string }[] = [
  {
    title: "Freight Forwarding",
    href: "/services/freight",
    description: "Reliable global freight forwarding by air, sea, and land.",
  },
  {
    title: "Logistics",
    href: "/services/logistics",
    description: "End-to-end supply chain logistics and warehousing.",
  },
  {
    title: "Customs Clearance",
    href: "/services/customs",
    description: "Expert customs brokerage for seamless border crossing.",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
              </SheetHeader>
              <MobileLink href="/" className="flex items-center" onOpenChange={setIsOpen}>
                <Image src="/logo-light.jpeg" alt="Logo" width={100} height={32} className="h-8 w-auto mix-blend-multiply dark:mix-blend-normal object-contain" />
              </MobileLink>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 pr-6 overflow-y-auto">
                <div className="flex flex-col space-y-3">
                  <MobileLink href="/about" onOpenChange={setIsOpen}>
                    About
                  </MobileLink>
                  <div className="flex flex-col space-y-2">
                    <h4 className="font-medium text-foreground">Services</h4>
                    {services.map((item) => (
                      <MobileLink
                        key={item.href}
                        href={item.href}
                        onOpenChange={setIsOpen}
                        className="text-muted-foreground ml-4"
                      >
                        {item.title}
                      </MobileLink>
                    ))}
                  </div>
                  <MobileLink href="/contact" onOpenChange={setIsOpen}>
                    Contact
                  </MobileLink>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo-light.jpeg" alt="Logo" width={120} height={40} className="h-10 w-auto mix-blend-multiply dark:mix-blend-normal object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/about" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Menu */}
        <div className="flex items-center justify-end">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn("text-lg font-medium transition-colors hover:text-primary", className)}
    >
      {children}
    </Link>
  );
}
