import { useContext } from "react";
import { useForm } from "@tanstack/react-form";
import Button from "../../../shared/components/Button/Button";
import { type TodoItem } from "../../context/interface";
import DndTodoAppStateContext from "../../context/context";
import { redirect } from "react-router";

const ModalForm = () => {
  const context = useContext(DndTodoAppStateContext);

  if (!context) {
    throw new Error("DndTodoAppStateContext must be used within a provider");
  }

  const { setTaskState } = context;

  const defaimultValues: Partial<TodoItem> = {
    id: "",
    content: "",
    title: "",
    type: "todos",
  };

  const form = useForm({
    defaultValues: defaimultValues,
    onSubmit: (values) => {
      const { title, content } = values.value;
      setTaskState(
        { title, content, id: crypto.randomUUID(), type: "todos" },
        "todos"
      );
      redirect("/page/dndtodolist");
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="flex gap-2 flex-col py-4">
      <form.Field
        name="title"
        children={(field) => (
          <>
            <label className="font-bold text-md" htmlFor={field.name}>
              Title
            </label>
            <input
              type="text"
              className="py-2 px-4 border rounded border-gray-300"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      />
      <form.Field
        name="content"
        children={(field) => (
          <>
            <label className="font-bold text-md" htmlFor={field.name}>
              Content
            </label>
            <textarea
              className="py-2 px-4 border rounded border-gray-300"
              rows={4}
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </>
        )}
      />
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      />
    </form>
  );
};

export default ModalForm;
