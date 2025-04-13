// src/pages/DashboardPage.tsx
import { Flex } from '@/components/layout';
import Typography from '@/components/typography';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <Flex vertical className="p-4">
      <Flex align="center" justify="between" className="mb-4 w-full">
        <Typography.Title>Dashboard</Typography.Title>
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
