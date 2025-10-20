import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/core/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/shared/components/ui/card";
import { Separator } from "@/core/shared/components/ui/separator";
import type { EmployeeDetail } from "@fludge/entities/employee.entity";
import { usePermissions } from "@fludge/react-auth/permissions.provider";

interface Props {
  employee: EmployeeDetail;
}

export function EmployeeSectionHeader({ employee }: Props) {
  const { userHasPermissions } = usePermissions();

  const userCanDeleteEmployee = userHasPermissions("users:delete");

  return (
    <header className="mx-2 space-y-5">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-2xl">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="text-sm text-muted-foreground">{employee.id}</p>
        </div>
      </div>

      <div>
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Resumen</CardTitle>
              <CardDescription>
                Información general del empleado
              </CardDescription>
            </div>
            <div>
              {userCanDeleteEmployee && (
                <Button variant="destructive">
                  <Trash2Icon /> Eliminar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex justify-between h-12 items-center">
            <div className="flex-1 mx-2">
              <h3 className="text-xs font-semibold text-muted-foreground">
                Nombres
              </h3>
              <p>{employee.firstName}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex-1 mx-2">
              <h3 className="text-xs font-semibold text-muted-foreground">
                Apellidos
              </h3>
              <p>{employee.lastName}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex-1 mx-2">
              <h3 className="text-xs font-semibold text-muted-foreground">
                Creado el
              </h3>
              <p>
                {formatDistanceToNow(employee.createdAt, {
                  addSuffix: true,
                  locale: es,
                })}
              </p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex-1 mx-2">
              <h3 className="text-xs font-semibold text-muted-foreground">
                Grupos asigndados
              </h3>
              <p>{employee.groups.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  );
}
