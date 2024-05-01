export interface TokenPayload {
    userId: string;
    isSecondFactorAuthenticated: boolean; // Add this property
}
