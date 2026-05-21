export function useDynamicQuote(
  fromAddressRef: React.RefObject<any>,
  toAddressRef: React.RefObject<any>,
) {
//   const handleSwapAddress = async () => {
//     if (!fromAddressRef.current || !toAddressRef.current) return;

//     const fromVals = fromAddressRef.current.getValues();
//     const toVals = toAddressRef.current.getValues();

//     // Extract states
//     const fromState = fromVals.address?.state;
//     const toState = toVals.address?.state;

//     // 1. Swap WITHOUT state first
//     fromAddressRef.current.setValues({
//       ...toVals,
//       type: "FROM",
//       address: {
//         ...toVals.address,
//         state: "",
//       },
//     });

//     toAddressRef.current.setValues({
//       ...fromVals,
//       type: "TO",
//       address: {
//         ...fromVals.address,
//         state: "",
//       },
//     });

//     // 2. Wait for country/state filtering to update
//     setTimeout(() => {
//       fromAddressRef.current?.setValues("address.state", toState || "", {
//         shouldValidate: true,
//       });

//       toAddressRef.current?.setValues("address.state", fromState || "", {
//         shouldValidate: true,
//       });
//     }, 0);
//   };


    const handleSwapAddress = () => {
    if (fromAddressRef.current && toAddressRef.current) {
      const fromVals = fromAddressRef.current.getValues();
      const toVals = toAddressRef.current.getValues();
      fromAddressRef.current.setValues({ ...toVals, type: "FROM" });
      toAddressRef.current.setValues({ ...fromVals, type: "TO" });
    }
    
    // CONTINUE FROM HERE

//       const validateAllForms = async () => {
//     const fromValid = await fromAddressRef.current?.trigger();
//     const toValid = await toAddressRef.current?.trigger();
//     const dimValid = await dimensionsRef.current?.trigger();

//     let valid = fromValid && toValid && dimValid;

//     // print all valid with false value
//     // console.log("FROM VALID:", fromValid);
//     // console.log("TO VALID:", toValid);
//     // console.log("DIM VALID:", dimValid);

//     if (quoteType === "SPOT") {
//       const contactValid = await contactRef.current?.trigger();
//       const equipmentValid = await equipmentRef.current?.trigger();
//       valid = valid && contactValid && equipmentValid;
//     }

//     if (!valid) {
//       toast.error("Please fill in all required fields correctly.");
//       return false;
//     }

//     return valid;
//   };
//   const buildPayloads = () => {
//     const mergedData = getMergedPayload();

//     return payloadTransformer(mergedData);
//   };

//   const onSubmit = async () => {
//     const valid = await validateAllForms();

//     if (!valid) return;

//     const { finalQuotePayload, shipmentPayload } = buildPayloads();

//     if (isEditing) {
//       if (isShipment) {
//         // console.log("UPDATING SHIPMENT WITH PAYLOAD:", shipmentPayload);
//         updateShipmentMutation.mutate(shipmentPayload);
//       } else {
//         updateQuoteMutation.mutate(finalQuotePayload);
//       }
//     } else {
//       if (isShipment) {
//         createShipmentMutation.mutate(shipmentPayload);
//         // // console.log(shipmentPayload)
//       } else {
//         createQuoteMutation.mutate(finalQuotePayload);
//         // // console.log("FINAL QUOTE PAYLOAD:", finalQuotePayload)
//       }
//     }
//   };

//   const payloadTransformer = (data: any) => {
//     // console.log("THIS IS ADDRESS!!!!", data);
//     const formattedAddresses = data.addresses?.map(
//       (address: any, index: number) => {
//         if (address.addressBookId && !isConversion) {
//           return {
//             addressBookId: address.addressBookId,
//             type: address.type,
//           };
//         }

//         const palletShippingReadyTime = formatTime12h(
//           address.readyTimeHour,
//           address.readyTimeMinute,
//           address.readyTimeAmPm,
//         );

//         const palletShippingCloseTime = formatTime12h(
//           address.closeTimeHour,
//           address.closeTimeMinute,
//           address.closeTimeAmPm,
//         );

//         return {
//           palletShippingReadyTime,
//           palletShippingCloseTime,
//           contactName: address.contactName,
//           phoneNumber: address.phoneNumber,
//           email: address.email,
//           locationType: address.address.locationTypeId,
//           companyName: address.companyName,
//           signatureId: address.signatureId,
//           defaultInstruction: address.defaultInstruction,
//           type: index === 0 ? "FROM" : "TO",
//           ...address.address,
//         };
//       },
//     );

//     // -----------------------------
//     // BASE PAYLOAD
//     // -----------------------------
//     const basePayload = {
//       ...data,
//       addresses: formattedAddresses,
//       quoteType,
//       shipmentType,

//       ...(!isEditing &&
//         quoteStatus !== singleQuote?.quote.status && {
//           status: quoteStatus,
//         }),

//       ...(shipmentType === "STANDARD_FTL" && {
//         ...(data.includeStraps && {
//           includeStraps: data.includeStraps,
//         }),

//         ...(data.appointmentDelivery && {
//           appointmentDelivery: data.appointmentDelivery,
//         }),
//       }),
//     };

//     // -----------------------------
//     // ADDRESS TRANSFORMATION
//     // -----------------------------
//     const transformedAddresses = basePayload.addresses.map((addr: any) => {
//       if (addr.addressBookId) {
//         return {
//           type: addr.type,
//           addressBookId: addr.addressBookId,
//         };
//       }

//       return addr;
//     });

//     const payloadTransformed = {
//       ...basePayload,
//       addresses: transformedAddresses,
//     };

//     // -----------------------------
//     // FTL TRANSFORMATION
//     // -----------------------------
//     let finalQuotePayload = payloadTransformed;

//     if (shipmentType === "STANDARD_FTL") {
//       const firstUnit = payloadTransformed?.lineItem?.units?.[0];

//       const selectedService = firstUnit?.name;

//       const ftlPayload = {
//         ...payloadTransformed,

//         services: {
//           [selectedService]: {
//             totalWeight: firstUnit?.weight,
//             measurementUnit: payloadTransformed?.lineItem?.measurementUnit,
//             totalCount: firstUnit?.count,
//           },
//         },
//       };

//       // remove lineItem from FTL payload
//       const { lineItem, ...rest } = ftlPayload;

//       finalQuotePayload = rest;
//     }

//     // -----------------------------
//     // SHIPMENT PAYLOAD
//     // -----------------------------
//     const shipmentPayload = {
//       shipDate: data.addresses[0].shipDate,
//       mode: "SHIPMENT",
//       shipmentType,
//       quote: { ...finalQuotePayload, status: singleQuote?.quote?.status },
//     };

//     return {
//       finalQuotePayload,
//       shipmentPayload,
//     };
//   };
//   const handleGetRates = async () => {
//     const valid = await validateAllForms();

//     if (!valid) return;

//     if (servicesRef.current) await servicesRef.current.trigger();
//     if (insuranceRef.current) await insuranceRef.current.trigger();
//     if (signatureRef.current) await signatureRef.current.trigger();
//     if (sendRequestRef.current) await sendRequestRef.current.trigger();

//     getRatesRef.current?.handleStart();
//     setGetRatesLoading(true);
//   };
//   const handleBookShipment = async () => {
//     // if (!singleQuote?.quote?.id) {
//     //     toast.error("Quote not found")
//     //     return
//     // }
//     const valid = await validateAllForms();

//     if (!valid) return;

//     if (!selectedCarrier) {
//       toast.error("Please select a carrier");
//       return;
//     }

//     // create shipment first if not created already
//     // if (!singleQuote?.quote?.shipment?.id) {
//     //     bookShipmentMutation.mutate(bookShipmentPayload)
//     // }
//     // else {
//     // }
//     const { finalQuotePayload } = buildPayloads();
//     const newShipmentPayload = {
//       mode: "SHIPMENT",
//       shipmentType: singleQuote?.quote?.shipmentType,
//       shipDate: fromAddress?.shipDate,
//       ...(singleQuote?.quote?.id
//         ? {
//             quote: {
//               shipmentType: singleQuote?.quote?.shipmentType,
//               id: singleQuote?.quote?.id,
//               quoteType: singleQuote?.quote?.quoteType,
//             },
//           }
//         : {
//             quote: { ...finalQuotePayload },
//             shipmentType: shipmentType,
//             quoteType: quoteType,
//           }),
//     };
//     const res = await createShipmentMutation.mutateAsync(newShipmentPayload);
//     setNewlyCreatedQuoteId(res?.quote?.id);
//     // console.log("CREATE SHIPMENT RESPONSE:", res);
//     const bookShipmentPayload = {
//       ...(singleQuote?.quote?.id
//         ? {
//             quoteId: singleQuote?.quote?.id,
//             shipDate: singleQuote?.quote?.shipment?.shipDate,
//           }
//         : {
//             quoteId: res?.quote?.id,
//             shipDate: res?.quote?.shipment?.shipDate,
//           }),
//       carrier: selectedCarrier.carrier,
//       selectedRate: {
//         serviceType: selectedCarrier.serviceType,
//         serviceName: selectedCarrier.serviceName,
//         totalCharge: selectedCarrier.totalPrice,
//         currency: selectedCarrier.currency,
//         ...(selectedCarrier.carrier === "TST" && {
//           packagingType: selectedCarrier.packagingType || "BOX",
//           //   transitDays: selectedCarrier.estimatedDeliveryDays,
//           transitDays: 3,
//         }),
//       },
//     };
//     // console.log("BOOK SHIPMENT PAYLOAD:", bookShipmentPayload);

//     if (res) {
//       bookShipmentMutation.mutate(bookShipmentPayload);
//     }
//   };

//   const handleConvertToShipment = async () => {
//     const valid = await validateAllForms();

//     if (!valid) return;

//     const { finalQuotePayload } = buildPayloads();

//     // // console.log("FINAL QUOTE PAYLOAD:", finalQuotePayload)
//     createQuoteAndConvertToShipmentMutation.mutate(finalQuotePayload);
//   };


  };
  return { handleSwapAddress };
}
