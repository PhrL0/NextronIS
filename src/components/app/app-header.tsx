import { PanelRightOpen } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header } from '../layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Button } from '../ui/button';
import { ModeToggle } from '../ui/mode-toggle';
import { useSidebar } from '../ui/sidebar';

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const breadcrumbs: { title: string; link: string }[] = [];

  pathnames
    .filter((path) => path != 'app')
    .map((p, index) => {
      breadcrumbs.push({
        title: `${p}`,
        link: `${index == 0 ? 'app/' : ''}${p}`
      });
    });

  return (
    <Header className="justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem onClick={toggleSidebar}>
            <Button size="icon" variant="ghost">
              <PanelRightOpen size={16} />
            </Button>
          </BreadcrumbItem>

          {breadcrumbs &&
            breadcrumbs.map((b, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link
                    to={`/${breadcrumbs
                      .slice(0, index + 1)
                      .map((_b) => _b.link)
                      .join('/')}`}
                  >
                    {b.title}
                  </Link>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <ModeToggle />
    </Header>
  );
};
