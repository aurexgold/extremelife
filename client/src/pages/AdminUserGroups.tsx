import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useUserGroups } from "@/context/UserGroupsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, Percent, Users } from "lucide-react";

export default function AdminUserGroups() {
  const { adminName } = useAdmin();
  const { groups, addGroup, updateGroup, deleteGroup } = useUserGroups();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    discountRate: 0,
    description: "",
  });

  const handleSubmit = () => {
    if (!formData.name || formData.discountRate < 0 || formData.discountRate > 100) {
      alert("Please fill all fields with valid values");
      return;
    }

    if (editingId) {
      updateGroup(editingId, formData);
      setEditingId(null);
    } else {
      addGroup(formData);
    }

    setFormData({ name: "", discountRate: 0, description: "" });
    setShowForm(false);
  };

  const handleEdit = (group: any) => {
    setFormData({
      name: group.name,
      discountRate: group.discountRate,
      description: group.description,
    });
    setEditingId(group.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", discountRate: 0, description: "" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Groups & Discounts</h1>
            <p className="text-sm text-muted-foreground">Manage customer groups and their discount rates</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Group
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Form */}
        {showForm && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>{editingId ? "Edit User Group" : "Create New User Group"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Group Name</label>
                  <Input
                    placeholder="e.g., Gold Member"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Discount Rate (%)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={formData.discountRate}
                      onChange={(e) => setFormData({ ...formData, discountRate: parseInt(e.target.value) || 0 })}
                    />
                    <div className="flex items-center px-3 bg-muted rounded border">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Input
                  placeholder="e.g., Loyal customers with Gold loyalty tier"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="gap-2">
                  {editingId ? "Update Group" : "Create Group"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription className="mt-1">{group.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded p-3">
                    <p className="text-xs text-muted-foreground">Discount Rate</p>
                    <p className="text-2xl font-bold text-primary flex items-center gap-1">
                      {group.discountRate}%
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-3">
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {group.memberCount}
                    </p>
                  </div>
                </div>

                {/* Created Date */}
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(group.createdAt).toLocaleDateString("en-PH")}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => handleEdit(group)}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  {groups.length > 1 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>Delete Group</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{group.name}"? This will not affect existing members.
                        </AlertDialogDescription>
                        <div className="flex gap-2 justify-end">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteGroup(group.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-blue-900 mb-3">💡 How Discounts Work</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ Customers are assigned to groups based on loyalty tier and purchase history</li>
              <li>✓ Discounts are automatically applied at checkout</li>
              <li>✓ Higher tier members get priority discounts</li>
              <li>✓ Discounts stack with promotions and loyalty rewards</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
