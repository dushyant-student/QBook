import HomeNavBar from "./components/HomeNavBar";
import HomeHeroSection from "./components/HomeHeroSection";
import ShopCart from "./components/ShopCart";
import AutoRefresh from "./components/AutoRefresh";



export default function Home() {

  return (
   
    <main className="min-h-screen bg-white">
      <AutoRefresh/>
      <HomeNavBar/>
      <HomeHeroSection/>
      <div className=" w-full h-screen flex justify-center gap-5 " >
        
        <ShopCart/>
      
      </div>

      
    </main>
  
  );
}
