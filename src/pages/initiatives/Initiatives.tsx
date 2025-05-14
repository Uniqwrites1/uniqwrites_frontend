import React from 'react';
import { Link } from 'react-router-dom';
import ReadMore from '../../components/common/ReadMore';
import SectionTitle from '../../components/common/SectionTitle';
import literacyImage from '../../assets/images/literacy.jpg';
import backToSchoolImage from '../../assets/images/back_to_school.jpg';

const InitiativeCard: React.FC<{
  title: string;
  description: string;
  content: React.ReactNode;
  imageSrc: string;
  sponsorLink: string;
  volunteerLink: string;
  imageOnRight?: boolean;
}> = ({ title, description, content, imageSrc, sponsorLink, volunteerLink, imageOnRight = true }) => {
  const contentOrder = imageOnRight ? 'md:order-1' : 'md:order-2';
  const imageOrder = imageOnRight ? 'md:order-2' : 'md:order-1';

  return (
    <div className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className={`flex-1 p-8 flex flex-col justify-between ${contentOrder}`}>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-black">{title}</h2>
          <p className="text-lg text-gray-700 mb-6">{description}</p>
          <div className="text-gray-700 prose max-w-none">
            <ReadMore>
              <div className="space-y-6">
                {content}
              </div>
            </ReadMore>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to={sponsorLink}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors text-center font-semibold"
          >
            Become a Sponsor
          </Link>
          <Link
            to={volunteerLink}
            className="bg-black text-yellow-400 px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors text-center font-semibold"
          >
            Join as Volunteer
          </Link>
        </div>
      </div>
      <div className={`md:w-[400px] ${imageOrder}`}>
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-[300px] object-cover"
        />
      </div>
    </div>
  );
};

const BackToSchoolContent = () => (
  <>
    <p className="text-lg mb-6">
      For too many children and youths, education is not a right—it's a lost dream. They once walked into classrooms full of hope, but somewhere along the way, life happened. Poverty, family struggles, discouragement, or learning difficulties pushed them out, and now, the streets have become their new classrooms. But we refuse to let dreams fade and potentials go untapped.
    </p>

    <div>
      <SectionTitle>Why This Matters</SectionTitle>
      <p></p>
    </div>
    <div>
      <SectionTitle>How We Make a Difference</SectionTitle>
      <p>
        We're taking action where it matters most—on the streets, in communities, and in forgotten places, seeking out those who have fallen through the cracks. We listen to their stories, understand their struggles, and work to remove the barriers keeping them from school. Whether it's providing financial aid, mentorship, tutoring, or simply reigniting their confidence, we will do whatever it takes to bring them back into learning spaces where they belong.
      </p>
    </div>

    <div>
      <SectionTitle>The Heart Behind This Mission</SectionTitle>
      <p>
        Imagine a child forced to trade school for survival. A brilliant mind, full of potential, now navigating life without the basic tools to thrive. What if that child had just one more chance? We are here to give that chance—to help them rediscover the power of education and find their way back to the classrooms where dreams are built and destinies are shaped.
      </p>
    </div>

    <div>
      <SectionTitle>Join Us in Changing Lives</SectionTitle>
      <p>
        This is more than an initiative; it's a rescue mission for lost dreams. With your support, we can pull children out of the margins and place them back where they belong—in school, in hope, in a future they deserve. Every child deserves a comeback. Let's make it happen, together. Will you join us?
      </p>
    </div>
  </>
);

const LiteracyContent = () => (
  <>
    <p className="text-lg">
      Imagine a world where a child's potential is never limited by their ability to read. Yet, for many students in public secondary schools, literacy remains a barrier—blocking their dreams, confidence, and future opportunities. We believe that every individual deserves the power of literacy, no matter their background or circumstances.
    </p>

    <div>
      <SectionTitle>Why This Matters</SectionTitle>
      <p>
        Without the ability to read, write, and communicate effectively, students are denied access to limitless opportunities in education, personal growth, and economic participation.
      </p>
    </div>

    <div>
      <SectionTitle>The Story That Inspired This Mission</SectionTitle>
      <p>
        When I was in primary school, I struggled with literacy. I was constantly behind in class, and no matter how hard I tried, I just couldn't keep up. But everything changed when a literacy specialist used unique techniques to teach me how to read. Almost overnight, I went from being at the bottom of the class to excelling beyond expectations. That transformation changed my life, and I never forgot the children who lost interest in school simply because reading was a challenge they couldn't overcome.
      </p>
    </div>

    <div>
      <SectionTitle>Our Mission</SectionTitle>
      <p>
        We are stepping into public secondary schools—where countless students still struggle with reading, spelling, and speaking the language that is key to their future. Through intensive literacy programs, we will equip them with the skills they need to thrive.
      </p>
    </div>

    <div>
      <SectionTitle>Join the Movement</SectionTitle>
      <p>
        This is more than just an initiative—it's a lifeline for students who have been left behind. Partner with us to break the cycle of illiteracy and unlock a future where no child is left in the shadows of their own potential.
      </p>
    </div>
  </>
);

const Initiatives: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-black mb-12">
          Our Initiatives
        </h1>

        <div className="space-y-16">
          <InitiativeCard
            title="Literacy Immersion Outreach"
            description="Join us in our mission to enhance literacy rates across communities. Through our Literacy Immersion program, we provide educational resources, conduct reading workshops, and empower individuals with essential learning tools."
            content={<LiteracyContent />}
            imageSrc={literacyImage}
            sponsorLink="/initiatives/literacy/sponsor"
            volunteerLink="/initiatives/literacy/volunteer"
          />

          <InitiativeCard
            title="Back-to-School Initiative"
            description="Help students start their academic year with confidence. Our Back-to-School initiative provides essential school supplies, uniforms, and educational materials to students in need."
            content={<BackToSchoolContent />}
            imageSrc={backToSchoolImage}
            sponsorLink="/initiatives/backtoschool/sponsor"
            volunteerLink="/initiatives/backtoschool/volunteer"
            imageOnRight={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Initiatives;