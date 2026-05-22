"use client";

import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SideBar } from "../SideBar";
import z from "zod";
import {
  createQuote,
  getSingleQuote,
  updateQuote,
} from "@/api/services/quotes.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { ShippingTypeSelector } from "../Shipping/ShippingTypeSelector";
import { ShippingAddressSection } from "../Shipping/ShippingAddressSection";
import { EquimentTypeSelector } from "../EquimentSelection/EquimentTypeSelector";
import ContactInformation from "../ContactInformation/ContactInformation";
import Dimensions from "../Dimensions/Dimensions";
import AdditionalServices from "../AdditionalService/AdditionalServices";
import AdditionalInsurance from "../AdditionalInsurance/AdditionalInsurance";
import SignaturePreference from "../SignaturePreference/SignaturePreference";
import { Button } from "@/components/ui/button";
import {
  quoteUnionSchema,
  spotShipmentSchema,
  standardShipmentSchema,
} from "@/lib/validations/quote/standard-quote-schema";
import {
  bookShipment,
  createShipment,
  updateShipment,
} from "@/api/services/shipment.api";
import { useRouter } from "next/navigation";
import { Loader, LoaderCircle } from "lucide-react";
import { formatTime12h } from "@/app/(user)/settings/(address-book)/mappers/contact.mapper";
import ShippingRates from "../ShippingRates/ShippingRates";
import SendRequest from "../SendRequest/SendRequest";
import { userAgent } from "next/server";
import { useAuth } from "@/context/auth.context";
import AddFundsModal from "@/components/common/AddFundsModal";
import { useDynamicQuote } from "./DynamicQuote.hooks";
import { ShipmentOptions } from "./DynamicQuote.types";
import { useDynamicQuoteMutations } from "./DynamicQuote.mutations";
import { useDynamicQuotePayloads } from "./DynamicQuote.payload";

