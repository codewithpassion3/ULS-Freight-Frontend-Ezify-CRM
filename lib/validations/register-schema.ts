import { z } from "zod"

const palletVolumeEnum = z.enum(["1-5", "6-10", "11-20", "21-50", "> 50"])
const packageVolumeEnum = z.enum(["< 25", "26-50", "50-100", "101-300", "> 300"])
export const registerSchema = z.object({
  user: z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must match password"),
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
    username: z.string().min(1, "Username required"),
    signUpCode: z.string().min(1).optional(),
    termsAndConditionAccepted: z
      .boolean("You must accept the Terms and Conditions"),
    // .refine((val) => val, "You must accept the Terms and Conditions"),

    companyPolicyAccepted: z
      .boolean("You must accept the Company Policy"),
    // .refine((val) => val, "You must accept the Company Policy"),
    freightBroker: z.boolean(),
    phoneNumber: z.string().min(1, "Phone number required")
  }).refine((user) => user.password === user.confirmPassword, {
    message: "Passwords do not match",
    path: ["user", "confirmPassword"]
  }),

  company: z.object({
    name: z.string().min(1, "Company name required"),
    industryType: z.string().optional()
  }),

  address: z.object({
    address1: z.string().min(1),
    address2: z.string().optional(),
    city: z.string().min(1),
    unit: z.string().optional(),
    state: z.string().min(1),
    country: z.string().min(1),
    postalCode: z.string().min(1)
  }),

  shippingPreference: z
    .array(
      z.discriminatedUnion("shippingType", [
        z.object({
          shippingType: z.literal("pallet"),
          shippingVolume: palletVolumeEnum.optional()
        }),
        z.object({
          shippingType: z.literal("package"),
          shippingVolume: packageVolumeEnum.optional()
        }),
        z.object({
          shippingType: z.literal("PTL/FTL")
        })
      ])
    )
    .min(1, "Select at least one shipping preference")
})

export type RegisterSchemaTypes = z.infer<typeof registerSchema>