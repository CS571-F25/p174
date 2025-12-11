import { useState, useContext, createContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BookmarkContext = createContext();

const createBookmarkKey = (type, id) => `${type}-${id}`;

export const BookmarkProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  const storageKeyForUser = (username) => `bookmarks_${username}`;

  const loadBookmarksForUser = (username) => {
    const key = storageKeyForUser(username);
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }

    // Migrate from shared bookmarks if present
    const sharedBookmarks = localStorage.getItem('bookmarks');
    if (sharedBookmarks) {
      localStorage.setItem(key, sharedBookmarks);
      localStorage.removeItem('bookmarks');
      return JSON.parse(sharedBookmarks);
    }

    // Migrate old trail-only bookmarks
    const oldTrailBookmarks = localStorage.getItem('trailBookmarks');
    if (oldTrailBookmarks) {
      const oldBookmarks = JSON.parse(oldTrailBookmarks);
      const migratedBookmarks = oldBookmarks.map(id => createBookmarkKey('trail', id));
      localStorage.setItem(key, JSON.stringify(migratedBookmarks));
      localStorage.removeItem('trailBookmarks');
      return migratedBookmarks;
    }

    return [];
  };

  useEffect(() => {
    if (user?.username) {
      setBookmarks(loadBookmarksForUser(user.username));
    } else {
      setBookmarks([]);
    }
  }, [user]);

  const persistBookmarks = (newBookmarks) => {
    if (!user?.username) return;
    localStorage.setItem(storageKeyForUser(user.username), JSON.stringify(newBookmarks));
  };

  // Check if an item is bookmarked
  const isBookmarked = (type, id) => {
    const key = createBookmarkKey(type, id);
    return bookmarks.includes(key);
  };

  // Toggle bookmark for any type
  const toggleBookmark = (type, id) => {
    if (!user) {
      alert('Please log in to manage bookmarks.');
      return;
    }

    setBookmarks(prev => {
      const key = createBookmarkKey(type, id);
      const newBookmarks = prev.includes(key)
        ? prev.filter(bookmarkKey => bookmarkKey !== key)
        : [...prev, key];
      persistBookmarks(newBookmarks);
      return newBookmarks;
    });
  };

  // Get all bookmarks of a specific type
  const getBookmarksByType = (type) => {
    return bookmarks
      .filter(key => key.startsWith(`${type}-`))
      .map(key => parseInt(key.split('-')[1]));
  };

  // Get all bookmarks as objects with type and id
  const getAllBookmarks = () => {
    return bookmarks.map(key => {
      const [type, ...idParts] = key.split('-');
      return { type, id: parseInt(idParts.join('-')) };
    });
  };

  return (
    <BookmarkContext.Provider value={{ 
      bookmarks, 
      toggleBookmark, 
      isBookmarked,
      getBookmarksByType,
      getAllBookmarks
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
