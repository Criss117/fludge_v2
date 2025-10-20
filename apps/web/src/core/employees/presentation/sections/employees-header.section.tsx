import { Button } from "@/core/shared/components/ui/button";
import { Link } from "@tanstack/react-router";
import { EmployeesSummaryTable } from "../components/employees-summary-table/index";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { usePermissions } from "@fludge/react-auth/permissions.provider";

interface Props {
  totalEmployees: number;
  businessSlug: string;
}

export function EmployeesHeaderSection({
  totalEmployees,
  businessSlug,
}: Props) {
  const { userHasPermissions } = usePermissions();
  const { table } = EmployeesSummaryTable.useEmployeesTable();

  const selectedRows = table.getSelectedRowModel().rows.length;

  const userCanDeleteEmployees = userHasPermissions("users:delete");
  const userCanCreateEmployees = userHasPermissions("users:create");
  return (
    <header className="flex justify-between">
      <div>
        <h2 className="text-2xl font-semibold">
          Listado de Emplados ({totalEmployees}
          {selectedRows > 0 && `/${selectedRows}`})
        </h2>
      </div>
      <div className="space-x-2">
        {userCanDeleteEmployees && (
          <Button variant="destructive" disabled>
            <Trash2Icon /> Eliminar
          </Button>
        )}
        {userCanCreateEmployees && (
          <Button asChild>
            <Link
              to="/businesses/$businessslug/employees/create"
              params={{
                businessslug: businessSlug,
              }}
            >
              <PlusCircleIcon />
              Crear Empleado
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
