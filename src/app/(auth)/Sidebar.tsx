"use client"

import {
  CheckCircledIcon,
  CodeIcon,
  HamburgerMenuIcon,
  HomeIcon,
  StackIcon,
} from "@radix-ui/react-icons"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const showRecents = false
const navigation: NavItem[] = [
  { href: "/", icon: HomeIcon, name: "Dashboard" },
  { href: "/facts", icon: CheckCircledIcon, name: "Facts" },
  { href: "/data-sources", icon: StackIcon, name: "Data Sources" },
  { href: "/playground", icon: CodeIcon, name: "Playground" },
]

type NavItem = {
  href: string
  icon: React.FC<{ className?: string }>
  name: string
}

const recent = [
  { current: false, href: "#", id: 1, initial: "H", name: "Heroicons" },
  { current: false, href: "#", id: 2, initial: "T", name: "Tailwind Labs" },
  { current: false, href: "#", id: 3, initial: "W", name: "Workcation" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (item: NavItem) =>
    item.href === "/" ? item.href === pathname : pathname.startsWith(item.href)
  const activeItem = navigation.find(isActive)

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-background px-6 dark:border-zinc-800">
          <div className="flex h-16 shrink-0 items-center text-2xl">
            Veritas
          </div>
          <SidebarNav />
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <span className="sr-only">Open sidebar</span>
          <HamburgerMenuIcon aria-hidden="true" className="h-6 w-6" />
        </button>

        <div className="flex-1 text-sm font-semibold leading-6 text-foreground">
          {activeItem?.name}
        </div>

        <Link href="/profile">
          <span className="sr-only">Your profile</span>
          <Image
            alt=""
            className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-900"
            height={32}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            unoptimized
            width={32}
          />
        </Link>
      </div>
    </>
  )
}

function SidebarNav() {
  const pathname = usePathname()
  const isActive = (item: NavItem) =>
    item.href === "/" ? item.href === pathname : pathname.startsWith(item.href)

  return (
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7" role="list">
        <li>
          <ul className="-mx-2 space-y-1" role="list">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  className={clsx(
                    isActive(item)
                      ? "bg-accent/40 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 transition-colors hover:bg-accent/40 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400",
                    "group flex items-center gap-x-4 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                  href={item.href}
                >
                  <item.icon
                    aria-hidden="true"
                    className={clsx(
                      isActive(item)
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-400 transition-colors group-hover:text-indigo-600 dark:text-gray-600 dark:group-hover:text-indigo-600",
                      "h-5 w-5 shrink-0",
                    )}
                  />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </li>

        {showRecents ? (
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Recent facts
            </div>

            <ul className="-mx-2 mt-2 space-y-1" role="list">
              {recent.map((team) => (
                <li key={team.name}>
                  <a
                    className={clsx(
                      team.current
                        ? "bg-gray-50 text-indigo-600 dark:bg-zinc-950/40"
                        : "text-gray-700 transition-colors hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-zinc-950/40",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    )}
                    href={team.href}
                  >
                    <span
                      className={clsx(
                        team.current
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-200 text-gray-400 transition-colors group-hover:border-indigo-600 group-hover:text-indigo-600 dark:border-zinc-800 dark:text-gray-700",
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium dark:bg-zinc-950",
                      )}
                    >
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
