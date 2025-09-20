import logo from '@/assets/logo.png';
import logoMinimal from '@/assets/LogoMinimal.png';
import { useAuth } from '@/context/auth-context';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components/atom/collapsible';
import { useUserDecode } from '@/shared/hooks/use-user';
import {
  Bot,
  ChevronDown,
  Circle,
  ClipboardPenLine,
  Dot,
  Factory,
  LayoutDashboard,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import { JSX, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../shared/components/atom/avatar';
import { Button } from '../../../../shared/components/atom/button';
import { Card } from '../../../../shared/components/atom/card';
import { Flex } from '../../../../shared/components/atom/layout';
import Typography from '../../../../shared/components/atom/typography';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../../shared/components/molecules/dropdown-menu';
import {
  MorphingPopover,
  MorphingPopoverContent,
  MorphingPopoverTrigger
} from '../../../../shared/components/organisms/morphing-popover';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '../../../../shared/components/organisms/sidebar';

export const AppSidebar = () => {
  const navigate = useNavigate();
  const { open } = useSidebar();

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
        key: 'machines',
        label: 'Machines',
        icon: <Factory />,
        onClick: () => {
          navigate('/app/machines');
        }
      },
      {
        key: 'register',
        label: 'Register',
        icon: <ClipboardPenLine />,
        onClick: () => {},
        children: [
          {
            key: 'register-machine-type',
            label: 'Machine Type',
            icon: <Dot />,
            onClick: () => {
              navigate('register/machineType');
            }
          },
          {
            key: 'register-role',
            label: 'Roles',
            icon: <Dot />,
            onClick: () => {
              navigate('register/role');
            }
          }
        ]
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <Settings />,
        onClick: () => {
          navigate('settings');
        }
      },
      {
        key: 'Ai',
        label: 'Ai',
        icon: <Bot />,
        onClick: () => {
          navigate('ai');
        }
      }
    ],
    [navigate]
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="m-2">
        <Link to="/">
          <img src={open ? logo : logoMinimal} alt="Logo" className="h-10 w-full object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) =>
              !item.children ? (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton className="cursor-pointer" onClick={item.onClick} key={item.key}>
                    {item.icon}
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <Collapsible className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="cursor-pointer">
                      {item.icon}
                      {item.label}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {item.children.map((subitem) => (
                            <SidebarMenuItem onClick={subitem.onClick} key={item.key}>
                              <SidebarMenuButton className="cursor-pointer">
                                {subitem.icon}
                                {subitem.label}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </CollapsibleContent>
                </Collapsible>
              )
            )}
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
  const menuButtons: {
    label: string;
    icon: JSX.Element;
    onClick: () => void;
    variant: 'link' | 'outline' | 'destructive' | 'default' | 'secondary' | 'ghost' | null | undefined;
  }[] = useMemo(
    () => [
      {
        label: 'Configurações',
        icon: <Settings />,
        onClick: () => {},
        variant: 'outline'
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
        <MorphingPopoverContent className="bottom-0 w-full space-y-4 bg-neutral-100 dark:bg-neutral-950">
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
