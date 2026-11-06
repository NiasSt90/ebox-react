import React from "react";
import {Navigate, useLocation} from "react-router";
import useAuthService from "../../hooks/useAuthService";

/**
 * Leitet nicht angemeldete Benutzer zum Login um; die aktuelle Location wird als "from" mitgegeben,
 * damit der Login-Dialog anschließend dorthin zurückspringen kann.
 */
export const RequireAuth = ({children}: { children: React.ReactNode }) => {
	const authService = useAuthService();
	const location = useLocation();
	if (!authService.isAuthenticated) {
		return <Navigate to="/login" replace state={{from: location}}/>;
	}
	return <>{children}</>;
}
