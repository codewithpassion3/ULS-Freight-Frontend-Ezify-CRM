import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserProfile } from "@/api/services/auth.api"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import Image from "next/image"
import { useUser } from "@/hooks/useUser"

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    setImageKey: (imageKey: number) => void
}

export default function UploadPhotoModal({ open, setOpen, setImageKey }: Props) {
    const queryClient = useQueryClient()
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selected = acceptedFiles[0]
        if (!selected) return

        setFile(selected)
        setPreview(URL.createObjectURL(selected))
    }, [])
    const { mutate, isPending } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            toast.success("Photo uploaded successfully")
            setPreview(null)
            setFile(null)
            setImageKey(Date.now())
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error?.response?.data?.message)
        }
    })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        },
        maxFiles: 1
    })

    const handleSave = async () => {
        if (!file) return
        const formData = new FormData()
        formData.append("profile_pic", file)

        // call your API here
        // await uploadAvatar(formData)
        mutate(formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Upload Profile Photo</DialogTitle>
                </DialogHeader>

                {preview ? (
                    <div className="flex justify-center">
                        <Image
                            src={preview}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-full"
                        />
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                         ${isDragActive ? "border-primary" : "border-gray-300"}`}
                    >
                        <input {...getInputProps()} />

                        <p className="text-sm text-muted-foreground">
                            Drag & drop your image here, or click to browse
                        </p>
                    </div>
                )}



                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={!file || isPending}
                        onClick={handleSave}
                    >
                        {isPending ? "Saving..." : "Save Photo"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}