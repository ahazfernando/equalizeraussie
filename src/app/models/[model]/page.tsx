import { Layout } from "@/components/layout/Layout";
import ModelPageComponent from "@/pages/ModelPage";

interface ModelPageProps {
  params: Promise<{ model: string }>;
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { model } = await params;
  
  return (
    <Layout>
      <ModelPageComponent modelId={model} />
    </Layout>
  );
}


