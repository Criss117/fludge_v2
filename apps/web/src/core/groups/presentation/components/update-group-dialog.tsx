import { Pencil } from "lucide-react";
import { Button } from "@/core/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/shared/components/ui/dialog";
import { UpdateGroupForm } from "./update-group-form";
import { useState } from "react";
import type { GroupDetail } from "@fludge/entities/group.entity";

interface Props {
  group: GroupDetail;
  businessSlug: string;
}

export function UpdateGroupDialog({ group, businessSlug }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <UpdateGroupForm.Root
          group={group}
          businessSlug={businessSlug}
          options={{
            onSuccess: () => setIsOpen(false),
          }}
        >
          <div className="space-y-5">
            <DialogHeader>
              <DialogTitle>Editar grupo</DialogTitle>
              <DialogDescription>
                Aquí podrás editar el nombre o descripción
              </DialogDescription>
            </DialogHeader>
            <fieldset className="space-y-2">
              <UpdateGroupForm.Name />
              <UpdateGroupForm.Description className="resize-none" />
            </fieldset>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <Button variant="destructive">Cancelar</Button>
              </DialogClose>
              <UpdateGroupForm.Submit />
            </DialogFooter>
          </div>
        </UpdateGroupForm.Root>
      </DialogContent>
    </Dialog>
  );
}
