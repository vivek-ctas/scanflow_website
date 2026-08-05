import { motion } from "framer-motion";
import { steps } from "@/components/sections/landingData";

export default function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works"
      className="container-wide pb-20 relative overflow-hidden "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 border border-secondary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/15 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/4 w-2 h-2 bg-secondary/30 rounded-full"
        />
      </div>

      <div className="rounded-3xl bg-muted relative overflow-hidden">
        <div className="rounded-3xl bg-white/95 p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-slate-200/40">
          {/* Floating particles */}
          {/* <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-secondary/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div> */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { left: "8%", top: "12%", moveX: 20, moveY: -15 },
              { left: "20%", top: "65%", moveX: -18, moveY: 22 },
              { left: "38%", top: "28%", moveX: 24, moveY: 16 },
              { left: "52%", top: "82%", moveX: -20, moveY: -18 },
              { left: "68%", top: "20%", moveX: 28, moveY: -12 },
              { left: "82%", top: "55%", moveX: -24, moveY: 20 },
              { left: "92%", top: "32%", moveX: 18, moveY: 14 },
              { left: "14%", top: "90%", moveX: 22, moveY: -20 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, particle.moveX, 0],
                  y: [0, particle.moveY, 0],
                  opacity: [0.25, 0.8, 0.25],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-secondary/40 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">How It Works</p>
            <h2 className="font-display text-3xl md:text-5xl text-primary mb-6">
              Integrate in{" "}
              <span className="text-gradient">minutes</span>
              . Scale with confidence.
            </h2>
            <p className="text-muted-foreground-foreground text-lg max-w-2xl mx-auto">
              Four simple steps to transform your barcode scanning workflow
            </p>
          </motion.div>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Central connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/0 via-secondary/50 to-secondary/0 transform -translate-x-1/2" />

            {/* Animated progress line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-secondary to-accent-2 transform -translate-x-1/2"
              style={{
                boxShadow: "0 0 20px rgba(32, 152, 200, 0.6)",
              }}
            />

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      } flex-col md:gap-12 gap-6`}
                  >
                    {/* Step number and icon */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`relative flex-shrink-0 ${index % 2 === 0 ? "md:order-1" : "md:order-2"
                        }`}
                    >
                      {/* Glowing background */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-secondary/20 rounded-2xl blur-xl"
                      />

                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-secondary to-accent-2 flex items-center justify-center shadow-2xl border border-white/20">
                        {/* Animated border */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-2xl border-2 border-secondary/30"
                        />

                        <div className="text-center">
                          <div className="text-white font-bold text-lg md:text-xl mb-1">
                            {step.step}
                          </div>
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white mx-auto" />
                        </div>
                      </div>

                      {/* Connecting dots */}
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full border-2 border-white"
                      />
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`flex-1 ${index % 2 === 0 ? "md:order-2 md:text-right" : "md:order-1 md:text-left"
                        } text-center md:text-left`}
                    >
                      <div className="glass rounded-2xl p-6 md:p-8 relative group">
                        {/* Card hover effect */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent-2/5 rounded-2xl"
                        />

                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          className="font-display text-xl md:text-2xl font-bold text-primary mb-3"
                        >
                          {step.title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.4 }}
                          className="text-muted-foreground leading-relaxed text-sm md:text-base"
                        >
                          {step.description}
                        </motion.p>

                        {/* Progress indicator */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                          className="mt-4 h-1 bg-gradient-to-r from-secondary to-accent-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 rounded-full border border-secondary/20 text-secondary font-medium"
            >
              <span>Ready to get started?</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

