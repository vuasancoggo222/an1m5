import type {INavLink} from '@/types/nav'
export const navLink:INavLink[] = [
    {
        name : "An1m5",
        path : "/",
    },
    {
        name : "Most Popular Anime",
        path : "/most-popular-anime",
    },
    {
        name : "Anime Schedule",
        path : "/anime-schedule",
    },
  //   {
  //     name : "Manga",
  //     path : "/manga",
  // }
]

export const userDropdown = [
    {
      title: "Account information",
      value: '/account-information',
      icon: "mdi-card-account-details"
    },
    {
        title: "Settings",
        value: '/settings',
        icon: "mdi-cog"
      },
    {
      title: "Recent watched",
      value: '/recent-watched',
      icon: "mdi-history"
    },
    {
      title: "Sign out",
      value : '/log-out',
      icon: "mdi-logout-variant"
    },
  ]