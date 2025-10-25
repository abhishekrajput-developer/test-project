// wihout aws
// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

// export default function TodoForm({ addTodo }) {
//   const form = useForm({ defaultValues: { todo: "" } });

//   const onSubmit = (values) => {
//     addTodo(values.todo);
//     form.reset();
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex gap-3 mb-4 items-end"
//       >
//         <FormField
//           control={form.control}
//           name="todo"
//           render={({ field }) => (
//             <FormItem className="flex-1">
//               <FormLabel>New Todo</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your task..." {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="mt-6">
//           Add
//         </Button>
//       </form>
//     </Form>
//   );
// }


// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; // ✅ Added FormMessage
// import { Loader2, UploadCloud } from "lucide-react"; // ✅ Added icons
// import { useState } from "react"; // ✅ Added useState
// import { uploadTodoFile } from "@/services/todoServices"; // ✅ Import upload service
// import toast from "react-hot-toast"; // ✅ Import toast

// export default function TodoForm({ addTodo }) {
//   const form = useForm({ defaultValues: { todo: "", file: null } }); // ✅ Added file to defaultValues
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadingFile, setUploadingFile] = useState(false);
//   const [uploadedFileDetails, setUploadedFileDetails] = useState({
//     url: null,
//     name: null,
//   });
//   const [isAddingTodo, setIsAddingTodo] = useState(false); // For overall todo submission

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setUploadedFileDetails({ url: null, name: null }); // Reset if a new file is selected
//       form.clearErrors("file"); // Clear any previous file errors
//     } else {
//       setSelectedFile(null);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       form.setError("file", { type: "required", message: "Please select a file to upload." });
//       return;
//     }

//     setUploadingFile(true);
//     try {
//       const response = await uploadTodoFile(selectedFile);
//       setUploadedFileDetails({ url: response.fileUrl, name: response.fileName });
//       toast.success("File uploaded successfully!");
//       form.setValue("file", null); // Clear file input visual after upload
//       setSelectedFile(null); // Clear selected file from state
//     } catch (error) {
//       console.error("File upload failed:", error);
//       toast.error(error.response?.data?.message || "File upload failed.");
//       setUploadedFileDetails({ url: null, name: null });
//       form.setError("file", { type: "manual", message: error.response?.data?.message || "Upload failed." });
//     } finally {
//       setUploadingFile(false);
//     }
//   };

//   const onSubmit = async (values) => {
//     // Check if a file was selected but not uploaded
//     if (selectedFile && !uploadedFileDetails.url) {
//       form.setError("file", { type: "manual", message: "Please upload the selected file first." });
//       return;
//     }

//     if (!values.todo.trim()) {
//       form.setError("todo", { type: "required", message: "Todo text cannot be empty." });
//       return;
//     }

//     setIsAddingTodo(true);
//     try {
//       await addTodo(values.todo, uploadedFileDetails.url, uploadedFileDetails.name); // Pass file details
//       form.reset();
//       setUploadedFileDetails({ url: null, name: null }); // Reset uploaded file info
//       toast.success("Todo added!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add todo.");
//     } finally {
//       setIsAddingTodo(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col gap-4 mb-4"
//       >
//         <div className="flex gap-3 items-end">
//           <FormField
//             control={form.control}
//             name="todo"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>New Todo</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your task..." {...field} disabled={isAddingTodo || uploadingFile} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" className="mt-6" disabled={isAddingTodo || uploadingFile}>
//             {isAddingTodo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Add"}
//           </Button>
//         </div>

//         <div className="flex gap-3 items-end">
//           <FormField
//             control={form.control}
//             name="file"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormLabel>Attach File (PNG, JPG, PDF, max 5MB)</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="file"
//                     onChange={handleFileChange}
//                     disabled={isAddingTodo || uploadingFile}
//                     accept=".png,.jpg,.jpeg,.pdf"
//                   />
//                 </FormControl>
//                 {selectedFile && !uploadedFileDetails.url && (
//                   <p className="text-sm text-gray-500 mt-1">Selected: {selectedFile.name}</p>
//                 )}
//                 {uploadedFileDetails.url && (
//                   <p className="text-sm text-green-600 mt-1">Uploaded: {uploadedFileDetails.name}</p>
//                 )}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleFileUpload}
//             disabled={!selectedFile || uploadingFile || isAddingTodo}
//             className="mt-6 flex items-center"
//           >
//             {uploadingFile ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               <UploadCloud className="mr-2 h-4 w-4" />
//             )}
//             Upload File
//           </Button>
//         </div>

//         {form.formState.errors.todo && (
//           <p className="text-red-500 text-sm mt-1">{form.formState.errors.todo.message}</p>
//         )}
//         {form.formState.errors.file && (
//           <p className="text-red-500 text-sm mt-1">{form.formState.errors.file.message}</p>
//         )}
//       </form>
//     </Form>
//   );
// }


