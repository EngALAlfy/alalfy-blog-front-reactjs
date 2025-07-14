const API_BASE_URL = 'https://blog-backend.alalfy.com/api';

export interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  banner: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  banner: string;
  author: Author;
  category: Category;
}

export interface ApiResponse<T> {
  data: T[];
}

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

export const apiService = {
  async fetchFeaturedPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/featured`);
      if (!response.ok) throw new Error('Failed to fetch featured posts');
      const result: ApiResponse<Post> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      throw error;
    }
  },

  async fetchLatestPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/latest`);
      if (!response.ok) throw new Error('Failed to fetch latest posts');
      const result: ApiResponse<Post> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      throw error;
    }
  },

  async fetchHeroPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/hero`);
      if (!response.ok) throw new Error('Failed to fetch hero posts');
      const result: ApiResponse<Post> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching hero posts:', error);
      throw error;
    }
  },

  async fetchHeaderCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/header`);
      if (!response.ok) throw new Error('Failed to fetch header categories');
      const result: ApiResponse<Category> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching header categories:', error);
      throw error;
    }
  },

  async fetchFooterCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/footer`);
      if (!response.ok) throw new Error('Failed to fetch footer categories');
      const result: ApiResponse<Category> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching footer categories:', error);
      throw error;
    }
  },

  async fetchAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/all`);
      if (!response.ok) throw new Error('Failed to fetch all categories');
      const result: ApiResponse<Category> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching all categories:', error);
      throw error;
    }
  },

  async fetchPostsByCategories(): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/categories`);
      if (!response.ok) throw new Error('Failed to fetch posts by categories');
      const result: ApiResponse<Post> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching posts by categories:', error);
      throw error;
    }
  },

  async fetchPostsByCategory(categorySlug: string): Promise<Post[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/categories`);
      if (!response.ok) throw new Error('Failed to fetch posts by category');
      const result: ApiResponse<Post> = await response.json();
      return result.data.filter(post => post.category.slug === categorySlug);
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  },

  async fetchMediumPosts(): Promise<MediumPost[]> {
    try {
      // Using rss2json service to convert RSS to JSON
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@alalfy');
      if (!response.ok) throw new Error('Failed to fetch Medium posts');
      const result = await response.json();
      
      return result.items?.slice(0, 6).map((item: any) => {
        // Extract first image from description if thumbnail is empty
        let thumbnail = item.thumbnail;
        if (!thumbnail && item.description) {
          const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
          thumbnail = imgMatch ? imgMatch[1] : '';
        }
        
        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          thumbnail
        };
      }) || [];
    } catch (error) {
      console.error('Error fetching Medium posts:', error);
      return [];
    }
  }
};
