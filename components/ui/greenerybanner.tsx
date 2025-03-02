import { Users, Leaf, Recycle, Lightbulb, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

// Improved component organization and formatting
interface ImpactCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

interface ProjectCardProps {
  percentage: number;
  title: string;
  delay?: number;
}

interface EquivalentCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const ImpactCard = ({
  icon: Icon,
  value,
  label,
  delay = 0,
}: ImpactCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.02, translateY: -5 }}
    className="bg-white/30 backdrop-blur-sm p-4 rounded-xl flex items-center space-x-3 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <motion.div
      initial={{ rotate: -10, scale: 0.5 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: delay + 0.2 }}
      className="bg-emerald-50 p-2 rounded-lg"
    >
      <Icon className="w-5 h-5 text-[#3D1D1D]" />
    </motion.div>
    <div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className="text-lg font-semibold text-[#3D1D1D]"
      >
        {value}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="text-sm text-[#3D1D1D]"
      >
        {label}
      </motion.p>
    </div>
  </motion.div>
);

const ProjectCard = ({ percentage, title, delay = 0 }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className="flex items-center space-x-3 mb-3"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay + 0.2 }}
      className="w-12 text-sm font-semibold text-[#3D1D1D]"
    >
      {percentage}%
    </motion.div>
    <div className="flex-1">
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className="h-1.5 bg-[#3D1D1D] rounded-full"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="mt-1 text-xs text-[#3D1D1D]"
      >
        {title}
      </motion.p>
    </div>
  </motion.div>
);

const EquivalentCard = ({
  icon: Icon,
  value,
  label,
  delay = 0,
}: EquivalentCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.05, translateY: -5 }}
    className="flex flex-col items-center text-center p-3"
  >
    <motion.div
      initial={{ rotate: -180, scale: 0.5 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: delay + 0.2, type: "spring" }}
      className="bg-emerald-50 p-3 rounded-full mb-2"
    >
      <Icon className="w-5 h-5 text-[#3D1D1D]" />
    </motion.div>
    <motion.h4
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay + 0.4 }}
      className="text-base font-semibold text-[#3D1D1D]"
    >
      {value}
    </motion.h4>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay + 0.5 }}
      className="text-xs text-[#3D1D1D]"
    >
      {label}
    </motion.p>
  </motion.div>
);

const GreeneryBanner = () => {
  return (
    <div className="h-auto w-full mx-auto bg-gradient-to-br from-[#3d1d1d39] to-[#3d1d1d9d] p-4 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between"
        >
          <h1 className="text-lg font-bold text-[#3D1D1D] mb-2">
            Sustainability Impact
          </h1>
          <p className="text-sm text-[#3D1D1D]">Since April 2024</p>
        </motion.div>

        <div className="flex  flex-col sm:flex-row justify-between gap-x-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/30 backdrop-blur-sm p-4 rounded-xl mb-2 max-w-full w-full"
          >
            <h2 className="text-lg font-semibold text-[#3D1D1D] mb-4">
              Top 3 Initiatives Impact
            </h2>
            <ProjectCard
              percentage={35}
              title="Renewable Energy Implementation"
              delay={0.4}
            />
            <ProjectCard
              percentage={28}
              title="Sustainable Agriculture Programs"
              delay={0.6}
            />
            <ProjectCard
              percentage={20}
              title="Urban Green Space Development"
              delay={0.8}
            />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 mb-2 w-full">
            <ImpactCard
              icon={Users}
              value="450"
              label="Active Participants"
              delay={0.2}
            />
            <ImpactCard
              icon={Recycle}
              value="4500 kg"
              label="CO2e Reduced"
              delay={0.4}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-[#3D1D1D] pb-2">
            Environmental Equivalents
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 bg-white/30 backdrop-blur-sm p-1 rounded-xl">
            <EquivalentCard
              icon={Lightbulb}
              value="1580 days"
              label="of energy saved"
              delay={0.6}
            />
            <EquivalentCard
              icon={Leaf}
              value="75 seedlings"
              label="grown for 12 years"
              delay={0.8}
            />
            <EquivalentCard
              icon={Recycle}
              value="156 bags"
              label="of waste recycled"
              delay={1.0}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GreeneryBanner;
