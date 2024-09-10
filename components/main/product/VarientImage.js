import { useFieldArray, useFormContext } from "react-hook-form";
import { UploadDropzone } from "../../../app/api/uploadthing/uoload";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Reorder } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";

function VarientImage() {
  const { getValues, control, setError } = useFormContext();

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: "VariantImages",
  });
  console.log(fields);

  return (
    <div>
      <FormField
        control={control}
        name="VariantImages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <UploadDropzone
                className="ut-allowed-content:text-secondary-foreground ut-lable:text-primary ut-upload-icon:text-primary/50 hover:bg-primary/50 transition-all duration-500 ut-button:border ut-button:bg-primary/75"
                onUploadError={(error) => {
                  setError("VariantImages", {
                    type: "validate",
                    message: error.message,
                  });
                  return;
                }}
                onBeforeUploadBegin={(files) => {
                  files.map((file) =>
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    })
                  );
                  return files;
                }}
                endpoint="variantUploader"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              {/* <TableHead>Name</TableHead> */}
              <TableHead>Size</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Reorder.Group
            as="tbody"
            values={fields}
            onReorder={(e) => {
              const activeElement = fields[active];
              e.map((item, index) => {
                if (item === activeElement) {
                  move(active, index);
                  setActive(index);
                  return;
                }
                return;
              });
            }}>
            {fields.map((field, index) => {
              return (
                <Reorder.Item
                  as="tr"
                  key={field.id}
                  value={field}
                  id={field.id}
                  onDragStart={() => setActive(index)}
                  className={cn(
                    field.url.search("blob:") === 0
                      ? "animate-pulse transition-all"
                      : "",
                    "text-sm font-bold text-muted-foreground hover:text-primary"
                  )}>
                  <TableCell>{index}</TableCell>
                  {/* <TableCell className="line-clamp-1">{field.name}</TableCell> */}
                  <TableCell>
                    {(field.size / (1024 * 1024)).toFixed(2)} MB
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Image
                        src={field.url}
                        alt={field.name}
                        className="rounded-md"
                        width={72}
                        height={48}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"ghost"}
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index);
                      }}
                      className="scale-75">
                      <Trash className="h-4" />
                    </Button>
                  </TableCell>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </Table>
      </div>
    </div>
  );
}

export default VarientImage;
