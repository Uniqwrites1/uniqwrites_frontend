import ServiceCard from "./ServiceCard";

interface Service {
  title: string;
  description: string;
  icon?: string;
}

interface SectionProps {
  title: string;
  services: Service[];
}

export default function ServiceSection({ title, services }: SectionProps) {  return (
    <section className="my-16 px-4">      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">{title}</h2>
        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {services.map((svc, idx) => (
          <ServiceCard key={idx} title={svc.title} description={svc.description} icon={svc.icon} />
        ))}
      </div>
    </section>
  );
}
