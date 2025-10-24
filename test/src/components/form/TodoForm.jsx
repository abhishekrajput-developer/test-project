// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
// } from "@/components/ui/form";

// export default function TodoForm({ addTodo }) {
//   const form = useForm({ defaultValues: { todo: "" } });

//   const onSubmit = (values) => {
//     addTodo(values.todo);
//     form.reset();
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
//         <FormField
//           control={form.control}
//           name="todo"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>New Todo</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter todo" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Add</Button>
//       </form>
//     </Form>
//   );
// }


import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

export default function TodoForm({ addTodo }) {
  const form = useForm({ defaultValues: { todo: "" } });

  const onSubmit = (values) => {
    addTodo(values.todo);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 mb-4 items-end"
      >
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>New Todo</FormLabel>
              <FormControl>
                <Input placeholder="Enter your task..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6">
          Add
        </Button>
      </form>
    </Form>
  );
}
