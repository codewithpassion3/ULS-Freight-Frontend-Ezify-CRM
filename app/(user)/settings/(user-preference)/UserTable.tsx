import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default function UserTable() {
    return (
        <Table>
            <TableHeader className="bg-muted">
                <TableRow className="text-left">
                    <TableHead className="p-3">Name</TableHead>
                    <TableHead className="p-3">User Role</TableHead>
                    <TableHead className="p-3">Date Created</TableHead>
                    <TableHead className="p-3">Permissions</TableHead>
                    <TableHead className="p-3">Last Login</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="p-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                                ULS
                            </div>
                            Sam Ahmed
                        </div>
                    </TableCell>
                    <TableCell className="p-3">Admin</TableCell>
                    <TableCell className="p-3">Sep 20, 2022</TableCell>
                    <TableCell className="p-3 space-y-1 text-sm">
                        <div>Shipping</div>
                        <div>Invoicing</div>
                        <div>Claims</div>
                    </TableCell>
                    <TableCell className="p-3">
                        <div>1:12 PM</div>
                        <div className="text-muted-foreground text-xs">
                            Mar 5, 2026
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}