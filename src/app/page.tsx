import Container from "@/components/common/Container";
import ContainerSmall from "@/components/common/ContainerSmall";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Container>
        <h1 className="text-4xl font-bold">
          Encuentra el mejor desarrollador para tu proyecto
        </h1>
      </Container>

      <ContainerSmall>s</ContainerSmall>

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
