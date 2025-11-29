import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function NavbarMoreMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm font-medium">
          More <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <Link href="/referral">
          <DropdownMenuItem className="cursor-pointer">
            Referral Program
          </DropdownMenuItem>
        </Link>
        <Link href="/faq">
          <DropdownMenuItem className="cursor-pointer">
            FAQ
          </DropdownMenuItem>
        </Link>
        <Link href="/contact">
          <DropdownMenuItem className="cursor-pointer">
            Contact Us
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
