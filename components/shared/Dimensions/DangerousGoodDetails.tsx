import { Info } from "lucide-react";
import { GlobalForm } from "@/components/common/form/GlobalForm";

const DangerousGoodsForm = () => {
    return (
        <div className="border border-blue-100 p-6 rounded-sm">
            <p className="text-sm text-slate-700 mb-6">
                Please provide the <span className="font-bold">Dangerous Goods details</span>, as these details will show up on the BOL. Failure to enter this data may result in <span className="font-bold">delayed pickups</span>.
            </p>
            <GlobalForm
                formWrapperClassName="grid grid-cols-1 md:grid-cols-3 gap-4"
                fields={[
                    {
                        name: "lineItem.dangerousGood.type",
                        label: "Dangerous Good Type",
                        type: "radio",
                        options: [
                            { value: "limited", label: "Limited Quantity", icon: <Info size={16} className="fill-blue-900 text-white" /> },
                            { value: "exemption", label: "500 kg Exemption", icon: <Info size={16} className="fill-blue-900 text-white" /> },
                            { value: "regulated", label: "Fully Regulated", icon: <Info size={16} className="fill-blue-900 text-white" /> },
                        ],
                        wrapperClassName: "col-span-3 bg-"
                    },
                    {
                        name: "lineItem.dangerousGood.unNumber",
                        label: "UN #",
                        type: "text",
                        placeholder: "Enter UN #",
                        wrapperClassName: "md:col-span-",
                        className: "bg-white",
                    },
                    {
                        name: "lineItem.dangerousGood.packagingGroup",
                        label: "Packaging Group",
                        type: "select",
                        placeholder: "Select Packaging Group",
                        options: [
                            { value: "pg1", label: "PG I" },
                            { value: "pg2", label: "PG II" },
                            { value: "pg3", label: "PG III" },
                            { value: "none", label: "N/A" },
                        ],
                        className: "bg-white",
                    },
                    {
                        name: "lineItem.dangerousGood.class",
                        label: "Class",
                        type: "text",
                        placeholder: "Enter Class",
                        className: "bg-white",
                    },
                    {
                        name: "lineItem.dangerousGood.technicalName",
                        label: "Technical Name or Description",
                        type: "text",
                        placeholder: "Enter Technical Name or Description",
                        wrapperClassName: "md:col-span-3",
                        className: "bg-white",
                    },
                    {
                        name: "lineItem.dangerousGood.emergencyContactName",
                        label: "24-hr Emergency Contact Name",
                        type: "text",
                        placeholder: "Enter Emergency Contact Name",
                        className: "bg-white",
                    },
                    {
                        name: "lineItem.dangerousGood.emergencyContactPhone",
                        label: "Contact Phone Number",
                        type: "phone",
                        placeholder: "Enter Contact Phone Number",
                        className: "bg-white",
                    },
                ]}
            />
        </div>
    );
};

export default DangerousGoodsForm;