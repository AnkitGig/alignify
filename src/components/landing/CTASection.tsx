import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import button from "../../assets/imgs/mdi_beta.png";

export function CTASection() {
  return (
    <section className="relative z-10 py-20 px-6  bg-[rgb(17,5,43)]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Transform Your Data
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Collaboration?
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Join teams who are saving countless hours and building stronger
          relationships through better data visualization alignment
        </p>

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
      </div>
    </section>
  );
}
