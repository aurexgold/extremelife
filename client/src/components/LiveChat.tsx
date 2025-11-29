import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatMessages } from "@/lib/data";
import { useState } from "react";

export default function LiveChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage = {
        id: messages.length + 1,
        user: "You",
        message: input
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-[600px] flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="border-b border-border p-4 bg-muted/30 flex justify-between items-center">
        <h3 className="font-bold text-lg">Live Chat</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Online
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 items-start animate-in slide-in-from-bottom-2 duration-300">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {msg.user.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${msg.user === 'Admin' ? 'text-primary' : 'text-foreground/80'}`}>
                    {msg.user} {msg.user === 'Admin' && <span className="ml-1 rounded bg-primary px-1 py-0.5 text-[10px] text-primary-foreground">MOD</span>}
                </span>
                <p className="text-sm text-foreground bg-muted/40 px-3 py-2 rounded-r-lg rounded-bl-lg mt-1">
                    {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t border-border p-4 bg-background">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input 
            placeholder="Ask a question..." 
            className="rounded-full border-border/60 focus-visible:ring-primary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-full shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50">
            <Heart className="h-4 w-4 fill-current" />
          </Button>
        </form>
      </div>
    </div>
  );
}
