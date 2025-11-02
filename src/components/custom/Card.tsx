import { Play } from "lucide-react"

export function MusicCard({ image, title, description }: { image: string, title: string, description: string }) {
  return (
    <div className="relative group bg-[#181818] hover:bg-[#282828] transition-colors duration-300 rounded-xl p-4 cursor-pointer w-44">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="rounded-lg mb-4 w-full object-cover"
        />
        {/* Появляется при hover */}
        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#1db954] rounded-full p-3 hover:scale-105">
          <Play size={20} fill="black" />
        </button>
      </div>

      <h3 className="text-white font-semibold truncate">{title}</h3>
      <p className="text-gray-400 text-sm truncate">{description}</p>
    </div>
  );
}
