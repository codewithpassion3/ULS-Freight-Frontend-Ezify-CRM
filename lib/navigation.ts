export const navItems = [
    { title: "Home", href: "/" },

    {
        title: "Quote",
        items: [
            { title: "All Quotes", href: "/quotes" },
            { title: "Create Quote", href: "/quote" },
            { title: "Create Spot Quote", href: "/spot-quote" },
            { title: "Saved Quotes", href: "/quote/saved" },
        ],
    },

    {
        title: "Ship",
        items: [
            { title: "Create Shipment", href: "/shipment" },
            { title: "Bulk Shipping", href: "/shipment/bulk" },
        ],
    },

    {
        title: "Track",
        items: [
            { title: "Track Shipment", href: "/track" },
            { title: "Tracking History", href: "/track/history" },
        ],
    },

    {
        title: "Invoices",
        items: [
            { title: "All Invoices", href: "/invoices" },
            { title: "Payment History", href: "/payments" },
        ],
    },

    {
        title: "Claims",
        items: [
            { title: "File Claim", href: "/claims/new" },
            { title: "Claim History", href: "/claims/history" },
        ],
    },
]