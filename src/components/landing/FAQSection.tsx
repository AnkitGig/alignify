
import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do I get started with Alignify?",
      answer: "Simply download the app from Google Play or the App Store, follow the setup guide, and start using Alignify instantly."
    },
    {
      question: "Can I customize Alignify's responses to fit my needs?",
      answer: "Yes! Alignify supports extensive customization options to tailor responses and workflows to your specific requirements."
    },
    {
      question: "Is Alignify available in multiple languages?",
      answer: "Currently Alignify supports English with plans to expand to additional languages in future updates."
    },
    {
      question: "What types of tasks can Alignify assist with?",
      answer: "Alignify can help with data visualization, dashboard creation, analytics, reporting, and collaborative data storytelling."
    },
    {
      question: "What kind of support is available if I encounter issues?",
      answer: "We provide comprehensive support through documentation, community forums, and direct customer service channels."
    },
    {
      question: "Can Alignify generate images?",
      answer: "Yes, Alignify can help generate visual elements and charts for your data visualization needs."
    }
  ];

  return (
    <section id="faq" className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Have Questions?</h2>
          <p className="text-lg text-gray-400">
            Our FAQ section covers everything you need to know about Alignify, from setup and customization to troubleshooting and support. Find quick, helpful answers to make integrating Alignify into your website seamless and hassle-free.
          </p>
        </div>
        
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <Collapsible key={index} open={openFaq === index} onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}>
              <CollapsibleTrigger className="w-full p-5 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-white/10 text-left hover:bg-gray-900/60 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">{faq.question}</h3>
                  <Plus className={`w-5 h-5 transform transition-transform ${openFaq === index ? 'rotate-45' : ''}`} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5">
                <div className="pt-3">
                  <p className="text-gray-400 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
}
