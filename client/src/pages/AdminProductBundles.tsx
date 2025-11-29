import { useState } from "react";
import { useProductBundle } from "@/context/ProductBundleContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Plus, Edit, Trash2, TrendingUp, Gift, DollarSign, Save } from "lucide-react";

export default function AdminProductBundles() {
  const { bundles, deleteBundle, updateBundle, addBundle } = useProductBundle();
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const currentBundle = selectedBundle ? bundles.find(b => b.id === selectedBundle) : null;

  const categoryLabels: Record<string, string> = {
    frequently_bought: "Frequently Bought",
    value_pack: "Value Pack",
    wellness_combo: "Wellness Combo",
    starter_kit: "Starter Kit"
  };

  const getTotalRevenue = () => {
    return bundles.reduce((sum, b) => sum + b.bundlePrice, 0);
  };

  const getAverageSavings = () => {
    const avg = bundles.reduce((sum, b) => sum + b.discount, 0) / bundles.length;
    return avg.toFixed(1);
  };

  const getTotalPotentialSavings = () => {
    return bundles.reduce((sum, b) => sum + b.savings, 0);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Product Bundles</h1>
            <p className="text-sm text-muted-foreground">Create and manage product bundles</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bundles</p>
                  <p className="text-3xl font-bold mt-2 text-blue-600">{bundles.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bundle Revenue</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">₱{getTotalRevenue().toLocaleString('en-PH')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Discount</p>
                  <p className="text-3xl font-bold mt-2 text-purple-600">{getAverageSavings()}%</p>
                </div>
                <Gift className="h-8 w-8 text-purple-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Savings Offered</p>
                  <p className="text-3xl font-bold mt-2 text-orange-600">₱{getTotalPotentialSavings().toLocaleString('en-PH')}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bundles List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">Bundles</CardTitle>
                </div>
                <Button size="sm" className="gap-1">
                  <Plus className="h-3 w-3" />
                  New
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {bundles.map(bundle => (
                  <Button
                    key={bundle.id}
                    variant={selectedBundle === bundle.id ? "default" : "outline"}
                    className="w-full justify-start gap-2 h-auto py-3 text-left"
                    onClick={() => {
                      setSelectedBundle(bundle.id);
                      setIsEditing(false);
                    }}
                    data-testid={`button-select-bundle-${bundle.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-1">{bundle.name}</p>
                      <p className="text-xs text-muted-foreground">₱{bundle.bundlePrice.toLocaleString('en-PH')}</p>
                      <Badge className="mt-1 text-xs">{bundle.discount}% OFF</Badge>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            {currentBundle ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Bundle Details</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="gap-1"
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-3 w-3" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="h-3 w-3" />
                          Edit
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        deleteBundle(currentBundle.id);
                        setSelectedBundle(null);
                      }}
                      className="gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Bundle Name</label>
                      <Input
                        value={currentBundle.name}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={currentBundle.description}
                        disabled={!isEditing}
                        className="mt-1 min-h-20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Select defaultValue={currentBundle.category}>
                          <SelectTrigger className="mt-1" disabled={!isEditing}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frequently_bought">Frequently Bought</SelectItem>
                            <SelectItem value="value_pack">Value Pack</SelectItem>
                            <SelectItem value="wellness_combo">Wellness Combo</SelectItem>
                            <SelectItem value="starter_kit">Starter Kit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select defaultValue={currentBundle.isActive ? "active" : "inactive"}>
                          <SelectTrigger className="mt-1" disabled={!isEditing}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="font-semibold text-sm">Pricing</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Regular Price</label>
                        <Input
                          type="number"
                          value={currentBundle.regularPrice}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Bundle Price</label>
                        <Input
                          type="number"
                          value={currentBundle.bundlePrice}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Discount:</span>
                        <span className="font-bold text-green-600">{currentBundle.discount}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Customer Saves:</span>
                        <span className="font-bold text-green-600">₱{currentBundle.savings.toLocaleString('en-PH')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="border-t pt-4 space-y-3">
                    <h3 className="font-semibold text-sm">Included Products</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {currentBundle.products.map((product, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 border rounded">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">₱{product.price}</p>
                          </div>
                          <Input
                            type="number"
                            value={product.quantity}
                            disabled={!isEditing}
                            className="w-16 text-center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="border-t pt-4 space-y-3">
                    <h3 className="font-semibold text-sm">Performance</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Popularity Score</span>
                        </div>
                        <span className="text-xl font-bold text-orange-600">{currentBundle.popularity}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Select a bundle to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Category Distribution</CardTitle>
              <CardDescription>Bundles by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const count = bundles.filter(b => b.category === key).length;
                const percentage = ((count / bundles.length) * 100).toFixed(0);
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Performing Bundles</CardTitle>
              <CardDescription>By popularity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bundles
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5)
                .map((bundle, idx) => (
                  <div key={bundle.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground">#{idx + 1}</span>
                      <span className="text-sm font-medium line-clamp-1">{bundle.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${bundle.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold w-8 text-right">{bundle.popularity}%</span>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
