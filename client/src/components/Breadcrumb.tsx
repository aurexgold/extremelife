import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  current: string;
}

export default function Breadcrumb({ items, current }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, idx) => (
        <div key={item.href} className="flex items-center gap-2">
          <Link href={item.href}>
            <a className="text-primary hover:underline">{item.label}</a>
          </Link>
          {idx < items.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </div>
      ))}
      {items.length > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      <span className="text-foreground font-semibold">{current}</span>
    </nav>
  );
}
