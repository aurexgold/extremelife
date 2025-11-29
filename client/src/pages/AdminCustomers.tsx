import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { Mail, Phone, ShoppingBag, Star, MoreVertical } from "lucide-react";

const mockCustomers = [
  { id: 1, name: "Maria Santos", email: "maria@email.com", phone: "+63-905-1234567", orders: 5, totalSpent: 12450, status: "VIP", rating: 5 },
  { id: 2, name: "Juan Dela Cruz", email: "juan@email.com", phone: "+63-909-8765432", orders: 3, totalSpent: 5299, status: "Regular", rating: 4.5 },
  { id: 3, name: "Rosa Gonzales", email: "rosa@email.com", phone: "+63-917-5551234", orders: 8, totalSpent: 18920, status: "VIP", rating: 5 },
  { id: 4, name: "Carlos Reyes", email: "carlos@email.com", phone: "+63-908-3332222", orders: 1, totalSpent: 649, status: "New", rating: 4 },
  { id: 5, name: "Ana Ortega", email: "ana@email.com", phone: "+63-910-9994444", orders: 2, totalSpent: 2150, status: "Regular", rating: 4.8 },
];

export default function AdminCustomers() {
  const [customers] = useState(mockCustomers);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "VIP": return "bg-purple-100 text-purple-800";
      case "Regular": return "bg-blue-100 text-blue-800";
      case "New": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
            <p className="text-muted-foreground">{customers.length} customers in system</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-3xl font-bold mt-2">{customers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">VIP Members</p>
                <p className="text-3xl font-bold mt-2">{customers.filter(c => c.status === "VIP").length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-3xl font-bold mt-2">₱{Math.round(customers.reduce((sum, c) => sum + (c.totalSpent / c.orders), 0) / customers.length).toLocaleString('en-PH')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">₱{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString('en-PH')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Customers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Customers List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-4 px-6 font-semibold">Name</th>
                      <th className="text-left py-4 px-6 font-semibold">Contact</th>
                      <th className="text-left py-4 px-6 font-semibold">Orders</th>
                      <th className="text-left py-4 px-6 font-semibold">Total Spent</th>
                      <th className="text-left py-4 px-6 font-semibold">Status</th>
                      <th className="text-left py-4 px-6 font-semibold">Rating</th>
                      <th className="text-left py-4 px-6 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(customer => (
                      <tr key={customer.id} className="border-b hover:bg-muted/30 transition">
                        <td className="py-4 px-6 font-medium">{customer.name}</td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-1 text-xs">
                            <a href={`mailto:${customer.email}`} className="text-primary hover:underline flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {customer.email}
                            </a>
                            <a href={`tel:${customer.phone}`} className="text-primary hover:underline flex items-center gap-1">
                              <Phone className="h-3 w-3" /> {customer.phone}
                            </a>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                            {customer.orders}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold">₱{customer.totalSpent.toLocaleString('en-PH')}</td>
                        <td className="py-4 px-6">
                          <Badge className={`${getStatusColor(customer.status)} border-0`}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(customer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs ml-1">{customer.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
