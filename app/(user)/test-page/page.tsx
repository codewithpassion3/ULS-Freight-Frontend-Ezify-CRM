"use client"
import { z } from "zod"
import { Form } from "@/components/common/forms/Form"
import { Input } from "@/components/ui/input"
import { GlobalForm } from "@/components/common/form/GlobalForm"
import { Button } from "@/components/ui/button"

const userSchema = z.object({
    name: z.string(),
    age: z.number()
})

type UserForm = z.infer<typeof userSchema>

export default function UserFormPage() {
    return (
        <div>
            <GlobalForm
                fields={[
                    {
                        name: "name",
                        label: "Name",
                        placeholder: "Enter name",
                        type: "select",
                        options: [
                            { value: "", label: "Select" },
                            { value: "name", label: "Name" },
                            { value: "age", label: "Age" },
                        ]
                        // error: "Name is required"
                    },
                    {
                        name: "age",
                        label: "Age",
                        placeholder: "Enter age",
                        type: "number",
                    },
                ]}

                schema={userSchema}
                defaultValues={{ name: "", age: 0 }}
                onSubmit={(data) => console.log(data)}
            />
            <Button type="submit">Submit</Button>
        </div>
    )
}