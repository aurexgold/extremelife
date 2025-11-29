import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ProductForm from "@/components/ProductForm";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { products as initialProducts } from "@/lib/data";

type Product = typeof initialProducts[0];

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Tea", "Essential Oils", "Supplements", "Body Care"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (formData: any) => {
    if (editingProduct) {
      const updatedProduct: Product = { 
        ...editingProduct, 
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        category: formData.category,
        description: formData.description,
        shopee: formData.shopee,
        lazada: formData.lazada,
        fcf: formData.fcf,
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        category: formData.category,
        description: formData.description,
        image: products[0].image,
        shopee: formData.shopee,
        lazada: formData.lazada,
        fcf: formData.fcf,
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
              <p className="text-muted-foreground">Manage your catalog ({filteredProducts.length} products)</p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} className="gap-2 h-10">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg bg-background">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="bg-background outline-none text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No products found</p>
                </CardContent>
              </Card>
            ) : (
              filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                            {product.category}
                          </span>
                          {product.shopee && <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-semibold">Shopee</span>}
                          {product.lazada && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Lazada</span>}
                          {product.fcf && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">Flash Sale</span>}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">₱{product.price.toFixed(2)}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">₱{product.originalPrice.toFixed(2)}</p>
                        )}
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          {product.originalPrice
                            ? `Save ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%`
                            : ""}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditForm(product)}
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-2">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogTitle>Delete Product</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure? This will delete "{product.name}" permanently.
                            </AlertDialogDescription>
                            <div className="flex gap-2 justify-end">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleAddProduct}
        initialData={editingProduct}
      />
    </div>
  );
}
