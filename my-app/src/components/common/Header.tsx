// components/common/Header.tsx

import React from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'ログアウトしました',
        status: 'success',
        duration: 3000,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'ログアウトに失敗しました',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200" position="fixed" width="100%" top={0} zIndex={1000}>
      <Flex
        maxW="container.md"
        mx="auto"
        py={3}
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="xl" fontWeight="bold" color="blue.500">
          UTTC-X
        </Text>
        {user && (
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={user.display_name} src={user.profile_image} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};