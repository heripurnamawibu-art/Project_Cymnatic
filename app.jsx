const { useState, useEffect, createContext, useContext, useMemo, useRef } = React;
const { motion, AnimatePresence } = window.Motion;

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
  { id: 'f1', title: "Abyssal Void", author: "VoidMaker", price: "1.2", category: "Abstract", likes: 342, image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?q=80&w=800&auto=format&fit=crop" },
  { id: 'f2', title: "Neon Genesis", author: "CyberPunk", price: "0.8", category: "Sci-Fi", likes: 856, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" },
  { id: 'f3', title: "Dark Matter", author: "Cosmos", price: "3.5", category: "Space", likes: 124, image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop" },
  { id: 'f4', title: "Blood Moon", author: "LunarArt", price: "2.1", category: "Surreal", likes: 643, image: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=800&auto=format&fit=crop" },
  { id: 101, title: "Cyber Samurai", author: "NeoTokyo", price: "0.5", category: "Art", image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop", likes: 120 },
  { id: 102, title: "Virtual Horizon", author: "PixelMage", price: "1.1", category: "Gaming", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop", likes: 89 },
  { id: 103, title: "Synthwave Beats", author: "AudioVisual", price: "0.25", category: "Music", image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop", likes: 230 },
  { id: 104, title: "Urban Decay", author: "StreetLens", price: "0.85", category: "Photography", image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop", likes: 412 },
  { id: 105, title: "Neon City", author: "CyberPunk", price: "1.5", category: "Art", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop", likes: 541 },
  { id: 106, title: "Astro Explorer", author: "Cosmos", price: "2.0", category: "Gaming", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop", likes: 322 },
  { id: 107, title: "LoFi Study", author: "ChillVibes", price: "0.1", category: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop", likes: 890 },
  { id: 108, title: "Midnight Alley", author: "DarkRoom", price: "0.6", category: "Photography", image: "https://images.unsplash.com/photo-1493606371202-6275828f90f3?q=80&w=800&auto=format&fit=crop", likes: 115 },
  { id: 109, title: "Quantum Reactor", author: "TechCore", price: "4.2", category: "Sci-Fi", likes: 1250, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
  { id: 110, title: "Emerald Citadel", author: "Archivist", price: "12.5", category: "Cyber Architecture", likes: 89, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
  { id: 111, title: "Glitch Girl v2", author: "DigitalGhost", price: "0.95", category: "Digital Avatar", likes: 2104, image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=800&auto=format&fit=crop" },
  { id: 112, title: "Neon District Plot", author: "LandLord", price: "25.0", category: "Virtual Land", likes: 45, image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop" },
  { id: 113, title: "Neural Link v1.0", author: "BioHack", price: "0.4", category: "Utility", likes: 567, image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop" },
  { id: 114, title: "Crystal Memory", author: "DataMiner", price: "1.8", category: "Abstract", likes: 882, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop" },
  { id: 115, title: "Cyberpunk Drifter", author: "StreetLens", price: "0.75", category: "Photography", likes: 334, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop" },
  { id: 116, title: "Obsidian Blade", author: "IronSmith", price: "3.2", category: "Gaming", likes: 112, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop" },
  { id: 117, title: "Vaporwave Sunset", author: "Retrowave", price: "0.55", category: "Art", likes: 954, image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop" },
  { id: 118, title: "Ether Dragon", author: "Mythos", price: "8.8", category: "Rare Collectible", likes: 772, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop" },
  { id: 119, title: "Void Runner X1", author: "AeroDynamics", price: "15.4", category: "Cyber Vehicle", likes: 88, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop" },
  { id: 120, title: "Singularity Core", author: "BlackHole", price: "50.0", category: "Utility", likes: 34, image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop" },
  { id: 121, title: "Neon Katana", author: "BladeMaster", price: "2.5", category: "Gaming", likes: 642, image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=800&auto=format&fit=crop" },
  { id: 122, title: "Plasma Grenade", author: "Munitions", price: "0.3", category: "Utility", likes: 123, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop" },
  { id: 123, title: "Cyber City VR", author: "Matrix", price: "100.0", category: "Virtual Land", likes: 12, image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop" },
  { id: 124, title: "Neural Link v2", author: "BioHack", price: "1.2", category: "Utility", likes: 442, image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop" },
  { id: 125, title: "Binary Sunset", author: "PixelArt", price: "0.15", category: "Art", likes: 890, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
  { id: 126, title: "Cyber Owl", author: "NatureAI", price: "3.8", category: "Digital Avatar", likes: 556, image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=800&auto=format&fit=crop" },
  { id: 127, title: "Circuit Board", author: "Hardware", price: "0.8", category: "Photography", likes: 231, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
  { id: 128, title: "Gravity Boots", author: "AeroDynamics", price: "2.2", category: "Gaming", likes: 118, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
  { id: 129, title: "Deep Sea Cyber", author: "Abyssal", price: "4.5", category: "Photography", likes: 98, image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800&auto=format&fit=crop" },
  { id: 130, title: "Data Stream", author: "Hackers", price: "0.65", category: "Abstract", likes: 672, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
];

// --- CONTEXT API ---
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const getSaved = (key, initial) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      return initial;
    }
  };

  // Core State
  const [theme, setTheme] = useState(() => {
    const saved = getSaved('crimsontavern_theme', 'crimson');
    return typeof saved === 'string' ? saved : 'crimson';
  });
  const [cart, setCart] = useState(() => getSaved('crimsontavern_cart', []));
  const [wishlist, setWishlist] = useState(() => getSaved('crimsontavern_wishlist', []));
  
  // Logic State
  const [user, setUser] = useState(() => getSaved('crimsontavern_user', null));
  const [orders, setOrders] = useState(() => getSaved('crimsontavern_orders', []));
  const [recentlyViewed, setRecentlyViewed] = useState(() => getSaved('crimsontavern_recent', []));
  const [balance, setBalance] = useState(() => getSaved('crimsontavern_balance', 10.00));
  const [ownedItems, setOwnedItems] = useState(() => getSaved('crimsontavern_owned', []));
  const [userProducts, setUserProducts] = useState(() => getSaved('crimsontavern_user_products', []));
  
  // Auction State
  const [auctionItem, setAuctionItem] = useState(MOCK_PRODUCTS[0]);
  const [auctionTime, setAuctionTime] = useState(3600); // 1 hour in seconds
  const [highestBidder, setHighestBidder] = useState(null); // 'user' or null
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isGachaOpen, setIsGachaOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Sync to LocalStorage
  useEffect(() => { window.localStorage.setItem('crimsontavern_theme', JSON.stringify(theme)); }, [theme]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_recent', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_balance', JSON.stringify(balance)); }, [balance]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_owned', JSON.stringify(ownedItems)); }, [ownedItems]);
  useEffect(() => { window.localStorage.setItem('crimsontavern_user_products', JSON.stringify(userProducts)); }, [userProducts]);

  // Auction Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionTime(prev => {
        if (prev <= 1) {
          // Time's up! 
          if (highestBidder === 'user') {
            const finalPrice = parseFloat(auctionItem.price);
            if (balance >= finalPrice) {
              setBalance(b => b - finalPrice);
              setOwnedItems(o => [...o, { ...auctionItem, wonAt: new Date().toLocaleString() }]);
              addNotification(`AUCTION WON! "${auctionItem.title}" is now yours.`, 'success');
            } else {
              addNotification(`AUCTION LOST: Insufficient funds to cover final bid!`, 'error');
            }
          }

          // Pick a new random product
          const pool = [...userProducts, ...MOCK_PRODUCTS];
          const otherProducts = pool.filter(p => p.id !== auctionItem.id);
          const next = otherProducts[Math.floor(Math.random() * otherProducts.length)] || pool[0];
          setAuctionItem(next);
          setHighestBidder(null);
          return 3600; // Reset to 1 hour
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionItem, highestBidder, balance, userProducts]);

  useEffect(() => {
    const root = document.documentElement;
    root.className = root.className.replace(/\btheme-[a-z]+\b/g, ''); 
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  // Auth Logic
  const login = (email, password, isRegister = false) => {
    if (!email || !password) {
      addNotification('Email and password required', 'error');
      return false;
    }
    const userData = {
      name: email.split('@')[0],
      email,
      bio: "Digital artist specializing in cyber aesthetics.",
      profileViews: Math.floor(Math.random() * 5000),
      itemsSold: Math.floor(Math.random() * 50)
    };
    setUser(userData);
    setIsAuthOpen(false);
    addNotification(isRegister ? 'Account created successfully!' : 'Login successful!', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    if(currentPage === 'dashboard') setCurrentPage('home');
    addNotification('Logged out successfully', 'info');
  };

  const updateProfile = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
    addNotification('Profile updated successfully!', 'success');
  };

  // Cart Logic
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addNotification(`Added ${product.title} to cart!`, 'success');
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(1, p.qty + delta);
        return { ...p, qty: newQty };
      }
      return p;
    }));
  };

  const checkout = () => {
    if (cart.length === 0) return;
    if (!user) {
      setIsCartOpen(false);
      setIsAuthOpen(true);
      addNotification("Please connect your account to checkout", "info");
      return;
    }
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);
    const newOrder = {
      id: `#ORD-${Math.floor(Math.random() * 10000)}`,
      items: cart,
      date: new Date().toLocaleDateString(),
      total: total.toFixed(2),
      status: 'Completed'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setBalance(prev => prev - total);
    setIsCartOpen(false);
    addNotification(`Order ${newOrder.id} confirmed! Thank you for your purchase.`, 'success');
  };

  const rollGacha = () => {
    const COST = 0.5;
    if (balance < COST) {
      addNotification("Insufficient balance for Gacha!", "error");
      return;
    }
    setBalance(prev => prev - COST);
    const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    setOwnedItems(prev => [...prev, { ...randomProduct, wonAt: new Date().toLocaleString() }]);
    addNotification(`CONGRATULATIONS! You won: ${randomProduct.title}`, 'success');
    return randomProduct;
  };

  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: `u-${Date.now()}`,
      author: user?.name || 'Anonymous',
      likes: 0
    };
    setUserProducts(prev => [product, ...prev]);
    addNotification(`Asset "${product.title}" listed for sale!`, 'success');
  };

  const placeBid = () => {
    const increment = 0.5;
    const newPrice = (parseFloat(auctionItem.price) + increment).toFixed(2);
    if (balance < parseFloat(newPrice)) {
      addNotification("Insufficient balance to place this bid!", "error");
      return;
    }
    setAuctionItem(prev => ({ ...prev, price: newPrice }));
    setHighestBidder('user');
    addNotification(`Bid placed: ${newPrice} ETH. You are currently leading!`, 'success');
  };

  const removeProduct = (productId) => {
    setUserProducts(prev => prev.filter(p => p.id !== productId));
    addNotification("Asset removed from marketplace.", "info");
  };

  const allProducts = useMemo(() => [...userProducts, ...MOCK_PRODUCTS], [userProducts]);

  // Wishlist Logic
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        addNotification(`Removed ${product.title} from wishlist.`, 'info');
        return prev.filter(p => p.id !== product.id);
      }
      addNotification(`Added ${product.title} to wishlist!`, 'success');
      return [...prev, product];
    });
  };

  // Tracking Logic
  const trackView = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 4); // Keep last 4
    });
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const value = {
    theme, setTheme,
    cart, addToCart, removeFromCart, updateQuantity, checkout, isCartOpen, setIsCartOpen,
    wishlist, toggleWishlist,
    user, login, logout, updateProfile, isAuthOpen, setIsAuthOpen,
    balance, setBalance, rollGacha, ownedItems,
    userProducts, addProduct, removeProduct,
    auctionItem, auctionTime, highestBidder, placeBid,
    isThemeOpen, setIsThemeOpen,
    isGachaOpen, setIsGachaOpen,
    orders,
    recentlyViewed, trackView,
    searchQuery, setSearchQuery,
    currentPage, setCurrentPage,
    notifications, addNotification,
    products: allProducts
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

// --- COMPONENTS ---

const NotificationSystem = () => {
  const { notifications } = useContext(GlobalContext);
  useEffect(() => { lucide.createIcons(); });

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {notifications.map(note => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`glass px-4 py-3 rounded-xl border-l-4 shadow-lg flex items-center gap-3 w-72 ${
              note.type === 'success' ? 'border-emerald-500' :
              note.type === 'error' ? 'border-red-500' :
              note.type === 'warning' ? 'border-yellow-500' :
              'border-blue-500'
            }`}
          >
            {note.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <i data-lucide="check" className="w-4 h-4 text-emerald-400"></i>
              </div>
            ) : note.type === 'error' ? (
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <i data-lucide="x-circle" className="w-4 h-4 text-red-400"></i>
              </div>
            ) : note.type === 'warning' ? (
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <i data-lucide="alert-triangle" className="w-4 h-4 text-yellow-400"></i>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <i data-lucide="info" className="w-4 h-4 text-blue-400"></i>
              </div>
            )}
            <p className="text-sm font-ui text-gray-200">{note.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const RealtimeActivityFeed = () => {
  const [feed, setFeed] = useState(null);
  
  useEffect(() => {
    const activities = [
      "Someone just bought 'Cyber Samurai'",
      "@AlexArt placed a bid on 'Neon City'",
      "'Urban Decay' is trending right now!",
      "New collection dropped: 'Void Explorer'"
    ];
    
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setFeed(activities[Math.floor(Math.random() * activities.length)]);
        setTimeout(() => setFeed(null), 5000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {feed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-dark-900/80 backdrop-blur-md border border-primary-500/30 px-4 py-2 rounded-full shadow-[0_0_15px_var(--glow-color)] flex items-center gap-2 pointer-events-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <p className="text-xs font-ui text-gray-300">{feed}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, checkout, isCartOpen, setIsCartOpen } = useContext(GlobalContext);
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);

  useEffect(() => { lucide.createIcons(); });

  const handleCheckout = () => {
    checkout();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-dark-950 border-l border-white/5 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark-900/50">
              <h2 className="text-xl font-display font-bold flex items-center gap-2">
                <i data-lucide="shopping-cart" className="w-5 h-5 text-primary-500"></i>
                Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <i data-lucide="shopping-bag" className="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                  <p className="font-ui">Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div layout key={item.id} className="flex gap-3 p-3 rounded-xl bg-dark-800/50 border border-white/5 relative group">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm font-display truncate">{item.title}</h4>
                      <p className="text-xs text-gray-400 font-ui mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-400 font-bold text-sm flex items-center gap-1">
                          <i data-lucide="gem" className="w-3 h-3"></i> {item.price}
                        </span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full bg-white/10 hover:bg-primary-500/30 flex items-center justify-center transition-colors">
                            <i data-lucide="minus" className="w-3 h-3"></i>
                          </button>
                          <span className="text-xs font-bold w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full bg-white/10 hover:bg-primary-500/30 flex items-center justify-center transition-colors">
                            <i data-lucide="plus" className="w-3 h-3"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <i data-lucide="x" className="w-3 h-3"></i>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-dark-900/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-ui">Total:</span>
                  <span className="text-2xl font-bold font-display text-white flex items-center gap-2">
                    <i data-lucide="gem" className="w-5 h-5 text-primary-500"></i>
                    {total.toFixed(2)} ETH
                  </span>
                </div>
                <button onClick={handleCheckout} className="w-full py-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold font-ui transition-all duration-300 shadow-[0_0_20px_var(--glow-color)] flex items-center justify-center gap-2">
                  <i data-lucide="zap" className="w-4 h-4"></i>
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ThemeCustomizer = () => {
  const { theme, setTheme } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const themes = [
    { id: 'crimson', color: 'bg-red-500' },
    { id: 'purple', color: 'bg-purple-500' },
    { id: 'emerald', color: 'bg-emerald-500' },
    { id: 'blue', color: 'bg-blue-500' },
    { id: 'gold', color: 'bg-yellow-500' }
  ];

  useEffect(() => { lucide.createIcons(); });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 glass p-4 rounded-2xl shadow-2xl w-48 border border-primary-500/20"
          >
            <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider font-display">Theme Color</h4>
            <div className="flex flex-wrap gap-2">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center transition-transform hover:scale-110 ${theme === t.id ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-900 shadow-[0_0_15px_var(--glow-color)]' : ''}`}
                >
                  {theme === t.id && <i data-lucide="check" className="w-4 h-4 text-white"></i>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-dark-800 border border-white/10 hover:border-primary-500/50 rounded-full flex items-center justify-center shadow-xl transition-all hover:shadow-[0_0_20px_var(--glow-color)]"
      >
        <i data-lucide="palette" className="w-5 h-5 text-primary-400"></i>
      </button>
    </div>
  );
};

const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, login } = useContext(GlobalContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => { lucide.createIcons(); });

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, isRegister);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        onClick={() => setIsAuthOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="glass-card w-full max-w-md p-8 rounded-3xl relative border border-primary-500/20 shadow-[0_0_40px_var(--glow-color)]"
        >
          <button onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto bg-primary-500/20 rounded-xl flex items-center justify-center mb-4">
              <i data-lucide={isRegister ? "user-plus" : "log-in"} className="text-primary-500 w-6 h-6"></i>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-gray-400 font-ui text-sm mt-1">{isRegister ? 'Join the cyber marketplace.' : 'Enter your credentials to continue.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-ui text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:outline-none focus:border-primary-500 transition-colors" 
                placeholder="pilot@cyber.net"
              />
            </div>
            <div>
              <label className="block text-sm font-ui text-gray-400 mb-1">Password</label>
              <input 
                type="password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:outline-none focus:border-primary-500 transition-colors" 
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold font-ui transition-all shadow-[0_0_15px_var(--glow-color)] mt-4">
              {isRegister ? 'Initialize Account' : 'Establish Connection'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm font-ui text-gray-400 hover:text-white transition-colors">
              {isRegister ? 'Already have an account? Sign In' : 'Need access? Request an invite'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const MOTIVATIONAL_QUOTES = [
  { quote: "The digital frontier belongs to those who dare to build it.", author: "Crimson Tavern" },
  { quote: "Every great collection starts with a single bold purchase.", author: "Unknown Collector" },
  { quote: "In the metaverse, creativity is the only currency that never devalues.", author: "CyberPunk 2077" },
  { quote: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
  { quote: "The best investment is in the tools of one's own trade.", author: "Benjamin Franklin" },
  { quote: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { quote: "Do not wait to strike till the iron is hot; make it hot by striking.", author: "W.B. Yeats" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "In a world of copies, be an original.", author: "Crimson Tavern" },
  { quote: "Your vibe attracts your tribe — make yours unforgettable.", author: "The Tavern" },
  { quote: "Code is poetry, art is code. Both live forever on the blockchain.", author: "VoidMaker" },
  { quote: "The only limit to your impact is your imagination and commitment.", author: "Tony Robbins" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [logoGlow, setLogoGlow] = useState(false);
  const clickTimerRef = useRef(null);

  const { cart, wishlist, setIsCartOpen, setCurrentPage, currentPage, user, setIsAuthOpen, setSearchQuery, balance, rollGacha, isGachaOpen, setIsGachaOpen } = useContext(GlobalContext);
  const [gachaResult, setGachaResult] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { lucide.createIcons(); });

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value);
      setCurrentPage('discover');
    }
  };

  const handleLogoClick = () => {
    // Trigger glow flash
    setLogoGlow(true);
    setTimeout(() => setLogoGlow(false), 400);

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Reset timer on each click
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (newCount >= 3) {
      // Easter egg triggered!
      const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      setCurrentQuote(randomQuote);
      setShowMotivation(true);
      setClickCount(0);
    } else {
      // Auto-reset after 2s of inactivity
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
        setCurrentPage('home');
      }, 2000);
    }
  };

  const handleGacha = () => {
    const result = rollGacha();
    if (result) {
      setGachaResult(result);
      setIsGachaOpen(true);
    }
  };

  return (
    <>
      {/* Motivational Easter Egg Modal */}
      <AnimatePresence>
        {showMotivation && currentQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={() => setShowMotivation(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-lg w-full"
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-primary-600/20 rounded-3xl blur-[60px] scale-150"></div>

              <div className="glass-card relative rounded-3xl p-10 border border-primary-500/30 shadow-[0_0_60px_var(--glow-color)] text-center overflow-hidden">
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 mx-auto mb-6 bg-primary-500/20 rounded-2xl flex items-center justify-center border border-primary-500/30"
                >
                  <i data-lucide="zap" className="w-8 h-8 text-primary-400"></i>
                </motion.div>

                {/* Secret badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-xs font-cyber tracking-widest mb-6">
                  <i data-lucide="star" className="w-3 h-3"></i>
                  SECRET UNLOCKED
                </div>

                {/* Quote */}
                <motion.blockquote
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-6"
                >
                  "{currentQuote.quote}"
                </motion.blockquote>

                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-primary-400 font-ui font-medium"
                >
                  — {currentQuote.author}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3 justify-center mt-8"
                >
                  <button
                    onClick={() => {
                      const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
                      setCurrentQuote(randomQuote);
                    }}
                    className="px-5 py-2 rounded-xl bg-primary-600/20 hover:bg-primary-600/40 text-primary-400 text-sm font-ui font-bold border border-primary-500/30 transition-all flex items-center gap-2"
                  >
                    <i data-lucide="shuffle" className="w-4 h-4"></i> New Quote
                  </button>
                  <button
                    onClick={() => setShowMotivation(false)}
                    className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-ui font-bold transition-all"
                  >
                    Close
                  </button>
                </motion.div>

                {/* Click hint */}
                <p className="text-gray-600 text-xs font-ui mt-4">Click outside or press Close to dismiss</p>

                {/* Bottom decorative bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gacha Result Modal */}
      <AnimatePresence>
        {isGachaOpen && gachaResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[250] flex items-center justify-center p-6"
            onClick={() => setIsGachaOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              className="glass-card max-w-md w-full rounded-[40px] p-8 border-2 border-primary-500 shadow-[0_0_100px_var(--glow-color)] text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-white to-primary-500 animate-pulse"></div>
              
              <div className="mb-6">
                <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-500/30">
                  <i data-lucide="sparkles" className="w-12 h-12 text-primary-400 animate-spin-slow"></i>
                </div>
                <h2 className="text-3xl font-cyber font-bold text-white tracking-widest mb-2">SYSTEM UNLOCKED</h2>
                <p className="text-primary-400 font-ui font-bold">GACHA REWARD ACQUIRED</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-square mb-8 border border-white/10">
                <img src={gachaResult.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <p className="text-xs text-primary-400 font-cyber mb-1">{gachaResult.category}</p>
                  <h3 className="text-xl font-bold font-display text-white">{gachaResult.title}</h3>
                </div>
              </div>

              <button 
                onClick={() => setIsGachaOpen(false)}
                className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold font-cyber tracking-widest rounded-2xl transition-all shadow-[0_0_30px_var(--glow-color)]"
              >
                CLAIM ASSET
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 border-b border-white/5' : 'py-5 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo with triple-click Easter egg */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group select-none"
            title="Crimson Tavern"
          >
            <motion.div
              animate={logoGlow ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-lg transition-all ${logoGlow ? 'shadow-[0_0_25px_var(--glow-color)]' : 'group-hover:shadow-[0_0_15px_var(--glow-color)]'}`}
            >
              <i data-lucide="hexagon" className="text-white w-5 h-5"></i>
            </motion.div>
            <span className={`font-cyber font-bold text-xl tracking-wider transition-colors ${logoGlow ? 'text-primary-400' : ''}`}>
              CRIMSON TAVERN
            </span>
            {/* Click counter hint dots */}
            {clickCount > 0 && (
              <div className="flex gap-1 ml-1">
                {[1,2,3].map(i => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: i <= clickCount ? 1 : 0.3 }}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i <= clickCount ? 'bg-primary-400' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-ui font-medium text-gray-300 bg-dark-900/50 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-primary-400' : 'hover:text-white'} transition-colors`}>Home</button>
            <button onClick={() => setCurrentPage('discover')} className={`${currentPage === 'discover' ? 'text-primary-400' : 'hover:text-white'} transition-colors`}>Discover</button>
            <button onClick={() => {
              if(!user) { setIsAuthOpen(true); return; }
              setCurrentPage('dashboard');
            }} className={`${currentPage === 'dashboard' ? 'text-primary-400' : 'hover:text-white'} transition-colors`}>Dashboard</button>
            <button onClick={() => setCurrentPage('community')} className={`${currentPage === 'community' ? 'text-primary-400' : 'hover:text-white'} transition-colors`}>Community</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-3 bg-dark-900/80 px-4 py-1.5 rounded-full border border-primary-500/30">
              <i data-lucide="wallet" className="w-4 h-4 text-primary-400"></i>
              <span className="text-sm font-bold font-display text-white">{balance.toFixed(2)} ETH</span>
              <button 
                onClick={handleGacha}
                className="ml-2 px-3 py-1 bg-primary-600 hover:bg-primary-500 text-white text-[10px] font-cyber font-extrabold rounded-md transition-all animate-pulse-glow"
              >
                GACHA
              </button>
            </div>
            <div className="hidden lg:flex relative">
              <i data-lucide="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"></i>
              <input 
                type="text" 
                placeholder="Search assets..." 
                onKeyDown={handleSearch}
                className="bg-dark-800/50 border border-white/10 focus:border-primary-500 rounded-full py-1.5 pl-9 pr-4 text-sm font-ui text-white outline-none w-48 focus:w-64 transition-all duration-300" 
              />
            </div>
            <button onClick={() => setCurrentPage('dashboard')} className="text-gray-300 hover:text-primary-400 transition-colors relative">
              <i data-lucide="heart" className="w-5 h-5"></i>
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full text-[10px] flex items-center justify-center font-bold">{wishlist.length}</span>}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="text-gray-300 hover:text-primary-400 transition-colors relative">
              <i data-lucide="shopping-cart" className="w-5 h-5"></i>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full text-[10px] flex items-center justify-center font-bold animate-pulse-glow">{cart.length}</span>}
            </button>
            
            {user ? (
              <div onClick={() => setCurrentPage('dashboard')} className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1.5 rounded-full transition-colors">
                <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full border border-primary-500" />
                <span className="text-sm font-ui text-white hidden xl:block">{user.name}</span>
              </div>
            ) : (
              <button onClick={() => setIsAuthOpen(true)} className="hidden md:block px-5 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-ui font-bold transition-all duration-300 shadow-[0_0_20px_var(--glow-color)] hover:shadow-[0_0_30px_var(--glow-color)]">
                Connect
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

// --- PAGES ---

const HomePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow z-10 relative">
      <HeroSection />
      <FeaturedProducts />
      <ExploreProducts />
      <FeaturesSection />
    </motion.div>
  );
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = window.sessionStorage.getItem('dashboardTab');
    if (saved) { window.sessionStorage.removeItem('dashboardTab'); return saved; }
    return 'overview';
  });
  const { user, logout, updateProfile, orders, wishlist, setCurrentPage, userProducts, addProduct, removeProduct } = useContext(GlobalContext);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileBio, setProfileBio] = useState(user?.bio || '');

  const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
  const itemsSold = orders.reduce((sum, o) => sum + (o.items?.length || 0), 0);

  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', category: 'Art', image: '' });

  useEffect(() => { lucide.createIcons(); });

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) return;
    addProduct(newProduct);
    setNewProduct({ title: '', price: '', category: 'Art', image: '' });
    setIsAdding(false);
  };

  const handleSaveProfile = () => {
    updateProfile({ name: profileName, email: profileEmail, bio: profileBio });
  };
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="pt-32 pb-20 px-6 md:px-12 container mx-auto flex-grow z-10 relative min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="glass-card p-6 rounded-2xl sticky top-32">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <img src="https://i.pravatar.cc/150?img=11" className="w-12 h-12 rounded-full border-2 border-primary-500" />
              <div>
                <h3 className="font-bold font-display text-white">{user?.name || 'User'}</h3>
                <p className="text-xs text-primary-400 font-ui">Pro Seller</p>
              </div>
            </div>
            <ul className="space-y-2 font-ui">
              <li><button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}><i data-lucide="bar-chart-2" className="w-4 h-4"></i> Overview</button></li>
              <li><button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}><i data-lucide="package" className="w-4 h-4"></i> My Products</button></li>
              <li><button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}><i data-lucide="shopping-bag" className="w-4 h-4"></i> Orders <span className="ml-auto bg-primary-500/20 text-primary-400 text-xs font-bold px-1.5 py-0.5 rounded">{orders.length}</span></button></li>
              <li><button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'wishlist' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}><i data-lucide="heart" className="w-4 h-4"></i> Wishlist <span className="ml-auto bg-primary-500/20 text-primary-400 text-xs font-bold px-1.5 py-0.5 rounded">{wishlist.length}</span></button></li>
              <li><button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}><i data-lucide="settings" className="w-4 h-4"></i> Settings</button></li>
              <li><button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-red-500/10 text-gray-400 hover:text-red-400"><i data-lucide="log-out" className="w-4 h-4"></i> Logout</button></li>
            </ul>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard Analytics</h1>
                <p className="text-gray-400 font-ui">Welcome back, here's your store performance today.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-4"><i data-lucide="gem" className="text-primary-500 w-5 h-5"></i></div>
                  <p className="text-sm text-gray-400 font-ui mb-1">Total Spent</p>
                  <h3 className="text-2xl font-bold font-display text-white">{totalRevenue.toFixed(2)} ETH</h3>
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><i data-lucide="trending-up" className="w-3 h-3"></i> {orders.length} orders total</p>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4"><i data-lucide="users" className="text-blue-500 w-5 h-5"></i></div>
                  <p className="text-sm text-gray-400 font-ui mb-1">Profile Views</p>
                  <h3 className="text-2xl font-bold font-display text-white">{(user?.profileViews || 0).toLocaleString()}</h3>
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><i data-lucide="trending-up" className="w-3 h-3"></i> Growing</p>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4"><i data-lucide="shopping-bag" className="text-purple-500 w-5 h-5"></i></div>
                  <p className="text-sm text-gray-400 font-ui mb-1">Items Purchased</p>
                  <h3 className="text-2xl font-bold font-display text-white">{itemsSold}</h3>
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><i data-lucide="trending-up" className="w-3 h-3"></i> All time</p>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-2xl h-80 flex flex-col justify-center items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
                <i data-lucide="line-chart" className="w-16 h-16 text-primary-500/50 mb-4 group-hover:scale-110 transition-transform duration-500"></i>
                <p className="font-ui text-gray-400">Interactive Chart Visualization Here</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-display font-bold text-white mb-2">My Products</h1>
                  <p className="text-gray-400 font-ui">Manage your listed digital assets.</p>
                </div>
                <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold font-ui text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_var(--glow-color)]"
                >
                  <i data-lucide={isAdding ? "x" : "plus"} className="w-4 h-4"></i> {isAdding ? "Cancel" : "Add New"}
                </button>
              </div>

              <AnimatePresence>
                {isAdding && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-8"
                  >
                    <div className="glass-card p-6 rounded-2xl border border-primary-500/30">
                      <h3 className="text-xl font-bold text-white mb-4 font-display">List a New Asset</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                          type="text" placeholder="Asset Title" 
                          value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                          className="bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:border-primary-500 outline-none" 
                        />
                        <input 
                          type="text" placeholder="Price (ETH)" 
                          value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                          className="bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:border-primary-500 outline-none" 
                        />
                        <select 
                          value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                          className="bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:border-primary-500 outline-none"
                        >
                          <option>Art</option>
                          <option>Gaming</option>
                          <option>Music</option>
                          <option>Photography</option>
                          <option>Sci-Fi</option>
                        </select>
                        <input 
                          type="text" placeholder="Image URL (Unsplash/Direct)" 
                          value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                          className="bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:border-primary-500 outline-none" 
                        />
                      </div>
                      <button 
                        onClick={handleAddProduct}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_var(--glow-color)]"
                      >
                        List Asset Now
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {userProducts.length === 0 ? (
                <div className="glass-card rounded-2xl p-8 text-center border-dashed border-2 border-white/10 hover:border-primary-500/50 transition-colors">
                  <i data-lucide="package" className="w-12 h-12 text-gray-600 mx-auto mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-300 mb-2 font-display">No products yet</h3>
                  <p className="text-gray-500 text-sm font-ui mb-6">You haven't listed any digital assets for sale.</p>
                  <button onClick={() => setIsAdding(true)} className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold font-ui text-sm transition-all border border-white/10">
                    Create First Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProducts.map(product => (
                    <div key={product.id} className="glass-card rounded-2xl overflow-hidden group">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Active</div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-white font-display mb-1">{product.title}</h4>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-ui uppercase">{product.category}</span>
                            <span className="text-primary-400 font-bold font-display">{product.price} ETH</span>
                          </div>
                          <button 
                            onClick={() => removeProduct(product.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all border border-red-500/20"
                            title="Delete Listing"
                          >
                            <i data-lucide="trash-2" className="w-4 h-4"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Order History</h1>
              <p className="text-gray-400 font-ui mb-6">Track your recent purchases.</p>
              {orders.length === 0 ? (
                <div className="glass-card rounded-2xl p-16 text-center">
                  <i data-lucide="package" className="w-12 h-12 text-gray-600 mx-auto mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-300 mb-2 font-display">No orders yet</h3>
                  <p className="text-gray-500 text-sm font-ui mb-6">Your purchase history will appear here.</p>
                  <button onClick={() => setCurrentPage('discover')} className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold font-ui text-sm transition-all">Browse Marketplace</button>
                </div>
              ) : (
                <div className="glass-card rounded-2xl overflow-x-auto">
                  <table className="w-full text-left font-ui min-w-[500px]">
                    <thead className="bg-dark-900/50 border-b border-white/5">
                      <tr>
                        <th className="p-4 text-gray-400 font-medium text-sm">Order ID</th>
                        <th className="p-4 text-gray-400 font-medium text-sm">Items</th>
                        <th className="p-4 text-gray-400 font-medium text-sm">Date</th>
                        <th className="p-4 text-gray-400 font-medium text-sm">Total</th>
                        <th className="p-4 text-gray-400 font-medium text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-gray-300 font-mono text-sm">{order.id}</td>
                          <td className="p-4 text-white font-medium">{order.items?.map(i => i.title).join(', ')}</td>
                          <td className="p-4 text-gray-500 text-sm">{order.date}</td>
                          <td className="p-4 text-primary-400 font-bold">{order.total} ETH</td>
                          <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-md font-bold">{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl font-display font-bold text-white mb-2">My Wishlist</h1>
              <p className="text-gray-400 font-ui mb-6">Items you've saved for later.</p>
              {wishlist.length === 0 ? (
                <div className="glass-card rounded-2xl p-16 text-center">
                  <i data-lucide="heart" className="w-12 h-12 text-gray-600 mx-auto mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-300 mb-2 font-display">Wishlist is empty</h3>
                  <p className="text-gray-500 text-sm font-ui mb-6">Heart items in the marketplace to save them here.</p>
                  <button onClick={() => setCurrentPage('discover')} className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold font-ui text-sm transition-all">Explore Now</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map(item => (
                    <div key={item.id} className="glass-card rounded-2xl overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold font-display text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400 font-ui">@{item.author}</p>
                        <p className="text-primary-400 font-bold mt-2">{item.price} ETH</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Account Settings</h1>
              <p className="text-gray-400 font-ui">Update your profile and preferences.</p>
              <div className="glass-card rounded-2xl mt-6 p-8 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=11" className="w-20 h-20 rounded-full border-2 border-primary-500" />
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                      <i data-lucide="camera" className="w-3 h-3"></i>
                    </button>
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-display text-lg">Profile Picture</h4>
                    <p className="text-gray-500 text-sm font-ui">JPG, GIF or PNG. Max size 800K</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-ui text-gray-400 mb-2">Display Name</label>
                    <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:outline-none focus:border-primary-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-ui text-gray-400 mb-2">Email Address</label>
                    <input type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:outline-none focus:border-primary-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-ui text-gray-400 mb-2">Bio</label>
                  <textarea rows="4" value={profileBio} onChange={e => setProfileBio(e.target.value)} className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white font-ui focus:outline-none focus:border-primary-500 transition-colors"></textarea>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button onClick={handleSaveProfile} className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold font-ui transition-all shadow-[0_0_15px_var(--glow-color)] flex items-center gap-2">
                    <i data-lucide="save" className="w-4 h-4"></i> Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
};

// --- SECTION COMPONENTS ---

const HeroSection = () => {
  const { setCurrentPage, auctionItem, auctionTime, highestBidder, placeBid } = useContext(GlobalContext);
  useEffect(() => { lucide.createIcons(); });

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 container mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 relative">
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6 font-cyber">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            System Online 2026
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 text-white tracking-tight">
            Elevate Your <br />
            <span className="text-gradient">Digital Reality</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-ui">
            The nexus for premium digital assets, exclusive NFTs, and cutting-edge aesthetics. Curated for the modern cyber era.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={placeBid}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all duration-300 shadow-[0_0_20px_var(--glow-color)] hover:shadow-[0_0_30px_var(--glow-color)] flex items-center justify-center gap-3 group font-ui"
            >
              <i data-lucide="gavel" className="w-5 h-5 group-hover:rotate-[-20deg] transition-transform"></i>
              Place Bid (+0.5 ETH)
            </button>
            <button 
              onClick={() => setCurrentPage('discover')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 font-ui"
            >
              Explore Marketplace
            </button>
            <button 
              onClick={() => window.open('https://antigravity.google', '_blank')} 
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 font-ui"
            >
              <i data-lucide="play" className="w-4 h-4 text-primary-400"></i>
              Watch Demo
            </button>
          </motion.div>
          
          {highestBidder === 'user' && (
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-400 text-sm font-bold font-ui mt-4 flex items-center gap-2 justify-center lg:justify-start">
              <i data-lucide="check-circle" className="w-4 h-4"></i> You are currently the highest bidder!
            </motion.p>
          )}
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex-1 relative w-full max-w-lg lg:max-w-none perspective-1000">
          <div className="relative z-10 rounded-3xl overflow-hidden glass-card p-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <img src={auctionItem.image} alt={auctionItem.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/40 to-transparent opacity-90"></div>
              
              <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full backdrop-blur-md border-primary-500/30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold font-ui text-white">Live Auction</span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold font-display mb-2 text-white">{auctionItem.title}</h3>
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/100?img=${(parseInt(auctionItem.id) || 1) % 70 || 1}`} className="w-8 h-8 rounded-full border-2 border-primary-500" />
                    <p className="text-gray-300 text-sm font-ui font-medium">@{auctionItem.author}</p>
                  </div>
                </div>
                <div className="glass px-5 py-3 rounded-2xl text-right border-primary-500/20 shadow-[0_0_15px_var(--glow-color)]">
                  <p className="text-xs text-gray-400 mb-1 font-ui">Current Bid</p>
                  <p className="text-xl font-bold text-primary-400 flex items-center gap-1 font-display">
                    <i data-lucide="gem" className="w-4 h-4"></i>
                    {auctionItem.price} ETH
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-2xl border-primary-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <i data-lucide="flame" className="text-primary-500 w-6 h-6"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-ui uppercase tracking-wider mb-1">Ends in</p>
                  <p className="font-bold text-lg font-cyber text-white tracking-widest">{formatTime(auctionTime)}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-primary-600/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-pulse-glow"></div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const { addToCart, toggleWishlist, wishlist, products, setCurrentPage } = useContext(GlobalContext);
  const featured = products.slice(0, 4);

  useEffect(() => { lucide.createIcons(); });

  return (
    <section className="py-20 px-6 md:px-12 container mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">Trending <span className="text-gradient">Drops</span></h2>
          <p className="text-gray-400 font-ui text-lg">The most sought-after digital assets right now.</p>
        </div>
        <button onClick={() => setCurrentPage('discover')} className="hidden md:flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-bold font-ui">
          View All <i data-lucide="arrow-right" className="w-5 h-5"></i>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product, i) => {
          const isWished = wishlist.some(w => w.id === product.id);
          return (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} key={product.id} className="glass-card rounded-3xl overflow-hidden group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full backdrop-blur-md border-white/10">
                  <span className="text-xs font-bold font-cyber text-white tracking-widest uppercase">{product.category}</span>
                </div>
                <button onClick={() => toggleWishlist(product)} className={`absolute top-4 right-4 glass p-2 rounded-full backdrop-blur-md transition-colors ${isWished ? 'bg-primary-500/20 border-primary-500/50' : 'hover:bg-white/10'}`}>
                  <i data-lucide="heart" className={`w-4 h-4 ${isWished ? 'fill-primary-500 text-primary-500' : 'text-white'}`}></i>
                </button>
                <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button onClick={() => addToCart(product)} className="px-8 py-3 bg-white text-dark-950 font-bold font-ui rounded-full transform translate-y-8 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-display text-white group-hover:text-primary-400 transition-colors">{product.title}</h3>
                <p className="text-sm text-gray-400 font-ui mt-1">@{product.author}</p>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500 font-ui uppercase tracking-wider">Price</span>
                  <p className="text-lg font-bold text-white flex items-center gap-1 font-display">
                    <i data-lucide="gem" className="w-4 h-4 text-primary-500"></i> {product.price} ETH
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

const ExploreProducts = () => {
  const { addToCart, toggleWishlist, wishlist, products, searchQuery, setSearchQuery, trackView, auctionItem, auctionTime, placeBid, highestBidder } = useContext(GlobalContext);
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const filters = ['All', 'Art', 'Gaming', 'Music', 'Photography', 'Abstract', 'Sci-Fi', 'Cyber Architecture', 'Digital Avatar', 'Virtual Land', 'Utility', 'Rare Collectible', 'Cyber Vehicle'];

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => { setLocalSearch(searchQuery); }, [searchQuery]);
  useEffect(() => { lucide.createIcons(); });

  const displayedProducts = useMemo(() => {
    let result = products || [];
    if (localSearch) {
      const search = localSearch.toLowerCase();
      result = result.filter(p => 
        (p.title?.toLowerCase() || "").includes(search) || 
        (p.author?.toLowerCase() || "").includes(search) || 
        (p.category?.toLowerCase() || "").includes(search)
      );
    }
    if (activeFilter !== 'All') result = result.filter(p => p.category === activeFilter);
    if (sortBy === 'price_asc') result = [...result].sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
    else if (sortBy === 'price_desc') result = [...result].sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0));
    else if (sortBy === 'likes') result = [...result].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    return result;
  }, [products, localSearch, activeFilter, sortBy]);

  const handleSearch = (e) => {
    setLocalSearch(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (product) => {
    trackView(product);
    addToCart(product);
  };

  return (
    <section className="py-20 px-6 md:px-12 container mx-auto border-t border-white/5 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Live Auction Banner for Discover Page */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-16 p-6 rounded-3xl border border-primary-500/30 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-3 bg-primary-600/20 text-primary-400 text-[10px] font-bold uppercase tracking-widest rounded-bl-xl border-l border-b border-primary-500/30">Live Auction</div>
        <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden shadow-2xl">
          <img src={auctionItem.image} alt={auctionItem.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold font-display text-white mb-2">{auctionItem.title}</h3>
          <p className="text-gray-400 font-ui mb-4">Current Price: <span className="text-primary-400 font-bold">{auctionItem.price} ETH</span></p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
              <i data-lucide="clock" className="w-4 h-4 text-primary-500"></i>
              <span className="font-cyber font-bold text-white tracking-widest">{formatTime(auctionTime)}</span>
            </div>
            <button 
              onClick={placeBid}
              className="px-8 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_var(--glow-color)] flex items-center gap-2"
            >
              <i data-lucide="gavel" className="w-4 h-4"></i> Place Bid
            </button>
          </div>
          {highestBidder === 'user' && (
            <p className="text-emerald-400 text-xs font-bold font-ui mt-3 flex items-center gap-1 justify-center md:justify-start">
              <i data-lucide="check" className="w-3 h-3"></i> You are leading the bid
            </p>
          )}
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-8 relative z-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">Explore <span className="text-primary-500">Collection</span></h2>
          <p className="text-gray-400 font-ui text-lg">Discover more exclusive items crafted by top artists.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <i data-lucide="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"></i>
            <input type="text" placeholder="Search collection..." value={localSearch} onChange={handleSearch} className="bg-dark-900/50 border border-white/10 focus:border-primary-500 rounded-xl py-2.5 pl-9 pr-4 text-sm font-ui text-white outline-none w-full sm:w-56 transition-colors" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-dark-900/50 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2.5 text-sm font-ui text-white outline-none">
            <option value="default">Sort: Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 bg-dark-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-sm mb-10 relative z-10">
        {filters.map(filter => (
          <button key={filter} onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-sm font-bold font-ui transition-all duration-300 ${activeFilter === filter ? 'bg-primary-600 text-white shadow-[0_0_15px_var(--glow-color)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            {filter}
          </button>
        ))}
      </div>
      
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
        <AnimatePresence>
          {displayedProducts.map(product => {
            const isWished = wishlist.some(w => w.id === product.id);
            return (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} key={product.id} className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-4 border border-white/5 hover:border-primary-500/40 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_var(--glow-color)]">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold font-cyber text-gray-300 tracking-widest uppercase border border-white/10">{product.category}</div>
                  <button onClick={() => toggleWishlist(product)} className={`absolute top-3 right-3 w-9 h-9 rounded-xl backdrop-blur-md flex items-center justify-center transition-colors border border-white/10 ${isWished ? 'bg-primary-500/20 border-primary-500/50' : 'bg-dark-950/80 hover:bg-white/10'}`}>
                    <i data-lucide="heart" className={`w-4 h-4 ${isWished ? 'fill-primary-500 text-primary-500' : 'text-gray-400'}`}></i>
                  </button>
                  <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-dark-950 to-transparent opacity-80"></div>
                  <button onClick={() => handleAddToCart(product)} className="absolute bottom-4 left-1/2 -translate-x-1/2 px-8 py-3 bg-primary-600 text-white font-bold font-ui text-sm rounded-xl opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-[85%] hover:bg-primary-500 shadow-[0_0_15px_var(--glow-color)]">
                    Add to Cart
                  </button>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-primary-400 transition-colors mb-1 truncate">{product.title}</h3>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-xs text-gray-400 font-ui">By <span className="text-gray-200 font-medium">@{product.author}</span></p>
                    <div className="flex items-center gap-1.5">
                      <i data-lucide="gem" className="w-4 h-4 text-primary-500"></i>
                      <p className="text-base font-bold font-display text-white">{product.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {displayedProducts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center border border-white/5 rounded-3xl bg-dark-900/30 backdrop-blur-sm">
          <i data-lucide="ghost" className="w-16 h-16 text-primary-500/50 mx-auto mb-6"></i>
          <h3 className="text-2xl font-bold font-display text-white mb-2">No assets found</h3>
          <p className="text-gray-500 font-ui text-lg">The digital void returned empty for this query.</p>
          <button onClick={() => { setLocalSearch(''); setSearchQuery(''); setActiveFilter('All'); }} className="mt-6 px-6 py-2 rounded-xl bg-primary-600/20 text-primary-400 hover:bg-primary-600/40 transition-colors font-ui text-sm">Clear filters</button>
        </motion.div>
      )}
    </section>
  );
};

const FeaturesSection = () => {
  useEffect(() => { lucide.createIcons(); });

  const features = [
    { icon: "shield-check", title: "Enterprise Security", desc: "Military-grade encryption protecting your digital assets." },
    { icon: "zap", title: "Quantum Speed", desc: "Optimized infrastructure for instantaneous zero-delay bidding." },
    { icon: "gem", title: "Curated Excellence", desc: "Hand-picked creators ensuring premium collection quality." }
  ];

  return (
    <section className="py-24 px-6 md:px-12 container mx-auto relative">
      <div className="glass rounded-[40px] p-8 md:p-16 relative overflow-hidden border border-primary-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] -z-10 animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-white">Why <span className="text-gradient">Crimson Tavern?</span></h2>
          <p className="text-gray-400 font-ui text-xl leading-relaxed">Experience a marketplace engineered for the future, where breathtaking design meets uncompromising technical performance.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} key={i} className="bg-dark-950/50 p-10 rounded-3xl border border-white/5 hover:border-primary-500/40 transition-all duration-500 text-center group hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_var(--glow-color)]">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-500/10 flex items-center justify-center mb-8 border border-primary-500/20 group-hover:scale-110 transition-transform duration-500">
                <i data-lucide={f.icon} className="text-primary-500 w-10 h-10"></i>
              </div>
              <h3 className="text-2xl font-bold font-display mb-4 text-white">{f.title}</h3>
              <p className="text-gray-400 font-ui leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { setCurrentPage, setSearchQuery, user, setIsAuthOpen, addNotification } = useContext(GlobalContext);
  const [footerEmail, setFooterEmail] = useState('');

  useEffect(() => { lucide.createIcons(); });

  const navigateDiscover = (category) => {
    setSearchQuery(category === 'All' ? '' : category);
    setCurrentPage('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateDashboard = (tab) => {
    if (!user) { setIsAuthOpen(true); return; }
    window.sessionStorage.setItem('dashboardTab', tab);
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = () => {
    if (!footerEmail || !footerEmail.includes('@')) {
      addNotification('Please enter a valid email address.', 'error');
      return;
    }
    addNotification(`Subscribed! Welcome to the frequency, ${footerEmail.split('@')[0]}.`, 'success');
    setFooterEmail('');
  };

  return (
    <footer className="bg-dark-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary-600/5 blur-[120px] pointer-events-none"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 mb-8 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center shadow-[0_0_15px_var(--glow-color)]">
                <i data-lucide="hexagon" className="text-white w-6 h-6"></i>
              </div>
              <span className="font-cyber font-bold text-2xl tracking-widest text-white">CRIMSON TAVERN</span>
            </button>
            <p className="text-gray-400 font-ui mb-8 leading-relaxed">
              The premier destination for discovering, buying, and selling rare digital items in a premium, cyber-aesthetic environment.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/HeriWibu" target="_blank" rel="noopener noreferrer" title="Follow @HeriWibu on X" className="w-12 h-12 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 hover:shadow-[0_0_15px_var(--glow-color)]">
                <i data-lucide="twitter" className="w-5 h-5"></i>
              </a>
              <a href="https://github.com/heripurnamawibu-art" target="_blank" rel="noopener noreferrer" title="GitHub: heripurnamawibu-art" className="w-12 h-12 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 hover:shadow-[0_0_15px_var(--glow-color)]">
                <i data-lucide="github" className="w-5 h-5"></i>
              </a>
              <a href="https://discord.gg/nzceyBtU" target="_blank" rel="noopener noreferrer" title="Join Discord" className="w-12 h-12 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 hover:shadow-[0_0_15px_var(--glow-color)]">
                <i data-lucide="disc" className="w-5 h-5"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-display text-lg mb-8 text-white">Marketplace</h4>
            <ul className="space-y-4 font-ui text-gray-400">
              {[['All NFTs','All'],['Art','Art'],['Gaming','Gaming'],['Photography','Photography'],['Music','Music']].map(([label, cat]) => (
                <li key={cat}>
                  <button onClick={() => navigateDiscover(cat)} className="hover:text-primary-400 transition-colors flex items-center gap-2 w-full text-left">
                    <i data-lucide="chevron-right" className="w-3 h-3"></i> {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-display text-lg mb-8 text-white">My Account</h4>
            <ul className="space-y-4 font-ui text-gray-400">
              {[['user','Profile','overview'],['heart','Wishlist','wishlist'],['shopping-bag','Orders','orders'],['settings','Settings','settings']].map(([icon, label, tab]) => (
                <li key={tab}>
                  <button onClick={() => navigateDashboard(tab)} className="hover:text-primary-400 transition-colors flex items-center gap-2 w-full text-left">
                    <i data-lucide={icon} className="w-4 h-4"></i> {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-display text-lg mb-8 text-white">System Uplink</h4>
            <p className="text-sm font-ui text-gray-400 mb-6">Join our frequency to stay in the loop with newest protocol updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={footerEmail}
                onChange={e => setFooterEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                placeholder="Enter frequency..."
                className="bg-dark-900 border border-white/10 rounded-xl px-5 py-3 w-full text-sm font-ui focus:outline-none focus:border-primary-500 text-white transition-colors"
              />
              <button onClick={handleSubscribe} className="bg-primary-600 hover:bg-primary-500 px-5 py-3 rounded-xl text-white transition-all shadow-[0_0_15px_var(--glow-color)] hover:shadow-[0_0_25px_var(--glow-color)] flex-shrink-0">
                <i data-lucide="send" className="w-5 h-5"></i>
              </button>
            </div>
            <p className="text-xs text-gray-600 font-ui mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-ui text-sm text-gray-500">
          <p>&copy; 2026 CRIMSON TAVERN SYSTEM. All protocols reserved.</p>
          <div className="flex gap-8">
            <a href="https://wa.me/6285719293065?text=Halo%20Crimson%20Tavern%2C%20saya%20ingin%20menanyakan%20tentang%20Privacy%20Protocol." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <i data-lucide="message-circle" className="w-3 h-3"></i> Privacy Protocol
            </a>
            <a href="https://wa.me/6285719293065?text=Halo%20Crimson%20Tavern%2C%20saya%20ingin%20menanyakan%20tentang%20Terms%20of%20Service." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <i data-lucide="message-circle" className="w-3 h-3"></i> Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---


const DiscoverPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow z-10 relative pt-20">
      <ExploreProducts />
    </motion.div>
  );
};

const CommunityPage = () => {
  useEffect(() => { lucide.createIcons(); });
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow z-10 relative pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6">Tavern <span className="text-primary-500">Community</span></h1>
          <p className="text-gray-400 font-ui text-lg">Join the conversation, share your drops, and connect with other cyber artists.</p>
        </div>
        
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto border border-primary-500/20 shadow-[0_0_30px_var(--glow-color)]">
          <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i data-lucide="users" className="w-10 h-10 text-primary-500"></i>
          </div>
          <h3 className="text-2xl font-bold font-display text-white mb-4">Forum is under maintenance</h3>
          <p className="text-gray-400 font-ui mb-8 text-lg">We are upgrading our community servers to handle the massive influx of new artists. Check back soon.</p>
          <button onClick={() => window.open('https://discord.gg/nzceyBtU', '_blank')} className="px-8 py-3 bg-white hover:bg-gray-200 text-dark-950 rounded-xl font-bold font-ui transition-all shadow-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Join our Discord Instead
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'ai', text: 'Hey pilot! I\'m CyberAI. Ask me anything about the marketplace.' }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => { lucide.createIcons(); });
  useEffect(() => { if(messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const getResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('buy') || q.includes('purchase') || q.includes('cart')) return 'To buy an asset, browse the marketplace, click "Add to Cart", then open your cart and hit "Checkout Now". Make sure you\'re connected first!';
    if (q.includes('sell') || q.includes('list') || q.includes('product')) return 'To list your product, go to Dashboard → My Products → Add New. Fill in the details and your item will be live on the marketplace.';
    if (q.includes('discord') || q.includes('community')) return 'Join our Discord community at discord.gg/nzceyBtU! Connect with thousands of cyber artists and collectors.';
    if (q.includes('theme') || q.includes('color') || q.includes('palette')) return 'You can change the theme color using the palette button in the bottom-right corner! Choose from Crimson, Purple, Emerald, Blue, or Gold.';
    if (q.includes('wishlist') || q.includes('favorite') || q.includes('heart')) return 'Click the ❤ heart icon on any product to save it to your wishlist. View all saved items in Dashboard → Wishlist.';
    if (q.includes('search') || q.includes('find') || q.includes('filter')) return 'Use the search bar in the Navbar or the search in Discover page. You can also filter by category and sort by price or popularity!';
    if (q.includes('login') || q.includes('connect') || q.includes('account') || q.includes('register')) return 'Click the "Connect" button in the navbar to login or create your account. Your session is saved automatically.';
    if (q.includes('price') || q.includes('eth') || q.includes('cost')) return 'All prices are listed in ETH. Browse the Discover page to compare prices or use the sort feature to find items by price.';
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return 'Hello pilot! Welcome to Crimson Tavern. How can I assist you today?';
    return 'I\'m not sure about that, but you can explore the Discover page or join our Discord for community support! Type "help" for what I can assist with.';
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const aiMsg = { from: 'ai', text: getResponse(input) };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  const handleKey = (e) => { if (e.key === 'Enter') sendMessage(); };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-14 right-0 w-80 glass-card rounded-2xl overflow-hidden shadow-2xl border border-primary-500/20"
          >
            <div className="bg-primary-600/20 px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-primary-500/30 flex items-center justify-center">
                <i data-lucide="bot" className="w-4 h-4 text-primary-400"></i>
              </div>
              <div>
                <p className="font-bold font-display text-white text-sm">CyberAI Assistant</p>
                <p className="text-xs text-primary-400 font-ui">Online</p>
              </div>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-dark-950/80">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm font-ui ${msg.from === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-dark-800 text-gray-300 rounded-bl-none border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything..."
                className="flex-1 bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm font-ui text-white outline-none focus:border-primary-500 transition-colors"
              />
              <button onClick={sendMessage} className="w-9 h-9 bg-primary-600 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                <i data-lucide="send" className="w-4 h-4 text-white"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary-600 hover:bg-primary-500 border border-primary-400/30 rounded-full flex items-center justify-center shadow-xl transition-all hover:shadow-[0_0_20px_var(--glow-color)]"
      >
        <i data-lucide={isOpen ? "x" : "bot"} className="w-5 h-5 text-white"></i>
      </button>
    </div>
  );
};

const CheatMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addNotification, setTheme, user, updateProfile, setBalance, balance } = useContext(GlobalContext);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'x') {
        setIsOpen(prev => !prev);
      }
      
      if (e.key === konami[konamiIdx]) {
        if (konamiIdx === konami.length - 1) {
          setIsOpen(true);
          setKonamiIdx(0);
          addNotification('PROTOCOL OVERRIDE: CHEAT MENU UNLOCKED', 'success');
        } else {
          setKonamiIdx(prev => prev + 1);
        }
      } else {
        setKonamiIdx(0);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
      addNotification('HIDDEN ACCESS GRANTED', 'success');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openCheatMenu', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openCheatMenu', handleCustomOpen);
    };
  }, [konamiIdx]);

  useEffect(() => { if (isOpen) lucide.createIcons(); }, [isOpen]);

  const runCheat = (action) => {
    switch(action) {
      case 'add_eth': {
        const newBalance = Number(balance) + 10.0;
        setBalance(newBalance);
        addNotification(`INJECTED 10.00 ETH. NEW BALANCE: ${newBalance.toFixed(2)} ETH`, 'success');
        break;
      }
      case 'admin':
        if (user) {
          updateProfile({ ...user, name: 'ADMIN_' + (user.name || 'User'), isAdmin: true });
          addNotification('ADMIN PRIVILEGES GRANTED', 'success');
        } else {
          addNotification('ERROR: NO USER CONNECTED', 'error');
        }
        break;
      case 'glitch':
        document.documentElement.classList.add('glitch-active');
        addNotification('CRITICAL SYSTEM ANOMALY DETECTED', 'warning');
        setTimeout(() => {
          document.documentElement.classList.remove('glitch-active');
          addNotification('SYSTEM STABILIZED', 'success');
        }, 10000); // 10 seconds
        break;
      case 'clear':
        localStorage.clear();
        sessionStorage.clear();
        addNotification('STORAGE WIPED. RELOADING...', 'error');
        setTimeout(() => window.location.reload(), 1500);
        break;
      case 'theme_gold':
        setTheme('gold');
        addNotification('THEME FORCED: AURUM', 'success');
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark-950/60"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            className="w-full max-w-lg glass-card border-2 border-primary-500/50 shadow-[0_0_50px_var(--glow-color)] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-primary-600/20 p-6 flex justify-between items-center border-b border-primary-500/30">
              <div className="flex items-center gap-3">
                <i data-lucide="terminal" className="text-primary-400 w-6 h-6"></i>
                <h2 className="font-cyber font-bold text-xl tracking-[0.2em] text-white">DEVELOPER TERMINAL</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-primary-400 transition-colors text-white">
                <i data-lucide="x" className="w-6 h-6"></i>
              </button>
            </div>
            
            <div className="p-8 space-y-6 bg-dark-950/40">
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => runCheat('add_eth')} className="flex flex-col items-center gap-3 p-6 rounded-2xl glass hover:bg-primary-500/20 transition-all border border-white/5 group">
                  <i data-lucide="gem" className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform"></i>
                  <span className="text-xs font-bold font-cyber text-gray-300">ADD 10 ETH</span>
                </button>
                <button onClick={() => runCheat('admin')} className="flex flex-col items-center gap-3 p-6 rounded-2xl glass hover:bg-primary-500/20 transition-all border border-white/5 group">
                  <i data-lucide="shield-check" className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform"></i>
                  <span className="text-xs font-bold font-cyber text-gray-300">ADMIN MODE</span>
                </button>
                <button onClick={() => runCheat('glitch')} className="flex flex-col items-center gap-3 p-6 rounded-2xl glass hover:bg-primary-500/20 transition-all border border-white/5 group">
                  <i data-lucide="zap" className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform"></i>
                  <span className="text-xs font-bold font-cyber text-gray-300">GLITCH EFFECT</span>
                </button>
                <button onClick={() => runCheat('theme_gold')} className="flex flex-col items-center gap-3 p-6 rounded-2xl glass hover:bg-primary-500/20 transition-all border border-white/5 group">
                  <i data-lucide="palette" className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform"></i>
                  <span className="text-xs font-bold font-cyber text-gray-300">GOLD THEME</span>
                </button>
              </div>
              
              <div className="p-4 rounded-xl bg-dark-900 border border-white/5 space-y-2">
                <p className="text-[10px] font-mono text-primary-500/70 uppercase">System Stats</p>
                <div className="flex justify-between text-xs font-mono text-gray-500">
                  <span>Protocol:</span>
                  <span className="text-primary-400">v4.2.0-STABLE</span>
                </div>
              </div>
              
              <button onClick={() => runCheat('clear')} className="w-full py-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold font-cyber text-sm tracking-widest transition-all">
                WIPE ALL DATA
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AppContent = () => {
  const { currentPage } = useContext(GlobalContext);

  return (
    <div className="min-h-screen font-sans flex flex-col relative overflow-hidden">
      <div className="fixed top-0 -left-1/4 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-primary-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob pointer-events-none"></div>
      <div className="fixed top-1/4 -right-1/4 w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob pointer-events-none" style={{animationDelay: '3s'}}></div>
      
      <AuthModal />
      <Navbar />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <HomePage key="home" />}
        {currentPage === 'discover' && <DiscoverPage key="discover" />}
        {currentPage === 'community' && <CommunityPage key="community" />}
        {currentPage === 'dashboard' && <DashboardPage key="dashboard" />}
      </AnimatePresence>
      
      {currentPage !== 'dashboard' && <Footer />}
      
      <CartDrawer />
      <ThemeCustomizer />
      <AIChatWidget />
      <CheatMenu />
      <RealtimeActivityFeed />
      <NotificationSystem />
    </div>
  );
};

const App = () => {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
