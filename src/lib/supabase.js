import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://txcgsvdpdanxbrokerve.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_bUUxLLVSdDG4WApRTmHEog_WYthrkHE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const getProductsByCategory = async (categorySlug) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const searchProducts = async (query) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  return { data, error };
};

// Cart operations
export const saveCart = async (userId, cartItems) => {
  const { data, error } = await supabase
    .from('carts')
    .upsert({
      user_id: userId,
      items: cartItems,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });
  return { data, error };
};

export const getCart = async (userId) => {
  const { data, error } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

// Wishlist operations
export const saveWishlist = async (userId, wishlistItems) => {
  const { data, error } = await supabase
    .from('wishlists')
    .upsert({
      user_id: userId,
      items: wishlistItems,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id'
    });
  return { data, error };
};

export const getWishlist = async (userId) => {
  const { data, error } = await supabase
    .from('wishlists')
    .select('items')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

// Orders
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();
  return { data, error };
};

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  return { data, error };
};

// Newsletter
export const subscribeNewsletter = async (email) => {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })
    .select()
    .single();
  return { data, error };
};

export const getNewsletterSubscribers = async () => {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

// Contact messages
export const submitContact = async (contactData) => {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(contactData)
    .select()
    .single();
  return { data, error };
};

export const getContactMessages = async () => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export default supabase;