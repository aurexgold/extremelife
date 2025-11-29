import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: "Shipping & Delivery",
    question: "How long does delivery take?",
    answer: "We offer various shipping options: J&T Express (2-3 days), LBC Express (3-5 days), 2GO Express (2-4 days), and Lalamove (same-day in Metro Manila). Free shipping applies to orders ₱2,500 and above.",
  },
  {
    category: "Shipping & Delivery",
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within the Philippines. We're working on expanding to other regions soon!",
  },
  {
    category: "Shipping & Delivery",
    question: "Can I change my delivery address after ordering?",
    answer: "Yes, you can change your delivery address within 24 hours of placing your order. Please contact our support team at hello@extremelife.ph.",
  },
  {
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept GCash, PayMaya, and Cash on Delivery (COD). All payment methods are secure and encrypted.",
  },
  {
    category: "Payment",
    question: "Is my payment information safe?",
    answer: "Yes, all transactions are encrypted with SSL security. We never store your full credit card details.",
  },
  {
    category: "Products",
    question: "Are your products organic and certified?",
    answer: "Yes! All our products are 100% organic and lab-tested. We're committed to quality and sustainability.",
  },
  {
    category: "Products",
    question: "Do you offer refunds or returns?",
    answer: "We offer 30-day returns for unopened products. If you're not satisfied, just contact us and we'll arrange a return.",
  },
  {
    category: "Loyalty",
    question: "How does the loyalty program work?",
    answer: "Earn loyalty points on every purchase! Points vary by tier: Bronze (2%), Silver (5%), Gold (10%), and Platinum (15% discount). Points accumulate with each order.",
  },
  {
    category: "Loyalty",
    question: "Can I use multiple promo codes?",
    answer: "You can use one promo code per order. The system will apply the highest discount available.",
  },
  {
    category: "Account",
    question: "How do I create an account?",
    answer: "Click 'Register' at the top right. Fill in your details, and you'll instantly have access to your account with loyalty benefits!",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(faqItems.map((item) => item.category)));
  const groupedFAQ = categories.map((cat) => ({
    category: cat,
    items: faqItems.filter((item) => item.category === cat),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products, shipping, and services
          </p>
        </div>

        <div className="space-y-12">
          {groupedFAQ.map((group) => (
            <div key={group.category}>
              <h2 className="text-2xl font-bold font-serif text-foreground mb-6 pb-3 border-b-2 border-primary/30">
                {group.category}
              </h2>

              <div className="space-y-3">
                {group.items.map((item, idx) => {
                  const globalIndex = faqItems.indexOf(item);
                  const isOpen = activeIndex === globalIndex;

                  return (
                    <Card
                      key={globalIndex}
                      className="cursor-pointer hover:shadow-md transition"
                      onClick={() => setActiveIndex(isOpen ? null : globalIndex)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="text-base font-semibold text-foreground pr-4">
                            {item.question}
                          </CardTitle>
                          <ChevronDown
                            className={`h-5 w-5 text-primary flex-shrink-0 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </CardHeader>

                      {isOpen && (
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold mb-2">Didn't find your answer?</h3>
            <p className="text-sm text-muted-foreground">
              Check out our <a href="/contact" className="text-primary hover:underline">contact page</a> or email us at{" "}
              <a href="mailto:hello@extremelife.ph" className="text-primary hover:underline">
                hello@extremelife.ph
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
