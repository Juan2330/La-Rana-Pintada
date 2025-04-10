import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const InstagramFeed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchInstagramPosts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_INSTAGRAM_API_URL;
      const apiKey = import.meta.env.VITE_INSTAGRAM_API_KEY;
      const apiHost = import.meta.env.VITE_INSTAGRAM_API_HOST;

      const response = await fetch(
        `${apiUrl}?username_or_id_or_url=${userId}&url_embed_safe=true`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al obtener datos de Instagram: ${errorText}`);
      }

      const data = await response.json();
      return data.data?.items || [];
    } catch (error) {
      console.error("Error en fetchInstagramPosts:", error);
      return [];
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInstagramPosts();
        setPosts(data);
      } catch (err) {
        setError("Error al cargar las publicaciones de Instagram.");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [userId]);

  const cleanCaption = (caption) => {
    return caption ? caption.replace(/#[^\s#]+/g, "").trim() : "Sin descripción";
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!posts.length) return <p className="text-center text-gray-500">No hay publicaciones disponibles.</p>;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {posts.map((post, index) => {
          const imageUrl = post.thumbnail_url;
          const videoUrl = post.video_url;
          const caption = cleanCaption(post.caption?.text);

          return (
            <div
              key={index}
              className="relative group cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => setSelectedPost(post)}
            >
              {videoUrl ? (
                <div className="relative group transform transition duration-300 hover:scale-105 hover:shadow-xl">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-auto rounded-lg shadow-lg opacity-90 group-hover:opacity-75 transition duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </div>
                </div>
              ) : imageUrl ? (
                <>
                  <img src={imageUrl} alt={caption} className="w-full h-auto rounded-lg shadow-lg" />
                  <p className="text-sm text-gray-700 mt-2">{caption}</p>
                </>
              ) : (
                <p className="text-center text-gray-500">Contenido no disponible</p>
              )}
            </div>
          );
        })}
      </div>

      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
          onClick={() => setSelectedPost(null)}
        >
          <img 
            src={selectedPost.thumbnail_url} 
            alt="Imagen ampliada" 
            className="max-w-full max-h-full object-contain" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

InstagramFeed.propTypes = {
  userId: PropTypes.string.isRequired,
};

InstagramFeed.defaultProps = {
  userId: import.meta.env.VITE_INSTAGRAM_USER_ID,
};

export default InstagramFeed;