import { useState } from "react";
import { useEmailNotification } from "@/context/EmailNotificationContext";
import { Bell, Mail, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function EmailNotificationBell() {
  const { logs } = useEmailNotification();
  const [isOpen, setIsOpen] = useState(false);

  const recentLogs = logs.slice(0, 5);
  const pendingCount = logs.filter(l => l.status === "pending").length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Mail className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {pendingCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-orange-600">
              {pendingCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-4">Recent Email Activity</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentLogs.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No email activity</p>
            ) : (
              recentLogs.map(log => (
                <div key={log.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted transition">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(log.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-1">{log.subject}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{log.recipient}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(log.sentAt).toLocaleTimeString("en-PH")}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    {log.status === "sent" && "✓ Sent"}
                    {log.status === "pending" && "⏳ Pending"}
                    {log.status === "failed" && "✗ Failed"}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-xs justify-center"
            onClick={() => window.location.href = "/admin/email-notifications"}
          >
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
