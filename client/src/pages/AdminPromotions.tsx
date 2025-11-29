import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit, Trash2, Copy } from "lucide-react";

const mockPromotions = [
  { id: 1, code: "WELLNESS10", discount: 10, type: "Percentage", status: "Active", usageCount: 47, maxUses: 100, expiryDate: "2024-12-31" },
  { id: 2, code: "HERBAL200", discount: 200, type: "Fixed", status: "Active", usageCount: 23, maxUses: 50, expiryDate: "2024-12-15" },
  { id: 3, code: "SUMMER15", discount: 15, type: "Percentage", status: "Inactive", usageCount: 89, maxUses: 200, expiryDate: "2024-11-30" },
];

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [showNewForm, setShowNewForm] = useState(false);

  const handleDelete = (id: number) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    setPromotions(promotions.map(p => 
      p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
    ));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Promotions & Discounts</h1>
              <p className="text-muted-foreground">Manage promotional codes and special offers</p>
            </div>
            <Button onClick={() => setShowNewForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Promotion
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Active Promotions</p>
                <p className="text-3xl font-bold mt-2">{promotions.filter(p => p.status === "Active").length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Uses</p>
                <p className="text-3xl font-bold mt-2">{promotions.reduce((sum, p) => sum + p.usageCount, 0)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Avg Discount</p>
                <p className="text-3xl font-bold mt-2">₱{Math.round(promotions.reduce((sum, p) => sum + p.discount, 0) / promotions.length)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Promotions List */}
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map(promo => (
                  <div key={promo.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="bg-muted px-3 py-1 rounded font-mono font-bold text-sm cursor-pointer hover:bg-muted/70" onClick={() => copyCode(promo.code)}>
                          {promo.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyCode(promo.code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Badge className={promo.status === "Active" ? "bg-green-100 text-green-800 border-0" : "bg-gray-100 text-gray-800 border-0"}>
                          {promo.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {promo.type === "Percentage" 
                          ? `Save ${promo.discount}% off` 
                          : `Save ₱${promo.discount}`
                        }
                        {" • "}
                        Expires: {promo.expiryDate}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Used: {promo.usageCount}/{promo.maxUses}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(promo.usageCount / promo.maxUses) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant={promo.status === "Active" ? "outline" : "outline"}
                        size="sm"
                        className="flex-1 md:flex-none"
                        onClick={() => toggleStatus(promo.id)}
                      >
                        {promo.status === "Active" ? "Disable" : "Enable"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1 md:flex-none"
                        onClick={() => handleDelete(promo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
