import { Award, Heart, Users } from "lucide-react";
import meliaImage from "@/assets/melia-king.png";

const MeetMelia = () => {
  return (
    <section id="meet-melia" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-secondary overflow-hidden">
              <img
                src={meliaImage}
                alt="Melia King - Solar Energy Advisor"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-accent/20 -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                Your Energy Advisor
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4">
                Meet Melia King
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              With over a decade of experience in the solar industry, Melia King has helped thousands of homeowners make the switch to clean energy. Her passion for sustainability and commitment to exceptional service has made her one of California's most trusted solar advisors.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              As a part owner of Voltaic Inc, Melia brings insider knowledge and exclusive access to the best equipment and installation teams in the business. She believes everyone deserves honest, transparent guidance when making the switch to solar.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-secondary">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">5,000+</div>
                  <div className="text-sm text-muted-foreground">Families Helped</div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-secondary">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3 p-4 rounded-xl bg-secondary">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetMelia;