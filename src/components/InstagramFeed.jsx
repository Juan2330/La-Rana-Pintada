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
            <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedPost(post)}>
              {videoUrl ? (
                <video src={videoUrl} controls className="w-full h-auto rounded-lg shadow-lg" />
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

      {/* Botón Contáctanos debajo de las publicaciones */}
      <div className="flex mt-6">
        <a
          href="https://linktr.ee/ranapintada?fbclid=PAZXh0bgNhZW0CMTEAAaapvXw4NqsuLPCxxwHGNSSUqIpPv_ozyqWZCSFsgDKQ5LmJ_lbrLBtnnKI_aem_NSzJMmprHMfBYi3BAlGFrQ"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FFC1B2] font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#5c5148] transition duration-300"
        >
          Contáctanos
        </a>
      </div>
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