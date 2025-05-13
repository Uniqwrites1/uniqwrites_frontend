import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, Users, School } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
}

const iconMap: { [key: string]: JSX.Element } = {
  BookOpen: <BookOpen />,
  Users: <Users />,
  School: <School />,
};

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`border rounded-xl p-4 bg-white shadow-md transition-transform duration-300 transform ${
        isHovered ? "scale-105 shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={title}
    >
      <div className="flex items-center gap-4">
        {icon && iconMap[icon]}
        <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      </div>
      <div
        className={`mt-2 text-sm text-gray-600 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {description}
      </div>
    </div>
  );
}
