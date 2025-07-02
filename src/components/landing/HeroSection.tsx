import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Background from "@/assets/imgs/bg1.jpg"; // Adjust the path as necessary
import button from "../../assets/imgs/mdi_beta.png";
export function HeroSection() {
  const { user } = useAuth();

  return (
    <section
      className="relative z-10 py-20 px-6"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Bring your data
          <br />
          product ideas to life
        </h1>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Create professional dashboard wireframes using advanced visualizations
          and customizable templates. Perfect for both freelancers working with
          clients and organizations aligning multiple teams.
        </p>

        <div className="mb-16">
          {user ? (
            <Link to="/editor">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-full shadow-lg border-0"
              >
                Start Creating
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button
                size="lg"
                className=" hover:from-purple-700 hover:to-pink-700 text-white text-xl px-8 py-4 rounded-full shadow-lg border-0"
                style={{
                  background:
                    "linear-gradient(264deg, rgba(87, 63, 234, 0.2) 0%, rgba(161, 145, 255, 0.2) 100%)",
                }}
              >
                <span>
                  <img src={button} style={{ width: 24 }} />
                </span>{" "}
                Join Beta
              </Button>
            </Link>
          )}
        </div>
        <div className="container">
          <div className="banner__thumb">
            <img src="src\assets\imgs\topimage.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
