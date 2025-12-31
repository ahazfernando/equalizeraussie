import { Layout } from "@/components/layout/Layout";
import RVDetail from "@/components/models/RVDetail";

interface ModelPageProps {
  params: Promise<{ model: string }>;
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { model } = await params;
  
  return (
    <Layout>
      <RVDetail modelId={model} />
    </Layout>
  );
}


