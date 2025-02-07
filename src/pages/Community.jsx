import React, { useState,useEffect } from "react";

const Community = () => {
  // Sample data for posts (including other users' posts)
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "user1",
      mediaUrl: "https://plus.unsplash.com/premium_photo-1709311438052-9c3f5f867b9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mediaType: "image",
      likes: 10,
      isLiked: false,
      comments: [
        { id: 1, username: "user2", text: "Great photo!" },
        { id: 2, username: "user3", text: "Amazing shot!" },
      ],
      isFollowing: false,
      about: "This is a sample post with a long about section. It can vary in length and should be scrollable if it exceeds two lines.",
    },
    {
      id: 2,
      username: "user2",
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      mediaType: "video",
      likes: 5,
      isLiked: false,
      comments: [
        { id: 1, username: "user1", text: "Amazing shot!" },
      ],
      isFollowing: true,
      about: "Another post with a shorter about section.",
    },
    {
      id: 3,
      username: "user3",
      mediaUrl: "https://images.unsplash.com/photo-1569581464548-66d245ae5ca5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mediaType: "image",
      likes: 15,
      isLiked: false,
      comments: [
        { id: 1, username: "user4", text: "Nice one!" },
        { id: 2, username: "user5", text: "Love this!" },
      ],
      isFollowing: false,
      about: "A beautiful sunset captured at the beach. The colors are breathtaking!",
    },
    {
      id: 4,
      username: "user4",
      mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      mediaType: "video",
      likes: 20,
      isLiked: false,
      comments: [
        { id: 1, username: "user5", text: "Fantastic!" },
        { id: 2, username: "user6", text: "Wow, this is amazing!" },
      ],
      isFollowing: true,
      about: "A short video clip of nature in its purest form. Enjoy the serenity.",
    },
    {
      id: 5,
      username: "user5",
      mediaUrl: "https://images.unsplash.com/photo-1737412358025-160a0c22e6c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mediaType: "image",
      likes: 30,
      isLiked: false,
      comments: [
        { id: 1, username: "user6", text: "Super cool!" },
        { id: 2, username: "user1", text: "This is awesome!" },
      ],
      isFollowing: false,
      about: "A stunning view of the mountains. The perfect getaway for nature lovers.",
    },
    {
      id: 6,
      username: "user6",
      mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      mediaType: "video",
      likes: 8,
      isLiked: false,
      comments: [
        { id: 1, username: "user1", text: "Nice clip!" },
        { id: 2, username: "user2", text: "Beautiful flowers!" },
      ],
      isFollowing: true,
      about: "A short video of blooming flowers. Nature's beauty at its finest.",
    },
    {
      id: 7,
      username: "user7",
      mediaUrl: "https://images.unsplash.com/photo-1710861453177-0e8b9e3e6b9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mediaType: "image",
      likes: 12,
      isLiked: false,
      comments: [
        { id: 1, username: "user8", text: "Great composition!" },
        { id: 2, username: "user9", text: "Love the colors!" },
      ],
      isFollowing: false,
      about: "A vibrant cityscape at night. The lights are mesmerizing.",
    },
    {
      id: 8,
      username: "user8",
      mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
      mediaType: "video",
      likes: 25,
      isLiked: false,
      comments: [
        { id: 1, username: "user9", text: "Amazing video!" },
        { id: 2, username: "user10", text: "This is so cool!" },
      ],
      isFollowing: true,
      about: "A short clip of a waterfall. The sound of water is so calming.",
    },
    {
      id: 9,
      username: "user9",
      mediaUrl: "https://images.unsplash.com/photo-1710861453177-0e8b9e3e6b9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mediaType: "image",
      likes: 18,
      isLiked: false,
      comments: [
        { id: 1, username: "user10", text: "Fantastic shot!" },
        { id: 2, username: "user1", text: "This is breathtaking!" },
      ],
      isFollowing: false,
      about: "A beautiful landscape with rolling hills and a clear blue sky.",
    },
    {
      id: 10,
      username: "user10",
      mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
      mediaType: "video",
      likes: 22,
      isLiked: false,
      comments: [
        { id: 1, username: "user1", text: "Awesome video!" },
        { id: 2, username: "user2", text: "This is so relaxing!" },
      ],
      isFollowing: true,
      about: "A peaceful walk through the forest. The sounds of nature are so soothing.",
    },
  ]);

  // State for the new post (current user's post)
  const [newPost, setNewPost] = useState({
    imageFile: null,
    about: "",
  });

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewPost({ ...newPost, imageFile: imageUrl });
    }
  };

  // Handle about text input change
  const handleAboutChange = (e) => {
    setNewPost({ ...newPost, about: e.target.value });
  };

  // Handle post submission
  const handlePostSubmit = () => {
    if (!newPost.imageFile || !newPost.about.trim()) return;
  
    const newPostData = {
      id: posts.length + 1,
      username: "currentUser",
      mediaUrl: newPost.imageFile,
      mediaType: "image",
      likes: 0,
      isLiked: false,
      comments: [],
      isFollowing: false,
      about: newPost.about,
    };
  
    // Prepend the new post to the posts array
    setPosts([newPostData, ...posts]);
    setNewPost({ imageFile: null, about: "" });
  };

  // Handle like functionality
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1, isLiked: true }
          : post
      )
    );
  };

  // Handle unlike functionality
  const handleUnlike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes - 1, isLiked: false }
          : post
      )
    );
  };

  // Handle double-click to like/unlike
  const handleDoubleClick = (postId) => {
    const post = posts.find((post) => post.id === postId);
    if (post.isLiked) {
      handleUnlike(postId);
    } else {
      handleLike(postId);
    }
  };

  // Handle adding a comment
  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: post.comments.length + 1, username: "currentUser", text: commentText },
              ],
            }
          : post
      )
    );
  };

  // Handle follow/unfollow
  const handleFollow = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isFollowing: !post.isFollowing } : post
      )
    );
  };

  // Handle share functionality
  const handleShare = (postId) => {
    alert(`Shared post ${postId}`);
  };

    // Scroll to top when the component mounts
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen bg-black/55 backdrop-blur-md text-white p-8 max-w-screen-2xl mx-auto font-mono text-sm mt-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-green-500 text-center font-smooch">
        Community Feed
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Upload Box */}
        <div className="w-full lg:w-1/4">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <div className="mb-4">
              <div className="relative w-full pt-[100%] bg-gray-800 rounded-lg overflow-hidden">
                {newPost.imageFile ? (
                  <img
                    src={newPost.imageFile}
                    alt="New Post"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                ) : (
                  <label className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400 cursor-pointer">
                    Add Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            <textarea
              placeholder="About this post..."
              className="w-full h-24 bg-gray-800 text-white p-2 rounded-lg focus:outline-none font-mono text-xs md:text-sm"
              value={newPost.about}
              onChange={handleAboutChange}
            />
            <button
              onClick={handlePostSubmit}
              className="w-full bg-green-500 text-black px-4 py-2 rounded-full mt-4 font-mono text-sm"
            >
              Post
            </button>
          </div>
        </div>

        {/* Right Section - Posts Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                    <span className="font-semibold">{post.username}</span>
                  </div>
                  <button
                    onClick={() => handleFollow(post.id)}
                    className={`px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-full font-semibold ${
                      post.isFollowing ? "bg-gray-700 text-white" : "bg-green-500 text-black"
                    }`}
                  >
                    {post.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
                <div
                  className="relative w-full pt-[100%] overflow-hidden rounded-lg"
                  onDoubleClick={() => handleDoubleClick(post.id)}
                >
                  {post.mediaType === "image" ? (
                    <img
                      src={post.mediaUrl}
                      alt="Post"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={post.mediaUrl}
                      controls
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* About Section */}
                <div className="mt-4 h-16 overflow-y-auto custom-scrollbar">
                  <p className="text-sm">{post.about}</p>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => (post.isLiked ? handleUnlike(post.id) : handleLike(post.id))}
                    className="flex items-center text-gray-400 hover:text-green-500"
                  >
                    <span className="mr-2">❤️</span>
                    <span>{post.likes} Likes</span>
                  </button>
                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center text-gray-400 hover:text-green-500"
                  >
                    <span className="mr-2">🔗</span>
                    <span>Share</span>
                  </button>
                </div>
                {/* Comments Section */}
                <div className="mt-4 h-24 overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <span className="font-semibold">{comment.username}</span>: {comment.text}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 mb-2 flex">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-800 text-white p-2 rounded-l-full focus:outline-none font-mono text-xs md:text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.target.previousSibling;
                      handleAddComment(post.id, input.value);
                      input.value = "";
                    }}
                    className="bg-green-500 text-black px-3 py-1 md:px-4 md:py-2 rounded-r-full font-mono text-xs md:text-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;