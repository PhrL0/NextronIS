import { PanelRightOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const paths = location.pathname.split("/");
  paths.shift();

  const breadcrumbs: { title: string; link: string }[] = [];
  paths
    .filter((path) => path != "app")
    .map((p, index) => {
      breadcrumbs.push({
        title: `${p}`,
        link: `/${paths.slice(0, index + 1).join("/")}`,
      });
    });

  return (
    <Header>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem onClick={toggleSidebar}>
            <Button size="icon" variant="ghost">
              <PanelRightOpen size={16} />
            </Button>
          </BreadcrumbItem>
          {breadcrumbs &&
            breadcrumbs.map((b, i) => (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={b.title}>
                  <Link to={breadcrumbs.map((_b) => _b.link).join("")}>
                    {b.title}
                  </Link>
                </BreadcrumbItem>
              </>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </Header>
  );
};
