import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  School, 
  GraduationCap, 
  PenTool, 
  Home, 
  Award,
  Laptop,
  BarChart2,
  Lightbulb,
  Star,
  Briefcase
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
}

const iconMap: { [key: string]: JSX.Element } = {
  BookOpen: <BookOpen />,
  Users: <Users />,
  School: <School />,
  GraduationCap: <GraduationCap />,
  PenTool: <PenTool />,
  Home: <Home />,
  Award: <Award />,
  Laptop: <Laptop />,
  BarChart2: <BarChart2 />,
  Lightbulb: <Lightbulb />,
  Star: <Star />,
  Briefcase: <Briefcase />,
};

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (    <motion.div
      className={`bg-white p-4 rounded-lg border border-gray-100 hover:border-yellow-400 
        shadow hover:shadow-lg transition-all duration-300 group h-full flex flex-col`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      role="button"
      tabIndex={0}
      aria-label={title}
    >
      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-400 transition-colors duration-300">
        {icon && (
          <div className="text-yellow-400 group-hover:text-black transition-colors duration-300">
            {iconMap[icon]}
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2 text-black group-hover:text-yellow-500 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-grow">
        {description}
      </p>
    </motion.div>
  );
}