export const SchemaContext = createContext<z.ZodType<any> | null>(null);
export default function DynamicQuote({
  quoteType,
  initialShipmentType,
}: {
  quoteType: keyof ShipmentOptions;
  initialShipmentType: ShipmentOptions[keyof ShipmentOptions];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isShipment = pathname.includes("shipment");
  const [shipmentType, setShipmentType] =
    useState<ShipmentOptions[keyof ShipmentOptions]>(initialShipmentType);
  const [quoteStatus, setQuoteStatus] = useState<"DRAFT" | "SAVED">("DRAFT");
  const quoteId = useSearchParams().get("id");
  const [shipmentId, setShipmentId] = useState<string | null>(null);
  const totalSteps = 2;
  // query params include mode=edit/create/view
  const mode = useSearchParams().get("mode");
  const isEditing = mode === "edit";
  const isConversion = mode === "conversion";
  const isSpotQuote = quoteType === "SPOT";
  const isStandardQuote = quoteType === "STANDARD";
  const fromAddressRef = useRef<any>(null);
  const toAddressRef = useRef<any>(null);
  const dimensionsRef = useRef<any>(null);
  const servicesRef = useRef<any>(null);
  const insuranceRef = useRef<any>(null);
  const signatureRef = useRef<any>(null);
  const equipmentRef = useRef<any>(null);
  const contactRef = useRef<any>(null);
  const sendRequestRef = useRef<any>(null);
  const getRatesRef = useRef<any>(null);
  const [getRatesLoading, setGetRatesLoading] = useState(false);
  const [isFetchedQuoteShipment, setIsFetchedQuoteShipment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [openGetRates, setOpenGetRates] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState<any>(null);
  const { user } = useAuth();
  const [inSufficientModal, setInSufficientModal] = useState(false);
  // const handleSwapAddress = () => {
  //   if (fromAddressRef.current && toAddressRef.current) {
  //     const fromVals = fromAddressRef.current.getValues();
  //     const toVals = toAddressRef.current.getValues();
  //     fromAddressRef.current.setValues({ ...toVals, type: "FROM" });
  //     toAddressRef.current.setValues({ ...fromVals, type: "TO" });
  //   }
  // };
  const {
    data: singleQuote,
    isLoading: isSingleQuoteLoading,
    isError: isSingleQuoteError,
    isSuccess: isSingleQuoteSuccess,
  } = useQuery({
    queryKey: ["singleQuote", quoteId],
    queryFn: () => (quoteId ? getSingleQuote(quoteId) : null),
    enabled: !!quoteId,
  });
  const { handleSwapAddress } = useDynamicQuote(fromAddressRef, toAddressRef);
  const {
    createQuoteMutation,
    updateQuoteMutation,
    createShipmentMutation,
    updateShipmentMutation,
    bookShipmentMutation,
    createQuoteAndConvertToShipmentMutation,
  } = useDynamicQuoteMutations({ shipmentId: shipmentId!, quoteId: quoteId! });
  const { buildPayloads, payloadTransformer, getMergedPayload } =
    useDynamicQuotePayloads({
      fromAddressRef,
      toAddressRef,
      dimensionsRef,
      servicesRef,
      insuranceRef,
      signatureRef,
      equipmentRef,
      contactRef,
      sendRequestRef,
      shipmentType,
      quoteType,
      isConversion,
      isEditing,
      quoteStatus,
      singleQuote,
    });
  // const handleNextStep1 = async () => {
  //     const fromValid = await fromAddressRef.current?.trigger()
  //     const toValid = await toAddressRef.current?.trigger()

  //     if (fromValid && toValid) {
  //         dimensionsRef.current?.open()
  //         setCurrentStep(2)
  //     }
  // }

  // const handleNextStep2 = async () => {
  //     const dimValid = await dimensionsRef.current?.trigger()
  //     const equipValid = isSpotQuote ? await equipmentRef.current?.trigger() : true
  //     const contactValid = isSpotQuote ? await contactRef.current?.trigger() : true

  //     if (dimValid && equipValid && contactValid) {
  //         setCurrentStep(3)
  //     }
  // }

  // scroll to section in which there is errors, check by ref



  useEffect(() => {
    if (singleQuote?.quote?.shipment?.id) {
      setShipmentId(singleQuote.quote.shipment.id);
    }
  }, [singleQuote]);

  // const createQuoteMutation = useMutation({
  //   mutationFn: (data: unknown) => createQuote(data),
  //   onSuccess: () => {
  //     toast.success("Quote created successfully");
  //     // router.push("/quotes")
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast.error(error.response?.data.message);
  //   },
  // });

  // const createQuoteAndConvertToShipmentMutation = useMutation({
  //   mutationFn: (data: unknown) => createQuote(data),
  //   onSuccess: (res) => {
  //     router.push(`/shipment/?id=${res.quote.id}&mode=conversion`);
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast.error(error.response?.data.message);
  //   },
  // });

  // const handleCreateShipment = ({ shipmentPayload }: any) => {
  //   createShipmentMutation.mutate(shipmentPayload);
  // };

  // const updateQuoteMutation = useMutation({
  //   mutationFn: (data: unknown) => updateQuote(quoteId!, data),
  //   onSuccess: () => {
  //     toast.success("Quote updated successfully");
  //     router.push("/quotes");
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast.error(error.response?.data.message);
  //   },
  // });

  // //  create shipment mutation
  // const createShipmentMutation = useMutation({
  //   mutationFn: (data: unknown) => createShipment(data),
  //   onSuccess: (res) => {
  //     toast.success("Shipment created successfully");
  //     // router.push("/quotes")
  //     // console.log("CREATE SHIPMENT RESPONSE:", res);
  //     return res.data;
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast.error(error.response?.data.message);
  //   },
  // });
  // const updateShipmentMutation = useMutation({
  //   mutationFn: (data: unknown) => updateShipment(shipmentId!, data),
  //   onSuccess: () => {
  //     toast.success("Shipment updated successfully");
  //     // router.push("/quotes");
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast.error(error.response?.data.message);
  //   },
  // });

  // const bookShipmentMutation = useMutation({
  //   mutationFn: (data: unknown) => bookShipment(data),
  //   onSuccess: (res) => {
  //     toast.success("Shipment booked successfully");
  //     // console.log("CREATE SHIPMENT RESPONSE:", res);
  //     router.push("/track");
  //   },
  //   onError: (error: AxiosError<ApiError>) => {
  //     toast.error(error.response?.data.message);
  //   },
  // });

  const spotShipmentType: any = {
    SPOT_LTL: "LTL_PARTIAL",
    SPOT_FTL: "FULL_TRUCK_LOAD",
    TIME_CRITICAL: "TIME_CRITICAL",
  };

  const fromAddress = fromAddressRef.current?.getValues() || {};
  const toAddress = toAddressRef.current?.getValues() || {};
  const dimensions = dimensionsRef.current?.getValues() || {};
  const services = servicesRef.current?.getValues() || {};
  const insurance = insuranceRef.current?.getValues() || {};
  const signature = signatureRef.current?.getValues() || {};

  const [realTimeData, setRealTimeData] = useState<any>({});
  const [newlyCreatedQuoteId, setNewlyCreatedQuoteId] = useState<any>(null);

  const syncRealTimeData = useCallback(() => {
    setRealTimeData(getMergedPayload());
  }, []);

  // const getMergedPayload = () => {
  //   const fromAddress = fromAddressRef.current?.getValues() || {};
  //   const toAddress = toAddressRef.current?.getValues() || {};
  //   const dimensions = dimensionsRef.current?.getValues() || {};
  //   // these are optional only include if they have some values
  //   const services = servicesRef.current?.getValues() || {};
  //   const insurance = insuranceRef.current?.getValues() || {};
  //   const signature = signatureRef.current?.getValues() || {};
  //   const equipment = equipmentRef.current?.getValues() || {};
  //   const spotContact = contactRef.current?.getValues() || {};
  //   let completePayload = {
  //     addresses: [fromAddress, toAddress],
  //     ...dimensions,
  //   };

  //   const addresses = [];
  //   if (Object.keys(fromAddress).length > 0) addresses.push(fromAddress);
  //   if (Object.keys(toAddress).length > 0) addresses.push(toAddress);

  //   if (insurance?.insurance?.amount > 0) {
  //     completePayload = { ...completePayload, ...insurance };
  //   }
  //   if (Object.keys(services).length > 0) {
  //     completePayload = { ...services, ...completePayload };
  //   }
  //   // equipment
  //   if (Object.keys(equipment).length > 0) {
  //     completePayload = {
  //       ...completePayload,
  //       services: { ...equipment.services },
  //       spotDetails: {
  //         spotEquipment: equipment.spotEquipment,
  //         spotType:
  //           spotShipmentType[
  //             shipmentType as ShipmentOptions[keyof ShipmentOptions]
  //           ],
  //       },
  //     };
  //   }
  //   if (Object.keys(signature).length > 0) {
  //     completePayload = { ...completePayload, ...signature };
  //   }
  //   // spotContact
  //   if (Object.keys(spotContact).length > 0) {
  //     completePayload = {
  //       ...completePayload,
  //       spotDetails: { ...completePayload.spotDetails, ...spotContact },
  //     };
  //   }

  //   const sendRequestData = sendRequestRef.current?.getValues() || {};
  //   if (Object.keys(sendRequestData).length > 0) {
  //     completePayload = { ...completePayload, ...sendRequestData };
  //   }
  //   if (quoteType === "SPOT") {
  //     completePayload = {
  //       ...completePayload,
  //       spotDetails: {
  //         ...equipment,
  //         ...spotContact,
  //         spotType:
  //           spotShipmentType[
  //             shipmentType as ShipmentOptions[keyof ShipmentOptions]
  //           ],
  //       },
  //     };
  //   }
  //   return completePayload;
  // };
  const validateAllForms = async () => {
    const fromValid = await fromAddressRef.current?.trigger();
    const toValid = await toAddressRef.current?.trigger();
    const dimValid = await dimensionsRef.current?.trigger();

    let valid = fromValid && toValid && dimValid;

    // print all valid with false value
    // console.log("FROM VALID:", fromValid);
    // console.log("TO VALID:", toValid);
    // console.log("DIM VALID:", dimValid);

    if (quoteType === "SPOT") {
      const contactValid = await contactRef.current?.trigger();
      const equipmentValid = await equipmentRef.current?.trigger();
      valid = valid && contactValid && equipmentValid;
    }

    if (!valid) {
      toast.error("Please fill in all required fields correctly.");
      return false;
    }

    return valid;
  };
  // const buildPayloads = () => {
  //   const mergedData = getMergedPayload();

  //   return payloadTransformer(mergedData);
  // };

  const onSubmit = async () => {
    const valid = await validateAllForms();

    if (!valid) return;

    const { finalQuotePayload, shipmentPayload } = buildPayloads();

    if (isEditing) {
      if (isShipment) {
        // console.log("UPDATING SHIPMENT WITH PAYLOAD:", shipmentPayload);
        updateShipmentMutation.mutate(shipmentPayload);
      } else {
        updateQuoteMutation.mutate(finalQuotePayload);
      }
    } else {
      if (isShipment) {
        createShipmentMutation.mutate(shipmentPayload);
        // // console.log(shipmentPayload)
      } else {
        createQuoteMutation.mutate(finalQuotePayload);
        // // console.log("FINAL QUOTE PAYLOAD:", finalQuotePayload)
      }
    }
  };

  // const payloadTransformer = (data: any) => {
  //   // console.log("THIS IS ADDRESS!!!!", data);
  //   const formattedAddresses = data.addresses?.map(
  //     (address: any, index: number) => {
  //       if (address.addressBookId && !isConversion) {
  //         return {
  //           addressBookId: address.addressBookId,
  //           type: address.type,
  //         };
  //       }

  //       const palletShippingReadyTime = formatTime12h(
  //         address.readyTimeHour,
  //         address.readyTimeMinute,
  //         address.readyTimeAmPm,
  //       );

  //       const palletShippingCloseTime = formatTime12h(
  //         address.closeTimeHour,
  //         address.closeTimeMinute,
  //         address.closeTimeAmPm,
  //       );

  //       return {
  //         palletShippingReadyTime,
  //         palletShippingCloseTime,
  //         contactName: address.contactName,
  //         phoneNumber: address.phoneNumber,
  //         email: address.email,
  //         locationType: address.address.locationTypeId,
  //         companyName: address.companyName,
  //         signatureId: address.signatureId,
  //         defaultInstruction: address.defaultInstruction,
  //         type: index === 0 ? "FROM" : "TO",
  //         ...address.address,
  //       };
  //     },
  //   );

  //   // -----------------------------
  //   // BASE PAYLOAD
  //   // -----------------------------
  //   const basePayload = {
  //     ...data,
  //     addresses: formattedAddresses,
  //     quoteType,
  //     shipmentType,

  //     ...(!isEditing &&
  //       quoteStatus !== singleQuote?.quote.status && {
  //         status: quoteStatus,
  //       }),

  //     ...(shipmentType === "STANDARD_FTL" && {
  //       ...(data.includeStraps && {
  //         includeStraps: data.includeStraps,
  //       }),

  //       ...(data.appointmentDelivery && {
  //         appointmentDelivery: data.appointmentDelivery,
  //       }),
  //     }),
  //   };

  //   // -----------------------------
  //   // ADDRESS TRANSFORMATION
  //   // -----------------------------
  //   const transformedAddresses = basePayload.addresses.map((addr: any) => {
  //     if (addr.addressBookId) {
  //       return {
  //         type: addr.type,
  //         addressBookId: addr.addressBookId,
  //       };
  //     }

  //     return addr;
  //   });

  //   const payloadTransformed = {
  //     ...basePayload,
  //     addresses: transformedAddresses,
  //   };

  //   // -----------------------------
  //   // FTL TRANSFORMATION
  //   // -----------------------------
  //   let finalQuotePayload = payloadTransformed;

  //   if (shipmentType === "STANDARD_FTL") {
  //     const firstUnit = payloadTransformed?.lineItem?.units?.[0];

  //     const selectedService = firstUnit?.name;

  //     const ftlPayload = {
  //       ...payloadTransformed,

  //       services: {
  //         [selectedService]: {
  //           totalWeight: firstUnit?.weight,
  //           measurementUnit: payloadTransformed?.lineItem?.measurementUnit,
  //           totalCount: firstUnit?.count,
  //         },
  //       },
  //     };

  //     // remove lineItem from FTL payload
  //     const { lineItem, ...rest } = ftlPayload;

  //     finalQuotePayload = rest;
  //   }

  //   // -----------------------------
  //   // SHIPMENT PAYLOAD
  //   // -----------------------------
  //   const shipmentPayload = {
  //     shipDate: data.addresses[0].shipDate,
  //     mode: "SHIPMENT",
  //     shipmentType,
  //     quote: { ...finalQuotePayload, status: singleQuote?.quote?.status },
  //   };

  //   return {
  //     finalQuotePayload,
  //     shipmentPayload,
  //   };
  // };
  const handleGetRates = async () => {
    const valid = await validateAllForms();

    if (!valid) return;

    if (servicesRef.current) await servicesRef.current.trigger();
    if (insuranceRef.current) await insuranceRef.current.trigger();
    if (signatureRef.current) await signatureRef.current.trigger();
    if (sendRequestRef.current) await sendRequestRef.current.trigger();

    getRatesRef.current?.handleStart();
    setGetRatesLoading(true);
  };
  const handleBookShipment = async () => {
    // if (!singleQuote?.quote?.id) {
    //     toast.error("Quote not found")
    //     return
    // }
    const valid = await validateAllForms();

    if (!valid) return;

    if (!selectedCarrier) {
      toast.error("Please select a carrier");
      return;
    }

    // create shipment first if not created already
    // if (!singleQuote?.quote?.shipment?.id) {
    //     bookShipmentMutation.mutate(bookShipmentPayload)
    // }
    // else {
    // }
    const { finalQuotePayload } = buildPayloads();
    const newShipmentPayload = {
      mode: "SHIPMENT",
      shipmentType: singleQuote?.quote?.shipmentType,
      shipDate: fromAddress?.shipDate,
      ...(singleQuote?.quote?.id
        ? {
            quote: {
              shipmentType: singleQuote?.quote?.shipmentType,
              id: singleQuote?.quote?.id,
              quoteType: singleQuote?.quote?.quoteType,
            },
          }
        : {
            quote: { ...finalQuotePayload },
            shipmentType: shipmentType,
            quoteType: quoteType,
          }),
    };
    const res = await createShipmentMutation.mutateAsync(newShipmentPayload);
    setNewlyCreatedQuoteId(res?.quote?.id);
    // console.log("CREATE SHIPMENT RESPONSE:", res);
    const bookShipmentPayload = {
      ...(singleQuote?.quote?.id
        ? {
            quoteId: singleQuote?.quote?.id,
            shipDate: singleQuote?.quote?.shipment?.shipDate,
          }
        : {
            quoteId: res?.quote?.id,
            shipDate: res?.quote?.shipment?.shipDate,
          }),
      carrier: selectedCarrier.carrier,
      selectedRate: {
        serviceType: selectedCarrier.serviceType,
        serviceName: selectedCarrier.serviceName,
        totalCharge: selectedCarrier.totalPrice,
        currency: selectedCarrier.currency,
        ...(selectedCarrier.carrier === "TST" && {
          packagingType: selectedCarrier.packagingType || "BOX",
          //   transitDays: selectedCarrier.estimatedDeliveryDays,
          transitDays: 3,
        }),
      },
    };
    // console.log("BOOK SHIPMENT PAYLOAD:", bookShipmentPayload);

    if (res) {
      bookShipmentMutation.mutate(bookShipmentPayload);
    }
  };

  const handleConvertToShipment = async () => {
    const valid = await validateAllForms();

    if (!valid) return;

    const { finalQuotePayload } = buildPayloads();

    // // console.log("FINAL QUOTE PAYLOAD:", finalQuotePayload)
    createQuoteAndConvertToShipmentMutation.mutate(finalQuotePayload);
  };
  //   const selectedCarrierDetails = useMemo(() => {
  //     return getRatesRef.current?.results.filter(
  //       (result: any) => result.carrier === selectedCarrier,
  //     );
  //   }, [getRatesRef.current?.results, selectedCarrier]);
  //   // console.log("SELECTED CARRIER:", selectedCarrier);
  //   // console.log("tForceRates.quote.serviceType", selectedCarrierDetails);

  const [step, setStep] = useState(1);
  const handleFirstStepValidate = () => {
    const fromValid = fromAddressRef.current?.trigger();
    const toValid = toAddressRef.current?.trigger();
    let valid = fromValid && toValid;

    // print every validation
    if (!valid) {
      toast.error("Please fill in all required fields correctly.");
      return;
    } else {
      setStep(step + 1);
    }
  };

  return (
    <>
      <AddFundsModal
        onOpenChange={setInSufficientModal}
        open={inSufficientModal}
      />
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {!isShipment ? (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold capitalize">
              {isEditing
                ? `Edit ${quoteType.toLowerCase()} Quote`
                : `Create New ${quoteType.toLowerCase()} Quote`}
            </h1>
          </div>
        ) : (
          ""
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <ShippingTypeSelector
                quoteType={quoteType}
                shipmentType={shipmentType}
                setShipmentType={setShipmentType}
              />
              <div className="flex flex-col md:flex-row gap-6">
                <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white dark:bg-card shadow-lg">
                  <ShippingAddressSection
                    setStep={setStep}
                    step={step}
                    isFetchedQuoteShipment={isFetchedQuoteShipment}
                    setIsFetchedQuoteShipment={setIsFetchedQuoteShipment}
                    ref={fromAddressRef}
                    onSwap={handleSwapAddress}
                    quoteType={quoteType}
                    shipmentType={shipmentType}
                    type="FROM"
                    title="Shipping From"
                    onChange={syncRealTimeData}
                  />
                </div>
                <div className="border border-border rounded-md p-4 space-y-4 flex-1 bg-white dark:bg-card shadow-lg">
                  <ShippingAddressSection
                    setStep={setStep}
                    step={step}
                    isFetchedQuoteShipment={isFetchedQuoteShipment}
                    setIsFetchedQuoteShipment={setIsFetchedQuoteShipment}
                    ref={toAddressRef}
                    onSwap={handleSwapAddress}
                    quoteType={quoteType}
                    shipmentType={shipmentType}
                    type="TO"
                    title="Shipping To"
                    onChange={syncRealTimeData}
                  />
                </div>
              </div>
              {/* <Button
                                onClick={handleFirstStepValidate}
                            >
                                Next Step
                            </Button> */}
              {quoteType === "SPOT" ? (
                <div className="space-y-6 mt-6">
                  <EquimentTypeSelector
                    ref={equipmentRef}
                    shipmentType={shipmentType}
                    onChange={syncRealTimeData}
                  />
                </div>
              ) : (
                ""
              )}
              {quoteType === "SPOT" ? (
                <div className="space-y-6 mt-6">
                  <ContactInformation
                    quoteType={quoteType}
                    ref={contactRef}
                    onChange={syncRealTimeData}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="space-y-6 mt-6">
                <Dimensions
                  ref={dimensionsRef}
                  shipmentType={shipmentType}
                  onChange={syncRealTimeData}
                  quoteType={quoteType}
                />
              </div>
              {shipmentType !== "STANDARD_FTL" ? (
                <div className="mt-6">
                  <AdditionalServices
                    quoteType={quoteType}
                    ref={servicesRef}
                    shipmentType={shipmentType}
                    onChange={syncRealTimeData}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-6">
              <AdditionalInsurance ref={insuranceRef} />
            </div>
            {(shipmentType === "PACKAGE" ||
              shipmentType === "COURIER_PAK" ||
              isShipment) && (
              <div className="mt-6">
                <SignaturePreference ref={signatureRef} />
              </div>
            )}
            {quoteType === "SPOT" && (
              <div className="mt-6">
                <SendRequest
                  ref={sendRequestRef}
                  contactInfo={realTimeData?.spotDetails}
                  equipmentDetails={realTimeData?.spotDetails}
                  fromAddress={realTimeData?.addresses?.[0]}
                  toAddress={realTimeData?.addresses?.[1]}
                  dimensions={realTimeData}
                  services={realTimeData?.services}
                  onPrevious={() => {}}
                  onSubmit={onSubmit}
                />
              </div>
            )}
            <div className="mt-6">
              <ShippingRates
                getRatesLoading={getRatesLoading}
                setGetRatesLoading={setGetRatesLoading}
                ref={getRatesRef}
                selectedCarrier={selectedCarrier}
                setSelectedCarrier={setSelectedCarrier}
                openGetRates={openGetRates}
                setOpenGetRates={setOpenGetRates}
                dimensions={dimensions}
                fromAddress={fromAddress}
                toAddress={toAddress}
                quoteId={singleQuote?.quote?.id || newlyCreatedQuoteId}
              />
            </div>

            <div className="w-full z-10 flex justify-end pt-8 sticky bottom-0 bg-white/10 backdrop-blur-md p-5 rounded-lg mt-2">
              <div className="flex gap-4">
                <Button
                  variant={"secondary"}
                  disabled={getRatesLoading}
                  onClick={handleGetRates}
                  className="border border-primary/50"
                >
                  {getRatesLoading ? (
                    <LoaderCircle className="animate-spin mr-2" size={16} />
                  ) : (
                    ""
                  )}
                  Get Rates
                </Button>
                {isShipment ? (
                  <Button
                    onClick={handleBookShipment}
                    disabled={bookShipmentMutation.isPending}
                  >
                    {bookShipmentMutation.isPending ? (
                      <LoaderCircle className="animate-spin mr-2" size={16} />
                    ) : (
                      ""
                    )}
                    Book Shipment
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      // onSubmit()
                      handleConvertToShipment();
                    }}
                    disabled={createQuoteAndConvertToShipmentMutation.isPending}
                  >
                    {createQuoteAndConvertToShipmentMutation.isPending ? (
                      <LoaderCircle className="animate-spin mr-2" size={16} />
                    ) : (
                      ""
                    )}
                    Convert to Shipment
                  </Button>
                )}
              </div>
            </div>
          </div>
          <SideBar
            isPending={
              createQuoteMutation.isPending || updateQuoteMutation.isPending
            }
            onSubmit={onSubmit}
            setQuoteStatus={setQuoteStatus}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </>
  );
}