import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Loader2, UploadCloud, File as FileIcon, XCircle } from "lucide-react";
import { useState } from "react";
import { uploadTodoFile } from "@/services/todoServices";
import toast from "react-hot-toast";

// Shadcn Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function TodoForm({ addTodo }) {
  const form = useForm({ defaultValues: { todo: "" } });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFileDetails, setUploadedFileDetails] = useState({
    url: null,
    name: null,
  });
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadedFileDetails({ url: null, name: null });
      form.clearErrors("file");
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      form.setError("file", { type: "required", message: "Please select a file to upload." });
      return;
    }

    setUploadingFile(true);
    try {
      const response = await uploadTodoFile(selectedFile);
      setUploadedFileDetails({ url: response.fileUrl, name: response.fileName });
      toast.success("File uploaded successfully!");
      // Optionally close the dialog after successful upload
      // setIsUploadDialogOpen(false);
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error(error.response?.data?.message || "File upload failed.");
      setUploadedFileDetails({ url: null, name: null });
      form.setError("file", { type: "manual", message: error.response?.data?.message || "Upload failed." });
    } finally {
      setUploadingFile(false);
    }
  };

  const clearUploadedFile = () => {
    setUploadedFileDetails({ url: null, name: null });
    setSelectedFile(null);
    const fileInput = document.getElementById("file-upload-input");
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (values) => {
    if (!values.todo.trim()) {
      form.setError("todo", { type: "required", message: "Todo text cannot be empty." });
      return;
    }

    setIsAddingTodo(true);
    try {
      await addTodo(values.todo, uploadedFileDetails.url, uploadedFileDetails.name);
      form.reset();
      clearUploadedFile(); // Clear any attached file after successful todo creation
      toast.success("Todo added!");
      setIsUploadDialogOpen(false); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to add todo.");
    } finally {
      setIsAddingTodo(false);
    }
  };

  // Determine if the add button should be disabled
  const isAddButtonDisabled = isAddingTodo || uploadingFile || !form.getValues("todo").trim();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="flex gap-2 items-end"> {/* Reduced gap for tighter fit */}
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-0"> {/* flex-1 to allow input to grow, min-w-0 to prevent overflow */}
                <FormLabel className="sr-only">New Todo</FormLabel> {/* Label is now visually hidden */}
                <FormControl>
                  <Input placeholder="Enter your task..." {...field} disabled={isAddingTodo || uploadingFile} />
                </FormControl>
                {/* FormMessage for todo will appear below the whole input group if space allows */}
              </FormItem>
            )}
          />

          {/* Buttons Group */}
          {uploadedFileDetails.url ? (
            <div className="flex items-center gap-1 text-sm text-green-600 whitespace-nowrap">
              <FileIcon className="w-4 h-4" />
              <span className="truncate max-w-[80px]" title={uploadedFileDetails.name}>
                {uploadedFileDetails.name}
              </span>
              <Button variant="ghost" size="icon" onClick={clearUploadedFile} className="h-6 w-6">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="sr-only">Remove attached file</span>
              </Button>
            </div>
          ) : (
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm" // Use small size for tighter fit
                  disabled={isAddingTodo || uploadingFile}
                  className="flex items-center whitespace-nowrap" // Prevent wrapping
                >
                  <UploadCloud className="mr-1 h-4 w-4" /> {/* Smaller margin for icon */}
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogDescription>
                    Select a file (PNG, JPG, JPEG, PDF, max 5MB) to attach to your todo.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormItem>
                    <FormLabel htmlFor="file-upload-input">Select File</FormLabel>
                    <Input
                      id="file-upload-input"
                      type="file"
                      onChange={handleFileChange}
                      disabled={uploadingFile}
                      accept=".png,.jpg,.jpeg,.pdf"
                    />
                    {selectedFile && !uploadedFileDetails.url && (
                      <p className="text-sm text-gray-500 mt-1">Selected: {selectedFile.name}</p>
                    )}
                    {uploadedFileDetails.url && (
                      <p className="text-sm text-green-600 mt-1">Uploaded: {uploadedFileDetails.name}</p>
                    )}
                    <FormMessage>{form.formState.errors.file?.message}</FormMessage>
                  </FormItem>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="button"
                    onClick={handleFileUpload}
                    disabled={!selectedFile || uploadingFile}
                  >
                    {uploadingFile ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <UploadCloud className="mr-2 h-4 w-4" />
                    )}
                    {uploadedFileDetails.url ? "Re-upload" : "Upload to AWS"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <Button type="submit" disabled={isAddButtonDisabled} size="default"> {/* Ensure consistent button size */}
            {isAddingTodo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Add"}
          </Button>
        </div>

        {form.formState.errors.todo && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.todo.message}</p>
        )}
      </form>
    </Form>
  );
}