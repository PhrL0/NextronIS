import { PanelRightOpen } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '../../../../shared/components/atom/breadcrumb';
import { Button } from '../../../../shared/components/atom/button';
import { Header } from '../../../../shared/components/atom/layout';
import { ModeToggle } from '../../../../shared/components/molecules/mode-toggle';
import { useSidebar } from '../../../../shared/components/organisms/sidebar';

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
    <Header className="sticky top-0 z-10 justify-between">
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
