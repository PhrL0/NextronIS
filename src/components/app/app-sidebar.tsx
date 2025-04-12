import { useAuth } from '@/context/auth-context';
import { useUserDecode } from '@/hooks/use-user';
import { Bot, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../layout';
import Typography from '../typography';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { MorphingPopover, MorphingPopoverContent, MorphingPopoverTrigger } from '../ui/morphing-popover';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '../ui/sidebar';

export const AppSidebar = () => {
  const navigate = useNavigate();

  const sidebarItems = useMemo(
    () => [
      {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard />,
        onClick: () => {
          navigate('/app');
        }
      },
      {
        key: 'Ai',
        label: 'Ai',
        icon: <Bot />,
        onClick: () => {
          navigate('ai');
        }
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <Settings />,
        onClick: () => {
          navigate('settings');
        }
      }
    ],
    [navigate]
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton className="cursor-pointer" onClick={item.onClick} key={item.key}>
                  {item.icon}
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="relative">
        <UserCard />
      </SidebarFooter>
    </Sidebar>
  );
};

const UserCard = () => {
  const { logout } = useAuth();
  const user = useUserDecode();
  const { open } = useSidebar();
  const menuButtons = useMemo(
    () => [
      {
        label: 'Configurações',
        icon: <Settings />,
        onClick: () => {},
        variant: 'ghost'
      },
      {
        label: 'Sair',
        icon: <LogOut />,
        onClick: logout,
        variant: 'destructive'
      }
    ],
    [logout]
  );
  if (open)
    return (
      <MorphingPopover>
        <MorphingPopoverTrigger asChild>
          <Card className="w-full cursor-pointer p-4">
            <Flex gap={'middle'} align="center" justify="start">
              <Avatar>
                <AvatarImage src="" alt="Imagem do usuario" />
                <AvatarFallback>
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
              <Flex vertical className="gap-0">
                <Typography.Title className="text-sm">{user.username}</Typography.Title>
                <Typography.Text className="text-xs text-neutral-600">{user.email}</Typography.Text>
              </Flex>
            </Flex>
          </Card>
        </MorphingPopoverTrigger>
        <MorphingPopoverContent className="bottom-0 w-full space-y-4">
          {menuButtons.map((button) => (
            <Button className="w-full" variant={button.variant} onClick={button.onClick} key={button.label}>
              {button.icon} {button.label}
            </Button>
          ))}
        </MorphingPopoverContent>
      </MorphingPopover>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="cursor-pointer">
          <User />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuButtons.map((button) => (
            <DropdownMenuItem variant={button.variant} onClick={button.onClick} key={button.label}>
              {button.icon} {button.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
