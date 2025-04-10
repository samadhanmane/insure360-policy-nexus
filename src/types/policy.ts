
export type PolicyStatus = 'active' | 'pending' | 'expired' | 'cancelled';
export type PolicyType = 'auto' | 'home' | 'health' | 'life' | 'travel' | 'business' | 'pet' | 'other';
export type ClaimStatus = 'pending' | 'reviewing' | 'approved' | 'rejected' | 'paid';

export interface Policy {
  id: string;
  type: PolicyType;
  name: string;
  description: string;
  provider: string;
  agencyId: string;
  coverage: string;
  premium: string;
  priceValue: number; // Numerical value for comparisons
  deductible: string;
  deductibleValue: number; // Numerical value for comparisons
  term: string;
  renewalDate: string;
  status: PolicyStatus;
  documents: string[];
  benefits: string[];
  exclusions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserPolicy extends Policy {
  userId: string;
  purchaseDate: string;
  policyNumber: string;
}

export interface Claim {
  id: string;
  policyId: string;
  userId: string;
  policyNumber: string;
  agencyId: string;
  type: string;
  description: string;
  amount: string;
  amountValue: number; // Numerical value
  date: string;
  incidentDate: string;
  status: ClaimStatus;
  documents: string[];
  images: string[];
  notes: string[];
  reviewedBy?: string;
  reviewDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agency {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  logo?: string;
  isVerified: boolean;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}
