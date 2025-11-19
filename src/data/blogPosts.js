// Mock blog posts data

export let blogPosts = [
  {
    id: 1,
    author: "HikingEnthusiast",
    title: "My First Time Hiking Dragon's Back",
    content: "What an incredible experience! The views were absolutely breathtaking. The trail was challenging but manageable, and the reward at the end - Big Wave Bay - was perfect for cooling off. Highly recommend starting early to avoid the crowds.",
    photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"],
    date: "2024-11-10",
    likes: 45,
    comments: [
      { id: 1, author: "TrailLover", content: "Great post! I'm planning to go next weekend. Any tips?", date: "2024-11-11" },
      { id: 2, author: "NatureWalker", content: "Did you see the rock carvings near Big Wave Bay? They're amazing!", date: "2024-11-12" }
    ]
  },
  {
    id: 2,
    author: "IslandExplorer",
    title: "Weekend Getaway to Lamma Island",
    content: "Spent the most relaxing weekend on Lamma Island. The seafood at Sok Kwu Wan is to die for! We hiked the Family Trail which was easy and scenic. The best part? No cars anywhere - such a peaceful escape from the city.",
    photos: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop"],
    date: "2024-11-08",
    likes: 38,
    comments: [
      { id: 1, author: "BeachBum", content: "Which restaurant did you try? I'm going next month!", date: "2024-11-09" }
    ]
  },
  {
    id: 3,
    author: "MountainSeeker",
    title: "Conquering Sunset Peak at Dawn",
    content: "Woke up at 3am to hike Sunset Peak for sunrise. It was TOUGH, but oh my - the sunrise was absolutely magical. Standing on Hong Kong's second highest peak watching the sun come up is something I'll never forget. Bring warm clothes - it gets cold at the top!",
    photos: ["https://images.unsplash.com/photo-1464822759844-d150ad3bebb6?w=800&h=600&fit=crop"],
    date: "2024-11-05",
    likes: 62,
    comments: [
      { id: 1, author: "SunriseChaser", content: "Incredible photos! How long did the hike take you?", date: "2024-11-06" },
      { id: 2, author: "MountainSeeker", content: "About 4 hours total including breaks. Started from Ngong Ping.", date: "2024-11-06" }
    ]
  }
];

// Helper functions to manage blog posts
export const addBlogPost = (post) => {
  const newPost = {
    ...post,
    id: blogPosts.length + 1,
    date: new Date().toISOString().split('T')[0],
    likes: 0,
    comments: []
  };
  blogPosts = [newPost, ...blogPosts];
  return newPost;
};

export const addComment = (postId, comment) => {
  const post = blogPosts.find(p => p.id === postId);
  if (post) {
    const newComment = {
      ...comment,
      id: post.comments.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    post.comments.push(newComment);
  }
};

export const likePost = (postId) => {
  const post = blogPosts.find(p => p.id === postId);
  if (post) {
    post.likes += 1;
  }
};

