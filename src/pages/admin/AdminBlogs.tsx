"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { toast } from "sonner";
import { Trash2, Edit, Plus, Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

// Admin Blog Card Component
interface AdminBlogCardProps {
  blog: Article;
  formatDate: (article: Article) => string;
  getValidImageUrl: (imageURL: string) => string;
  onEdit: (blog: Article) => void;
  onDelete: (id: string) => void;
}

const AdminBlogCard: React.FC<AdminBlogCardProps> = ({ 
  blog, 
  formatDate, 
  getValidImageUrl, 
  onEdit, 
  onDelete 
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const formattedDate = formatDate(blog);

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <Image
          src={getValidImageUrl(blog.imageURL)}
          alt={blog.title}
          fill
          className="object-cover"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
      </div>
      <CardContent className="pt-6 px-6 pb-6 flex-grow flex flex-col">
        <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
        <h3 className="text-xl font-bold text-black mb-3 line-clamp-2 leading-tight">
          {blog.title}
        </h3>
        <p className="text-base text-gray-700 mb-4 flex-grow line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-md"
                style={{ 
                  backgroundColor: '#F1F5F9', 
                  color: '#000000',
                  fontSize: '14px'
                }}
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span
                className="text-sm px-3 py-1 rounded-md"
                style={{ 
                  backgroundColor: '#F1F5F9', 
                  color: '#000000',
                  fontSize: '14px'
                }}
              >
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-2 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(blog)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(blog.id)}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Article | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [blogForm, setBlogForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    imageURL: "",
    tags: [] as string[],
    authorName: "",
    authorAvatarURL: "",
    isPopular: false,
  });

  // Helper function to generate URL-friendly slug
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Helper to convert Firestore Timestamp to ISO string
  const toISOString = (value: any): string => {
    if (!value) return '';
    if (value.toDate && typeof value.toDate === 'function') {
      return value.toDate().toISOString();
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  };

  // Format date helper
  const formatDate = (article: Article): string => {
    const dateValue = article.lastUpdated || article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
      const date = (dateValue as Timestamp).toDate();
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
    if (typeof dateValue === 'string') {
      const d = new Date(dateValue);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        });
      }
    }
    return 'Date not available';
  };

  // Get valid image URL helper
  const getValidImageUrl = (imageURL: string): string => {
    if (!imageURL || imageURL.trim() === '') {
      return '/blogs/blog1.png';
    }
    
    try {
      new URL(imageURL);
      return imageURL;
    } catch {
      if (imageURL.startsWith('/')) {
        return imageURL;
      }
      return `/blogs/${imageURL}`;
    }
  };

  const loadBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const blogsRef = collection(db, 'blogs');
      const snapshot = await getDocs(blogsRef);
      
      const blogsData = snapshot.docs.map(doc => {
        const data = doc.data();
        
        return {
          id: doc.id,
          slug: data.slug || '',
          title: data.title || '',
          excerpt: data.excerpt || '',
          imageURL: data.imageURL || '/blogs/blog1.png',
          tags: data.tags || [],
          content: data.content || '',
          author: data.author || { name: 'Unknown', avatarURL: '' },
          date: toISOString(data.date) || toISOString(data.createdAt),
          createdAt: toISOString(data.createdAt),
          lastUpdated: toISOString(data.lastUpdated),
          isPopular: data.isPopular || false,
        } as Article;
      });

      // Sort by date (newest first)
      blogsData.sort((a, b) => {
        const getDate = (article: Article): number => {
          const dateValue = article.lastUpdated || article.createdAt || article.date;
          if (!dateValue) return 0;
          try {
            if (typeof dateValue === 'string') {
              return new Date(dateValue).getTime();
            }
            return 0;
          } catch {
            return 0;
          }
        };
        return getDate(b) - getDate(a);
      });

      setBlogs(blogsData);
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error("Failed to load blogs");
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleAddTag = () => {
    if (tagInput.trim() && !blogForm.tags.includes(tagInput.trim())) {
      setBlogForm({
        ...blogForm,
        tags: [...blogForm.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setBlogForm({
      ...blogForm,
      tags: blogForm.tags.filter(t => t !== tag),
    });
  };

  const handleOpenDialog = (blog?: Article) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        imageURL: blog.imageURL,
        tags: blog.tags || [],
        authorName: blog.author?.name || '',
        authorAvatarURL: blog.author?.avatarURL || '',
        isPopular: blog.isPopular || false,
      });
      setBlogImagePreview(blog.imageURL || null);
      setAvatarPreview(blog.author?.avatarURL || null);
    } else {
      setEditingBlog(null);
      setBlogForm({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        imageURL: "",
        tags: [],
        authorName: "",
        authorAvatarURL: "",
        isPopular: false,
      });
      setBlogImagePreview(null);
      setAvatarPreview(null);
    }
    setBlogImageFile(null);
    setAvatarFile(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingBlog(null);
    setBlogForm({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      imageURL: "",
      tags: [],
      authorName: "",
      authorAvatarURL: "",
      isPopular: false,
    });
    setTagInput("");
    setBlogImagePreview(null);
    setAvatarPreview(null);
    setBlogImageFile(null);
    setAvatarFile(null);
    setUploadingBlogImage(false);
    setUploadingAvatar(false);
  };

  const handleBlogImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setBlogImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setBlogImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary via API route
    setUploadingBlogImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'digital assets/blogs');

      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setBlogForm({ ...blogForm, imageURL: data.url });
      toast.success("Blog image uploaded successfully");
    } catch (error: any) {
      console.error('Error uploading blog image:', error);
      toast.error(error.message || "Failed to upload blog image");
      setBlogImagePreview(null);
      setBlogImageFile(null);
    } finally {
      setUploadingBlogImage(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary via API route
    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'digital assets/avatars');

      const response = await fetch('/api/cloudinary/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setBlogForm({ ...blogForm, authorAvatarURL: data.url });
      toast.success("Author avatar uploaded successfully");
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || "Failed to upload author avatar");
      setAvatarPreview(null);
      setAvatarFile(null);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const removeBlogImage = () => {
    setBlogImagePreview(null);
    setBlogImageFile(null);
    setBlogForm({ ...blogForm, imageURL: '' });
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setBlogForm({ ...blogForm, authorAvatarURL: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!blogForm.title || !blogForm.excerpt || !blogForm.content || !blogForm.authorName) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const slug = blogForm.slug || generateSlug(blogForm.title);
      const now = Timestamp.now();
      
      const blogData = {
        slug,
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        imageURL: blogForm.imageURL || '/blogs/blog1.png',
        tags: blogForm.tags,
        author: {
          name: blogForm.authorName,
          avatarURL: blogForm.authorAvatarURL || '',
        },
        date: editingBlog ? undefined : now, // Only set date on creation
        createdAt: editingBlog ? undefined : now,
        lastUpdated: now,
        isPopular: blogForm.isPopular,
      };

      if (editingBlog) {
        await updateDoc(doc(db, 'blogs', editingBlog.id), blogData);
        toast.success("Blog post updated successfully");
      } else {
        await addDoc(collection(db, 'blogs'), blogData);
        toast.success("Blog post added successfully");
      }
      
      handleCloseDialog();
      loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error("Failed to save blog post");
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingBlogId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingBlogId) return;

    try {
      await deleteDoc(doc(db, 'blogs', deletingBlogId));
      toast.success("Blog post deleted successfully");
      loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error("Failed to delete blog post");
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingBlogId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Blog Post
        </Button>
      </div>

      {loadingBlogs ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : blogs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts found</p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Blog Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <AdminBlogCard
              key={blog.id}
              blog={blog}
              formatDate={formatDate}
              getValidImageUrl={getValidImageUrl}
              onEdit={handleOpenDialog}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
            <DialogDescription>
              {editingBlog ? "Update the blog post details" : "Fill in the details to create a new blog post"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (optional, auto-generated from title)</Label>
                <Input
                  id="slug"
                  value={blogForm.slug}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={blogForm.excerpt}
                onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                placeholder="Short description (shown in blog cards)"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content * (Markdown supported)</Label>
              <Textarea
                id="content"
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                placeholder="Full blog content in Markdown format"
                rows={15}
                required
                className="font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name *</Label>
                <Input
                  id="authorName"
                  value={blogForm.authorName}
                  onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            {/* Blog Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="blogImage">Blog Image</Label>
              <div className="space-y-3">
                {blogImagePreview ? (
                  <div className="relative w-full h-48 rounded-lg border border-border overflow-hidden">
                    <img
                      src={blogImagePreview}
                      alt="Blog preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeBlogImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <label
                      htmlFor="blogImage"
                      className="flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors rounded-lg p-4"
                    >
                      {uploadingBlogImage ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                      )}
                      <span className="text-sm text-muted-foreground mb-1">
                        {uploadingBlogImage ? 'Uploading...' : 'Click to upload blog image'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP up to 10MB
                      </span>
                      <input
                        id="blogImage"
                        type="file"
                        accept="image/*"
                        onChange={handleBlogImageChange}
                        className="hidden"
                        disabled={uploadingBlogImage}
                      />
                    </label>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input
                    value={blogForm.imageURL}
                    onChange={(e) => setBlogForm({ ...blogForm, imageURL: e.target.value })}
                    placeholder="Or enter image URL"
                    className="flex-1"
                  />
                  {blogForm.imageURL && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBlogImagePreview(blogForm.imageURL)}
                    >
                      Preview
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Author Avatar Upload */}
            <div className="space-y-2">
              <Label htmlFor="authorAvatar">Author Avatar</Label>
              <div className="space-y-3">
                {avatarPreview ? (
                  <div className="relative w-32 h-32 rounded-full border border-border overflow-hidden">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-0 right-0 rounded-full h-6 w-6 p-0"
                      onClick={removeAvatar}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-full w-32 h-32 flex items-center justify-center">
                    <label
                      htmlFor="authorAvatar"
                      className="flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors rounded-full w-full h-full"
                    >
                      {uploadingAvatar ? (
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground mt-1">
                        {uploadingAvatar ? 'Uploading...' : 'Upload'}
                      </span>
                      <input
                        id="authorAvatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                        disabled={uploadingAvatar}
                      />
                    </label>
                  </div>
                )}
                <Input
                  value={blogForm.authorAvatarURL}
                  onChange={(e) => setBlogForm({ ...blogForm, authorAvatarURL: e.target.value })}
                  placeholder="Or enter avatar URL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={handleAddTag}>Add Tag</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogForm.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPopular"
                checked={blogForm.isPopular}
                onChange={(e) => setBlogForm({ ...blogForm, isPopular: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="isPopular">Mark as Popular</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingBlog ? "Update" : "Create"} Blog Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

