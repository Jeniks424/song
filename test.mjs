import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://oltomfcbxuzscjzccpok.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_OCyVzKx85OYKN9W3J7PzJQ_KgXOb3ZW'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function testSupabase() {
  console.log("Fetching songs...");
  const { data: fetch1, error: fetchErr1 } = await supabase
    .from('songs')
    .select('*');
    
  if (fetchErr1) {
    console.error("Error fetching (table might not exist):", fetchErr1.message);
    return;
  }
  console.log("Songs:", fetch1);
  
  if (fetch1.length === 0) {
    console.log("Attempting to insert a song...");
    const { data: insertData, error: insertErr } = await supabase
      .from('songs')
      .insert([{
        title: 'God Mode',
        artist: 'Unknown Artist',
        audio_url: 'https://res.cloudinary.com/iexldfmb/video/upload/v1790311721/God_Mode.mp3'
      }])
      .select();
      
    if (insertErr) {
      console.error("Error inserting:", insertErr.message);
    } else {
      console.log("Inserted song successfully:", insertData);
    }
  }
}

testSupabase();
