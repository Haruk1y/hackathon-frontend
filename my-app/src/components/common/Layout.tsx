// components/common/Layout.tsx

import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './Header.tsx';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Box pt="60px">  {/* ヘッダーの高さ分のパディングを追加 */}
        {children}
      </Box>
    </Box>
  );
};