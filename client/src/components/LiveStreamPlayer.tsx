import { Play, Volume2, Maximize2, Heart, Share2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import heroBg from "@assets/generated_images/herbal_products_hero_background.png";

export default function LiveStreamPlayer() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10 group">
      {/* Placeholder for Video Stream */}
      <img 
        src={heroBg} 
        alt="Live Stream" 
        className="h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

      {/* Live Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white uppercase tracking-wider shadow-lg animate-pulse">
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          Live
        </div>
        <div className="rounded bg-black/50 backdrop-blur px-2 py-1 text-xs font-medium text-white">
          1.2k Watching
        </div>
      </div>

      {/* Stream Info Overlay */}
      <div className="absolute top-4 right-4 flex gap-2">
         <button className="rounded-full bg-black/40 p-2 text-white hover:bg-black/60 backdrop-blur transition-colors">
            <Share2 className="h-5 w-5" />
         </button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 opacity-100 transition-opacity">
        <div className="mb-4">
            <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">Wellness Wednesday: Benefits of Essential Oils</h3>
            <p className="text-white/80 text-sm">Extreme Life Herbal Products</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-accent transition-colors">
            <Play className="h-6 w-6 fill-current" />
          </button>
          
          <div className="flex items-center gap-2 group/vol">
            <Volume2 className="h-5 w-5 text-white" />
            <div className="w-0 overflow-hidden transition-all group-hover/vol:w-24">
                <Slider defaultValue={[80]} max={100} step={1} className="w-20" />
            </div>
          </div>

          <div className="flex-1">
            <div className="h-1 w-full rounded-full bg-white/20">
                <div className="h-full w-[98%] rounded-full bg-red-600 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-red-600 shadow border border-white scale-0 group-hover:scale-100 transition-transform"></div>
                </div>
            </div>
          </div>

          <button className="text-white hover:text-red-500 transition-colors">
            <Heart className="h-6 w-6" />
          </button>
          
          <button className="text-white hover:text-white/80 transition-colors">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
