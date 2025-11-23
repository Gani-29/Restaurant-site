import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tgvvuzogikivuaomvklb.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndnZ1em9naWtpdnVhb212a2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjgwNTYsImV4cCI6MjA3OTQwNDA1Nn0.IY89MUzAbriw0s_2fl5-vA4aMnYeVoicQ7pjr6AgneI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getLocalUserId = () => {
    let id = localStorage.getItem('local_user_id');
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('local_user_id', id);
    }
    return id;
};

export const fetchCartItems = async (userId, setCartItems) => {
    if (!supabase || !userId) return;
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .order('added_at', { ascending: true }); 

        if (error) throw error;
        setCartItems(data.map(item => ({
            id: item.id.toString(), 
            dishId: item.dish_id, 
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            oldPrice: item.old_price,
            discount: item.discount,
            addedAt: item.added_at,
        })));
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
};