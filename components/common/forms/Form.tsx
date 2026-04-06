"use client"
import React, { useEffect } from "react"
import { useForm, FormProvider, FieldValues, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodType } from "zod"

interface Props<T extends FieldValues> {
    schema?: ZodType<T, any, any>
    defaultValues?: T | Promise<T>
    onSubmit: SubmitHandler<T>
    children: React.ReactNode
}

export function Form<T extends FieldValues>({
    schema,
    defaultValues,
    onSubmit,
    children
}: Props<T>) {
    const methods = useForm<T>({
        resolver: schema ? zodResolver(schema) : undefined,
        mode: "onChange"
    })

    useEffect(() => {
        if (!defaultValues) return

        if (defaultValues instanceof Promise) {
            defaultValues.then((resolved) => {
                methods.reset(resolved)
            })
        } else {
            methods.reset(defaultValues)
        }
    }, [defaultValues, methods])

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}