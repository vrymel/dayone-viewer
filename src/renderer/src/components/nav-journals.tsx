"use client";

import { FolderIcon, ShareIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import JournalContext from "@/contexts/journal";

export function NavJournals() {
	const { setActiveJournal } = useContext(JournalContext);
	const [journals, setJournals] = useState([]);
	const { isMobile } = useSidebar();

	useEffect(() => {
		async function _() {
			const results = await window.electron.ipcRenderer.invoke("journalList");

			setJournals(results);
		}

		_();
	}, []);

	function handleJournalSelect(journal) {
		setActiveJournal(journal);
	}

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Journals</SidebarGroupLabel>
			<SidebarMenu>
				{journals.map((journal) => (
					<SidebarMenuItem key={journal.name}>
						<SidebarMenuButton asChild>
							<button
								onClick={() => handleJournalSelect(journal)}
								type="button"
							>
								{/*<journal.icon />*/}
								<span>{journal.name}</span>
							</button>
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
	);
}
