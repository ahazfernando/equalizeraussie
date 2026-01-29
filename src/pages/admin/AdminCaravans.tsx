"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, EyeOff, X, Loader2, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface SpecItem {
  label: string;
  value: string;
}

interface SpecCategory {
  category: string;
  items: SpecItem[];
}

interface Variant {
  name: string;
  priceModifier: number;
}

interface Caravan {
  id: string;
  name: string;
  series: "Explorer" | "Outback" | "Horizon" | "Summit" | "Compact";
  tagline: string;
  price: number;
  length: string;
  berth: 2 | 4;
  tare: string;
  atm: string;
  features: string[];
  description: string;
  images: string[];
  specs: SpecCategory[];
  variants: Variant[];
  available: boolean;
  featured: boolean;
  createdAt?: Timestamp;
  lastUpdated?: Timestamp;
}

export default function AdminCaravans() {
  const [searchTerm, setSearchTerm] = useState("");
  const [caravanList, setCaravanList] = useState<Caravan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCaravan, setEditingCaravan] = useState<Caravan | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingCaravanId, setDeletingCaravanId] = useState<string | null>(null);

  const [formState, setFormState] = useState<{
    name: string;
    series: "Explorer" | "Outback" | "Horizon" | "Summit" | "Compact" | "";
    tagline: string;
    price: string;
    length: string;
    berth: "2" | "4" | "";
    tare: string;
    atm: string;
    features: string[];
    description: string;
    images: string[]; // Existing images (URLs)
    specs: SpecCategory[];
    variants: Variant[];
    imageFiles: File[]; // New images to upload
    imagePreviews: string[]; // Previews (from URLs or files)
    available: boolean;
    featured: boolean;
  }>({
    name: "",
    series: "",
    tagline: "",
    price: "",
    length: "",
    berth: "",
    tare: "",
    atm: "",
    features: [],
    description: "",
    images: [],
    specs: [],
    variants: [{ name: "Standard", priceModifier: 0 }],
    imageFiles: [],
    imagePreviews: [],
    available: true,
    featured: false,
  });

  const [currentFeature, setCurrentFeature] = useState("");
  const [uploadingImages, setUploadingImages] = useState(false);

  // Load caravans from Firestore
  const loadCaravans = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "caravans"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Caravan[];

      data.sort((a, b) => a.name.localeCompare(b.name));
      setCaravanList(data);
    } catch (error) {
      console.error("Error loading caravans:", error);
      toast.error("Failed to load caravans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCaravans();
  }, []);

  const filteredCaravans = caravanList.filter(
    (caravan) =>
      caravan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caravan.series.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFeatured = async (id: string) => {
    const caravan = caravanList.find((c) => c.id === id);
    if (!caravan) return;

    try {
      await updateDoc(doc(db, "caravans", id), { featured: !caravan.featured });
      setCaravanList(
        caravanList.map((c) =>
          c.id === id ? { ...c, featured: !c.featured } : c
        )
      );
      toast.success("Featured status updated");
    } catch (error) {
      toast.error("Failed to update featured status");
    }
  };

  const toggleAvailable = async (id: string) => {
    const caravan = caravanList.find((c) => c.id === id);
    if (!caravan) return;

    try {
      await updateDoc(doc(db, "caravans", id), { available: !caravan.available });
      setCaravanList(
        caravanList.map((c) =>
          c.id === id ? { ...c, available: !c.available } : c
        )
      );
      toast.success("Availability updated");
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (formState.imagePreviews.length + files.length > 3) {
        toast.error("Maximum 3 images allowed");
        return;
      }

      const newPreviews = files.map((file) => URL.createObjectURL(file));

      setFormState((prev) => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...files],
        imagePreviews: [...prev.imagePreviews, ...newPreviews],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormState((prev) => {
      const isExisting = index < prev.images.length;
      if (!isExisting) {
        URL.revokeObjectURL(prev.imagePreviews[index]);
      }

      return {
        ...prev,
        images: isExisting ? prev.images.filter((_, i) => i !== index) : prev.images,
        imageFiles: !isExisting ? prev.imageFiles.filter((_, i) => i - prev.images.length !== index + prev.images.length) : prev.imageFiles,
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
      };
    });
  };

  const addFeature = () => {
    if (currentFeature.trim()) {
      setFormState((prev) => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()],
      }));
      setCurrentFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addVariant = () => {
    setFormState((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", priceModifier: 0 }],
    }));
  };

  const updateVariant = (index: number, field: "name" | "priceModifier", value: string) => {
    setFormState((prev) => {
      const updated = [...prev.variants];
      if (field === "name") {
        updated[index].name = value;
      } else {
        updated[index].priceModifier = Number(value.replace(/[^0-9]/g, "")) || 0;
      }
      return { ...prev, variants: updated };
    });
  };

  const removeVariant = (index: number) => {
    if (formState.variants.length === 1) {
      toast.error("At least one variant is required");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const addSpecCategory = () => {
    setFormState((prev) => ({
      ...prev,
      specs: [
        ...prev.specs,
        { category: "", items: [{ label: "", value: "" }] },
      ],
    }));
  };

  const updateSpecCategory = (catIndex: number, category: string) => {
    setFormState((prev) => {
      const updated = [...prev.specs];
      updated[catIndex].category = category;
      return { ...prev, specs: updated };
    });
  };

  const removeSpecCategory = (catIndex: number) => {
    setFormState((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== catIndex),
    }));
  };

  const addSpecItem = (catIndex: number) => {
    setFormState((prev) => {
      const updated = [...prev.specs];
      updated[catIndex].items.push({ label: "", value: "" });
      return { ...prev, specs: updated };
    });
  };

  const updateSpecItem = (catIndex: number, itemIndex: number, field: "label" | "value", value: string) => {
    setFormState((prev) => {
      const updated = [...prev.specs];
      if (field === "label") {
        updated[catIndex].items[itemIndex].label = value;
      } else {
        updated[catIndex].items[itemIndex].value = value;
      }
      return { ...prev, specs: updated };
    });
  };

  const removeSpecItem = (catIndex: number, itemIndex: number) => {
    setFormState((prev) => {
      const updated = [...prev.specs];
      updated[catIndex].items = updated[catIndex].items.filter((_, i) => i !== itemIndex);
      return { ...prev, specs: updated };
    });
  };

  const uploadImages = async (): Promise<string[]> => {
    if (formState.imageFiles.length === 0) return [];

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of formState.imageFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "digital assets/caravans");

        const response = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Upload failed");

        uploadedUrls.push(data.url);
      }
      toast.success("Images uploaded successfully");
      return uploadedUrls;
    } catch (error: any) {
      toast.error(error.message || "Failed to upload images");
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSaveCaravan = async () => {
    if (
      !formState.name.trim() ||
      !formState.series ||
      !formState.berth ||
      !formState.price.trim()
    ) {
      toast.error("Please fill in all required fields (Name, Series, Berth, Price).");
      return;
    }

    const priceNum = Number(formState.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    try {
      const uploadedImageUrls = await uploadImages();

      const caravanData: Omit<Caravan, "id"> = {
        name: formState.name.trim(),
        series: formState.series as Caravan["series"],
        tagline: formState.tagline.trim(),
        price: priceNum,
        length: formState.length.trim(),
        berth: Number(formState.berth) as 2 | 4,
        tare: formState.tare.trim(),
        atm: formState.atm.trim(),
        features: formState.features,
        description: formState.description.trim(),
        images: [...formState.images, ...uploadedImageUrls],
        specs: formState.specs
          .filter((cat) => cat.category.trim())
          .map((cat) => ({
            category: cat.category.trim(),
            items: cat.items.filter((item) => item.label.trim() || item.value.trim()),
          })),
        variants: formState.variants
          .filter((v) => v.name.trim())
          .map((v) => ({
            name: v.name.trim(),
            priceModifier: v.priceModifier,
          })),
        available: formState.available,
        featured: formState.featured,
        lastUpdated: Timestamp.now(),
      };

      if (editingCaravan) {
        await updateDoc(doc(db, "caravans", editingCaravan.id), caravanData);
        toast.success("Caravan updated successfully");
      } else {
        caravanData.createdAt = Timestamp.now();
        await addDoc(collection(db, "caravans"), caravanData);
        toast.success("Caravan added successfully");
      }

      resetForm();
      setIsDialogOpen(false);
      loadCaravans();
    } catch (error) {
      console.error("Error saving caravan:", error);
      toast.error("Failed to save caravan");
    }
  };

  const handleDeleteCaravan = async () => {
    if (!deletingCaravanId) return;

    try {
      await deleteDoc(doc(db, "caravans", deletingCaravanId));
      toast.success("Caravan deleted successfully");
      loadCaravans();
    } catch (error) {
      toast.error("Failed to delete caravan");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingCaravanId(null);
    }
  };

  const openEditDialog = (caravan: Caravan) => {
    setEditingCaravan(caravan);
    setFormState({
      name: caravan.name,
      series: caravan.series,
      tagline: caravan.tagline,
      price: caravan.price.toString(),
      length: caravan.length,
      berth: caravan.berth.toString() as "2" | "4",
      tare: caravan.tare,
      atm: caravan.atm,
      features: caravan.features,
      description: caravan.description,
      images: caravan.images,
      specs: caravan.specs,
      variants: caravan.variants,
      imageFiles: [],
      imagePreviews: caravan.images,
      available: caravan.available,
      featured: caravan.featured,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCaravan(null);
    setFormState({
      name: "",
      series: "",
      tagline: "",
      price: "",
      length: "",
      berth: "",
      tare: "",
      atm: "",
      features: [],
      description: "",
      images: [],
      specs: [],
      variants: [{ name: "Standard", priceModifier: 0 }],
      imageFiles: [],
      imagePreviews: [],
      available: true,
      featured: false,
    });
    setCurrentFeature("");
  };

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: hsl(var(--border) / 0.3); border-radius: 6px; }
        ::-webkit-scrollbar-thumb { background: hsl(var(--accent)); border-radius: 6px; border: 2px solid hsl(var(--background)); }
        ::-webkit-scrollbar-thumb:hover { background: hsl(var(--accent) / 0.9); }

        .custom-scroll-modal { scrollbar-width: thin; scrollbar-color: hsl(var(--accent)) hsl(var(--border) / 0.3); }
        .custom-scroll-modal::-webkit-scrollbar { width: 8px; }
        .custom-scroll-modal::-webkit-scrollbar-thumb { background: hsl(var(--accent)); border-radius: 8px; }
        .custom-scroll-modal::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-wider">Caravan Management</h2>
            <p className="text-muted-foreground text-base md:text-lg mt-2">
              Manage your caravan inventory and listings
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            if (!open) resetForm();
            setIsDialogOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add New Caravan
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto custom-scroll-modal">
              <DialogHeader>
                <DialogTitle>{editingCaravan ? "Edit Caravan" : "Add New Caravan"}</DialogTitle>
                <DialogDescription>
                  {editingCaravan ? "Update the caravan details." : "Fill in the details to add a new caravan to your inventory."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Explorer 21"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="series">Series *</Label>
                      <Select
                        value={formState.series}
                        onValueChange={(value) => setFormState({ ...formState, series: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select series" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Explorer">Explorer</SelectItem>
                          <SelectItem value="Outback">Outback</SelectItem>
                          <SelectItem value="Horizon">Horizon</SelectItem>
                          <SelectItem value="Summit">Summit</SelectItem>
                          <SelectItem value="Compact">Compact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={formState.tagline}
                        onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                        placeholder="e.g. Compact Luxury for Couples"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (AUD) *</Label>
                      <Input
                        id="price"
                        type="text"
                        value={formState.price}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            price: e.target.value.replace(/[^0-9]/g, ""),
                          })
                        }
                        placeholder="89990"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="length">Length</Label>
                      <Input
                        id="length"
                        value={formState.length}
                        onChange={(e) => setFormState({ ...formState, length: e.target.value })}
                        placeholder="21ft"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="berth">Berth *</Label>
                      <Select
                        value={formState.berth}
                        onValueChange={(value) => setFormState({ ...formState, berth: value as "2" | "4" | "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select berth" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tare">Tare Weight</Label>
                      <Input
                        id="tare"
                        value={formState.tare}
                        onChange={(e) => setFormState({ ...formState, tare: e.target.value })}
                        placeholder="2,450kg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="atm">ATM</Label>
                      <Input
                        id="atm"
                        value={formState.atm}
                        onChange={(e) => setFormState({ ...formState, atm: e.target.value })}
                        placeholder="3,200kg"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Description</h3>
                  <Textarea
                    rows={5}
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Write a compelling description..."
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Key Features</h3>
                  <div className="flex gap-2">
                    <Input
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                      placeholder="e.g. Queen Island Bed"
                    />
                    <Button onClick={addFeature} variant="outline">Add</Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {formState.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="py-1 pl-3 pr-2">
                        {feature}
                        <button onClick={() => removeFeature(index)} className="ml-2 hover:bg-muted rounded-full">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {formState.features.length === 0 && (
                      <p className="text-sm text-muted-foreground">No features added yet.</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Specifications</h3>

                  <div className="space-y-6">
                    {formState.specs.map((specCategory, catIndex) => (
                      <div key={catIndex} className="border border-border rounded-lg p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <Input
                            value={specCategory.category}
                            onChange={(e) => updateSpecCategory(catIndex, e.target.value)}
                            placeholder="Category name (e.g. Dimensions)"
                            className="font-medium"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSpecCategory(catIndex)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {specCategory.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="grid grid-cols-2 gap-3 items-end">
                              <div className="space-y-1">
                                <Label className="text-xs">Label</Label>
                                <Input
                                  value={item.label}
                                  onChange={(e) => updateSpecItem(catIndex, itemIndex, "label", e.target.value)}
                                  placeholder="e.g. External Length"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Value</Label>
                                <div className="flex gap-2">
                                  <Input
                                    value={item.value}
                                    onChange={(e) => updateSpecItem(catIndex, itemIndex, "value", e.target.value)}
                                    placeholder="e.g. 6.4m (21ft)"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSpecItem(catIndex, itemIndex)}
                                    className="text-destructive"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addSpecItem(catIndex)}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Spec Item
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addSpecCategory}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Specification Category
                    </Button>

                    {formState.specs.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No specifications added yet.
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Variants</h3>
                  <p className="text-sm text-muted-foreground">
                    Add optional variants with additional pricing.
                  </p>

                  <div className="space-y-4">
                    {formState.variants.map((variant, index) => (
                      <div key={index} className="flex items-end gap-3 border border-border rounded-lg p-4">
                        <div className="flex-1 space-y-2">
                          <Label>Variant Name</Label>
                          <Input
                            value={variant.name}
                            onChange={(e) => updateVariant(index, "name", e.target.value)}
                            placeholder="e.g. Bunk Layout"
                          />
                        </div>
                        <div className="w-40 space-y-2">
                          <Label>Price Modifier (AUD)</Label>
                          <Input
                            type="text"
                            value={variant.priceModifier}
                            onChange={(e) => updateVariant(index, "priceModifier", e.target.value)}
                            placeholder="3500"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariant(index)}
                          className="text-destructive mb-1"
                          disabled={formState.variants.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    <Button variant="outline" onClick={addVariant} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Variant
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Images (Max 3)</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="image-upload"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={uploadingImages || formState.imagePreviews.length >= 3}
                    />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90"
                    >
                      {uploadingImages ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Choose Images ({3 - formState.imagePreviews.length} left)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload up to 3 images (JPG, PNG, etc.)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {formState.imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          unoptimized
                          className="object-cover rounded-lg shadow"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {formState.imagePreviews.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">No images uploaded yet.</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Status</h3>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available"
                        checked={formState.available}
                        onCheckedChange={(checked) => setFormState({ ...formState, available: !!checked })}
                      />
                      <Label htmlFor="available">Available for sale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formState.featured}
                        onCheckedChange={(checked) => setFormState({ ...formState, featured: !!checked })}
                      />
                      <Label htmlFor="featured">Featured on homepage</Label>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveCaravan} disabled={uploadingImages}>
                  {uploadingImages && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  {editingCaravan ? "Update Caravan" : "Add Caravan"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search caravans by name or series..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground">Total Caravans</p>
            <p className="text-2xl font-bold mt-1">{caravanList.length}</p>
          </div>
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground">Featured</p>
            <p className="text-2xl font-bold mt-1">{caravanList.filter((c) => c.featured).length}</p>
          </div>
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground">Available</p>
            <p className="text-2xl font-bold mt-1">{caravanList.filter((c) => c.available).length}</p>
          </div>
          <div className="admin-card p-4">
            <p className="text-sm text-muted-foreground">Unavailable</p>
            <p className="text-2xl font-bold mt-1">{caravanList.filter((c) => !c.available).length}</p>
          </div>
        </div>

        <div className="admin-card">
          {loading ? (
            <div className="space-y-4 p-8">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">Caravan</th>
                    <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">Series</th>
                    <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">Price</th>
                    <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-base font-bold text-muted-foreground tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCaravans.map((caravan) => (
                    <tr key={caravan.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{caravan.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {caravan.length} • {caravan.berth} berth
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{caravan.series}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium">${caravan.price.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          {caravan.featured && (
                            <Badge className="bg-accent text-accent-foreground w-fit">Featured</Badge>
                          )}
                          <Badge variant={caravan.available ? "default" : "secondary"} className="w-fit">
                            {caravan.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured(caravan.id)}
                            title={caravan.featured ? "Remove from featured" : "Add to featured"}
                          >
                            {caravan.featured ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAvailable(caravan.id)}
                            title={caravan.available ? "Mark unavailable" : "Mark available"}
                          >
                            {caravan.available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(caravan)}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDeletingCaravanId(caravan.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            title="Delete"
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredCaravans.length === 0 && !loading && (
            <div className="text-center py-12 text-muted-foreground">
              No caravans found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the caravan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCaravan} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}