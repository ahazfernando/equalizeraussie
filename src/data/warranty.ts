export interface WarrantyClaim {
    id: string; // Added ID for management
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dealer: string;
    state: string;
    postcode: string;
    chassisNumber: string;
    description: string;
    issueType: "claim" | "general";
    status: "New" | "Contacted" | "In Progress" | "Resolved" | "Closed"; // Added status
    createdAt: string; // Added date
    notes?: string; // Added admin notes
}

export const saveWarrantyClaim = (claim: Omit<WarrantyClaim, "id" | "status" | "createdAt">): boolean => {
    // In a real app, this would send data to a backend
    console.log("Warranty Claim Saved:", claim);

    if (typeof window === "undefined") return true;

    // Store in local storage for demo purposes
    const existingClaims = getWarrantyClaims();
    const newClaim: WarrantyClaim = {
        ...claim,
        id: Date.now().toString(),
        status: "New",
        createdAt: new Date().toISOString()
    };
    existingClaims.push(newClaim);
    localStorage.setItem("warranty_claims", JSON.stringify(existingClaims));

    return true;
};

export const getWarrantyClaims = (): WarrantyClaim[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("warranty_claims");
    return stored ? JSON.parse(stored) : [];
};

export const updateWarrantyStatus = (id: string, status: WarrantyClaim["status"], notes?: string) => {
    const claims = getWarrantyClaims();
    const updated = claims.map(c =>
        c.id === id ? { ...c, status, notes: notes || c.notes } : c
    );
    if (typeof window !== "undefined") {
        localStorage.setItem("warranty_claims", JSON.stringify(updated));
    }
};
