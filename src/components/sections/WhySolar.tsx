import { TrendingUp, Shield, Zap, Leaf, DollarSign, Home } from "lucide-react";

const WhySolar = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: "Predictable Costs",
      description:
        "Why rent your power when you can own it? Solar provides predictable energy rates for years to come with no more inflating utility rates. The average homeowner will save tens of thousands over the life of their solar system!",
    },
    {
      icon: Shield,
      title: "Reliable Power",
      description:
        "While other forms of power cross hundreds of miles to get to you, solar is right on your roof. This provides reliable power and with battery storage, you can rest assured that you won't suffer an outage.",
    },
    {
      icon: Zap,
      title: "Turn Key Solution",
      description:
        "Going solar is easier than ever. With plentiful finance & power purchase solutions, go solar for as little as $0 down and own your energy freedom from day one!",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description:
        "Reduce your carbon footprint and contribute to a cleaner environment. Every solar panel installed means less dependence on fossil fuels and a healthier planet for future generations.",
    },
    {
      icon: TrendingUp,
      title: "Increase Home Value",
      description:
        "Homes with solar installations consistently sell for more than comparable homes without solar. It's an investment that pays dividends when you decide to sell.",
    },
    {
      icon: Home,
      title: "Energy Independence",
      description:
        "Take control of your energy future. With solar and battery storage, you're no longer at the mercy of utility companies, rate hikes, or grid instabilities.",
    },
  ];

  return (
    <section id="why-solar" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Why Solar
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
            Welcome to the World of Solar Energy
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            We are a leading solar energy concierge embodying cutting-edge
            technology for a sustainable world.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-solar flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySolar;
