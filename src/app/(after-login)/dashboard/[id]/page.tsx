import { Metadata } from 'next';
import ColumnList from '@/components/columns/ColumnList';
import { Dashboard, dashboardSchema } from '@/apis/dashboards/types';
import axiosServerHelper from '@/utils/network/axiosServerHelper';
import { safeResponse } from '@/utils/network/safeResponse';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const response = await axiosServerHelper<Dashboard>(`/dashboards/${id}`);
  const dashboardDetail = safeResponse(response.data, dashboardSchema);
  return {
    title: `Taskify - ${dashboardDetail.title}`,
    description: 'Taskify 대시보드에서 커뮤니티 일정을 한눈에 관리해 보세요.',
    keywords: ['일정', '공유', '커뮤니티', '할 일', 'Taskify'],
    openGraph: {
      title: `Taskify - ${dashboardDetail.title}`,
      description: 'Taskify 대시보드에서 커뮤니티 일정을 한눈에 관리해 보세요.',
      url: `https://taskify-lab.vercel.app/dashboard/${id}`,
      type: 'website',
      images: [
        {
          url: 'https://taskify-lab.vercel.app/meta.png',
          width: 1200,
          height: 630,
          alt: 'Taskify 대시보드 페이지 이미지',
        },
      ],
    },
  };
}

export default async function DashboardDetailPage() {
  return <ColumnList />;
}
