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

export default function ServiceSection({ title, services }: SectionProps) {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-6 text-secondary">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((svc, idx) => (
          <ServiceCard key={idx} title={svc.title} description={svc.description} icon={svc.icon} />
        ))}
      </div>
    </section>
  );
}
