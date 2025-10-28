"use client"

import {useEffect,useState} from 'react';
import {
  FolderIcon,
  MoreHorizontalIcon,
  ShareIcon,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavJournals() {
  const [journals, setJournals] = useState([]);
  const items = [
    {
      name: 'My Journal',
      url: '#',
    },
    {
      name: 'Ice (3 years)',
      url: '#',
    }
  ];
  const { isMobile } = useSidebar();

  useEffect(() => {
    async function _() {
      const results = await window.electron.ipcRenderer.invoke('journalList');

      setJournals(results);
    }

    _();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Journals</SidebarGroupLabel>
      <SidebarMenu>
        {journals.map((journal) => (
          <SidebarMenuItem key={journal.name}>
            <SidebarMenuButton asChild>
              <a href={journal.url}>
                {/*<journal.icon />*/}
                <span>{journal.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
               {/*<DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="rounded-sm data-[state=open]:bg-accent"
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger> */}
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {/*<SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontalIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>*/}
      </SidebarMenu>
    </SidebarGroup>
  )
}
