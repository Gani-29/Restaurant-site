import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; 

const supabaseUrl = 'https://tgvvuzogikivuaomvklb.supabase.co'; 
const supabaseKey = 'sb_publishable_wRBf1fyCMclyh95CUm_dJg__y3ASh6C'; 

export const supabase = createClient(supabaseUrl, supabaseKey);

const LOCAL_USER_ID_KEY = 'restaurant_anon_user_id';

export const getLocalUserId = () => {
    let id = localStorage.getItem(LOCAL_USER_ID_KEY);
    if (!id || id === 'Init-Failed') {
        id = uuidv4();
        localStorage.setItem(LOCAL_USER_ID_KEY, id);
    }
    return id;
};

// 2. Fetch Cart Items
export const fetchCartItems = async (userId, setCartItems) => {
    if (!supabase || !userId || userId === 'Init-Failed') {
        setCartItems([]);
        return;
    }

    try {
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId)
            .order('added_at', { ascending: true });

        if (error) throw error;
        
        const formattedItems = data.map(item => ({
            id: item.id, // Primary key for Supabase operations
            dishId: item.dish_id, // Menu-level ID
            name: item.name,
            price: item.price,
            oldPrice: item.old_price,
            discount: item.discount,
            quantity: item.quantity,
        }));

        setCartItems(formattedItems);
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
        setCartItems([]);
    }
};