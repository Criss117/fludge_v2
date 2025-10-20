import { Link, type LinkOptions } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface PageHeaderProps {
  children: React.ReactNode;
}

interface CommonProps {
  businessSlug?: string;
  isPage?: boolean;
}

interface Product extends CommonProps {
  productId: string;
  productName: string;
}

interface Category extends CommonProps {
  categoryId: string;
  categoryName: string;
}

interface Group extends CommonProps {
  groupSlug: string;
  groupName: string;
}

interface Employee extends CommonProps {
  employeeId: string;
  employeeName: string;
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className="h-10 py-2 flex items-center space-x-2 border-b">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-full" />
      <Breadcrumb>
        <BreadcrumbList>{children}</BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

function BreadcrumbTemplate({
  businessSlug,
  isPage,
  to,
  params,
  label,
}: {
  isPage?: boolean;
  businessSlug?: string;
  label: string;
  to: LinkOptions["to"];
  params?: LinkOptions["params"];
}) {
  return (
    <>
      <BreadcrumbItem>
        {!isPage && businessSlug && (
          <BreadcrumbLink asChild>
            <Link to={to} params={params} className="text-xl font-semibold">
              {label}
            </Link>
          </BreadcrumbLink>
        )}
        {isPage && (
          <BreadcrumbPage className="text-xl font-semibold">
            {label}
          </BreadcrumbPage>
        )}
      </BreadcrumbItem>
      {!isPage && <BreadcrumbSeparator />}
    </>
  );
}

export function PageHeaderHome({ businessSlug, isPage = false }: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Inicio"
      to="/businesses/$businessslug"
      params={{
        businessslug: businessSlug,
      }}
    />
  );
}

export function PageHeaderProducts({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Productos"
      to="/businesses/$businessslug/products"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderProduct({
  businessSlug,
  isPage = false,
  productId,
  productName,
}: Product) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label={productName}
      to="/businesses/$businessslug/products/$productid"
      params={{ businessslug: businessSlug, productid: productId }}
    />
  );
}

export function PageHeaderCreateProduct({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Nuevo Producto"
      to="/businesses/$businessslug/products/create"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderUpdateProduct({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Editar Producto"
      to="/businesses/$businessslug/products/create"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderCategories({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Categorias"
      to="/businesses/$businessslug/categories"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderCategory({
  businessSlug,
  isPage = false,
  categoryId,
  categoryName,
}: Category) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label={categoryName}
      to="/businesses/$businessslug/categories/$categoryid"
      params={{ businessslug: businessSlug, categoryid: categoryId }}
    />
  );
}

export function PageHeaderGroups({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Grupos"
      to="/businesses/$businessslug/groups"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderGroup({
  businessSlug,
  isPage = false,
  groupSlug,
  groupName,
}: Group) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label={groupName}
      to="/businesses/$businessslug/groups/$groupslug"
      params={{ businessslug: businessSlug, groupslug: groupSlug }}
    />
  );
}

export function PageHeaderCreateGroup({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Crear Grupo"
      to="/businesses/$businessslug/groups/create"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderEmployees({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label="Empleados"
      to="/businesses/$businessslug/employees"
      params={{ businessslug: businessSlug }}
    />
  );
}

export function PageHeaderEmployee({
  businessSlug,
  isPage = false,
  employeeId,
  employeeName,
}: Employee) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      label={employeeName}
      to="/businesses/$businessslug/employees/$employeeid"
      params={{ businessslug: businessSlug, employeeid: employeeId }}
    />
  );
}

export function PageHeaderCreateEmployee({
  businessSlug,
  isPage = false,
}: CommonProps) {
  return (
    <BreadcrumbTemplate
      businessSlug={businessSlug}
      isPage={isPage}
      to="/businesses/$businessslug/employees/create"
      params={{
        businessslug: businessSlug,
      }}
      label="Crear Empleado"
    />
  );
}
