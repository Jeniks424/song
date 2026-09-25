import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://oltomfcbxuzscjzccpok.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_OCyVzKx85OYKN9W3J7PzJQ_KgXOb3ZW'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Fetch all songs
export async function fetchSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
  return data;
}

// Add a new song
export async function addSong(songData) {
  const { data, error } = await supabase
    .from('songs')
    .insert([songData])
    .select();
    
  if (error) {
    console.error('Error adding song:', error);
    throw error;
  }
  return data;
}

// Update a song
export async function updateSong(id, songData) {
  const { data, error } = await supabase
    .from('songs')
    .update(songData)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error('Error updating song:', error);
    throw error;
  }
  return data;
}

// Delete a song
export async function deleteSong(id) {
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
}
