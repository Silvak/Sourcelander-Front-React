import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";
import HeroGraph from "@/components/landing/HeroGraph";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col  justify-center gap-2">
            <p className="text-primary uppercase text-sm my-8">
              Build Knowledgeable AI
            </p>
            <h1 className="text-4xl md:text-5xl font-bold">
              Find & Hire Expert{" "}
              <span className="text-primary">Freelancers</span>
            </h1>
            <p>
              Work with the best freelance talent from around the world on our
              secure, flexible and cost-effective platform.
            </p>

            <div className="flex gap-2 mt-4">
              <Button>Get Started</Button>
              <Button variant="outline" className="">
                Get Started
              </Button>
            </div>
          </div>

          <div className="">
            <HeroGraph />
          </div>
        </div>
      </Container>

      <ContainerSmall>
        <div className="flex flex-col gap-0">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p>
            Our platform is designed to make it easy for you to find and hire
            the best freelance talent from around the world.
          </p>
        </div>
      </ContainerSmall>

      <Container>
        <h1 className="text-4xl font-bold">
          Encuentra el mejor desarrollador para tu proyecto
        </h1>
      </Container>
      <Container>
        <h1 className="text-4xl font-bold">
          Encuentra el mejor desarrollador para tu proyecto
        </h1>
      </Container>
    </div>
  );
}
